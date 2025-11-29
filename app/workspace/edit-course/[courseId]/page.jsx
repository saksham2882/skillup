/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import CourseInfo from "../_components/CourseInfo"
import ChapterTopicList from "../_components/ChapterTopicList"

const EditCourse = ({ viewCourse = false }) => {
    const { courseId } = useParams()
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState()

    const GetCourseInfo = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/api/courses?courseId=" + courseId);
            console.log(res.data);
            setCourse(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(courseId){
            GetCourseInfo()
        }
    }, [courseId])

  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse} />
      <ChapterTopicList course={course} />
    </div>
  );
}

export default EditCourse