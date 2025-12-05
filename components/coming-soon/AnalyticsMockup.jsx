"use client"

import { animate, motion, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import React from "react";

const AnalyticsMockup = () => {
    const Counter = ({ from, to }) => {
        const nodeRef = React.useRef();
        const isInView = useInView(nodeRef, { once: true });

        React.useEffect(() => {
            if (isInView) {
                const node = nodeRef.current;
                const controls = animate(from, to, {
                    duration: 2,
                    onUpdate(value) {
                        node.textContent = `+${Math.round(value)}%`;
                    },
                });
                return () => controls.stop();
            }
        }, [from, to, isInView]);

        return <span ref={nodeRef} />;
    };

    return (
        <div className="relative bg-[#0B1120] border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
            {/* ---------- Glow effect ---------- */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                    <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                        Knowledge Growth
                    </div>

                    <div className="text-4xl font-bold text-white tracking-tight">
                        <Counter from={0} to={124} />
                        <span className="text-sm text-slate-500 font-normal ml-2">
                            vs last month
                        </span>
                    </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-purple-400">
                    <TrendingUp size={20} />
                </div>
            </div>

            {/* ---------- Chart Bars ---------- */}
            <div className="flex items-end gap-3 h-48 relative z-10">
                {[35, 55, 45, 70, 60, 85, 95].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                        className="flex-1 bg-slate-800 rounded-t-lg relative group/bar overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-purple-600 to-indigo-500 opacity-60 group-hover/bar:opacity-100 transition-opacity"></div>
                    </motion.div>
                ))}
            </div>

            {/* --------- Grid lines --------- */}
            <div className="absolute inset-0 z-0 flex flex-col justify-end pb-8 px-8">
                <div className="w-full h-px bg-white/5 mb-12"></div>
                <div className="w-full h-px bg-white/5 mb-12"></div>
                <div className="w-full h-px bg-white/5 mb-12"></div>
            </div>
        </div>
    );
};


export default AnalyticsMockup