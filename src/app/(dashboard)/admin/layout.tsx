import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex min-h-[calc(100vh-4rem)] bg-[#0B0B12]">
      <Suspense fallback={<div className="w-64 border-r border-[#232336] bg-[#0E0E15]" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        <Suspense fallback={<div className="text-xs text-[#94A3B8] p-8">Loading console...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
