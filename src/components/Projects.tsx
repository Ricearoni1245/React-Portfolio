import { useState, useEffect } from "react";
import skymoneycover from "../assets/img/Skymoney-cover-img.jpg";
import skymoneycoverMobile from "../assets/img/skymoney-mobile-cover-img.jpg";
import millercover from "../assets/img/500nmain-cover-img.jpg";
import millercoverMobile from "../assets/img/500nmain-mobile-cover-img.jpg";
import skymoneyvideo from "../assets/video/Skymoney-video.mp4";
import skymoneyvideoMobile from "../assets/video/Skymoney-mobile-video.mp4";
import millervideo from "../assets/video/500nmain-video.mp4";
import millervideoMobile from "../assets/video/500nmain-mobile-video.mp4";

type Project = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  coverImageMobile: string;
  video: string;
  videoMobile: string;
  techStack: string[];
  liveUrl?: string;
  beta?: boolean;
  note?: string;
  comingSoon?: boolean;
};

const projects: Project[] = [
  {
    id: "skymoney",
    title: "SkyMoney",
    description:
      "A budgeting app that simulates your bank account to ensure financial discipline.",
    coverImage: skymoneycover,
    coverImageMobile: skymoneycoverMobile,
    video: skymoneyvideo,
    videoMobile: skymoneyvideoMobile,
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    liveUrl: "https://skymoneybudget.com",
    beta: true,
    note: "Contact Jody for beta access.",
  },
  {
    id: "miller-building",
    title: "Miller Building Website",
    description:
      "A website showcasing the historic Miller Building located in Borger, Texas.",
    coverImage: millercover,
    coverImageMobile: millercoverMobile,
    video: millervideo,
    videoMobile: millervideoMobile,
    techStack: ["HTML", "CSS", "JQuery"],
    liveUrl: "https://500nmain806.com",
  },
];

function VideoModal({
  isOpen,
  onClose,
  video,
  videoMobile,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  video: string;
  videoMobile: string;
  title: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm anim-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-bg rounded-2xl overflow-hidden shadow-2xl border border-secondary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary">
          <h3 className="text-xl font-bold text-text">{title} Demo</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/50 text-text/70 hover:text-text anim-base"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={isMobile ? "aspect-[9/16] bg-black" : "aspect-video bg-black"}>
          <video
            src={isMobile ? videoMobile : video}
            controls
            autoPlay
            muted
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onPlayVideo,
}: {
  project: Project;
  onPlayVideo: () => void;
}) {
  return (
    <div className="group relative rounded-2xl border border-secondary bg-secondary/20 overflow-hidden hover:border-primary/50 anim-base hover-pop">
      {/* Cover Image - Desktop */}
      <div className="relative aspect-video overflow-hidden hidden md:block">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 anim-base"
        />
        {/* Play Button Overlay */}
        <button
          onClick={onPlayVideo}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 anim-base"
          aria-label={`Play ${project.title} demo video`}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 text-white hover:bg-primary hover:scale-110 anim-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </button>
        {/* Beta Badge */}
        {project.beta && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
            Beta
          </div>
        )}
      </div>

      {/* Cover Image - Mobile */}
      <div className="relative aspect-[9/16] overflow-hidden md:hidden mx-4 my-4 rounded-xl">
        <img
          src={project.coverImageMobile}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 anim-base"
        />
        {/* Play Button Overlay */}
        <button
          onClick={onPlayVideo}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 anim-base"
          aria-label={`Play ${project.title} demo video`}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 text-white hover:bg-primary hover:scale-110 anim-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </button>
        {/* Beta Badge */}
        {project.beta && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
            Beta
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
        <p className="text-text/70 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        {project.note && (
          <p className="text-text/60 text-xs mb-4">{project.note}</p>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-text/80 border border-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPlayVideo}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 anim-base text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30 text-text border border-secondary hover:border-primary hover:text-primary anim-base text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function MoreToComCard() {
  return (
    <div className="relative rounded-2xl border border-dashed border-secondary bg-secondary/10 overflow-hidden flex items-center justify-center min-h-[300px]">
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text/50"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text/70 mb-2">More to Come</h3>
        <p className="text-text/50 text-sm">
          Exciting projects in development. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-4 font-title">
          Projects
        </h2>
        <p className="text-text/70 max-w-2xl mx-auto">
          A showcase of my work — from concept to deployment. Click on any
          project to watch a demo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onPlayVideo={() => setActiveVideo(project)}
          />
        ))}
        <MoreToComCard />
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        video={activeVideo?.video || ""}
        videoMobile={activeVideo?.videoMobile || ""}
        title={activeVideo?.title || ""}
      />
    </div>
  );
}
