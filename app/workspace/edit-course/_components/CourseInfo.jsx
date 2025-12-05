"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { BookOpen, Clock, Loader2Icon, PlayCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CourseInfo = ({ course, viewCourse }) => {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const bannerImageUrl = course?.bannerImageUrl || '/learning.svg'

  const GenerateCourseContent = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid
      })
      router.replace('/workspace')
      toast.success("Course Content Generated Successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Generation failed. Please try again.");
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 lg:p-8 rounded-3xl bg-slate-900/50 border border-white/5 shadow-2xl">
      {/* ---------- Banner Image ---------- */}
      <div className="w-full md:w-1/3 relative h-[250px] md:h-auto rounded-2xl overflow-hidden shadow-lg border border-white/10">
        <Image
          src={bannerImageUrl}
          alt={course?.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ------------ Details ----------- */}
      <div className="flex flex-col gap-5 flex-1 justify-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {course?.category || "Education"}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
              {course?.level}
            </span>
          </div>

          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            {courseLayout?.name}
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed line-clamp-3">
            {courseLayout?.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          <div className="flex items-center gap-3 text-slate-300">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <Clock size={20} />
            </div>

            <div>
              <div className="text-xs text-slate-500">
                Duration
              </div>
              <div className="font-semibold">
                {course?.duration || "2h 30m"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <div className="p-2 rounded-lg bg-slate-800 text-purple-400">
              <BookOpen size={20} />
            </div>
            
            <div>
              <div className="text-xs text-slate-500">
                Chapters
              </div>
              <div className="font-semibold">
                {course?.noOfChapters} Chapters
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-6 border-t border-white/5">
          {!viewCourse ? (
            <Button
              className="w-full md:w-auto btn-primary h-12 text-md"
              onClick={GenerateCourseContent}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2" /> Generating
                  Content...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate Course Content
                </>
              )}
            </Button>
          ) : (
            <Link href={`/course/${course?.cid}`}>
              <Button className="w-full md:w-auto btn-primary h-12 text-md">
                <PlayCircle className="mr-2 h-5 w-5" /> Start Learning Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
