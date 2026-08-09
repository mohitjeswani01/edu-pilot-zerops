import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const dbUrl = process.env.DATABASE_URL;

console.log("[DB Init] DATABASE_URL present:", !!dbUrl, "Length:", dbUrl ? dbUrl.length : 0);

// Diagnostic: show host, user, dbname (mask password) so we can verify credentials
if (dbUrl) {
    try {
        const parsed = new URL(dbUrl);
        console.log(`[DB Init] Connecting as: ${parsed.username}@${parsed.hostname}${parsed.pathname}`);
    } catch (e) {
        console.warn("[DB Init] Could not parse DATABASE_URL as URL:", e.message);
    }
}

const connectionString = dbUrl || 'postgresql://placeholder:placeholder@localhost:5432/edupilot';
const pg = neon(connectionString);
export const db = drizzle(pg);


