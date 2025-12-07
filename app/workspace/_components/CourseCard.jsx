import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios"
import { BookOpen, Loader2, MoreVertical, PlayCircle, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


const CourseCard = ({ course }) => {
    const courseJson = course?.courseJson.course || {}
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const bannerImageUrl = course?.bannerImageUrl || '/learning.svg'

    const onEnrollCourse = async () => {
        setLoading(true)
        try {
            const res = await axios.post("/api/enroll-course", {
                courseId: course?.cid,
            });

            if (res.data.response) {
                toast.warning("You are already enrolled in this course!");
                return;
            } else {
                toast.success("Successfully Enrolled!");
            }
        } catch (error) {
            if (error?.response?.data?.response === "Limit Exceeded") {
                router.push("/workspace/billing");
                toast.warning("Free plan can only enroll in 1 course. Upgrade to Pro for unlimited access.");
                return;
            }
            toast.error("Something went wrong. Please try again.");
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="ai-card group flex flex-col overflow-hidden h-full">
            {/* --------- Image Section ----------- */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={bannerImageUrl}
                    alt={course?.name || "Course"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                {/* --------- Level Badge ------------ */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                    {course?.level || "Beginner"}
                </div>
            </div>

            {/* ----------- Content Section ------------- */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {courseJson?.name || "Untitled Course"}
                    </h2>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none hover:bg-slate-800 p-1 rounded-md transition-colors">
                            <MoreVertical className="h-4 w-4 text-slate-400 hover:text-white" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                            <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 mb-3 flex-1">
                    {courseJson?.description || "No description available."}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-5 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                        {courseJson?.noOfChapters} Chapters
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        <span className="capitalize">{course?.category || "General"}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    {course?.courseContent?.length ? (
                        <Button
                            className="w-full btn-primary h-10"
                            onClick={onEnrollCourse}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                <>
                                    <PlayCircle className="mr-2 w-4 h-4" /> Enroll Now
                                </>
                            )}
                        </Button>
                    ) : (
                        <Link
                            href={`/workspace/edit-course/${course?.cid}`}
                            className="w-full"
                        >
                            <Button
                                variant="outline"
                                className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 cursor-pointer"
                            >
                                <Settings className="mr-2 w-4 h-4" /> Generate Content
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseCard