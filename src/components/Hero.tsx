import { motion } from "motion/react";
import { ExternalLink, Github, Linkedin, Mail, Globe, Terminal, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SpaceInvaders } from "./SpaceInvaders";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Blueprint Grid Texture */}
      <div className="pixel-grid absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Main Typography Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-surface text-fg text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="tracking-wide">{t("available")}</span>
            </div>

            {/* Monumental Headline with Space Grotesk */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-fg leading-[0.95]">
              {t("heroTitle1")}{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                {t("heroTitle2")}
              </span>{" "}
              {t("heroTitle3")}
            </h1>

            {/* Description */}
            <p className="text-muted text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              {t("heroDesc1")} <span className="text-fg font-medium">{t("heroDesc2")}</span>{" "}
              {t("heroDesc3")}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all duration-200 flex items-center gap-2 text-sm shadow-sm"
              >
                {t("explore")} <ExternalLink size={16} />
              </a>

              <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-xl bg-surface">
                <a
                  href="https://github.com/0520Jose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors p-1"
                  title="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://trebol4devop.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors p-1"
                  title="Trebol4Devop Organization"
                >
                  <Globe size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors p-1"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:emanuelmonzon360@gmail.com"
                  className="text-muted hover:text-fg transition-colors p-1"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Minimalist Terminal Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 w-full"
          >
            <div className="rounded-2xl border border-border bg-surface shadow-xl overflow-hidden font-mono text-xs">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-hover/50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-1.5 text-muted text-[11px]">
                  <Terminal size={12} className="text-primary" />
                  <span>emanuel.ts</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Code Editor Content */}
              <div className="p-6 space-y-1.5 text-muted leading-relaxed">
                <p>
                  <span className="text-indigo-400">const</span> architect = &#123;
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-400">'Emanuel Monzón'</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-emerald-400">'Systems Architect'</span>,
                </p>
                <p className="pl-4">
                  university: <span className="text-emerald-400">'USAC — Engineering'</span>,
                </p>
                <p className="pl-4">
                  collective: <span className="text-emerald-400">'@Trebol4Devop'</span>,
                </p>
                <p className="pl-4">
                  focus: <span className="text-emerald-400">'Cloud &amp; Distributed Systems'</span>
                </p>
                <p>&#125;;</p>
                <p>&nbsp;</p>
                <p>
                  <span className="text-indigo-400">while</span> (craft &amp;&amp; resilience) &#123;
                </p>
                <p className="pl-4 text-fg">build(scalableArchitecture);</p>
                <p className="pl-4 text-fg">polish(userExperience);</p>
                <p>&#125;</p>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="border-t border-border px-4 py-2.5 bg-surface-hover/30 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-muted">
                  <Activity size={13} className="text-primary" />
                  <span>Production Ready</span>
                </div>
                <span className="text-primary font-bold">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seamless Embedded Mini Space Invaders (Borderless & Integrated into Canvas) */}
        <div className="mt-10">
          <SpaceInvaders />
        </div>
      </div>
    </section>
  );
};
