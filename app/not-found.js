import { Button } from "@/components/ui/button";
import { Home, Search, HelpCircle, Brain, AlertCircle } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-slate-950 relative flex items-center justify-center overflow-hidden font-sans selection:bg-cyan-500 selection:text-white">

            {/* --------- Background Effects -------- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* ----------- Grid ---------- */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* ----------- Glows ---------- */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            {/* --------- Main -------- */}
            <div className="relative z-10 max-w-2xl w-full px-6 text-center">

                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-b from-slate-800 to-slate-950 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-float">
                            <AlertCircle className="w-16 h-16 text-cyan-400" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6 -mt-8 relative z-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Page Not Found
                    </h2>

                    <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                        The learning path you are looking for seems to have vanished into the void. It might have been moved, deleted, or never existed in this dimension.
                    </p>

                    {/* ----------- Buttons ----------- */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link href="/workspace">
                            <Button className="h-12 px-8 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 rounded-full font-semibold shadow-lg shadow-cyan-900/20 transition-all hover:scale-105 cursor-pointer">
                                <Home className="w-4 h-4 mr-2" /> 
                                Return to Home
                            </Button>
                        </Link>

                        <Link href="/workspace/explore">
                            <Button variant="outline" className="h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all hover:scale-105 cursor-pointer">
                                <Search className="w-4 h-4 mr-2" /> 
                                Explore Courses
                            </Button>
                        </Link>
                    </div>

                    {/* ------------- Footer ----------- */}
                    <div className="pt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
                        <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" /> 
                            Help Center
                        </Link>
                        <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                        <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                            <Brain className="w-4 h-4" /> 
                            System Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}