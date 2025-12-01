"use client"

import { pulseAnimation } from "@/components/Animation";
import { motion } from "framer-motion";

const BackgroundGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    <motion.div
      variants={pulseAnimation}
      animate="animate"
      className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[80px]"
    />
    <motion.div
      variants={pulseAnimation}
      animate="animate"
      transition={{ delay: 4 }}
      className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[80px]"
    />
  </div>
);


const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden font-sans">
      <BackgroundGrid />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Background