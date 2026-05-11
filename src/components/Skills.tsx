import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export const Skills = () => {
  const { t } = useTranslation();

  const technologies = [
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
    alt: "HTML5",
    description: "Estructura semántica, accesible y lista para proyectos escalables."
  },
  {
    name: "CSS3",
    icon: "https://api.iconify.design/logos:css-3.svg",
    alt: "CSS3",
    description: "Estilos responsivos, sistemas visuales limpios y animaciones fluidas."
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/D4B830",
    alt: "JavaScript",
    description: "Lógica dinámica para interfaces interactivas y experiencias ricas."
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    alt: "React",
    description: "Componentes reutilizables y UI modernas orientadas a rendimiento."
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    alt: "TypeScript",
    description: "Tipado fuerte para mantener bases de código seguras y mantenibles."
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    alt: "Tailwind CSS",
    description: "Diseño rápido y consistente con utilidades modernas."
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    alt: "Python",
    description: "Automatización, scripts y soluciones versátiles para backend o análisis."
  },
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
    alt: "Git",
    description: "Control de versiones para trabajar con orden y confianza."
  },
  {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github/888888",
    alt: "GitHub",
    description: "Colaboración, repositorios y flujo de trabajo profesional."
  },
  {
    name: "Java",
    icon: "https://api.iconify.design/logos:java.svg",
    alt: "Java",
    description: "Desarrollo orientado a objetos para soluciones robustas."
  },
  {
    name: "Go",
    icon: "https://api.iconify.design/logos:go.svg",
    alt: "Go",
    description: "Servicios rápidos y sencillos, ideales para backend concurrente."
  },
  {
    name: "C",
    icon: "https://api.iconify.design/logos:c.svg",
    alt: "C",
    description: "Base sólida para entender bajo nivel y arquitectura de software."
  },
  {
    name: "C#",
    icon: "https://api.iconify.design/logos:c-sharp.svg",
    alt: "C#",
    description: "Aplicaciones robustas con un ecosistema maduro y productivo."
  },
  {
    name: "Dart",
    icon: "https://cdn.simpleicons.org/dart/0175C2",
    alt: "Dart",
    description: "Lenguaje moderno para experiencias multiplataforma."
  },
  {
    name: "Linux",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
    alt: "Linux",
    description: "Entornos de desarrollo y despliegue con control total."
  },
  {
    name: "IoT",
    icon: "https://api.iconify.design/ion:hardware-chip-outline.svg?color=%23888888",
    alt: "IoT",
    description: "Dispositivos conectados y proyectos de hardware inteligente."
  },
  {
    name: "AWS",
    icon: "https://api.iconify.design/mdi:aws.svg?color=%23FF9900",
    alt: "AWS",
    description: "Infraestructura cloud para escalar aplicaciones con fiabilidad."
  },
  {
    name: "Obsidian",
    icon: "https://cdn.simpleicons.org/obsidian/7A52B3",
    alt: "Obsidian",
    description: "Organización de conocimiento y documentación técnica."
  },
  {
    name: "ARM64",
    icon: "https://cdn.simpleicons.org/arm/0091BD",
    alt: "ARM64",
    description: "Arquitectura eficiente para sistemas modernos y embebidos."
  },
  {
    name: "Netlify",
    icon: "https://cdn.simpleicons.org/netlify/00C7B7",
    alt: "Netlify",
    description: "Despliegues rápidos y flujos modernos para sitios estáticos."
  },
  {
    name: "Vite",
    icon: "https://cdn.simpleicons.org/vite/646CFF",
    alt: "Vite",
    description: "Entorno de desarrollo rápido y empaquetador moderno para web."
  },
  {
    name: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    alt: "Node.js",
    description: "Entorno de ejecución para JavaScript en el servidor."
  },
  {
    name: "Django",
    icon: "https://cdn.simpleicons.org/django/44B78B",
    alt: "Django",
    description: "Framework web de alto nivel para desarrollo rápido y limpio."
  },
  {
    name: "Flask",
    icon: "https://cdn.simpleicons.org/flask/888888",
    alt: "Flask",
    description: "Micro-framework web ligero y flexible en Python."
  },
  {
    name: "i18n",
    icon: "https://api.iconify.design/mdi:web.svg?color=%23888888",
    alt: "i18n",
    description: "Internacionalización para adaptar productos a múltiples idiomas."
  },
  {
    name: "Flutter",
    icon: "https://cdn.simpleicons.org/flutter/45D1FD",
    alt: "Flutter",
    description: "Framework para crear aplicaciones compiladas de forma nativa."
  },
  {
    name: "Grafana",
    icon: "https://cdn.simpleicons.org/grafana/F46800",
    alt: "Grafana",
    description: "Plataforma de análisis y monitorización interactiva."
  },
  {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
    alt: "MongoDB",
    description: "Base de datos NoSQL orientada a documentos, escalable y flexible."
  }
];

  const carouselItems = [...technologies, ...technologies];

  return (
    <section id="skills" className="py-32 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-fg">
            {t("skillsTitle")}
          </h2>
          <p className="text-muted max-w-xl mx-auto">{t("skillsDesc")}</p>
        </div>

        {/* Auto Carousel */}
        <div className="tech-carousel">
          <div className="tech-carousel__track">
            {carouselItems.map((technology, index) => (
              <motion.article
                key={`${technology.name}-${index}`}
                whileHover={{ y: -6, scale: 1.05 }}
                className="tech-carousel__item group flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-bg/90 p-6 shadow-lg shadow-black/5 backdrop-blur-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface">
                  <img
                    src={technology.icon}
                    alt={technology.alt}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-center text-sm font-bold text-fg">{technology.name}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
