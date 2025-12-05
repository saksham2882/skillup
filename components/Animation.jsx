/* eslint-disable react-hooks/set-state-in-effect */
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: delay * 0.1, ease: "easeOut" },
    }),
};

export const floatAnimation = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export const pulseAnimation = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.8, 0.5],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};


export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};


export const Slide = ({ children, className = "" }) => (
    <section className={`slide-container ${className}`}>
        {children}
    </section>
);


export const AnimatedSection = ({ children, className = "", delay = 0 }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        custom={delay}
        variants={fadeInUp}
        className={className}
    >
        {children}
    </motion.div>
);


// --------------- coming soon animation ----------
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 origin-left z-50 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
      style={{ scaleX }}
    />
  );
};

export const FloatingBackground = () => {
  const [particles, setParticles] = useState([]);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setParticles(
      [...Array(50)].map(() => ({
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 10,
      }))
    );
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-slate-950">
    {/* ---------- Grid ----------- */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

    {/* ------------ Snowfall Effect ----------- */}
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/50 shadow-sm shadow-white"
          style={{
            width: p.width + "px",
            height: p.height + "px",
            left: p.left + "%",
            top: -20,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: windowHeight + 100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>

    {/* ------ Glows ------ */}
    <motion.div
      animate={{
        x: [0, 50, 0],
        y: [0, -30, 0],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -50, 0],
        y: [0, 40, 0],
        opacity: [0.1, 0.25, 0.1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-700/10 rounded-full blur-[140px]"
    />
  </div>
  )
};