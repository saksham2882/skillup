"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import AddNewCourseDialog from "./AddNewCourseDialog"

const CourseList = () => {
    const [CourseList, setCourseList] = useState([])

  return (
    <div className="mt-10">
      <h2 className="font-bold text-3xl">Course List</h2>

      {CourseList?.length == 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-4 bg-secondary">
          <Image src="/learning.svg" alt="AI Course" width={80} height={80} />

          <h2 className="my-4 text-xl font-bold">
            Look like you haven&apos;t created any course yet{" "}
          </h2>

          <AddNewCourseDialog>
            <Button className={'cursor-pointer hover:scale-102 active:scale-97 transition-all duration-300'}>
              <Plus />
              Create your first Course
            </Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div>List of Courses</div>
      )}
    </div>
  );
}
export default CourseList