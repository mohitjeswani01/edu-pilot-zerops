import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const dbUrl = process.env.DATABASE_URL;

console.log("[DB Init] DATABASE_URL present:", !!dbUrl, "Length:", dbUrl ? dbUrl.length : 0);

const connectionString = dbUrl || 'postgresql://placeholder:placeholder@localhost:5432/edupilot';
const pg = neon(connectionString);
export const db = drizzle(pg);


