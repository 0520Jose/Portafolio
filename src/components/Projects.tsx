import { motion } from "motion/react";
import { Github, Database, Palette, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  const projectsData = t("projectsData", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const projects = [
    {
      title: projectsData?.[1]?.title || "Interactive Portfolio Showcase",
      desc:
        projectsData?.[1]?.desc ||
        "A polished personal portfolio experience designed to highlight projects, skills, and contact details with strong visual hierarchy.",
      tech: ["React", "Motion", "Tailwind"],
      icon: <Palette size={24} />,
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-fg">
              {t("projectsTitle")}
            </h2>
            <p className="text-muted max-w-md">{t("projectsDesc")}</p>
          </div>
          <a
            href="https://github.com/0520Jose"
            className="text-sm font-bold flex items-center gap-2 text-fg hover:text-primary transition-colors"
          >
            {t("viewAll")} <Github size={16} />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bento-card group flex flex-col justify-between"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-card-bg border border-border rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  {proj.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-fg">{proj.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 group-hover:text-fg/80 transition-colors">
                  {proj.desc}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2">
                {proj.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-card-bg rounded-lg text-[10px] font-mono font-bold text-muted border border-border uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
