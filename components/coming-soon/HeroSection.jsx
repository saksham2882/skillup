"use client"

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg shadow-cyan-900/20 overflow-hidden cursor-default"
            >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <Sparkles className="w-4 h-4 animate-pulse" />
                V2.0 Roadmap
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-8xl font-black text-center text-white tracking-tight mb-8 leading-[1.1]"
            >
                The Next Evolution <br />

                <span className="relative">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-500 relative z-10">
                        of Learning
                    </span>
                    <motion.span
                        className="absolute inset-0 text-cyan-500/20 blur-lg z-0"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        of Learning
                    </motion.span>
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl text-center leading-relaxed"
            >
                We are crafting an intelligent ecosystem designed to adapt to your mind.
                <br className="hidden md:block" /> Experience learning that feels less like studying and more like upgrading.
            </motion.p>

            {/* --------- Scroll Mouse --------- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
                className="absolute bottom-10 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
                <div className="flex flex-col items-center gap-2 group">
                    <span className="text-xs text-slate-600 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                        Scroll
                    </span>
                    <div className="w-5 h-8 border-2 border-slate-700 group-hover:border-cyan-400 rounded-full flex justify-center p-1 transition-colors">
                        <div className="w-1 h-1.5 bg-slate-400 group-hover:bg-cyan-400 rounded-full transition-colors" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection