import { db } from "@/config/db";
import { coursesTable, enrollCourseTable, usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { and, eq, desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

const DEMO_USER_EMAIL = "demo@edu-pilot.app";
const DEMO_USER_NAME = "Demo User";

async function ensureDemoUser() {
    await db.insert(usersTable).values({
        name: DEMO_USER_NAME,
        email: DEMO_USER_EMAIL,
        subscriptionId: "default-subscription"
    }).onConflictDoNothing();
}

export async function POST(req) {
    try {
        const { courseId } = await req.json();
        await ensureDemoUser();

        // Check if the course is already enrolled
        const enrolledCourses = await db.select().from(enrollCourseTable)
            .where(and(
                eq(enrollCourseTable.userEmail, DEMO_USER_EMAIL),
                eq(enrollCourseTable.cid, courseId)
            ));

        if (enrolledCourses.length > 0) {
            return NextResponse.json({ resp: 'Already Enrolled' }, { status: 200 });
        }

        // If not enrolled, insert the new record
        const result = await db.insert(enrollCourseTable)
            .values({
                cid: courseId,
                userEmail: DEMO_USER_EMAIL
            }).returning({ id: enrollCourseTable.id });

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error("[ENROLL_COURSE_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(and(
                eq(enrollCourseTable.userEmail, DEMO_USER_EMAIL),
                eq(enrollCourseTable.cid, courseId)
            ));
        return NextResponse.json(result);
    } else {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(eq(enrollCourseTable.userEmail, DEMO_USER_EMAIL))
            .orderBy(desc(enrollCourseTable.id));

        return NextResponse.json(result);
    }
}

export async function PUT(req) {
    try {
        const { completedChapter, courseId } = await req.json();

        const result = await db.update(enrollCourseTable).set({
            completedChapters: completedChapter
        }).where(and(
            eq(enrollCourseTable.cid, courseId),
            eq(enrollCourseTable.userEmail, DEMO_USER_EMAIL)
        )).returning(enrollCourseTable);

        return NextResponse.json(result);
    } catch (error) {
        console.error("[UPDATE_PROGRESS_ERROR]", error);
        return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
    }
}