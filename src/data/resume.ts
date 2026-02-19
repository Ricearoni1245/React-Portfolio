export type ResumeData = {
  contactInfo: {
    name?: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  skills: Array<{ category: string; items: string[] }>;
  certifications?: string[];
  projects?: Array<{ name: string; stack: string; bullets: string[] }>;
  accomplishments?: string[];
  workHistory: Array<{ title: string; company: string; location: string; dates: string; bullets?: string[] }>;
  education: Array<{ degree: string; school: string; date: string; details?: string }>;
};

export const resumeData: ResumeData = {
  contactInfo: {
    name: "Jody Holt",
    location: "Amarillo, TX",
    website: "https://www.jodyholt.com",
    linkedin: "https://www.linkedin.com/in/jody-holt-cis",
  },
  summary:
    "Detail-oriented software developer with experience building full-stack applications using React, TypeScript, SQL, Express, and Docker. Skilled in responsive UI, modular API design, and writing scalable code. Strong communicator known for learning new technologies quickly and solving problems efficiently.",
  skills: [
    { category: "Front End", items: ["React", "TypeScript", "JavaScript", "Responsive Design", "Component Architecture", "Vite"] },
    { category: "Back End", items: ["Node.js", "Express", "REST APIs", "Authentication", "Input Validation", "JWT"] },
    { category: "Database", items: ["SQL", "Prisma", "CRUD Operations", "Query Optimization", "Database Schema Design", "Data Modeling"] },
    { category: "Tools", items: ["Git/GitHub", "Docker", "Docker Compose", "Postman"] },
  ],
  certifications: [
    "Meta Front-End Developer Certificate (Coursera)",
    "Meta Data Engineering Certificate (Coursera)",
  ],
  projects: [
    {
      name: "SkyMoney Budgeting App (Beta)",
      stack: "React, TypeScript, Node.js, Prisma, PostgreSQL",
      bullets: [
        "Built a full-stack budgeting platform with 17 screens, reusable UI components, and 47 REST endpoints for income, transactions, variable categories, and payment plan automation.",
        "Implemented core budgeting logic including auto-funding, overdue prioritization, partial payments, and bill reconciliation workflows.",
        "Designed a relational database schema using 7 Prisma models with all writes scoped to user ID.",
        "Containerized the API, PostgreSQL, Caddy reverse proxy, and scheduled workers using Docker Compose for production-ready deployment.",
      ],
    },
    {
      name: "React Portfolio Website",
      stack: "React, TypeScript, Vite, Responsive UI",
      bullets: [
        "Built a single-page portfolio with 3 core sections and 7 reusable components, structured for expansion.",
        "Implemented interactive UI including a 5-theme color system, navigation, and mobile responsiveness.",
        "Organized code using TypeScript, reusable component patterns, and a custom theme hook.",
      ],
    },
  ],
  workHistory: [
    {
      title: "Sandwich Artist",
      company: "Subway",
      location: "Canyon, TX",
      dates: "Sep 2024 - Present",
      bullets: ["Maintained fast and accurate customer service by completing orders in a high-volume environment."],
    },
    {
      title: "Head Lifeguard (Seasonal)",
      company: "Johnson Park Youth Center",
      location: "Borger, TX",
      dates: "May 2022 - Aug 2025",
      bullets: ["Led safety operations by monitoring swimmers and enforcing policies during high-traffic shifts."],
    },
  ],
  education: [
    { degree: "B.B.A. Computer Information Systems", school: "West Texas A&M University", date: "May 2026", details: "GPA: 3.20/4.0" },
    { degree: "M.S. Computer Information Systems & Business Analytics", school: "West Texas A&M University", date: "May 2027" },
  ],
};
