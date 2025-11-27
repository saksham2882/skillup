import { GoogleGenAI } from "@google/genai";
import { ai } from "../generate-course-layout/route";
import { NextResponse } from "next/server";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
                    Schema: {
                        chapterName: <>,
                        {
                            topic: <>,
                            content: <>
                        }
                    }
                    :User Input:
                `


export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json()

    const promises = courseJson?.chapters?.map(async (chapter) => {

        const config = {
            responseMimeType: 'text/plain',
        }

        const model = "gemini-2.0-flash";

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter)
                    }
                ]
            }
        ]

        const res = await ai.models.generateContent({
            model,
            config,
            contents
        })

        console.log(res?.candidates[0]?.content?.parts[0]?.text)
        const RawResponse = res?.candidates[0]?.content?.parts[0]?.text
        const RawJson = RawResponse.replace('```json', '').replace('```', '');
        const JSONResponse = JSON.parse(RawJson)

        return JSONResponse;
    })

    const CourseContent = await Promise.all(promises)

    return NextResponse.json({
        courseName: courseTitle,
        CourseContent: CourseContent
    })
}