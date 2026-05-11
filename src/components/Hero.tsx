import { motion } from "motion/react";
import { ExternalLink, Code2, Github, Linkedin, Mail, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="pixel-grid absolute inset-0 z-0" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-bg border border-border text-primary-light text-xs font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("available")}
          </div>

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-fg">
            {t("heroTitle1")} <span className="text-gradient">{t("heroTitle2")}</span>{" "}
            {t("heroTitle3")}
          </h1>

          {/* Description */}
          <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            {t("heroDesc1")} <span className="text-fg font-medium">{t("heroDesc2")}</span>{" "}
            {t("heroDesc3")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all duration-300 flex items-center gap-2"
            >
              {t("explore")} <ExternalLink size={18} />
            </a>
            <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-2xl bg-card-bg backdrop-blur-sm">
              <a href="https://github.com/0520Jose" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:emanuelmonzon360@gmail.com" className="text-muted hover:text-fg transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Code Window Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-indigo-500/20 rounded-3xl rotate-12 border border-border backdrop-blur-sm -z-10 absolute inset-0" />
          <div className="w-[500px] h-[500px] bg-surface rounded-3xl border border-border shadow-2xl p-8 flex flex-col justify-between">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-mono text-muted">amanuel.ts — 428 loc</span>
            </div>

            {/* Code Content */}
            <div className="font-mono text-sm space-y-2 py-6 text-muted">
              <p>
                <span className="text-indigo-400">const</span> developer = &#123;
              </p>
              <p className="pl-4">
                name: <span className="text-green-400">'Emanuel Monzón'</span>,
              </p>
              <p className="pl-4">
                role: <span className="text-green-400">'Full Stack Architect'</span>,
              </p>
              <p className="pl-4">
                focus: <span className="text-green-400">'Performance & UX'</span>,
              </p>
              <p className="pl-4">
                vision:{" "}
                <span className="text-green-400">'Clean code, beautiful UI'</span>
              </p>
              <p>&#125;;</p>
              <p>&nbsp;</p>
              <p>
                <span className="text-indigo-400">while</span> (opportunity) &#123;
              </p>
              <p className="pl-4">solve(complexProblems);</p>
              <p className="pl-4">create(aestheticInterfaces);</p>
              <p>&#125;</p>
            </div>

            {/* Footer */}
            <div className="bg-card-bg rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Rocket className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-fg">Latest App Build</p>
                  <p className="text-[10px] text-muted">V1.2.4 — 100% test pass</p>
                </div>
              </div>
              <div className="h-6 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-primary-light font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
