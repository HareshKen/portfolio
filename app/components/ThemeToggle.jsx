"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null; // prevent hydration mismatch

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-3 rounded-xl bg-zinc-800/80 dark:bg-zinc-200/90 text-yellow-400 dark:text-zinc-800 hover:scale-110 hover:bg-zinc-700/80 dark:hover:bg-zinc-100 transition-all duration-300 shadow-lg backdrop-blur-sm border border-zinc-600/50 dark:border-zinc-300/50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="animate-pulse" />
      ) : (
        <Moon size={20} className="animate-pulse" />
      )}
    </button>
  );
}