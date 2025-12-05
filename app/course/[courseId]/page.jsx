/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Course = () => {
  const { courseId } = useParams();
  const router = useRouter()
  const [courseInfo, setCourseInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const GetEnrolledCourseById = async () => {
    try {
      const res = await axios.get(`/api/enroll-course?courseId=${courseId}`);      
      if(!res.data){
        router.push('/workspace')
      }
      setCourseInfo(res.data);
    } catch (e) {
      console.error(e);
      router.push('/workspace')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) GetEnrolledCourseById();
  }, [courseId]);


  if (loading) {
    return (
      <div className="flex h-screen bg-slate-950">
        <div className="w-80 border-r border-white/5 bg-slate-950 p-5 hidden md:block">
          <Skeleton className="h-8 w-3/4 mb-6 bg-slate-900" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-full mb-3 bg-slate-900" />
          ))}
        </div>

        <div className="flex-1 p-10">
          <Skeleton className="h-10 w-1/3 mb-6 bg-slate-900" />
          <Skeleton className="h-[400px] w-full bg-slate-900 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      {/* ---------- Header --------- */}
      <div className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 h-[73px]">
        {/* ------------- Mobile Menu ----------- */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-400 hover:text-white mr-2"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu />
        </Button>

        <div className="hidden md:flex w-full flex-row items-center justify-start pl-4 gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="text-white w-6 h-6" />
          </div>

          <div className="font-bold text-xl text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            SkillUp AI
          </div>
        </div>

        <div className="w-full flex justify-end">
          <UserButton />
        </div>
      </div>

      {/* ---------- Mobile Sidebar Overlay ---------- */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>

          <div className="absolute top-0 left-0 h-full w-80 bg-slate-950 border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-4 flex justify-end border-b border-white/5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X />
              </Button>
            </div>

            <div className="h-[calc(100%-60px)] overflow-hidden">
              <ChapterListSidebar
                courseInfo={courseInfo}
                selectedChapterIndex={selectedChapterIndex}
                setSelectedChapterIndex={setSelectedChapterIndex}
                onChapterSelect={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------- Main Layout ---------- */}
      <div className="flex pt-[73px] flex-1 overflow-hidden">
        {/* --------- Desktop Sidebar ---------- */}
        <div className="hidden md:block w-80 fixed h-[calc(100vh-73px)] z-40 border-r border-white/5 bg-slate-950 top-[73px] overflow-hidden">
          <ChapterListSidebar
            courseInfo={courseInfo}
            selectedChapterIndex={selectedChapterIndex}
            setSelectedChapterIndex={setSelectedChapterIndex}
          />
        </div>

        {/* --------- Content Area ---------- */}
        <div className="flex-1 md:ml-80 bg-slate-950 min-h-[calc(100vh-73px)] w-full overflow-x-hidden">
          <ChapterContent
            courseInfo={courseInfo}
            selectedChapterIndex={selectedChapterIndex}
            refreshData={() => GetEnrolledCourseById()}
          />
        </div>
      </div>
    </div>
  );
};

export default Course;