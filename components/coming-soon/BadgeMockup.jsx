import { motion } from "framer-motion";
import { Award } from "lucide-react";

const BadgeMockup = () => (
    <div className="relative flex justify-center py-10">
        <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full" />

        <motion.div
            whileHover={{ scale: 1.05, rotateX: 5 }}
            className="relative w-72 bg-linear-to-b from-slate-900 to-[#0B1120] border border-white/10 rounded-4xl p-8 shadow-2xl flex flex-col items-center text-center z-10 group"
        >
            <div className="absolute inset-0 rounded-4xl border border-yellow-500/20 pointer-events-none group-hover:border-yellow-500/40 transition-colors"></div>

            <div className="w-28 h-28 bg-linear-to-br from-yellow-900/20 to-slate-900 rounded-full flex items-center justify-center mb-8 relative group-hover:rotate-12 transition-transform duration-500">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                <Award
                    size={56}
                    className="text-yellow-400 relative z-10 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Prompt Master
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Awarded for achieving 95% accuracy in advanced engineering simulations.
            </p>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="w-full h-full bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>
            
            <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">
                Level 50 • Maxed Out
            </div>
        </motion.div>
    </div>
);

export default BadgeMockup