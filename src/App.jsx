import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Constellation from "./components/Constellation.jsx";
import Reveal from "./components/Reveal.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import aboutIllustration from "./assets/about-illustration.png";
import {
  experience,
  links,
  navItems,
  projects,
  skillGroups,
  skillRadar,
  stats
} from "./data.js";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const observedIds = useMemo(
    () => ["home", ...navItems.map((item) => item.id)],
    []
  );
  const skillLevels = useMemo(
    () =>
      Object.fromEntries(
        skillRadar.map((skill) => [
          skill.name,
          { level: skill.level, group: skill.group }
        ])
      ),
    []
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 560);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [observedIds]);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.14 }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <main>
        <section id="home" className="hero section-shell">
          <div className="mesh-bg" aria-hidden="true" />
          <div className="particles" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} style={{ "--i": index }} />
            ))}
          </div>

          <div className="hero-grid">
            <Reveal className="hero-content">
              <p className="eyebrow">Builder. Problem-Solver. Fast Learner.</p>
              <h1>
                <span>Hi, I'm <strong>Sudharsana.</strong></span>
                <span>I build things that work.</span>
              </h1>
              <p className="hero-copy">
                Fresh graduate with hands-on experience across software, data, and
                enterprise systems. I solve real problems with clean execution and
                thoughtful design.
              </p>
              <div className="button-row">
                <a className="btn primary" href="#projects">
                  See My Work
                </a>
                <a className="btn ghost" href={links.gmail} target="_blank" rel="noreferrer">
                  Get In Touch
                </a>
              </div>
            </Reveal>

            <Reveal className="hero-visual">
              <img
                src={aboutIllustration}
                alt="Illustration of Sudharsana waving at a desk with coding notes and laptop"
              />
            </Reveal>
          </div>
        </section>

        <section id="about" className="about section-shell purple-band">
          <Reveal>
            <p className="section-kicker">About</p>
            <h2>About Me</h2>
          </Reveal>

          <div className="about-grid">
            <Reveal className="about-copy">
              <p>
                I'm a 2026 EEE graduate who spent the last year building real
                products at a startup - not just learning, but shipping. I work
                across stacks, learn fast, and care about making things that
                actually solve problems.
              </p>
              <p>
                From designing database schemas to debugging enterprise APIs, I
                have worn many hats. I thrive in collaborative environments and
                take ownership of outcomes.
              </p>
            </Reveal>

            <Reveal className="stats-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <span>{stat.icon}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="skills" className="skills section-shell">
          <Reveal>
            <p className="section-kicker">Skills</p>
            <h2>Skills & Constellation</h2>
          </Reveal>

          <Reveal>
            <Constellation />
          </Reveal>

          <Reveal className="skill-groups">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-cloud">
                  {group.items.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={selectedSkill === skill ? "active" : ""}
                      onClick={() => setSelectedSkill(skill)}
                      onTouchStart={() => setSelectedSkill(skill)}
                      style={{ "--level": `${skillLevels[skill]?.level ?? 75}%` }}
                    >
                      {skill}
                      <span className="skill-popover" aria-hidden="true">
                        <span className="skill-ring">
                          <span>{skillLevels[skill]?.level ?? 75}%</span>
                        </span>
                        <span className="skill-popover-copy">
                          <strong>{skill}</strong>
                          <small>{skillLevels[skill]?.group}</small>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        <section id="projects" className="projects section-shell purple-band">
          <Reveal>
            <p className="section-kicker">Work</p>
            <h2>Featured Projects</h2>
          </Reveal>

          <div className="project-grid">
            {projects.map((project) => (
              <Reveal className="project-card" key={project.title}>
                <div className="project-topline">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <span>{project.year}</span>
                </div>
                <p className="project-description">{project.description}</p>

                <div className="meta-label">Stack</div>
                <div className="chip-row stack-row">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="chip-row tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="experience section-shell">
          <Reveal>
            <p className="section-kicker">Journey</p>
            <h2>Experience</h2>
          </Reveal>

          <Reveal className="timeline">
            <article className="experience-card">
              <h3>{experience.role}</h3>
              <strong>{experience.company}</strong>
              <p>{experience.period}</p>
              <ul>
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </section>

        <section id="education" className="education section-shell purple-band">
          <Reveal>
            <p className="section-kicker">Education</p>
            <h2>Education</h2>
          </Reveal>

          <Reveal className="education-card">
            <div>
              <h3>B.E. Electrical and Electronics Engineering</h3>
              <strong>Karpagam Institute of Technology, Tamil Nadu</strong>
              <p>2022-2026</p>
            </div>
            <span>CGPA: 7.8/10</span>
          </Reveal>
        </section>

        <section id="contact" className="contact section-shell">
          <Reveal>
            <p className="section-kicker">Contact</p>
            <h2>Let's Connect</h2>
            <p>
              Whether it's a role, a project, or just a conversation - I'm open.
            </p>
            <div className="button-row centered">
              <a className="btn primary" href={links.gmail} target="_blank" rel="noreferrer">
                Email Me
              </a>
              <a className="btn ghost" href={links.linkedin} target="_blank" rel="noreferrer">
                View LinkedIn
              </a>
              <a className="btn ghost" href={links.github} target="_blank" rel="noreferrer">
                View GitHub
              </a>
            </div>
            <div className="contact-lines">
              <span>Email: {links.email}</span>
              <span>Location: {links.location}</span>
            </div>
          </Reveal>
        </section>
      </main>

      <ScrollTop visible={showScrollTop} />
    </>
  );
}
