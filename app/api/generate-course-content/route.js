import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";
import { CONTENT_PROMPT } from "@/lib/prompt";
import { cleanAIResponse, getYoutubeVideo } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import pLimit from 'p-limit';


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req) {
    try {
        const user = await currentUser()
        const email = user?.primaryEmailAddress?.emailAddress
        if (!email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseJson, courseId } = await req.json()

        if (!courseJson?.chapters) {
            return NextResponse.json({ error: "Invalid Course Data" }, { status: 400 });
        }

        // Verify course ownership
        const course = await db.query.coursesTable.findFirst({
            where: and(eq(coursesTable.cid, courseId), eq(coursesTable.userEmail, email))
        });
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        const limit = pLimit(4);

        // Process Chapters
        const contentGenerationTasks = courseJson?.chapters.map(async (chapter) => 
            limit(async () => {
                try {
                    // 1. Generate Text Content
                    const config = { responseMimeType: 'application/json' }
                    const model = "gemini-2.5-flash";
                    const contents = [{
                        role: 'user',
                        parts: [{ text: CONTENT_PROMPT + JSON.stringify(chapter) }]
                    }]

                    const aiRes = await ai.models.generateContent({
                        model,
                        config,
                        contents
                    })

                    const RawResponse = aiRes?.candidates?.[0]?.content?.parts[0]?.text
                    const contentJson = cleanAIResponse(RawResponse)

                    // 2. Fetch YouTube Video
                    let videoId = []
                    try {
                        videoId = await getYoutubeVideo(chapter.chapterName + " tutorial")
                    } catch (ytError) {
                        console.warn(`Youtube fetch failed for ${chapter.chapterName}`, ytError.message)
                    }

                    return {
                        courseData: contentJson,
                        youtubeVideo: videoId
                    }

                } catch (chapterError) {
                    console.error(`Failed to generate chapter: ${chapter.chapterName}`, chapterError);
                    return {
                        courseData: {
                            chapterName: chapter.chapterName,
                            topics: [{ topic: "Error", content: "<p>Content generation failed.</p>" }]
                        },
                        youtubeVideo: []
                    };
                }
            })
        )

        const fullCourseContent = await Promise.all(contentGenerationTasks);

        // Update Database
        await db.update(coursesTable)
            .set({ 
                courseContent: fullCourseContent,
                isPublished: true 
            })
            .where(eq(coursesTable.cid, courseId))

        return NextResponse.json({ 
            success: true, 
            content: fullCourseContent 
        })
        
    } catch (error) {
        console.error("course content error: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}