import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";
import { desc, eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams?.get('courseId')
        const user = await currentUser()
        const userEmail = user?.primaryEmailAddress?.emailAddress
        
        // 1. Community Courses with content
        if(courseId === '0'){
            const courses = await db.select().from(coursesTable)
                .where(and(
                    eq(coursesTable.isPublished, true),
                    sql`${coursesTable.courseContent}::jsonb != '[]'::jsonb`
                ))
                .orderBy(desc(coursesTable.createdAt))
                .limit(30)

            return NextResponse.json(courses)
        }

        // 2. Specific Course details
        if(courseId){
            const course = await db.query.coursesTable.findFirst({
                where: eq(coursesTable.cid, courseId)
            })
            return NextResponse.json(course || {});
        }

        // 3. User's Dashboard Courses (if authenticated)
        if(userEmail){
            const userCourses = await db.select().from(coursesTable)
                .where(eq(coursesTable.userEmail, userEmail))
                .orderBy(desc(coursesTable.createdAt))
            
            return NextResponse.json(userCourses)
        }

        return NextResponse.json([]);

    } catch (error) {
        console.error("Get Courses Error:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}