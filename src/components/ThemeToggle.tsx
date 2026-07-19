import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Mode = "light" | "dark" | "system";

function applyTheme(mode: Mode) {
  const isDark =
    mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem("theme") as Mode) || "dark");

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const options: { mode: Mode; icon: JSX.Element; label: string }[] = [
    { mode: "light", icon: <Sun size={16} />, label: "Light mode" },
    { mode: "dark", icon: <Moon size={16} />, label: "Dark mode" },
    { mode: "system", icon: <Monitor size={16} />, label: "System theme" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-300 dark:border-slate-700 p-1 bg-white/60 dark:bg-slate-900/60">
      {options.map((o) => (
        <button
          key={o.mode}
          aria-label={o.label}
          onClick={() => setMode(o.mode)}
          className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
            mode === o.mode
              ? "bg-brand text-white"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}
