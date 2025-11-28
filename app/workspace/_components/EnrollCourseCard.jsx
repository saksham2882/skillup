import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const EnrollCourseCard = ({ course, enrollCourse }) => {
    const courseJson = course?.courseJson?.course
    // console.log(course)
    // console.log(courseJson)

    const CalculateProgress = () => {
        return (enrollCourse?.completedChapters?.length ?? 0 / course?.courseContent?.length) * 100;
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
            <div className="">
                <h2 className="flex justify-between text-sm text-primary mb-1">
                    Progress
                    <span>{CalculateProgress()} %</span>
                </h2>
                <Progress value={CalculateProgress()} />

                <Link href={`/workspace/course/${course?.cid}`}>
                    <Button className={'w-full mt-3 cursor-pointer'}>
                        <PlayCircle />
                        Continue Learning 
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default EnrollCourseCard