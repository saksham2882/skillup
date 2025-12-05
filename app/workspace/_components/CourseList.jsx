"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import AddNewCourseDialog from "./AddNewCourseDialog"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import CourseCard from "./CourseCard"
import { Skeleton } from "@/components/ui/skeleton"

const CourseList = () => {
  const [courseList, setCourseList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  const GetCourseList = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourseList(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    user && GetCourseList()
  }, [user])

  return (
    <div className="mt-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-bold text-3xl text-white">
            Your Created Courses
          </h2>
          <p className="text-slate-400 mt-1">
            Manage the AI curriculums you have generated.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 rounded-xl bg-slate-900/50 border border-white/5 overflow-hidden"
            >
              <Skeleton className="h-[180px] w-full bg-slate-800" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4 bg-slate-800" />
                <Skeleton className="h-4 w-1/2 bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : courseList?.length == 0 ? (
        <div className="flex py-16 items-center justify-center flex-col border border-dashed border-white/10 rounded-2xl bg-slate-900/30">
          <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
            <Image
              src="/learning.svg"
              alt="Empty"
              width={40}
              height={40}
              className="opacity-50 grayscale"
            />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            No courses found
          </h2>
          
          <p className="text-slate-400 mb-6 text-center max-w-sm">
            Start your journey by creating an AI-powered personalized curriculum.
          </p>

          <AddNewCourseDialog>
            <Button className="btn-primary">
              <Plus className="mr-2 w-4 h-4" /> Create First Course
            </Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList?.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList