"use client"

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Book,
  Compass,
  GiftIcon,
  LayoutDashboard,
  Sparkles,
  UserCircle2Icon,
  WalletCards,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";
import { motion } from "framer-motion";

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-learning",
  },
  {
    title: "Community Courses",
    icon: Compass,
    path: "/workspace/explore",
  },
  { title: "Analytics", 
    icon: BarChart3, 
    path: "/coming-soon" 
  },
  {
    title: "Rewards & More",
    icon: GiftIcon,
    path: "/coming-soon",
  },
  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircle2Icon,
    path: "/workspace/profile",
  },
];

const AppSidebar = () => {
  const path = usePathname()

  const isActive = (itemPath) => {
    if (itemPath === "/workspace") {
      return path === "/workspace";
    }
    return path === itemPath || path.startsWith(itemPath + "/");
  }

  return (
    <Sidebar className="border-r border-white/5 bg-slate-950">
      {/* -------- Header -------- */}
      <SidebarHeader className="p-6 pb-2">
        <Link href="/workspace" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="text-white w-6 h-6" />
          </div>

          <span className="font-bold text-xl text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            SkillUp AI
          </span>
        </Link>
      </SidebarHeader>

      {/* --------- Main Content ------------- */}
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className="w-full btn-primary font-semibold tracking-wide">
              <Zap className="w-4 h-4 mr-2" /> Create New Course
            </Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <div className="h-4" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {SideBarOptions.map((item, index) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className="p-0 overflow-hidden rounded-xl"
                    >
                      <Link
                        href={item.path}
                        className={`
                          relative flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all duration-300
                          ${active
                            ? "text-cyan-400 bg-cyan-950/30"
                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                          }
                        `}
                      >
                        {active && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-r-full"
                          />
                        )}
                        <item.icon
                          className={`h-5 w-5 ${active ? "text-cyan-400" : "text-slate-500"
                            }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* -------- Footer ----------- */}
      <SidebarFooter className="p-6 border-t border-white/5">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
          <h4 className="text-xs font-semibold text-slate-300 mb-1">
            Subscribe Pro Plan
          </h4>
          <p className="text-[10px] text-slate-500 mb-3">to get Unlimited AI use</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
