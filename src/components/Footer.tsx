import githubIcon from "../assets/img/github-icon.png";
import linkedInIcon from "../assets/img/linkedin-icon.png";
import facebookIcon from "../assets/img/facebook-icon.png";

const defaultSocials = [
  { label: "GitHub", href: "https://github.com/Ricearoni1245", icon: githubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jody-holt-9b19b0256", icon: linkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/jody.holt.7161/", icon: facebookIcon },
];

type Social = { label: string; href: string; icon?: string };

export function Footer({
  year = new Date().getFullYear(),
  socials = defaultSocials,
  showBackToTop = true,
}: {
  year?: number;
  socials?: Social[];
  showBackToTop?: boolean;
}) {
  return (
    <footer className="border-t border-secondary bg-bg px-4 py-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 md:grid md:grid-cols-3 md:items-end">
        <div className="text-center md:text-left">
          <div className="text-xl md:text-2xl font-extrabold font-name tracking-wide text-text">
            Jody Holt
          </div>
          <div className="text-[11px] md:text-sm text-text/70">
            Passion Pioneer
          </div>
        </div>

        <nav className="flex items-center gap-5 md:justify-center">
            <button
              className="text-text hover:text-primary anim-base"
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            >
              Background
            </button>
            <button
              className="text-text hover:text-primary anim-base"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Projects
            </button>
            <button
              className="text-text hover:text-primary anim-base"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              Experience
            </button>
            <button
              className="text-text hover:text-primary anim-base"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4 text-text md:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-secondary hover:border-primary hover:text-primary anim-base"
                title={s.label}
              >
                {s.icon ? (
                  <img src={s.icon} alt={s.label} className="h-5 w-5 invert brightness-0 invert opacity-80" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-current" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-center gap-4">
          <div className="text-center text-xs text-text/60">
            © {year} Jody Holt • All rights reserved
          </div>
          {showBackToTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded px-3 py-1 text-xs text-text/70 hover:text-primary border border-secondary hover:border-primary"
            >
              Back to top
            </button>
          )}
        </div>
        <div className="mx-auto mt-4 max-w-7xl text-center text-[10px] text-text/40">
          Icons by{" "}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary anim-base underline"
          >
            Icons8
          </a>
        </div>
    </footer>
  );
}
