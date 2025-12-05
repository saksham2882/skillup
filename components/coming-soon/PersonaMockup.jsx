import { motion } from "framer-motion";

const PersonaMockup = () => (
    <div className="flex flex-col gap-5 max-w-sm mx-auto relative">
        <div className="absolute -left-10 -top-10 w-full h-full bg-pink-500/5 blur-[60px] pointer-events-none"></div>

        {/* --------- Chat Bubble 1 ---------- */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 items-end"
        >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-pink-900/20 shrink-0">
                AI
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl rounded-bl-none border border-white/5 text-slate-200 text-sm shadow-xl">
                <p className="font-semibold text-pink-400 text-xs mb-2 uppercase tracking-wide">
                    Socrates Mode
                </p>
                To understand recursion, first tell me: what happens when you stand between two mirrors?
            </div>
        </motion.div>

        {/* --------- Chat Bubble 2 --------- */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 items-end flex-row-reverse"
        >
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-slate-400 text-xs shrink-0">
                Me
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl rounded-br-none border border-white/10 text-slate-300 text-sm">
                I see infinite reflections of myself, getting smaller.
            </div>
        </motion.div>

        {/* -------- Chat Bubble 3 --------- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="flex gap-4 items-end"
        >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0">
                AI
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl rounded-bl-none border border-pink-500/20 text-slate-200 text-sm shadow-xl shadow-pink-900/10">
                <div className="flex gap-1 mb-2">
                    <span
                        className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                    ></span>
                    <span
                        className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                        className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    ></span>
                </div>
                Precisely. Each reflection is a function calling itself.
            </div>
        </motion.div>
    </div>
);

export default PersonaMockup