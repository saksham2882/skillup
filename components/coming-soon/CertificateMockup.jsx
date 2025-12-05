"use client"

import { useUser } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";


const CertificateMockup = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="relative aspect-16/10 bg-[#0F1623] border border-white/10 rounded-xl p-8 animate-pulse">
                <div className="h-6 w-24 bg-slate-700 rounded mb-4"></div>
                <div className="h-10 w-3/4 bg-slate-700 rounded mx-auto"></div>
            </div>
        );
    }
    

    const fullName = user?.fullName ?? "Alex Developer";
    
    const getTodayDate = () => {
      return new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };


    return (
        <div className="relative aspect-16/10 bg-[#0F1623] border border-white/10 rounded-xl p-8 flex flex-col justify-between shadow-2xl group overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:rotate-1">
        {/* ---------- Background ---------- */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full"></div>

        {/* --------- Header ----------- */}
        <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-linear-to-br from-cyan-400 to-blue-600 rounded"></div>
                <div className="text-lg font-bold text-white tracking-tight">
                    SkillUp AI
                </div>
            </div>

            <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={12} /> Verified
            </div>
        </div>

        {/* --------- Body -------- */}
        <div className="text-center relative z-10 py-6">
            <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">
                Certificate of Completion
            </div>

            <div className="text-3xl md:text-4xl font-serif text-white mb-4 drop-shadow-md">
                Advanced Neural Networks
            </div>
            <div className="w-12 h-1 bg-linear-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* -------- Footer --------- */}
        <div className="flex justify-between items-end border-t border-white/5 pt-6 relative z-10">
            <div>
                <div className="text-[10px] text-slate-500 uppercase">Presented To</div>
                <div className="text-white font-medium">
                    {fullName}
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase">Date Issued</div>
                <div className="text-white font-medium">{getTodayDate()}</div>
            </div>
        </div>

        {/* -------- Shine Effect --------- */}
        <div className="absolute -left-full top-0 w-[150%] h-full bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-in-out"></div>
    </div>
    )
};

export default CertificateMockup