"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-[#232336] bg-[#151520] flex items-center justify-center opacity-60 ${className || ""}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-9 h-9 rounded-xl border border-[#232336] bg-[#151520] hover:bg-[#1F1F26] hover:border-[#363654] flex items-center justify-center transition-all duration-200 text-[#94A3B8] hover:text-[#F5F3FF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 cursor-pointer ${className || ""}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-[#C4B5FD] transition-transform hover:scale-110" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 transition-transform hover:scale-110" />
      )}
    </button>
  );
}
