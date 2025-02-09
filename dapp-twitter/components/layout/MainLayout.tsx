import type React from "react";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex justify-center">
        <main className="w-full max-w-2xl min-h-screen border-r">{children}</main>
      </div>
      <RightSidebar />
    </div>
  );
}