"use client"

import { ArrowLeft, Bell, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";


const JoinMockup = () => {
    const [email, setEmail] = useState("");
    const [notified, setNotified] = useState(false);

    const handleNotify = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        setNotified(true);
        toast.success("You’re officially in! 🎉");
    };
    
    return (
        <div>
            <section className="h-[80vh] w-full flex flex-col items-center justify-center relative z-10 px-6">
                <div className="bg-slate-900/50 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 text-center shadow-2xl max-w-4xl w-full relative overflow-hidden group">
                    {/* Ambient Shine */}
                    <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 to-transparent pointer-events-none group-hover:from-cyan-500/30 transition-colors duration-500"></div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Get Early Access
                    </h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                        Be the first to experience the new era of SkillUp AI. <br />
                        Early access members get exclusive offers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                        <div className="relative flex-1">
                            <Bell className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <Input
                                type="email"
                                placeholder={
                                    notified ? "You're all set!" : "Enter email address"
                                }
                                disabled={notified}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-950 border-white/10 h-12 pl-12 rounded-xl text-white focus-visible:ring-cyan-500 transition-all focus:bg-slate-900"
                            />
                        </div>
                        <Button
                            onClick={handleNotify}
                            disabled={notified}
                            className={`h-12 px-8 rounded-xl font-bold text-lg transition-all shadow-md shadow-cyan-900/30 cursor-pointer ${notified
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-linear-to-b from-cyan-400 to-cyan-950 text-slate-950 hover:scale-102 active:scale-97"
                                }`}
                        >
                            {notified ? <CheckCircle2 size={24} className="mx-4" /> : "Alert me"}
                        </Button>
                    </div>
                </div>

                <Link
                    href="/workspace"
                    className="mt-12 text-slate-500 hover:text-white flex items-center gap-2 transition-colors group hover:underline underline-offset-4"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                    Return to Dashboard
                </Link>
            </section>
        </div>
    );
}
export default JoinMockup