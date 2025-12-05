"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Video,
  XCircle,
  FileText,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";
import Link from "next/link";

const ChapterContent = ({ courseInfo, refreshData, selectedChapterIndex }) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  const { enrollCourse } = courseInfo ?? "";
  const courseContent = courseInfo?.courses?.courseContent;

  const chapterData = courseContent?.[selectedChapterIndex]?.courseData;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo || [];
  let completedChapter = enrollCourse?.completedChapters ?? [];

  const toggleComplete = async (markAsComplete) => {
    setLoading(true);
    try {
      let updatedChapters = [...completedChapter];

      if (markAsComplete) {
        if (!updatedChapters.includes(selectedChapterIndex)) {
          updatedChapters.push(selectedChapterIndex);
        }
      } else {
        updatedChapters = updatedChapters.filter(
          (item) => item !== selectedChapterIndex
        );
      }

      const res = await axios.put("/api/enroll-course", {
        courseId: courseId,
        completedChapter: updatedChapters,
      });

      refreshData();
      toast.success(markAsComplete ? "Chapter Completed! 🎉" : "Marked as incomplete");
    } catch (err) {
      toast.error("Failed to update progress");
    } finally {
      setLoading(false);
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (!chapterData) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center text-slate-500">
        Select a chapter to begin learning.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-20 w-full overflow-x-hidden">
      {/* ------------- Back Button ----------- */}
      <Link
        href="/workspace"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-6 transition-colors group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
        Back to Workspace
      </Link>

      {/* ----------- Header ----------*/}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 border-b border-white/5 pb-8">
        <div className="space-y-2 w-full md:w-auto">
          <h1 className="font-bold text-2xl md:text-4xl text-white leading-tight wrap-break-word">
            {chapterData?.chapterName}
          </h1>
          
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
              Chapter {selectedChapterIndex + 1}
            </span>
            <span className="text-slate-500 text-sm flex items-center gap-1">
              <FileText className="w-3 h-3" /> {chapterData?.topics?.length}{" "}
              Topics
            </span>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {!completedChapter?.includes(selectedChapterIndex) ? (
            <Button
              onClick={() => toggleComplete(true)}
              disabled={loading}
              className="w-full md:w-auto bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              Mark Complete
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => toggleComplete(false)}
              disabled={loading}
              className="w-full md:w-auto border-green-500/30 text-green-400 bg-green-500/5 hover:bg-green-500/10 hover:text-green-300"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              Mark Incomplete
            </Button>
          )}
        </div>
      </div>

      {/* --------- Video Section -------- */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Video className="text-cyan-400 w-5 h-5" /> Video Tutorial
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {videoData.slice(0, 2).map((video, index) => (
            <div
              key={index}
              className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group bg-black"
            >
              <YouTube
                videoId={video?.videoId}
                opts={opts}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ------------- Topics Content ------------ */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-500 pl-4">
          Notes & Concepts
        </h2>

        {chapterData?.topics.map((topic, index) => (
          <div
            key={index}
            className="p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all max-w-full overflow-hidden"
          >
            <h3 className="font-bold text-xl text-cyan-400 mb-4 wrap-break-word">
              {topic?.topic}
            </h3>
            
            <div
              className="
                text-slate-300 text-base leading-relaxed wrap-break-word
                [&_p]:mb-4 [&_p]:leading-7
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-100 [&_h3]:mt-5 [&_h3]:mb-2
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul_li]:mb-2 [&_ul_li::marker]:text-cyan-500
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol_li]:mb-2 [&_ol_li::marker]:text-cyan-500
                [&_strong]:text-white [&_strong]:font-bold
                [&_code]:bg-black/50 [&_code]:text-cyan-300 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm [&_code]:break-all
                [&_pre]:bg-black/50 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-white/10 [&_pre]:max-w-full
                [&_blockquote]:border-l-4 [&_blockquote]:border-slate-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_blockquote]:my-4
                [&_a]:text-cyan-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-cyan-300
              "
              dangerouslySetInnerHTML={{ __html: topic?.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;