import { resumeData } from "../data/resume";

export function Resume() {
  const { contactInfo, summary, skills, certifications, projects, workHistory, education } = resumeData;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-10 text-center anim-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold font-title text-text mb-3">Resume</h2>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-text/70">
          <span>{contactInfo.location}</span>
          {contactInfo.website && (
            <>
              <span className="hidden sm:inline text-primary">•</span>
              <a href={contactInfo.website} className="hover:text-primary anim-base">
                {new URL(contactInfo.website).hostname}
              </a>
            </>
          )}
          {contactInfo.linkedin && (
            <>
              <span className="hidden sm:inline text-primary">•</span>
              <a href={contactInfo.linkedin} className="hover:text-primary anim-base">
                LinkedIn
              </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <section className="mb-10 anim-fade-in">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-text/85 leading-relaxed">{summary}</p>
      </section>

      {/* Skills */}
      <section className="mb-10 anim-fade-in">
        <SectionTitle>Skills & Strengths</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="rounded-xl border border-secondary bg-secondary/20 p-4 anim-base hover:border-primary/50"
            >
              <h4 className="font-semibold text-primary mb-2 font-title">{skill.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block rounded-full bg-secondary/60 px-3 py-1 text-xs text-text/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-10 anim-fade-in">
          <SectionTitle>Certifications</SectionTitle>
          <ul className="space-y-3">
            {certifications.map((item, i) => (
              <li key={i} className="flex gap-3 text-text/85">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-10 anim-fade-in">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-lg border border-secondary bg-secondary/20 p-4 anim-base hover:border-primary/50"
              >
                <h4 className="font-semibold text-text">
                  {project.name} <span className="text-text/70">| {project.stack}</span>
                </h4>
                <ul className="mt-2 space-y-2">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-text/85">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work History */}
      <section className="mb-10 anim-fade-in">
        <SectionTitle>Work History</SectionTitle>
        <div className="space-y-4">
          {workHistory.map((job, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg border border-secondary bg-secondary/20 p-4 anim-base hover:border-primary/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-semibold text-text">{job.title}</h4>
                  <p className="text-text/70 text-sm">
                    {job.company} — {job.location}
                  </p>
                </div>
                <span className="mt-2 sm:mt-0 text-sm text-primary font-medium">{job.dates}</span>
              </div>
              {job.bullets && job.bullets.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {job.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3 text-text/85">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="anim-fade-in">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-secondary bg-secondary/20 p-4 anim-base hover:border-primary/50"
            >
              <div>
                <h4 className="font-semibold text-text">{edu.degree}</h4>
                <p className="text-text/70 text-sm">
                  {edu.school}
                  {edu.details ? ` | ${edu.details}` : ""}
                </p>
              </div>
              <span className="mt-2 sm:mt-0 text-sm text-primary font-medium">{edu.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-bold font-title text-text">{children}</h3>
      <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
    </div>
  );
}
