import { useRef } from "react";
import type { ReactNode } from "react";
import { Github, Globe, Building2, Layers, ArrowUpRight, Lock, Check, Users, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useCardTilt } from "../hooks/useCardTilt";
import { AsanohaWatermark, SeigaihaPattern } from "./JapaneseDecorations";

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

interface FlagshipCardProps {
  key?: string | number;
  flag: FlagshipProject;
  idx: number;
  data: {
    title?: string;
    desc?: string;
    category?: string;
  };
  t: (key: string) => string;
}

const FlagshipCard = ({ flag, idx, data, t }: FlagshipCardProps) => {
  const isReversed = idx % 2 === 1;
  const { ref, onMouseMove, onMouseLeave } = useCardTilt(3.5);

  return (
    <article className="gsap-flagship feature-card rounded-2xl bg-surface/90 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 border-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
        {/* Visual Mac Safari Window Frame with 3D Spatial Tilt (Clean, Crisp 12px Radius) */}
        <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
          <div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="mac-window rounded-xl bg-surface dark:bg-[#0c0d12] overflow-hidden shadow-xl dark:shadow-2xl group transition-transform duration-200 ease-out will-change-transform border-0"
          >
            {/* macOS Safari Window Header */}
            <div className="mac-titlebar px-5 py-3.5 bg-surface-hover/80 flex items-center justify-between gap-3 border-0">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <div className="mac-dot mac-dot-close" title="Cerrar" />
                <div className="mac-dot mac-dot-minimize" title="Minimizar" />
                <div className="mac-dot mac-dot-maximize" title="Maximizar" />
              </div>

              {/* Safari Style URL / Title Pill */}
              <div className="flex-1 max-w-xs sm:max-w-sm mx-auto px-3.5 py-1.5 rounded-md bg-surface/80 text-[11px] font-mono text-neutral-500 truncate flex items-center justify-center gap-2 shadow-inner">
                <Lock size={11} className="text-primary shrink-0" />
                <span className="truncate">{flag.liveUrl || "https://github.com/0520Jose"}</span>
              </div>

              <div className="w-12 hidden sm:block" />
            </div>

            {/* Authentic Image Preview with Zoom on Hover */}
            <div className="p-4 sm:p-8 bg-neutral-100/80 dark:bg-[#0a0a0d] flex items-center justify-center overflow-hidden">
              <img
                src={flag.image}
                alt={flag.alt}
                className="w-full max-h-[380px] object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Editorial Content (Clean, Concise, No Text Clutter) */}
        <div className={`lg:col-span-5 space-y-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white leading-tight">
            {data.title || "Project"}
          </h3>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-sans line-clamp-3">
            {data.desc || ""}
          </p>

          {/* Features list (Brief bullet points) */}
          <ul className="space-y-2 pt-1 text-xs text-neutral-700 dark:text-neutral-300">
            {flag.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <Check size={15} className="text-primary mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {flag.tech.map((tItem) => (
              <span
                key={tItem}
                className="px-3 py-1 bg-surface-hover rounded-md text-[10px] font-mono font-medium text-neutral-700 dark:text-neutral-300"
              >
                {tItem}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3">
            {flag.liveUrl && (
              <a
                href={flag.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid inline-flex min-h-11 items-center gap-1.5 px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-mono font-semibold uppercase tracking-wider shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
              >
                <span>{t("demo") || "Sitio en vivo"}</span>
                <ArrowUpRight size={15} />
              </a>
            )}

            {flag.githubUrl ? (
              <a
                href={flag.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fluid inline-flex min-h-11 items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-hover text-xs font-mono font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:text-primary transition-colors cursor-pointer"
              >
                <Github size={15} />
                <span>{t("repo") || "Código"}</span>
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-hover text-xs font-mono text-neutral-500">
                <Lock size={13} />
                <span>{t("privateCode") || "Código privado"}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);

  const projectsData = (t("projectsData", { returnObjects: true }) || []) as Array<{
    title?: string;
    desc?: string;
    category?: string;
  }>;

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
        .from(headerTitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power4.out",
        })
        .from(
          headerLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          headerDescRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
          },
          "-=0.3"
        );

      // Flagship cards — stagger entrance
      gsap.utils.toArray<HTMLElement>(".gsap-flagship").forEach((card, i) => {
        const isEven = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          x: isEven ? -30 : 30,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Secondary grid cards — batch stagger
      ScrollTrigger.batch(".gsap-secondary-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        start: "top 88%",
        once: true,
      });
    },
    { scope: sectionRef }
  );

  const flagshipProjects: FlagshipProject[] = [
    {
      key: 5,
      image: "/assets/images-proyects/PublicacionLinekdin.png",
      alt: "SAMNU Numerical Methods Suite",
      tech: ["Flutter", "Dart", "React", "Supabase", "LaTeX"],
      liveUrl: "https://samnu.netlify.app/",
      isPrivate: true,
      features: [
        "+30 Algoritmos Numéricos Avanzados",
        "Generación Automática de Reportes en PDF",
        "Analizador y Parser Matemático Integrado",
      ],
    },
    {
      key: 2,
      image: "/assets/images-proyects/PemtreeImage.png",
      alt: "PEMTREE Curriculum Visualizer",
      tech: ["React", "TypeScript", "Node.js", "Vite", "Tailwind CSS"],
      githubUrl: "https://github.com/Trebol4Devop/PEMTREE",
      liveUrl: "https://pemtree.netlify.app/",
      features: [
        "Mapeo Visual de Prerrequisitos y Dependencias",
        "Identificación Algorítmica de Rutas Críticas",
        "Gestión Dinámica de Cursos Aprobados y Créditos",
      ],
    },
  ];

  const secondaryProjects: ProjectItem[] = [
    {
      key: 0,
      defaultTitle: "Colectivo Trebol4Devop",
      defaultDesc:
        "Organización de ingeniería de software, arquitectura de sistemas distribuidos y colectivo open-source en USAC.",
      defaultCategory: "Ecosistema & Organización",
      tech: ["React", "Vite", "Tailwind CSS", "DevOps"],
      icon: <Globe size={18} />,
      githubUrl: "https://github.com/Trebol4Devop",
      liveUrl: "https://trebol4devop.netlify.app/",
    },
    {
      key: 3,
      defaultTitle: "TODOMIGOBGT",
      defaultDesc:
        "Plataforma cívica unificada y sistema de alertas ciudadanas de Guatemala con arquitectura perimetral sobre Cloudflare Workers, R2 y pipeline ETL.",
      defaultCategory: "Gobernanza Digital & Cloud",
      tech: ["Astro", "Cloudflare R2", "Python", "Tailwind CSS"],
      icon: <Building2 size={18} />,
      githubUrl: "https://github.com/Trebol4Devop/todomigobgt",
    },
    {
      key: 4,
      defaultTitle: "Cartesian Plane Library",
      defaultDesc:
        "Motor de renderizado matemático open source sobre HTML5 Canvas para trazado de funciones analíticas y geometría computacional.",
      defaultCategory: "Librería Open Source",
      tech: ["TypeScript", "HTML5 Canvas", "Math Algorithms"],
      icon: <Layers size={18} />,
      githubUrl: "https://github.com/Trebol4Devop/cartesian-plane-library",
    },
    {
      key: 1,
      defaultTitle: "Comunidad USAC",
      defaultDesc:
        "Plataforma colaborativa para la comunidad universitaria de la USAC con marketplace académico, grupos de estudio y gestión comunitaria.",
      defaultCategory: "Ecosistema Estudiantil & Flutter",
      tech: ["Flutter", "Dart", "Supabase", "Mobile UI"],
      icon: <Users size={18} />,
      githubUrl: "https://github.com/Trebol4Devop/Comunidad_USAC",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 relative overflow-hidden bg-[#f4f6fa] dark:bg-[#0e1219] transition-colors duration-700"
    >
      {/* Shoji Lattice Grid Texture */}
      <div className="pixel-grid absolute inset-0 z-0 pointer-events-none opacity-20" />

      {/* Asanoha Geometric Kumiko Art Watermark */}
      <div className="absolute top-16 right-8 lg:right-24 pointer-events-none z-0 text-neutral-800/10 dark:text-neutral-500/15">
        <AsanohaWatermark size={280} />
      </div>

      {/* Seigaiha Waves Transition Strip */}
      <div className="absolute bottom-0 inset-x-0 h-24 opacity-[0.07] dark:opacity-[0.05] text-neutral-900 dark:text-white pointer-events-none z-0">
        <SeigaihaPattern />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <h2
              ref={headerTitleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              {t("projectsTitle1", "Proyectos")}{" "}
              <span className="text-primary italic font-serif">
                {t("projectsTitle2", "Destacados")}
              </span>
            </h2>
            <div
              ref={headerLineRef}
              className="w-16 h-[2px] bg-primary/50 my-4"
            />
            <p
              ref={headerDescRef}
              className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans"
            >
              {t("projectsDesc")}
            </p>
          </div>

          <a
            href="https://github.com/0520Jose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface/90 hover:bg-surface text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:text-primary transition-all shrink-0 cursor-pointer shadow-xs backdrop-blur-md border-0"
          >
            <span>{t("viewAll") || "GitHub"}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 1. Flagship Showcases with Safari Mac Windows */}
        <div className="space-y-16 mb-24">
          {flagshipProjects.map((flag, idx) => (
            <FlagshipCard
              key={flag.key}
              flag={flag}
              idx={idx}
              data={projectsData[flag.key] || {}}
              t={t}
            />
          ))}
        </div>

        {/* Featured Distributed Systems (Asymmetric SAMNU Grid 7/5 - Zero Borders) */}
        <div>
          <div className="mb-10 space-y-2">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white">
              Sistemas &amp; Arquitecturas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: TODOMIGOBGT (Ancha - span 7) */}
            <div className="md:col-span-7 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-6 rounded-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Building2 size={22} />
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                  TODOMIGOBGT
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xl font-sans">
                  Plataforma cívica unificada y sistema de alertas ciudadanas de Guatemala con arquitectura perimetral sobre Cloudflare Workers y R2.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {["Astro", "Cloudflare Workers", "R2 Storage", "Python"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-md bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/Trebol4Devop/todomigobgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fluid inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-hover text-xs font-mono font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  <Github size={14} />
                  <span>Código ↗</span>
                </a>
              </div>
            </div>

            {/* Card 2: Comunidad USAC (Compacta - span 5) */}
            <div className="md:col-span-5 feature-card p-8 sm:p-10 flex flex-col justify-between space-y-6 rounded-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Users size={22} />
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                  Comunidad USAC
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-sans">
                  Ecosistema estudiantil colaborativo para la comunidad de Ingeniería USAC. Gestión académica, noticias y foros de discusión.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {["Flutter", "Dart", "Supabase RLS", "PostgreSQL"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-md bg-surface-hover text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/Trebol4Devop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fluid inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-hover text-xs font-mono font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  <Github size={14} />
                  <span>Comunidad ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
