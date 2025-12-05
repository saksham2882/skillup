"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Circle, PlayCircle } from "lucide-react";

const ChapterListSidebar = ({ courseInfo, onChapterSelect, selectedChapterIndex, setSelectedChapterIndex }) => {
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  let completedChapter = enrollCourse?.completedChapters ?? [];

  const handleChapterClick = (index) => {
    setSelectedChapterIndex(index);
    if (onChapterSelect) {
      onChapterSelect();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* --------- Header ---------- */}
      <div className="p-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl z-10 shrink-0">
        <h2 className="font-bold text-xl text-white">
          Course Content
        </h2>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-400">
            {completedChapter.length} / {courseContent?.length} Completed
          </p>
          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-500"
              style={{
                width: `${
                  (completedChapter.length / (courseContent?.length || 1)) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ----------- Scrollable List ------------ */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <Accordion
          type="single"
          collapsible
          value={`item-${selectedChapterIndex}`}
        >
          {courseContent?.map((chapter, index) => {
            const isCompleted = completedChapter.includes(index);
            const isActive = selectedChapterIndex === index;

            return (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className={`border-b border-white/5 transition-colors ${
                  isActive ? "bg-slate-900/60" : "hover:bg-slate-900/30"
                }`}
              >
                <AccordionTrigger
                  onClick={() => handleChapterClick(index)}
                  className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors w-full"
                >
                  <div className="flex gap-3 text-left w-full overflow-hidden">
                    <div className="mt-1 shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : isActive ? (
                        <PlayCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`text-sm font-medium truncate ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {chapter?.courseData?.chapterName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono">
                        { courseInfo?.courses?.courseJson?.course?.chapters[index]?.duration || "30 mins"}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-slate-950/50 px-0 pb-2">
                  <div className="flex flex-col">
                    {chapter?.courseData.topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 px-8 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors border-l-2 border-transparent hover:border-cyan-500/50 ml-5"
                      >
                        <Circle className="w-1.5 h-1.5 mt-1 fill-slate-700 text-transparent shrink-0" />
                        <span className="line-clamp-2 leading-relaxed">
                          {topic?.topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default ChapterListSidebar;
