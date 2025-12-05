import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const AppHeader = ({ hideSidebar = false, className }) => {
  return (
    <div className={`p-4 flex justify-between items-center glass-header sticky top-0 z-40 shadow-sm shadow-cyan-700/10 ${className}`}>
      {!hideSidebar && (
        <SidebarTrigger className="text-slate-400 hover:text-cyan-400 transition-colors" />
      )}
      
      <div className="flex items-center gap-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 border-2 border-cyan-500/20",
            },
          }}
        />
      </div>
    </div>
  );
}
export default AppHeader