import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { GENERATE_LAYOUT_PROMPT } from "@/lib/prompt";
import { cleanAIResponse, generateCourseImage } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(req) {
    try {
        const { courseId, ...formData } = await req.json();
        const user = await currentUser();
        const email = user?.primaryEmailAddress?.emailAddress

        if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // 1. check for subscription
        const { has } = await auth()
        const isPro = has({ plan: 'pro' })

        // Limit Check for Course Generation for Free Users (If user already created any courses)
        if (!isPro) {
            const userCourses = await db.select().from(coursesTable).where(eq(coursesTable.userEmail, email))

            if (userCourses?.length >= 1) {
                return NextResponse.json({
                    response: 'Limit Exceeded',
                    message: "Free limit reached. Upgrade to Pro to create more."
                }, { status: 403 })
            }
        }


        // 2. Generate Layout via AI
        const config = { responseMimeType: 'application/json' }
        const model = "gemini-2.5-flash";
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: GENERATE_LAYOUT_PROMPT + JSON.stringify(formData)
                    }
                ]
            }
        ]

        const res = await ai.models.generateContent({
            model,
            config,
            contents
        })

        const RawResponse = res?.candidates?.[0]?.content?.parts[0]?.text
        const parsedJson = cleanAIResponse(RawResponse)

        if (!parsedJson) {
            throw new Error("Failed to parse AI response")
        }


        // 3. Generate Image
        const imagePrompt = parsedJson.course?.bannerImagePrompt
        const bannerImageURL = await generateCourseImage(imagePrompt)

        // 4. save content to database
        await db.insert(coursesTable).values({
            name: formData.name,
            description: formData.description,
            noOfChapters: formData.noOfChapters,
            includeVideo: formData.includeVideo,
            level: formData.level,
            category: formData.category,
            courseJson: parsedJson,
            userEmail: email,
            cid: courseId,
            bannerImageUrl: bannerImageURL || '/learning.svg',
            duration: parsedJson.course?.duration || "1h 20m",
            courseContent: [],
            isPublished: false
        })

        return NextResponse.json({ courseId })

    } catch (error) {
        console.error("Generate Layout Error:", error);
        return NextResponse.json({ error: "Failed to generate course layout" }, { status: 500 });
    }
}