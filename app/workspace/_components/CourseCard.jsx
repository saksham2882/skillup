import { Button } from "@/components/ui/button"
import axios from "axios"
import { BookAudio, LoaderCircle, PlayCircle, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

const CourseCard = ({course}) => {
    const courseJson = course?.courseJson.course
    const [loading, setLoading] = useState(false)

    const onEnrollCourse = async () => {
        setLoading(true)
        try {
            const res = await axios.post("/api/enroll-course", {
              courseId: course?.cid,
            });

            console.log(res.data)
            if(res.data.response){
                toast.warning('Already Enrolled!')
                return;
            }else{
                toast.success('Enrolled!')
            }
        } catch (error) {
            toast.error('Server Side Error. Try Again!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="shadow-sm rounded-xl hover:shadow-lg hover:scale-101 transition-all duration-300">
        <Image 
            src={course?.bannerImageUrl} 
            alt={course?.name}
            width={400}
            height={300}
            className="w-full aspect-video rounded-t-xl object-cover"
        />

        <div className="p-3 flex flex-col gap-3">
            <h2 className="font-bold text-lg">
                {courseJson?.name}
            </h2>
            <p className="line-clamp-3 text-gray-400 text-sm">
                {courseJson?.description}
            </p>
            <div className="flex justify-between items-center">
                <h2 className="flex items-center gap-2 text-sm">
                    <BookAudio className="text-primary h-5 w-5" />
                    {courseJson?.noOfChapters} Chapters
                </h2>
                
                {
                    course?.courseContent?.length ? (
                        <Button 
                            className="cursor-pointer" 
                            size={'sm'}
                            onClick={onEnrollCourse}
                            disabled={loading}
                        >
                            { loading ? (
                                <LoaderCircle className="animate-spin" /> 
                            ) : (
                                <>
                                    <PlayCircle />
                                    Enroll Course
                                </>
                            )}
                        </Button>
                    ) : (
                        <Link href={'/workspace/edit-course/' + course?.cid}>
                            <Button 
                                className="cursor-pointer" 
                                size={'sm'} 
                                variant={'outline'}
                            >
                                <Settings />
                                Generate Course
                            </Button>
                        </Link>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default CourseCard