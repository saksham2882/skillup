import { Sparkles } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <div className="relative p-8 rounded-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-violet-600 to-cyan-600 opacity-90 transition-opacity group-hover:opacity-100"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>

      <div className="relative z-10 flex flex-col gap-2">
        <h2 className="font-bold text-3xl text-white tracking-tight flex items-center gap-3">
          Welcome to SkillUp AI{" "}
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
        </h2>
        
        <p className="text-blue-100 text-lg max-w-xl">
          Ready to expand your knowledge graph? Create a new course or continue where you left off.
        </p>
      </div>

      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
    </div>
  );
}


export default WelcomeBanner