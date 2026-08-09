import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const email = body.email || "demo@edu-pilot.app";
        const name = body.name || "Demo User";
        console.log("Processing user:", email, name);

        // Ensure user exists in usersTable using onConflictDoNothing
        await db.insert(usersTable).values({
            name,
            email,
            subscriptionId: "default-subscription"
        }).onConflictDoNothing();

        const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
        console.log("Returned user record:", users[0]);

        return NextResponse.json(users[0] || { name, email, subscriptionId: "default-subscription" });
    } catch (err) {
        console.error("Error in POST /api/user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

