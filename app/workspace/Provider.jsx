"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";

const WorkspaceProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <div className="w-full">
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-6 md:p-10  text-white scrollbar-hide">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceProvider;
