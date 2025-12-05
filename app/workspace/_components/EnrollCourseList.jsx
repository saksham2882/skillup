/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import axios from "axios"
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const EnrollCourseList = () => {
    const [enrolledCourseList, setEnrolledCourseList] = useState(null)

    const GetEnrolledCourse = async () => {
        try {
            const res = await axios.get('/api/enroll-course');
            setEnrolledCourseList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetEnrolledCourse()
    }, [])


    if (enrolledCourseList === null) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[280px] bg-slate-900 rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        enrolledCourseList?.length > 0 && (
            <div className="mt-12">
                <h2 className="font-bold text-2xl text-white mb-6">
                    Continue Learning
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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