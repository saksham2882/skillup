"use client"

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndex";
import { VideoIcon } from "lucide-react";
import { useContext } from "react";
import YouTube from "react-youtube";

const ChapterContent = ({ courseInfo }) => {
  const { course, enrollCourse } = courseInfo ?? '';
  const courseContent = courseInfo?.courses?.courseContent
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo || []
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics || []

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">
        {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
      </h2>

      <h2 className="my-2 font-semibold text-md flex gap-2 text-primary">
        Related Videos <VideoIcon />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {videoData?.map((video, index) => index < 2 &&  (
          <div key={index} className="">
            <YouTube 
              videoId={video?.videoId}
              opts={{
                height: '250',
                width: '400'
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-7">
        {topics.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-xl">
            <h2 className="font-bold text-xl text-primary mb-5">
              {index + 1}. {topic?.topic}
            </h2>

            <div dangerouslySetInnerHTML={{__html: topic?.content}}
              style={{
                lineHeight: '1.8'
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterContent