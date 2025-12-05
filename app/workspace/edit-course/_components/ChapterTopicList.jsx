import { CheckCircle2, Clock, Gift, Layers } from "lucide-react";

const ChapterTopicList = ({ course }) => {
    const courseLayout = course?.courseJson?.course;

    return (
        <div className="mt-12 max-w-5xl mx-auto">
            <h2 className="font-bold text-3xl text-white mb-8 flex items-center gap-3">
                <Layers className="text-cyan-400" /> Curriculum Roadmap
            </h2>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                {courseLayout?.chapters.map((chapter, index) => (
                    <div
                        key={index}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 group-hover:bg-cyan-600 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-slate-900 z-10 text-white font-bold text-sm">
                            {index + 1}
                        </div>

                        {/* ------------- Content Card -------------- */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all shadow-xl backdrop-blur-sm">
                            <div className="flex flex-col gap-1 mb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-xl text-white">
                                        {chapter.chapterName}
                                    </h3>
                                    <span className="text-xs font-medium text-slate-400 bg-slate-950 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                                        <Clock size={12} /> {chapter.duration}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {chapter.topics.map((topic, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-slate-400 group/topic"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-cyan-500/50 mt-0.5 group-hover/topic:text-cyan-400 transition-colors" />
                                        <span className="group-hover/topic:text-slate-200 transition-colors">
                                            {topic}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 font-bold tracking-wide">
                    <Gift size={20} /> Certificate of Completion
                </div>
            </div>
        </div>
    );
};

export default ChapterTopicList;
