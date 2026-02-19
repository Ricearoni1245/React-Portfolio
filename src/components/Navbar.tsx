import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Intro" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (id: string) => {
    onNav(id);
    setOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-secondary bg-bg/90 
                        backdrop-blur h-16 md:h-20 font-main w-full anim-fade-in"
    >
      <div
        className="flex h-full w-full items-center justify-between px-4 sm:px-6 
                      md:px-10 lg:px-16"
      >
        <div className="flex items-center gap-3 hover-pop anim-base select-none">
          <div className="leading-tight">
            <div
              className="text-xl md:text-2xl font-extrabold font-name tracking-wide 
                            text-text"
            >
              Jody Holt
            </div>
            <div className="text-[11px] md:text-sm text-text/70">
              Passion Pioneer
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              className="text-text/90 hover:text-primary anim-base hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
              onClick={() => handleNav(l.id)}
            >
              {l.label}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        <div className="md:hidden">
          <button
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded px-3 py-2 text-text hover:bg-secondary/60"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
          open
            ? "max-h-96 overflow-visible opacity-100 translate-y-0"
            : "max-h-0 overflow-hidden opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-2 border-t border-secondary bg-bg px-4 py-3">
          {links.map((l) => (
            <button
              key={l.id}
              className="block w-full rounded px-3 py-2 text-left text-text hover:bg-secondary/60 hover:text-primary anim-base"
              onClick={() => handleNav(l.id)}
            >
              {l.label}
            </button>
          ))}
          <div className="pt-2">
            <ThemeToggle compact />{" "}
          </div>
        </div>
      </div>
    </header>
  );
}
