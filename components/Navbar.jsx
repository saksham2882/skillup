"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Brain, ExternalLink, Menu, X } from "lucide-react";
import { navItems } from "@/lib/landing-data";
import { useEffect, useState } from "react";
import { Button } from "./ui/landButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSlide = (index) => {
        const element = document.getElementById(`slide-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSlide(index);
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`nav-bar ${scrolled ? "nav-bar-scrolled" : "nav-bar-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div
                        className="flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer"
                        onClick={() => scrollToSlide(0)}
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                            className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20"
                        >
                            <Brain className="text-white w-6 h-6" />
                        </motion.div>
                        <span className="text-gradient-white">SkillUp AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <button
                                key={item}
                                onClick={() => scrollToSlide(index)}
                                className={`text-sm font-medium transition-colors hover:text-cyan-400 cursor-pointer relative group ${activeSlide === index ? "text-cyan-400" : "text-slate-400"
                                    }`}
                            >
                                {item}
                                {activeSlide === index && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                                    />
                                )}
                            </button>
                        ))}
                        <Link
                            href={'/coming-soon'}
                            className="px-3 py-1.5 text-sm font-normal text-cyan-200 rounded-full hover:text-white hover:bg-cyan-500/10 transition-all flex items-center gap-1"
                        >
                            <ExternalLink size={14} className="opacity-80 group-hover:opacity-100" />
                            Coming Soon
                        </Link>
                        <Button 
                            variant="primary" 
                            className="px-6! py-2! text-sm!"
                            onClick={() => router.push('/sign-in')}
                        >
                            Get Started
                        </Button>
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* ---------- Mobile Menu Overlay ----------- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => scrollToSlide(index)}
                                className="text-xl self-start ml-20 font-medium text-white hover:text-cyan-400 cursor-pointer"
                            >
                                {item}
                            </motion.button>
                        ))}
                        <div className="absolute bottom-16 w-full flex items-center justify-center flex-col gap-4">
                            <Link
                                href={'/coming-soon'}
                                className="px-3 py-2 text-sm font-normal text-cyan-200 rounded-full hover:text-white bg-cyan-500/10 transition-all flex items-center justify-center gap-1 w-[70%]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <ExternalLink size={14} className="opacity-80 group-hover:opacity-100" />
                                Coming Soon
                            </Link>
                            <Button 
                                variant="primary" 
                                className="px-6! py-2! text-sm! w-[70%] flex items-center justify-center"
                                onClick={() => router.push('/sign-in')}
                            >
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar