"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BookAIcon, Clock, Loader2Icon, Settings, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CourseInfo = ({ course }) => {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const GenerateCourseContent = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid
      })
      console.log("Course Content: ", res.data)
      router.replace('/workspace')
      toast.success("Course Generated Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Server Side Error, Try Again!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 rounded-2xl shadow-sm w-full bg-white">

      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <h2 className="font-bold text-2xl md:text-3xl">
            {courseLayout?.name}
        </h2>

        <p className="text-gray-600 line-clamp-3">
          {courseLayout?.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex gap-4 items-center p-3 rounded-xl shadow-sm bg-gray-50">
            <Clock className="text-blue-500 w-6 h-6 shrink-0" />
            <section className="min-w-0">
              <h2 className="font-medium text-gray-600">
                Duration
              </h2>
              <h2 className="font-semibold">{course?.duration || "1 hour"}</h2>
            </section>
          </div>

          <div className="flex gap-4 items-center p-3 rounded-xl shadow-sm bg-gray-50">
            <BookAIcon className="text-green-500 w-6 h-6 shrink-0" />
            <section className="min-w-0">
              <h2 className="font-medium text-gray-600">
                Chapters
              </h2>
              <h2 className="font-semibold">{course?.noOfChapters}</h2>
            </section>
          </div>

          <div className="flex gap-4 items-center p-3 rounded-xl shadow-sm bg-gray-50">
            <TrendingUp className="text-red-500 w-6 h-6 shrink-0" />
            <section className="min-w-0">
              <h2 className="font-medium text-gray-600 ">
                Difficulty
              </h2>
              <h2 className="font-semibold">{course?.level}</h2>
            </section>
          </div>
        </div>

        <Button 
          className="mt-3 max-w-sm gap-2 cursor-pointer" 
          onClick={GenerateCourseContent}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <>
              <Settings className="w-5 h-5" />
              Generate Content
            </>
          )}
        </Button>
      </div>

      <div className="w-full md:w-1/3">
        <div className="relative w-full h-48 md:h-full rounded-xl overflow-hidden">
          <Image
            src={course?.bannerImageUrl}
            alt={course?.name + " Banner"}
            fill
            className="object-cover"
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
