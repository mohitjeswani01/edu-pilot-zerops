import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { coursesTable, enrollCourseTable } from "@/config/schema";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // This block for a special case remains the same
    if (courseId == 0) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(sql`${coursesTable.courseContent} ::jsonb != '{}'::jsonb`);
        return NextResponse.json(result[0] || {});
    }

    // This block for fetching a single course by ID remains the same
    if (courseId) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId));
        return NextResponse.json(result[0] || {});
    }

    // ✅ CORRECTED: This block now fetches ALL courses for the Explore page
    else {
        const result = await db
            .select()
            .from(coursesTable)
            .orderBy(desc(coursesTable.id)); // Orders by newest first

        return NextResponse.json(result);
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        if (!courseId) {
            return NextResponse.json({ error: "Missing courseId parameter" }, { status: 400 });
        }

        // Check if the course exists
        const existing = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));
        if (existing.length === 0) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Step 1: Delete all enrollment rows referencing this course (FK cleanup)
        await db.delete(enrollCourseTable).where(eq(enrollCourseTable.cid, courseId));

        // Step 2: Delete the course itself
        await db.delete(coursesTable).where(eq(coursesTable.cid, courseId));

        console.log(`[DELETE] Course ${courseId} and its enrollments deleted successfully.`);
        return NextResponse.json({ success: true, deletedCourseId: courseId });

    } catch (error) {
        console.error("[DELETE_COURSE_ERROR]", error);
        return NextResponse.json({ error: "Failed to delete course", details: error?.message }, { status: 500 });
    }
}