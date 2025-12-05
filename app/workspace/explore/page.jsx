"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search, Sparkles } from "lucide-react"
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true)
    const { user } = useUser();

    const GetCourseList = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/api/courses?courseId=0");
            setCourseList(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        user && GetCourseList();
    }, [user]);

    return (
        <div className="space-y-8">
            {/* ----------- Header ---------- */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-5">
                <div>
                    <h2 className="font-bold text-3xl text-white flex items-center gap-2">
                        Explore Community Courses{" "}
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                    </h2>
                    <p className="text-slate-400 mt-2 text-lg">
                        Discover AI-generated curriculums created by other learners.
                    </p>
                </div>
            </div>

            {/* -------------- Search Bar --------------- */}
            <div className="relative max-w-xl group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl p-1">
                    <Search className="ml-3 text-slate-500 w-5 h-5" />
                    <Input
                        placeholder="Search for Python, React, Data Science..."
                        className="border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-slate-500 h-12"
                    />
                    <Button className="h-10 px-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-white/5 transition-all">
                        Search
                    </Button>
                </div>
            </div>

            {/* -------------- Grid Content ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {loading ? (
                    [0, 1, 2, 3, 4, 5].map((item, idx) => (
                        <div
                            key={idx}
                            className="h-[350px] rounded-2xl bg-slate-900/50 border border-white/5 p-4 space-y-4"
                        >
                            <Skeleton className="w-full h-[180px] rounded-xl bg-slate-800" />
                            <Skeleton className="w-3/4 h-6 bg-slate-800" />
                            <Skeleton className="w-full h-4 bg-slate-800" />
                            <Skeleton className="w-1/2 h-4 bg-slate-800" />
                        </div>
                    ))
                ) : courseList?.length > 0 ? (
                    courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-slate-500">
                        No courses found. Try a different search term.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Explore