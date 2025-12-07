import { db } from "@/config/db"
import { coursesTable, enrollCourseTable } from "@/config/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { and, desc, eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"


// Enroll in a Course
export async function POST(req) {
    try {
        const { courseId } = await req.json()
        const user = await currentUser()
        const email = user?.primaryEmailAddress?.emailAddress

        if(!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 1. Check Pro Status via Clerk
        const { has } = await auth();
        const isPro = has({ plan: 'pro' });

        // 2. Check Enrollment Limit for Free Users
        if(!isPro){
            const existingEnrollments = await db.select({ count: sql`count(*)::int` })
                .from(enrollCourseTable)
                .where(eq(enrollCourseTable.userEmail, email))

            // Limit: 1 Enrolled Course for free Users
            if(existingEnrollments[0].count >= 1){
                return NextResponse.json({
                    response: 'Limit Exceeded',
                    message: "Free users can only enroll in 1 course. Upgrade to Pro for unlimited access."
                }, { status: 403 });
            }
        }

        // 3. Check if already enrolled in this course
        const existingEnrollment = await db.query.enrollCourseTable.findFirst({
            where: and(
                eq(enrollCourseTable.userEmail, email),
                eq(enrollCourseTable.cid, courseId)
            )
        });

        if (existingEnrollment) {
            return NextResponse.json({ response: 'Already Enrolled' }, { status: 200 });
        }
        
        // 4. Enroll User
        const newEnrollment = await db.insert(enrollCourseTable).values({
            cid: courseId,
            userEmail: email,
            completedChapters: []
        }).returning()

        return NextResponse.json(newEnrollment[0]);

    } catch (error) {
        console.error("Enroll Error: ", error);
        return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
    }
}


// Get Enrolled Courses
export async function GET(req) {
    try {
        const user = await currentUser()
        const email = user?.primaryEmailAddress?.emailAddress

        if(!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            
        const { searchParams } = new URL(req.url)
        const courseId = searchParams?.get('courseId')
        
        // Get Specific Enrolled Course Details
        if(courseId){
            const res = await db.select({
                courses: coursesTable,
                enrollCourse: enrollCourseTable
            })
            .from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(and(
                eq(enrollCourseTable.userEmail, email),
                eq(coursesTable.cid, courseId)
            ))

            return NextResponse.json(res[0] || {})

        } else {
            // Get All Enrolled Courses
            const allEnrollments = await db.select({
                courses: coursesTable,
                enrollCourse: enrollCourseTable
            })
            .from(enrollCourseTable)
            .innerJoin(coursesTable, eq(enrollCourseTable.cid, coursesTable.cid))
            .where(eq(enrollCourseTable.userEmail, email))
            .orderBy(desc(enrollCourseTable.createdAt));
            
            return NextResponse.json(allEnrollments);
        }

    } catch (error) {
        console.error("Get Enrolled Error: ", error);
        return NextResponse.json({ 
            error: "Failed to fetch" 
        }, { status: 500 });
    }
}


// Update Course Progress
export async function PUT(req) {
    try {
        const { completedChapter, courseId } = await req.json()
        const user = await currentUser()
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Update DB
        const updated = await db.update(enrollCourseTable)
            .set({ completedChapters: completedChapter })
            .where(and(
                eq(enrollCourseTable.cid, courseId),
                eq(enrollCourseTable.userEmail, email)
            ))
            .returning();

        if (!updated.length) {
            return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
        }

        return NextResponse.json(updated[0]);
        
    } catch (error) {
        console.error("Update Progress Error: ", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}