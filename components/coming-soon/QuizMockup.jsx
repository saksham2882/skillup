/* eslint-disable react/no-unescaped-entities */
"use client"

import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const QuizMockup = () => {
    const [selected, setSelected] = useState(null);
    const correct = 1;

    return (
        <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 w-full max-w-md mx-auto hover:border-green-500/20 transition-colors">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-green-500 rounded-b-lg shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>

            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Question 3 of 10</span>
                <span className="text-green-400 font-bold bg-green-500/10 px-2 py-1 rounded">
                    Hard
                </span>
            </div>

            <div className="text-white text-lg font-medium leading-snug">
                "Which cybersecurity technique is commonly used to detect unauthorized access attempts in a network?"
            </div>

            <div className="space-y-3">
                {[
                    { label: "A", text: "Data Normalization" },
                    { label: "B", text: "Intrusion Detection System (IDS)" },
                    { label: "C", text: "Network Load Balancing" },
                ].map((option, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === correct;
                    let stateClass = "bg-slate-950 border-white/5 hover:bg-slate-800";

                    if (selected !== null) {
                        if (isCorrect)
                            stateClass = "bg-green-500/10 border-green-500/50 text-green-400";
                        else if (isSelected && !isCorrect)
                            stateClass = "bg-red-500/10 border-red-500/50 text-red-400";
                        else stateClass = "bg-slate-950 border-white/5 opacity-50";
                    }

                    return (
                        <div
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${stateClass}`}
                        >
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${selected !== null && isCorrect
                                        ? "bg-green-500 text-white"
                                        : selected === i && !isCorrect ? "bg-red-500 text-white" : "bg-slate-800 text-slate-400"
                                    }`}
                            >
                                {option.label}
                            </div>

                            <span
                                className={ selected !== null && isCorrect ? "text-green-400" : "text-slate-300"}
                            >
                                {option.text}
                            </span>

                            {selected !== null && isCorrect && (
                                <CheckCircle2 className="ml-auto text-green-500 w-5 h-5 animate-in zoom-in" />
                            )}
                            {selected === i && !isCorrect && (
                                <XCircle className="ml-auto text-red-500 w-5 h-5 animate-in zoom-in" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizMockup