import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const EnrollCourseCard = ({ course, enrollCourse }) => {
    const courseJson = course?.courseJson?.course
    const bannerImageUrl = course?.bannerImageUrl || '/learning.svg'

    const CalculateProgress = () => {
        const completed = enrollCourse?.completedChapters?.length || 0;
        const total = course?.courseContent?.length || 0;
        if (total === 0) return 0;

        return Math.round((completed / total) * 100);
    }

    const progress = CalculateProgress()

    return (
        <div className="ai-card group flex flex-col h-full overflow-hidden">
            <div className="relative h-40 w-full overflow-hidden">
                <Image
                    src={bannerImageUrl}
                    alt={course?.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-md">
                    {courseJson?.name}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-cyan-400 font-bold">{progress}%</span>
                </div>

                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <Progress value={progress} />
                </div>

                <div className="flex justify-between items-center text-sm text-slate-400 mt-3 ">
                    <span>
                        {enrollCourse?.completedChapters?.length || 0} /{" "}
                        {course?.courseContent?.length || 0} Chapters
                    </span>
                    {progress === 100 && (
                        <span className="flex items-center text-yellow-500 gap-1">
                            <Award size={12} /> Completed
                        </span>
                    )}
                </div>

                <Link
                    href={`/workspace/view-course/${course?.cid}`}
                    className="mt-auto pt-2"
                >
                    <Button className="w-full hover:bg-white/20 text-white border border-white/10 cursor-pointer">
                        <PlayCircle className="mr-2 w-4 h-4" /> Continue
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default EnrollCourseCard