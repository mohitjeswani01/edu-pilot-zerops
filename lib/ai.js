import { generateWithGemini } from "./gemini-client";

export { generateWithGemini };

/**
 * Compatibility wrapper that delegates directly to generateWithGemini.
 * @param {string} prompt The prompt to send to Gemini.
 * @returns {Promise<{source: string, text: string}>}
 */
export async function generateContentWithFallback(prompt) {
    return await generateWithGemini(prompt);
}

