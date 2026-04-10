"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Code2,
  Briefcase,
  GraduationCap,
  User,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Globe,
  Database,
  Server,
  Layers3,
} from "lucide-react";

const projects = [
  {
    title: "p1",
    category: "Real World",
    description: "p1",
    stack: ["x", "y", "z"],
    github: "#",
    live: "#",
  },
  {
    title: "Forgotten Recipes",
    category: "Academic",
    description: "A MERN-based interactive platform to preserve, promote, and personalize Sri Lanka's ancient culinary heritage - with modern health tools and cultural storytelling.",
    stack: ["Mongodb", "Express.js", "React.js", "Node.js"],
    github: "https://github.com/madhukavirajith/Forgotten-Recipes.git",
    live: "https://forgotten-recipes.vercel.app/",
    media: "/projects/forgotten-recipes.mp4", // Use MP4 for better performance
    mediaType: "video",
    },
  {
    title: "Portfolio Website",
    category: "Personal",
    description: "Modern developer portfolio built with Next.js with smooth animations and responsive design.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/madhukavirajith/madhuka-portfolio.git",
    live: "https://www.madhukavirajith.com/",
    media: "/projects/portfolio-website.mp4", // Add your screenshot/video here
    mediaType: "video",
  },
];

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Java", "REST APIs"],
  database: ["MongoDB", "MySQL"],
  tools: ["Git", "GitHub", "Figma", "Vercel"],
};

const experiences = [
  {
    title: "BSc (Hons) Computer Software Engineering",
    org: "Cardiff Metropolitan University",
    period: "Nov 2025 — Present",
    desc: "Currently pursuing a bachelor's degree in Computer Software Engineering with a focus on software development, programming, and modern engineering practices.",
  },
  {
    title: "Higher Diploma in Computing and Software Engineering",
    org: "Cardiff Metropolitan University",
    period: "Jan 2024 — Nov 2025",
    desc: "Completed the Higher Diploma with Merit",
  },
];

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-300">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 backdrop-blur-sm">
      {children}
    </span>
  );
}

// Project Media Component - handles both images, GIFs, and videos
function ProjectMedia({ project, theme }: { project: any; theme: any }) {
  const [mediaError, setMediaError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!project.media || mediaError) {
    // Fallback gradient if media fails to load
    return (
      <div className="h-56 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-fuchsia-500/20 flex items-center justify-center">
        <div className="text-center">
          <Code2 className="h-10 w-10 text-cyan-400/50 mx-auto mb-2" />
          <p className="text-sm text-slate-400">{project.title}</p>
        </div>
      </div>
    );
  }

  // For video files (MP4, WebM)
  if (project.mediaType === "video" || project.media.endsWith('.mp4') || project.media.endsWith('.webm')) {
    return (
      <div 
        className="relative h-56 overflow-hidden bg-black/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          poster={project.poster}
          onError={() => setMediaError(true)}
        >
          <source src={project.media} type={`video/${project.media.endsWith('.webm') ? 'webm' : 'mp4'}`} />
        </video>
        
        {/* Optional: Play indicator on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // For GIF files
  if (project.media.endsWith('.gif')) {
    return (
      <div className="relative h-56 overflow-hidden bg-black/40">
        <img
          src={project.media}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setMediaError(true)}
        />
      </div>
    );
  }

  // For static images (PNG, JPG, JPEG, WebP)
  return (
    <div className="relative h-56 overflow-hidden bg-black/40">
      <img
        src={project.media}
        alt={project.title}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => setMediaError(true)}
      />
    </div>
  );
}

export default function MadhukaPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const theme = darkMode
    ? {
        bg: "bg-[#030712]",
        panel: "bg-white/5",
        card: "bg-white/5",
        text: "text-slate-100",
        sub: "text-slate-300",
        border: "border-white/10",
      }
    : {
        bg: "bg-slate-100",
        panel: "bg-white/80",
        card: "bg-white/80",
        text: "text-slate-900",
        sub: "text-slate-600",
        border: "border-slate-200",
      };

  return (
    <div className={`${theme.bg} min-h-screen overflow-x-hidden transition-colors duration-300`}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className={`text-lg font-semibold ${theme.text}`}>
            Madhuka<span className="text-cyan-400">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm transition hover:text-cyan-400 ${theme.sub}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`rounded-full border ${theme.border} ${theme.panel} p-2 ${theme.text}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`rounded-full border ${theme.border} ${theme.panel} p-2 md:hidden ${theme.text}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className={`${theme.sub} transition hover:text-cyan-400`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Available for internships and graduate opportunities
              </div>

              <h1 className={`max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl ${theme.text}`}>
                Hi, I&apos;m <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Madhuka Virajith</span>
              </h1>

              <p className={`mt-6 max-w-2xl text-lg leading-8 ${theme.sub}`}>
                Final Year Software Engineering Undergraduate building elegant, scalable, and high-performance digital products. I create modern full-stack applications with strong focus on user experience, clean architecture, and real-world impact.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Chip>Full-Stack Developer</Chip>
                <Chip>UI-Focused Engineer</Chip>
                <Chip>Problem Solver</Chip>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  View Projects
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} ${theme.panel} px-6 py-3 font-semibold ${theme.text} transition hover:scale-[1.02]`}
                >
                  Contact Me
                </a>
                <a
                  href="/Madhuka-Virajith-CV.pdf"
                  className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} ${theme.panel} px-6 py-3 font-semibold ${theme.text}`}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <a href="https://github.com/madhukavirajith" target="_blank" className={`rounded-2xl border ${theme.border} ${theme.panel} p-3 ${theme.text}`} rel="noreferrer">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/madhuka-virajith-599ba42a4/" target="_blank" className={`rounded-2xl border ${theme.border} ${theme.panel} p-3 ${theme.text}`} rel="noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:madvira99@gmail.com" className={`rounded-2xl border ${theme.border} ${theme.panel} p-3 ${theme.text}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className={`relative overflow-hidden rounded-[32px] border ${theme.border} ${theme.panel} p-6 shadow-2xl`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${theme.sub}`}>Profile Snapshot</p>
                    <h3 className={`mt-1 text-xl font-semibold ${theme.text}`}>Software Engineer Portfolio</h3>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 p-3 text-slate-950">
                    <Code2 className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Layers3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${theme.text}`}>Frontend Engineering</p>
                        <p className={`text-sm ${theme.sub}`}>Responsive, animated, modern interfaces</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-fuchsia-400/10 p-3 text-fuchsia-300">
                        <Server className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${theme.text}`}>Backend Development</p>
                        <p className={`text-sm ${theme.sub}`}>APIs, authentication, databases, deployment</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-400/10 p-3 text-blue-300">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${theme.text}`}>System Thinking</p>
                        <p className={`text-sm ${theme.sub}`}>Clean architecture and scalable solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="About Me"
            title="Designing software experiences that feel polished and purposeful"
            description="I am a final year software engineering undergraduate passionate about creating web applications that are not only functional, but also visually engaging and user-friendly. I enjoy transforming ideas into production-ready products using modern frameworks and thoughtful engineering practices."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <User className="h-5 w-5" />,
                title: "Who I Am",
                text: "A software engineering undergraduate focused on building clean, modern, and impactful digital products.",
              },
              {
                icon: <Briefcase className="h-5 w-5" />,
                title: "What I Build",
                text: "Full-stack systems, dashboards, portfolio sites, academic tools, and user-centered web applications.",
              },
              {
                icon: <GraduationCap className="h-5 w-5" />,
                title: "What I Value",
                text: "Strong UI, maintainable code, performance, scalability, and solving practical real-world problems.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-[28px] border ${theme.border} ${theme.card} p-6 backdrop-blur-xl`}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 p-3 text-cyan-300">
                  {item.icon}
                </div>
                <h3 className={`text-lg font-semibold ${theme.text}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${theme.sub}`}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Skills"
            title="My technical toolkit"
            description="These are the technologies and tools I use to plan, build, deploy, and improve modern software products."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Frontend", icon: <Globe className="h-5 w-5" />, values: skills.frontend },
              { title: "Backend", icon: <Server className="h-5 w-5" />, values: skills.backend },
              { title: "Database", icon: <Database className="h-5 w-5" />, values: skills.database },
              { title: "Tools", icon: <Code2 className="h-5 w-5" />, values: skills.tools },
            ].map((group) => (
              <div key={group.title} className={`rounded-[28px] border ${theme.border} ${theme.card} p-6`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">{group.icon}</div>
                  <h3 className={`text-lg font-semibold ${theme.text}`}>{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.values.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Projects"
            title="Selected work that reflects my engineering approach"
            description="A curated set of projects demonstrating full-stack development, polished design, and practical problem solving."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {["All", "Real World", "Academic", "Personal"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-cyan-400 text-slate-950"
                    : `${theme.panel} ${theme.text} border ${theme.border}`
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group rounded-[30px] border ${theme.border} ${theme.card} overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Project Media - replaces the gradient background */}
                <ProjectMedia project={project} theme={theme} />
                
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-cyan-300">{project.category}</p>
                      <h3 className={`mt-1 text-xl font-semibold ${theme.text}`}>{project.title}</h3>
                    </div>
                  </div>

                  <p className={`text-sm leading-7 ${theme.sub}`}>{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-2xl border ${theme.border} px-4 py-2 ${theme.text} hover:bg-white/10 transition`}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-300 transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionTitle
            eyebrow="Experience & Education"
            title="My journey so far"
            description="A quick overview of my education, project work, and software development growth."
          />

          <div className="mt-12 space-y-6">
            {experiences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-[28px] border ${theme.border} ${theme.card} p-6`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h3 className={`text-xl font-semibold ${theme.text}`}>{item.title}</h3>
                    <p className="mt-1 text-cyan-300">{item.org}</p>
                    <p className={`mt-4 max-w-3xl text-sm leading-7 ${theme.sub}`}>{item.desc}</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {item.period}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className={`rounded-[36px] border ${theme.border} ${theme.card} p-8 sm:p-10`}>
            <SectionTitle
              eyebrow="Contact"
              title="Let's build something meaningful"
              description="I'm open to internships, graduate roles, freelance work, and exciting software collaborations. Feel free to reach out."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  label: "Email",
                  value: "madvira99@gmail.com",
                  href: "mailto:madvira99@gmail.com",
                  icon: <Mail className="h-5 w-5" />,
                },
                {
                  label: "GitHub",
                  value: "github.com/madhukavirajith",
                  href: "https://github.com/madhukavirajith",
                  icon: <Github className="h-5 w-5" />,
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/madhuka-virajith-599ba42a4/",
                  href: "https://www.linkedin.com/in/madhuka-virajith-599ba42a4/",
                  icon: <Linkedin className="h-5 w-5" />,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`rounded-[28px] border ${theme.border} ${theme.panel} p-6 transition hover:-translate-y-1`}
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">{item.icon}</div>
                  <p className={`text-sm ${theme.sub}`}>{item.label}</p>
                  <p className={`mt-2 break-all font-medium ${theme.text}`}>{item.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className={`${theme.sub} text-sm`}>
            © {new Date().getFullYear()} Madhuka Virajith. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
          <p className="text-sm text-cyan-300">madhukavirajith.com</p>
        </div>
      </footer>
    </div>
  );
}