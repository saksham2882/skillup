/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import axios from "axios"
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

const EnrollCourseList = () => {
    const [enrolledCourseList, setEnrolledCourseList] = useState()

    const GetEnrolledCourse = async() => {
        const res = await axios.get('/api/enroll-course');
        console.log("Enrolled List: ", res.data)
        setEnrolledCourseList(res.data)
    }

    useEffect(() => {
        GetEnrolledCourse()
    }, [])

  return (
    enrolledCourseList?.length > 0 && (
        <div className="mt-10">
            <h2 className="font-bold text-xl text-primary">
                Continue Learning your courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
                {
                    enrolledCourseList?.map((course, index) => (
                        <EnrollCourseCard 
                            key={index}
                            course={course?.courses} 
                            enrollCourse={course?.enrollCourse}
                        />
                    ))
                }
            </div>
            
        </div>
    )
  )
}

export default EnrollCourseList