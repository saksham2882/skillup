/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import CourseInfo from "../_components/CourseInfo"
import ChapterTopicList from "../_components/ChapterTopicList"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const EditCourse = ({ viewCourse = false }) => {
    const { courseId } = useParams()
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState()

    const GetCourseInfo = async () => {
        try {
            const res = await axios.get("/api/courses?courseId=" + courseId);
            setCourse(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (courseId) {
            GetCourseInfo()
        }
    }, [courseId])

    
    return (
        <div className="pb-20 space-y-6">
            <Link
                href="/workspace"
                className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workspace
            </Link>

            {loading ? (
                <div className="space-y-10">
                    <Skeleton className="w-full h-[300px] bg-slate-900 rounded-3xl" />
                    <div className="space-y-4">
                        <Skeleton className="w-1/3 h-8 bg-slate-900" />
                        <Skeleton className="w-full h-20 bg-slate-900" />
                        <Skeleton className="w-full h-20 bg-slate-900" />
                    </div>
                </div>
            ) : (
                <>
                    <CourseInfo course={course} viewCourse={viewCourse} />
                    <ChapterTopicList course={course} />
                </>
            )}
        </div>
    );
}

export default EditCourse