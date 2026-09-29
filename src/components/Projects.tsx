import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Github, ExternalLink, Code2, Globe, GraduationCap, Map, Layers, Calculator, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectItem {
  key: number;
  defaultTitle: string;
  defaultDesc: string;
  defaultCategory: string;
  tech: string[];
  icon: ReactNode;
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
}

interface FlagshipProject {
  key: number;
  image: string;
  alt: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
  features: string[];
}

export const Projects = () => {
  const { t } = useTranslation();
  const projectsData = (t("projectsData", { returnObjects: true }) || []) as Array<{
    title?: string;
    desc?: string;
    category?: string;
  }>;

  // Two flagship systems with high-impact mockups (inspired by PortafolioGrupal)
  const flagshipProjects: FlagshipProject[] = [
    {
      key: 5, // SAMNU
      image: "/assets/images-proyects/PublicacionLinekdin.png",
      alt: "SAMNU Numerical Methods Suite",
      tech: ["Flutter", "Dart", "React", "Supabase", "LaTeX"],
      liveUrl: "https://samnu.netlify.app/",
      isPrivate: true,
      features: [
        "+30 Algoritmos Numéricos Avanzados",
        "Generación Automática de Reportes en PDF",
        "Analizador y Parser Matemático Integrado"
      ]
    },
    {
      key: 2, // PEMTREE
      image: "/assets/images-proyects/PemtreeImage.png",
      alt: "PEMTREE Curriculum Visualizer",
      tech: ["React", "TypeScript", "Node.js", "Vite", "Tailwind CSS"],
      githubUrl: "https://github.com/Trebol4Devop/PEMTREE",
      liveUrl: "https://pemtree.netlify.app/",
      features: [
        "Mapeo Visual de Prerrequisitos y Dependencias",
        "Identificación Algorítmica de Rutas Críticas",
        "Gestión Dinámica de Cursos Aprobados y Créditos"
      ]
    }
  ];

  // Additional 4 engineering systems
  const secondaryProjects: ProjectItem[] = [
    {
      key: 0,
      defaultTitle: "Trebol4Devop Engineering Collective",
      defaultDesc: "Software engineering organization, distributed systems architecture, and open-source collective at USAC.",
      defaultCategory: "Ecosistema & Organización",
      tech: ["React", "Vite", "Tailwind CSS", "DevOps"],
      icon: <Globe className="text-primary" size={22} />,
      githubUrl: "https://github.com/Trebol4Devop",
      liveUrl: "https://trebol4devop.netlify.app/",
    },
    {
      key: 3,
      defaultTitle: "USAC Campus Map",
      defaultDesc: "Interactive community geospatial web platform providing routing, landmark search, and department information at USAC.",
      defaultCategory: "Web GIS & Comunidad",
      tech: ["TypeScript", "Web GIS", "Vite", "Tailwind CSS"],
      icon: <Map className="text-primary" size={22} />,
      githubUrl: "https://github.com/Trebol4Devop/usac_campus_map",
    },
    {
      key: 4,
      defaultTitle: "Cartesian Plane Library",
      defaultDesc: "Open-source mathematical rendering engine for Cartesian coordinates, parametric curve plotting, and algorithmic geometry.",
      defaultCategory: "Librería Open Source",
      tech: ["TypeScript", "HTML5 Canvas", "Math Algorithms"],
      icon: <Layers className="text-primary" size={22} />,
      githubUrl: "https://github.com/Trebol4Devop/cartesian-plane-library",
    },
    {
      key: 1,
      defaultTitle: "Interactive Modern Portfolio",
      defaultDesc: "High-fidelity personal showcase featuring 6-language internationalization, theme toggling, and decoupled architecture.",
      defaultCategory: "Frontend & UI/UX",
      tech: ["React 19", "TypeScript", "Tailwind v4", "Motion", "i18n"],
      icon: <Code2 className="text-primary" size={22} />,
      githubUrl: "https://github.com/0520Jose/Portafolio",
      liveUrl: "https://emanuelmonzon.netlify.app",
    },
  ];

  return (
    <section id="projects" className="py-28 px-6 relative border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("systemShowcase") || "SYSTEM SHOWCASE"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-fg">
              {t("projectsTitle")}
            </h2>
            <p className="text-muted text-base md:text-lg max-w-xl">
              {t("projectsDesc")}
            </p>
          </div>
          <a
            href="https://github.com/0520Jose"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-xs font-bold font-mono uppercase tracking-wider text-fg hover:border-primary/50 hover:text-primary transition-all duration-200"
          >
            {t("viewAll") || "Ver todos en GitHub"}
            <Github size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Flagship Editorial Double Showcase */}
        <div className="space-y-12 mb-16">
          {flagshipProjects.map((flag, idx) => {
            const data = projectsData[flag.key] || {};
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={flag.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-border bg-surface overflow-hidden hover:border-border-hover transition-colors shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 lg:p-10">
                  {/* Visual Browser Frame Column */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="rounded-xl border border-border bg-surface-hover/40 overflow-hidden shadow-md group">
                      {/* Browser Chrome Header */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                        <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-surface-hover/80 text-[11px] font-mono text-muted truncate text-center">
                          {flag.liveUrl || "https://github.com"}
                        </div>
                      </div>

                      {/* Real Screenshot Preview */}
                      <div className="p-4 sm:p-6 bg-surface-hover/20 flex items-center justify-center">
                        <img
                          src={flag.image}
                          alt={flag.alt}
                          className="w-full max-h-[340px] object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-5 space-y-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-surface-hover border border-border text-primary inline-block">
                      {data.category || "FLAGSHIP SYSTEM"}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-fg">
                      {data.title || "Project"}
                    </h3>

                    <p className="text-muted text-sm sm:text-base leading-relaxed">
                      {data.desc || ""}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-fg/80">
                      {flag.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {flag.tech.map((tItem) => (
                        <span
                          key={tItem}
                          className="px-2.5 py-1 bg-surface-hover rounded-md text-[10px] font-mono text-muted border border-border"
                        >
                          {tItem}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3">
                      {flag.liveUrl && (
                        <a
                          href={flag.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-primary text-black text-xs font-bold hover:bg-primary-light transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>{t("demo") || "Sitio en vivo"}</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}

                      {flag.githubUrl ? (
                        <a
                          href={flag.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-surface border border-border text-xs font-semibold text-fg hover:border-primary/50 hover:text-primary transition-all flex items-center gap-1.5"
                        >
                          <Github size={14} />
                          <span>{t("repo") || "Código"}</span>
                        </a>
                      ) : (
                        <span className="px-4 py-2.5 rounded-xl bg-surface border border-border text-xs text-muted font-medium flex items-center gap-1.5">
                          <Lock size={12} className="text-muted" />
                          <span>{t("privateCode") || "Código privado"}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Secondary Engineering Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryProjects.map((proj, i) => {
            const data = projectsData[proj.key] || {};
            const title = data.title || proj.defaultTitle;
            const desc = data.desc || proj.defaultDesc;
            const category = data.category || proj.defaultCategory;

            return (
              <motion.article
                key={proj.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bento-card group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-surface-hover border border-border rounded-xl flex items-center justify-center">
                      {proj.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-surface-hover border border-border text-muted">
                      {category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-fg mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                  <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-4">
                    {desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {proj.tech.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 bg-surface-hover rounded text-[9px] font-mono text-muted border border-border/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-surface border border-border text-[11px] font-medium text-fg hover:text-primary hover:border-primary/50 text-center flex items-center justify-center gap-1 transition-all"
                      >
                        <Github size={12} />
                        <span>{t("repo") || "Código"}</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-primary text-black font-semibold text-[11px] text-center flex items-center justify-center gap-1 hover:bg-primary-light transition-all"
                      >
                        <span>{t("demo") || "Demo"}</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
