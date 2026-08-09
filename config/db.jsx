import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/edupilot';
const pg = neon(connectionString);
export const db = drizzle(pg);

