"use client"

import { motion } from "framer-motion";

const FeatureSection = ({ title, desc, icon: Icon, align = "left", color = "cyan", children }) => {
    return (
        <section className="min-h-screen w-full flex items-center justify-center relative z-10 px-6 py-20 bg-linear-to-b from-transparent to-slate-950/20">
            <div
                className={`max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center ${
                    align === "right" ? "md:grid-flow-col-dense" : ""
                }`}
            >
                {/* ------- Text Content ----------- */}
                <motion.div
                    initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8 }}
                    className={align === "right" ? "md:col-start-2" : ""}
                >
                    <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-slate-900 border border-white/10 shadow-xl group`}
                    >
                        <Icon
                            size={28}
                            className={`${
                                color === "cyan" ? "text-cyan-400" :
                                color === "purple" ? "text-purple-400" :
                                color === "green" ? "text-green-400" :
                                "text-cyan-400"
                            } group-hover:scale-110 transition-transform duration-300`}
                        />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {title}
                    </h2>

                    <p className="text-lg text-slate-400 leading-relaxed mb-8">
                        {desc}
                    </p>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-1 rounded-full ${
                            color === "cyan" ? "bg-linear-to-r from-cyan-500 to-transparent" :
                            color === "purple" ? "bg-linear-to-r from-purple-500 to-transparent" :
                            color === "green" ? "bg-linear-to-r from-green-500 to-transparent" :
                            "bg-linear-to-r from-cyan-500 to-transparent"
                        }`}
                    />
                </motion.div>

                {/* ----------- Visual Content ---------- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    className={align === "right" ? "md:col-start-1" : ""}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default FeatureSection