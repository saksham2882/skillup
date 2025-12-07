"use client"

import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "./Animation";
import { motion } from "framer-motion";
import { Plans } from "@/lib/landing-data";
import { Button } from "./ui/landButton";
import { useRouter } from "next/navigation";

const Pricing = () => {
    const router = useRouter()

    return (
        <div id="slide-4">
            <section className="bg-pricing min-h-screen w-full relative overflow-hidden flex flex-col justify-between">
                <div className="container mx-auto px-6 py-24 grow flex flex-col justify-center">

                    <AnimatedSection>
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-10 -tracking-tight leading-16">
                                Ready to Upgrade Your <br />
                                <span className="text-cyan-400">Neural Network?</span>
                            </h2>
                            <p className="text-lg text-slate-300 mb-14">
                                Start your adaptive learning journey today. No credit card required for the trial.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">

                        {/* ----------- Free Plan ------------ */}
                        <AnimatedSection delay={2} className="h-full">
                            <div className="p-8 h-full rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col items-center">
                                <span className="text-slate-400 font-bold tracking-widest uppercase text-sm mb-4">
                                    starter
                                </span>
                                <div className="text-4xl font-bold text-white mb-2">Free</div>
                                <p className="text-slate-400 mb-8 text-center">
                                    Perfect for trying out the AI engine.
                                </p>
                                <ul className="space-y-4 mb-8 text-slate-300 w-full grow">
                                    {Plans[0].map((plan, idx) => (
                                        <li className="flex items-center gap-3" key={idx}>
                                            <CheckCircle size={18} className="text-slate-600" />
                                            {plan}
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-center"
                                    onClick={() => router.push('/sign-in')}
                                >
                                    Start Free
                                </Button>
                            </div>
                        </AnimatedSection>


                        {/* --------- Starter Plan ------------ */}
                        <AnimatedSection delay={4} className="h-full">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative p-8 h-full rounded-3xl bg-linear-to-b from-slate-800 to-slate-900 border border-cyan-500/30 flex flex-col items-center shadow-2xl shadow-cyan-900/20 hover:shadow-cyan-900/60 transform md:-translate-y-4 transition-all duration-300"
                            >
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Most Popular
                                </div>
                                <span className="text-cyan-400 font-bold tracking-widest uppercase text-lg mb-4">
                                    Pro
                                </span>
                                <div className="text-4xl font-bold text-white mb-2">
                                    $6
                                    <span className="text-lg text-slate-500 font-normal">
                                        /mo
                                    </span>
                                </div>
                                <p className="text-slate-400 mb-8 text-center">
                                    Unlimited access to the full AI suite.
                                </p>
                                <ul className="space-y-4 mb-8 text-slate-300 w-full grow">
                                    {Plans[1].map((plan, idx) => (
                                        <li className="flex items-center gap-3" key={idx}>
                                            <CheckCircle size={18} className="text-cyan-400" /> {plan}
                                        </li>
                                    ))}
                                </ul>

                                <Button 
                                    className="w-full justify-center"
                                    onClick={() => router.push('/workspace/billing')}
                                >
                                    Get Access
                                </Button>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Pricing