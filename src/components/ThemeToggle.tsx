// ThemeToggle.tsx
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

// Actual primary colors for each theme
const themeColors: Record<string, { primary: string; label: string }> = {
  a: { primary: "#3d8eff", label: "Blue" },
  b: { primary: "#ff7043", label: "Ember" },
  c: { primary: "#00a3c4", label: "Teal" },
  d: { primary: "#7743d8", label: "Violet" },
  e: { primary: "#00d2a2", label: "Emerald" },
};

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const themes = ["a", "b", "c", "d", "e"] as const;

  const crossfadeTo = (next: typeof themes[number]) => {
    // 1) capture current hero computed background (all layers resolved)
    const hero = document.querySelector<HTMLElement>(".bg-hero");
    const prevBg = hero ? getComputedStyle(hero).backgroundImage : "";

    // 2) stash it in a CSS var & flag crossfade
    const root = document.documentElement;
    root.style.setProperty("--hero-bg-prev", prevBg);
    root.classList.add("hero-xfade");

    // 3) switch theme (your existing logic)
    setTheme(next);
    setOpen(false);

    // 4) remove crossfade flag after the animation
    window.setTimeout(() => {
      root.classList.remove("hero-xfade");
      root.style.removeProperty("--hero-bg-prev");
    }, 600); // a bit > .55s animation
  };

  return (
    <div className="relative inline-block text-text">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="cursor-pointer select-none inline-flex items-center gap-2 rounded px-3 py-1.5 bg-secondary/70 hover:bg-secondary focus:outline-none anim-base hover-pop"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{compact ? "Theme" : "Toggle Theme"}</span>
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>

      <div
        className={`
          absolute top-full mt-2 z-[70] rounded-lg border border-secondary bg-bg/95 p-2 shadow-xl backdrop-blur
          left-4 right-4 mx-auto w-[calc(100vw-2rem)] max-w-[18rem]
          md:left-auto md:right-0 md:mx-0 md:w-44 md:max-w-none
          origin-top transition-[opacity,transform] duration-200 ease-out
          ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
        `}
      >
        <ul className="space-y-1" role="listbox">
          {themes.map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => crossfadeTo(t)}
                className={`w-full rounded px-3 py-2 text-left hover:bg-secondary/60 anim-base ${
                  theme === t ? "outline outline-1 outline-primary" : ""
                }`}
              >
                <span
                  className="mr-2 inline-block h-3 w-3 rounded-full align-middle"
                  style={{ background: themeColors[t].primary }}
                />
                {themeColors[t].label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
