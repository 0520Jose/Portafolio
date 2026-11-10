import { useRef } from "react";
import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Server, Layout, Cloud, Database } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { EnsoCircle, KamonCrest } from "./JapaneseDecorations";

interface TechItem {
  name: string;
  category: string;
  icon: string;
  alt: string;
  level: "basic" | "medium" | "advanced";
  defaultDesc: string;
}

export const Skills = () => {
  const { t } = useTranslation();
  const [activeSkill, setActiveSkill] = useState<TechItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ScrollTrigger entrance animations
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Section header choreography
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      headerTl
        .from(
          headerTitleRef.current,
          { opacity: 0, y: 30, duration: 0.8, ease: "power4.out" }
        )
        .from(
          headerLineRef.current,
          { scaleX: 0, transformOrigin: "center center", duration: 0.6 },
          "-=0.4"
        )
        .from(
          headerDescRef.current,
          { opacity: 0, y: 16, duration: 0.5 },
          "-=0.3"
        );

      // Pillar cards — slide in from alternating sides
      gsap.utils.toArray<HTMLElement>(".gsap-pillar").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 24,
          x: i % 2 === 0 ? -20 : 20,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
        });
      });

      // Tech carousel container reveal
      gsap.from(".gsap-carousel-container", {
        scrollTrigger: {
          trigger: ".gsap-carousel-container",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  // Verified 100% active, reliable icons (tested HTTP 200, no 403/404)
  const technologies: TechItem[] = [
    {
      name: "HTML5",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/html5/E34F26",
      alt: "HTML5",
      level: "medium",
      defaultDesc: "Estructura semántica, accesible y estandarizada para la web moderna.",
    },
    {
      name: "CSS3",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/css/1572B6",
      alt: "CSS3",
      level: "medium",
      defaultDesc: "Estilos responsivos, sistemas visuales adaptativos y animaciones fluidas.",
    },
    {
      name: "JavaScript",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/javascript/D4B830",
      alt: "JavaScript",
      level: "medium",
      defaultDesc: "Lógica dinámica y desarrollo de interfaces ricas en el navegador.",
    },
    {
      name: "TypeScript",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/typescript/3178C6",
      alt: "TypeScript",
      level: "advanced",
      defaultDesc: "Tipado estático riguroso para arquitecturas de software robustas y escalables.",
    },
    {
      name: "React",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/react/61DAFB",
      alt: "React",
      level: "advanced",
      defaultDesc:
        "Arquitectura basada en componentes y aplicaciones SPA reactivas de alto rendimiento.",
    },
    {
      name: "Vue.js",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
      alt: "Vue.js",
      level: "medium",
      defaultDesc: "Framework progresivo para construcción de interfaces reactivas ágiles.",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      alt: "Tailwind CSS",
      level: "advanced",
      defaultDesc: "Diseño modular y consistente mediante utilidades atómicas modernas.",
    },
    {
      name: "Vite",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/vite/646CFF",
      alt: "Vite",
      level: "advanced",
      defaultDesc: "Entorno de desarrollo rápido y empaquetador optimizado para la web.",
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      alt: "Node.js",
      level: "medium",
      defaultDesc:
        "Entorno de ejecución de JavaScript en backend asíncrono y de alto rendimiento.",
    },
    {
      name: "Python",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/python/3776AB",
      alt: "Python",
      level: "advanced",
      defaultDesc:
        "Automatización, scripting, servicios backend versátiles y análisis de datos.",
    },
    {
      name: "Go",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/go/00ADD8",
      alt: "Go",
      level: "medium",
      defaultDesc:
        "Microservicios concurrentes y de baja latencia con compilación nativa ultrarrápida.",
    },
    {
      name: "Java",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      alt: "Java",
      level: "medium",
      defaultDesc:
        "Desarrollo de software orientado a objetos para sistemas y arquitecturas empresariales.",
    },
    {
      name: "Django",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/django/44B78B",
      alt: "Django",
      level: "medium",
      defaultDesc:
        "Framework web de alto nivel en Python con ORM, autenticación y seguridad integradas.",
    },
    {
      name: "Flask",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/flask/FFFFFF",
      alt: "Flask",
      level: "medium",
      defaultDesc:
        "Micro-framework ligero y modular para la creación de APIs RESTful eficientes.",
    },
    {
      name: "C#",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      alt: "C#",
      level: "medium",
      defaultDesc:
        "Aplicaciones robustas aprovechando el ecosistema de alto rendimiento de .NET.",
    },
    {
      name: "C",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/c/A8B9CC",
      alt: "C",
      level: "basic",
      defaultDesc:
        "Fundamentos de bajo nivel, gestión manual de memoria y algoritmos esenciales.",
    },
    {
      name: "PostgreSQL",
      category: "Data",
      icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      alt: "PostgreSQL",
      level: "advanced",
      defaultDesc:
        "Base de datos relacional avanzada con soporte ACID y extensibilidad empresarial.",
    },
    {
      name: "Redis",
      category: "Data",
      icon: "https://cdn.simpleicons.org/redis/FF4438",
      alt: "Redis",
      level: "medium",
      defaultDesc:
        "Almacenamiento en memoria para caché de datos con latencia sub-milisegundo.",
    },
    {
      name: "MongoDB",
      category: "Data",
      icon: "https://cdn.simpleicons.org/mongodb/47A248",
      alt: "MongoDB",
      level: "medium",
      defaultDesc:
        "Base de datos NoSQL documental flexible y escalable horizontalmente.",
    },
    {
      name: "AWS",
      category: "Cloud",
      icon: "https://skillicons.dev/icons?i=aws",
      alt: "AWS",
      level: "medium",
      defaultDesc:
        "Servicios cloud para computación elástica, almacenamiento y arquitecturas resilientes.",
    },
    {
      name: "Cloudflare",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/cloudflare/F38020",
      alt: "Cloudflare",
      level: "medium",
      defaultDesc:
        "Seguridad perimetral, distribución CDN global y edge computing.",
    },
    {
      name: "Netlify",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/netlify/00C7B7",
      alt: "Netlify",
      level: "advanced",
      defaultDesc:
        "Despliegues continuos automatizados y CDN distribuida para aplicaciones web.",
    },
    {
      name: "Linux",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/linux/FCC624",
      alt: "Linux",
      level: "medium",
      defaultDesc:
        "Administración de servidores, scripting bash y entornos de despliegue en producción.",
    },
    {
      name: "Git",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/git/F05032",
      alt: "Git",
      level: "advanced",
      defaultDesc:
        "Control de versiones distribuido para desarrollo disciplinado y trazable.",
    },
    {
      name: "GitHub",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/github/888888",
      alt: "GitHub",
      level: "advanced",
      defaultDesc:
        "Colaboración en equipo, gestión de repositorios y automatización de CI/CD.",
    },
    {
      name: "Docker",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/docker/2496ED",
      alt: "Docker",
      level: "medium",
      defaultDesc:
        "Contenerización de aplicaciones para portabilidad e infraestructura reproducible.",
    },
    {
      name: "Grafana",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/grafana/F46800",
      alt: "Grafana",
      level: "medium",
      defaultDesc:
        "Plataforma de telemetría, visualización de métricas y monitorización de sistemas.",
    },
    {
      name: "Dart",
      category: "Mobile",
      icon: "https://cdn.simpleicons.org/dart/0175C2",
      alt: "Dart",
      level: "medium",
      defaultDesc:
        "Lenguaje moderno tipado para interfaces multiplataforma de alto rendimiento.",
    },
    {
      name: "Flutter",
      category: "Mobile",
      icon: "https://cdn.simpleicons.org/flutter/45D1FD",
      alt: "Flutter",
      level: "medium",
      defaultDesc:
        "Framework de Google para crear aplicaciones nativas multiplataforma desde un único codebase.",
    },
    {
      name: "VS Code",
      category: "Tooling",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      alt: "VS Code",
      level: "advanced",
      defaultDesc:
        "Entorno de desarrollo ágil con extensiones especializadas para ingeniería de software.",
    },
  ];

  const carouselItems = [...technologies, ...technologies];
  const techDescriptions = (t("techDescriptions", { returnObjects: true }) ||
    {}) as Record<string, string>;

  const pillarsData = (t("pillarsData", { returnObjects: true }) || []) as Array<{
    title: string;
    desc: string;
  }>;

  const pillarIcons = [
    <Layout size={20} className="text-neutral-700 dark:text-neutral-300" />,
    <Server size={20} className="text-neutral-700 dark:text-neutral-300" />,
    <Cloud size={20} className="text-neutral-700 dark:text-neutral-300" />,
    <Database size={20} className="text-neutral-700 dark:text-neutral-300" />,
  ];

  const getLevelLabel = (level: "basic" | "medium" | "advanced") => {
    switch (level) {
      case "advanced":
        return t("skillLevelAdvanced") || "Avanzado";
      case "medium":
        return t("skillLevelMedium") || "Medio";
      case "basic":
      default:
        return t("skillLevelBasic") || "Básico";
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 relative overflow-hidden bg-[#f8f6f9] dark:bg-[#121018] transition-colors duration-700"
    >
      {/* Shoji Lattice Grid Texture */}
      <div className="pixel-grid absolute inset-0 z-0 pointer-events-none opacity-20" />

      {/* Zen Ensō Art Watermark */}
      <div className="absolute -bottom-16 -left-16 pointer-events-none z-0 text-neutral-800/10 dark:text-neutral-500/15">
        <EnsoCircle size={380} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          {/* Kamon Visual Crest */}
          <div className="flex justify-center mb-3 text-neutral-400/40 dark:text-neutral-500/35">
            <KamonCrest size={38} />
          </div>

          <h2
            ref={headerTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-tight"
          >
            {t("skillsTitle")}
          </h2>
          <div
            ref={headerLineRef}
            className="w-12 h-[1px] bg-neutral-300 dark:bg-neutral-700 my-4 mx-auto"
          />
          <p
            ref={headerDescRef}
            className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans"
          >
            {t("skillsDesc")}
          </p>
        </div>

        {/* 4 Core Disciplines - Asymmetric SAMNU Grid (Span 7 & 5, Zero Borders) */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Frontend (Span 7) */}
          <div className="md:col-span-7 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Layout size={24} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Arquitectura Frontend &amp; Visualizadores Reactivos
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans max-w-xl">
                Interfaces SPA fluidas a 60 FPS, aplicaciones multiplataforma con Flutter y dashboards interactivos basados en Canvas y WebGL.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["React 19", "TypeScript", "Flutter", "Tailwind CSS", "Three.js"].map((tItem) => (
                <span key={tItem} className="px-3 py-1 rounded-xl bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                  {tItem}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Backend (Span 5) */}
          <div className="md:col-span-5 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Server size={24} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Sistemas Distribuidos &amp; Cómputo
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans">
                Servicios en borde (Edge Workers), microservicios en Go y motores algorítmicos numéricos.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Go (Golang)", "Python", "Cloudflare Workers", "Node.js"].map((tItem) => (
                <span key={tItem} className="px-3 py-1 rounded-xl bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                  {tItem}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Cloud & DevOps (Span 5) */}
          <div className="md:col-span-5 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Cloud size={24} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Cloud &amp; Infraestructura DevOps
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans">
                Flujos contenerizados con Docker, orquestación y despliegues automatizados en servidores cloud y borde.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Docker", "Kubernetes", "Cloudflare R2", "Linux OS"].map((tItem) => (
                <span key={tItem} className="px-3 py-1 rounded-xl bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                  {tItem}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Databases & Math (Span 7) */}
          <div className="md:col-span-7 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-5">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Database size={24} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Persistencia &amp; Motores Numéricos
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans max-w-xl">
                Bases de datos relacionales con seguridad por filas (RLS), almacenamiento de objetos distribuido y parsers matemáticos vectoriales.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["PostgreSQL", "Supabase RLS", "KaTeX 2.0", "Numerical Parsers"].map((tItem) => (
                <span key={tItem} className="px-3 py-1 rounded-xl bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Continuous Technology Track (Seamless, Borderless) */}
        <div className="gsap-carousel-container space-y-4">
          <div className="flex items-center justify-end text-xs font-mono uppercase tracking-wider text-neutral-500 px-1">
            <span className="text-[11px] text-primary/80">{t("clickTechHint") || "Click para detalles ↗"}</span>
          </div>

          <div className="tech-carousel">
            <div className="tech-carousel__track">
              {carouselItems.map((technology, index) => (
                <button
                  type="button"
                  key={`${technology.name}-${index}`}
                  onClick={() => setActiveSkill(technology)}
                  className="tech-carousel__item group flex flex-col items-center justify-center gap-2 rounded-xl bg-surface/90 backdrop-blur-sm p-4 cursor-pointer hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 text-left border-0 shadow-sm"
                  title={`${technology.name} - ${getLevelLabel(technology.level)}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover transition-transform duration-300 group-hover:scale-110 overflow-hidden shadow-inner">
                    <img
                      src={technology.icon}
                      alt={technology.alt}
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="text-center w-full px-1">
                    <span className="text-xs font-medium text-neutral-900 dark:text-white block truncate group-hover:text-primary transition-colors">
                      {technology.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 block truncate">
                      {technology.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Dialog Modal (Clean & Structured) */}
      <AnimatePresence>
        {activeSkill && (
          <div
            onClick={() => setActiveSkill(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl border-0 animate-[modalIn_0.2s_ease-out]"
            >
              <button
                type="button"
                onClick={() => setActiveSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-surface-hover text-neutral-400 hover:text-fg transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-surface-hover flex items-center justify-center p-3 overflow-hidden shadow-inner">
                  <img
                    src={activeSkill.icon}
                    alt={activeSkill.alt}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                    {activeSkill.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      {activeSkill.category}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold px-2.5 py-0.5 rounded-full bg-primary/10">
                      {getLevelLabel(activeSkill.level)}
                    </span>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed font-sans">
                  {techDescriptions[activeSkill.name] || activeSkill.defaultDesc}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
