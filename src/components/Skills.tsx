import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Sparkles } from "lucide-react";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Exactly matching 0520Jose GitHub README profile tech stack
  const technologies: TechItem[] = [
    {
      name: "HTML5",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/html5/E34F26",
      alt: "HTML5",
      level: "medium",
      defaultDesc: "Estructura semántica, accesible y estandarizada para la web moderna."
    },
    {
      name: "CSS3",
      category: "Frontend",
      icon: "https://api.iconify.design/logos:css-3.svg",
      alt: "CSS3",
      level: "medium",
      defaultDesc: "Estilos responsivos, sistemas visuales adaptativos y animaciones fluidas."
    },
    {
      name: "JavaScript",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/javascript/D4B830",
      alt: "JavaScript",
      level: "medium",
      defaultDesc: "Lógica dinámica y desarrollo de interfaces ricas en el navegador."
    },
    {
      name: "TypeScript",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/typescript/3178C6",
      alt: "TypeScript",
      level: "advanced",
      defaultDesc: "Tipado estático riguroso para arquitecturas de software robustas y escalables."
    },
    {
      name: "React",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/react/61DAFB",
      alt: "React",
      level: "advanced",
      defaultDesc: "Arquitectura basada en componentes y aplicaciones SPA reactivas de alto rendimiento."
    },
    {
      name: "Vue.js",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D",
      alt: "Vue.js",
      level: "medium",
      defaultDesc: "Framework progresivo para construcción de interfaces de usuario ágiles."
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      alt: "Tailwind CSS",
      level: "advanced",
      defaultDesc: "Diseño modular y consistente mediante utilidades atómicas modernas."
    },
    {
      name: "Vite",
      category: "Frontend",
      icon: "https://cdn.simpleicons.org/vite/646CFF",
      alt: "Vite",
      level: "advanced",
      defaultDesc: "Entorno de desarrollo rápido y empaquetador optimizado para la web."
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      alt: "Node.js",
      level: "medium",
      defaultDesc: "Entorno de ejecución de JavaScript en backend asíncrono y de alto rendimiento."
    },
    {
      name: "Python",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/python/3776AB",
      alt: "Python",
      level: "advanced",
      defaultDesc: "Automatización, scripting, servicios backend versátiles y análisis de datos."
    },
    {
      name: "Go",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/go/00ADD8",
      alt: "Go",
      level: "medium",
      defaultDesc: "Microservicios concurrentes y de baja latencia con compilación nativa ultrarrápida."
    },
    {
      name: "Java",
      category: "Backend",
      icon: "https://api.iconify.design/logos:java.svg",
      alt: "Java",
      level: "medium",
      defaultDesc: "Desarrollo de software orientado a objetos para sistemas y arquitecturas empresariales."
    },
    {
      name: "Django",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/django/44B78B",
      alt: "Django",
      level: "medium",
      defaultDesc: "Framework web de alto nivel en Python con ORM, autenticación y seguridad integradas."
    },
    {
      name: "Flask",
      category: "Backend",
      icon: "https://cdn.simpleicons.org/flask/888888",
      alt: "Flask",
      level: "medium",
      defaultDesc: "Micro-framework ligero y modular para la creación de APIs RESTful eficientes."
    },
    {
      name: "C#",
      category: "Backend",
      icon: "https://api.iconify.design/logos:c-sharp.svg",
      alt: "C#",
      level: "medium",
      defaultDesc: "Aplicaciones robustas aprovechando el ecosistema de alto rendimiento de .NET."
    },
    {
      name: "C",
      category: "Backend",
      icon: "https://api.iconify.design/logos:c.svg",
      alt: "C",
      level: "basic",
      defaultDesc: "Fundamentos de bajo nivel, gestión manual de memoria y algoritmos esenciales."
    },
    {
      name: "PostgreSQL",
      category: "Data",
      icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      alt: "PostgreSQL",
      level: "advanced",
      defaultDesc: "Base de datos relacional avanzada con soporte ACID y extensibilidad empresarial."
    },
    {
      name: "Redis",
      category: "Data",
      icon: "https://cdn.simpleicons.org/redis/FF4438",
      alt: "Redis",
      level: "medium",
      defaultDesc: "Almacenamiento en memoria para caché de datos con latencia sub-milisegundo."
    },
    {
      name: "MongoDB",
      category: "Data",
      icon: "https://cdn.simpleicons.org/mongodb/47A248",
      alt: "MongoDB",
      level: "medium",
      defaultDesc: "Base de datos NoSQL documental flexible y escalable horizontalmente."
    },
    {
      name: "AWS",
      category: "Cloud",
      icon: "https://api.iconify.design/mdi:aws.svg?color=%23FF9900",
      alt: "AWS",
      level: "medium",
      defaultDesc: "Servicios cloud para computación elástica, almacenamiento y arquitecturas resilientes."
    },
    {
      name: "Cloudflare",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/cloudflare/F38020",
      alt: "Cloudflare",
      level: "medium",
      defaultDesc: "Seguridad perimetral, distribución CDN global y edge computing."
    },
    {
      name: "Netlify",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/netlify/00C7B7",
      alt: "Netlify",
      level: "advanced",
      defaultDesc: "Despliegues continuos automatizados y CDN distribuida para aplicaciones web."
    },
    {
      name: "Linux",
      category: "Cloud",
      icon: "https://cdn.simpleicons.org/linux/FCC624",
      alt: "Linux",
      level: "medium",
      defaultDesc: "Administración de servidores, scripting bash y entornos de despliegue en producción."
    },
    {
      name: "Git",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/git/F05032",
      alt: "Git",
      level: "advanced",
      defaultDesc: "Control de versiones distribuido para desarrollo disciplinado y trazable."
    },
    {
      name: "GitHub",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/github/888888",
      alt: "GitHub",
      level: "advanced",
      defaultDesc: "Colaboración en equipo, gestión de repositorios y automatización de CI/CD."
    },
    {
      name: "Docker",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/docker/2496ED",
      alt: "Docker",
      level: "medium",
      defaultDesc: "Contenerización de aplicaciones para portabilidad e infraestructura reproducible."
    },
    {
      name: "Grafana",
      category: "DevOps",
      icon: "https://cdn.simpleicons.org/grafana/F46800",
      alt: "Grafana",
      level: "medium",
      defaultDesc: "Plataforma de telemetría, visualización de métricas y monitorización de sistemas."
    },
    {
      name: "Dart",
      category: "Mobile",
      icon: "https://cdn.simpleicons.org/dart/0175C2",
      alt: "Dart",
      level: "medium",
      defaultDesc: "Lenguaje moderno tipado para interfaces multiplataforma de alto rendimiento."
    },
    {
      name: "Flutter",
      category: "Mobile",
      icon: "https://cdn.simpleicons.org/flutter/45D1FD",
      alt: "Flutter",
      level: "medium",
      defaultDesc: "Framework de Google para crear aplicaciones nativas multiplataforma desde un único codebase."
    },
    {
      name: "VS Code",
      category: "Tooling",
      icon: "https://api.iconify.design/logos:visual-studio-code.svg",
      alt: "VS Code",
      level: "advanced",
      defaultDesc: "Entorno de desarrollo ágil con extensiones especializadas para ingeniería de software."
    }
  ];

  const carouselItems = [...technologies, ...technologies];

  const techDescriptions = (t("techDescriptions", { returnObjects: true }) || {}) as Record<string, string>;

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
    <section id="skills" className="py-20 px-6 border-t border-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t("skillsTitle") || "ARSENAL TÉCNICO"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg">
            {t("skillsTitle")}
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t("skillsDesc")}
          </p>
        </div>

        {/* Continuous Technology Marquee */}
        <div className="tech-carousel">
          <div className="tech-carousel__track">
            {carouselItems.map((technology, index) => (
              <motion.article
                key={`${technology.name}-${index}`}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveSkill(technology)}
                className="tech-carousel__item group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface p-4 cursor-pointer hover:border-primary/50 transition-all shadow-sm"
                title={`${technology.name} - ${t("clickTechHint") || "Click para detalles"}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-hover group-hover:border-primary/40 transition-colors">
                  <img
                    src={technology.icon}
                    alt={technology.alt}
                    className="h-7 w-7 object-contain group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="text-center w-full px-1">
                  <h3 className="text-xs font-semibold text-fg group-hover:text-primary transition-colors truncate">
                    {technology.name}
                  </h3>
                  <span className="text-[10px] font-mono text-muted/70 block truncate">
                    {technology.category}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Skill Details Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSkill(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 max-w-sm w-full relative shadow-2xl"
            >
              <button
                onClick={() => setActiveSkill(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-muted hover:text-fg"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-surface-hover border border-border flex items-center justify-center p-3">
                  <img
                    src={activeSkill.icon}
                    alt={activeSkill.alt}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-fg">{activeSkill.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-muted uppercase">
                      {activeSkill.category}
                    </span>
                    <span className="text-muted/40">•</span>
                    <span className="text-[10px] font-mono font-bold text-primary uppercase">
                      {getLevelLabel(activeSkill.level)}
                    </span>
                  </div>
                </div>

                <p className="text-muted text-xs leading-relaxed mt-2">
                  {techDescriptions[activeSkill.name] || activeSkill.defaultDesc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
