/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import AppHeader from "@/app/workspace/_components/AppHeader"
import ChapterListSidebar from "../_components/ChapterListSidebar"
import ChapterContent from "../_components/ChapterContent"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const Course = () => {
  const { courseId } = useParams()
  const [courseInfo, setCourseInfo] = useState()
  
  const GetEnrolledCourseById = async () => {
    const res = await axios.get(`/api/enroll-course?courseId=${courseId}`);
    console.log(res.data)
    setCourseInfo(res.data)
  }

  useEffect(() => {
    GetEnrolledCourseById()
  }, [])

  return (
    <div>
        <AppHeader hideSidebar={true} />

        <div className="flex gap-10">
            <ChapterListSidebar courseInfo={courseInfo} /> 
            <ChapterContent courseInfo={courseInfo} />
        </div>
    </div>
  )
}
export default Course