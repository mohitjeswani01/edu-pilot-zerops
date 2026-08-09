import { GoogleGenerativeAI } from "@google/generative-ai";

let currentKeyIndex = 0;

function getGeminiKeys() {
    const keys = [
        process.env.GEMINI_API_KEY_1,
        process.env.GEMINI_API_KEY_2,
        process.env.GEMINI_API_KEY_3,
        process.env.GEMINI_API_KEY
    ].filter(key => key && typeof key === 'string' && key.trim().length > 0);

    return Array.from(new Set(keys));
}

/**
 * Generates content using Gemini API with automatic multi-key rotation and rate-limit retry.
 * 
 * @param {string} prompt The text prompt for AI generation.
 * @param {object} options Options object, e.g. { model: 'gemini-1.5-flash' }.
 * @returns {Promise<{source: string, text: string}>}
 */
export async function generateWithGemini(prompt, options = {}) {
    const keys = getGeminiKeys();

    if (keys.length === 0) {
        throw new Error("No Gemini API keys configured. Please set GEMINI_API_KEY_1 in the environment.");
    }

    const primaryModel = options.model || "gemini-3.5-flash";
    const fallbackModel = "gemini-3.1-flash-lite";
    const maxAttempts = keys.length;
    let attempt = 0;
    let lastError = null;

    while (attempt < maxAttempts) {
        const keyIndex = currentKeyIndex % keys.length;
        const apiKey = keys[keyIndex];

        console.log(`[Gemini Rotation] Using Key Index: ${keyIndex} (Key ${keyIndex + 1}/${keys.length})`);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            let selectedModel = primaryModel;
            let result;

            try {
                const model = genAI.getGenerativeModel({ model: primaryModel });
                result = await model.generateContent(prompt);
            } catch (modelError) {
                const isModelNotFoundError = 
                    modelError?.status === 404 ||
                    modelError?.message?.includes('404') ||
                    modelError?.message?.toLowerCase().includes('not found') ||
                    modelError?.message?.toLowerCase().includes('invalid');

                if (isModelNotFoundError && primaryModel !== fallbackModel) {
                    console.warn(`[Gemini Rotation] Primary model '${primaryModel}' failed (${modelError?.message}). Trying fallback model '${fallbackModel}'...`);
                    selectedModel = fallbackModel;
                    const model = genAI.getGenerativeModel({ model: fallbackModel });
                    result = await model.generateContent(prompt);
                } else {
                    throw modelError;
                }
            }

            const response = await result.response;
            const text = response.text();

            return {
                source: `Gemini (${selectedModel})`,
                text: text
            };
        } catch (error) {
            lastError = error;
            console.error(`[Gemini Rotation] Key Index ${keyIndex} failed:`, error?.message || error);

            const isQuotaError = 
                error?.status === 429 ||
                error?.message?.includes('429') ||
                error?.message?.includes('RESOURCE_EXHAUSTED') ||
                error?.message?.toLowerCase().includes('quota') ||
                error?.message?.toLowerCase().includes('rate limit');

            // Rotate key index
            currentKeyIndex = (currentKeyIndex + 1) % keys.length;
            attempt++;

            if (isQuotaError && attempt < maxAttempts) {
                console.warn(`[Gemini Rotation] Quota/Rate limit reached on key index ${keyIndex}. Automatically retrying with key index ${currentKeyIndex}...`);
                continue;
            } else if (!isQuotaError && attempt < maxAttempts) {
                console.warn(`[Gemini Rotation] Error encountered on key index ${keyIndex}. Retrying with key index ${currentKeyIndex}...`);
                continue;
            }
        }
    }

    console.error(`[Gemini Rotation] All ${keys.length} Gemini API keys failed.`);
    throw new Error(`All available Gemini API keys failed. Last error: ${lastError?.message || 'Quota/Rate Limit Exceeded'}`);
}