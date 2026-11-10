import { useRef } from "react";
import { Github, Linkedin, Mail, Globe, ArrowUpRight, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { useCardTilt } from "../hooks/useCardTilt";
import { SpaceInvaders } from "./SpaceInvaders";
import { EnsoCircle } from "./JapaneseDecorations";

interface HeroProps {
  onOpenArcade?: () => void;
}

export const Hero = ({ onOpenArcade }: HeroProps = {}) => {
  const { t, i18n } = useTranslation();
  const { ref: macTiltRef, onMouseMove: onMacMouseMove, onMouseLeave: onMacMouseLeave } = useCardTilt(4.5);

  // Refs for GSAP timeline orchestration
  const containerRef = useRef<HTMLElement>(null);
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = {
        line1: heroLine1Ref.current,
        line2: heroLine2Ref.current,
        desc: descRef.current,
        cta: ctaRef.current,
        footer: footerRef.current,
        card: cardRef.current,
      };

      // On language change: instant reveal, no re-animation
      if (hasAnimated.current) {
        gsap.set(Object.values(targets).filter(Boolean), {
          opacity: 1,
          y: 0,
          x: 0,
          yPercent: 0,
        });
        return;
      }

      // Set initial states (hidden) — prevents flash
      gsap.set([targets.line1, targets.line2], { yPercent: 110 });
      gsap.set(targets.desc, { opacity: 0, y: 20 });
      gsap.set(targets.cta, { opacity: 0, y: 20 });
      gsap.set(targets.footer, { opacity: 0, y: 12 });
      gsap.set(targets.card, { opacity: 0, x: 50, scale: 0.96 });

      // Cinematic entrance timeline
      const tl = gsap.timeline({ delay: 0.15 });

      tl
        // 1. First headline line slides up from mask
        .to(
          targets.line1,
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
          }
        )
        // 2. Second headline line follows (staggered)
        .to(
          targets.line2,
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.75"
        )
        // 4. Description fades in
        .to(
          targets.desc,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // 5. CTAs stagger in
        .to(
          targets.cta,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // 6. Footer strip resolves
        .to(
          targets.footer,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        // 7. Architecture Mac Window slides in with 3D scale
        .to(
          targets.card,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=1.0"
        );

      hasAnimated.current = true;
    },
    { scope: containerRef, dependencies: [i18n.language] }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden bg-[#fcfbf9] dark:bg-[#0c0c0e] transition-colors duration-700"
    >
      {/* Shoji Lattice Grid Texture */}
      <div className="pixel-grid absolute inset-0 z-0 pointer-events-none" />

      {/* Zen Ensō Art Watermark */}
      <div className="absolute top-24 right-4 lg:right-20 pointer-events-none z-0 text-neutral-800/10 dark:text-neutral-500/15">
        <EnsoCircle size={460} />
      </div>

      {/* Main Editorial Typography & Mac Window */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Editorial Typography Column */}
          <div className="lg:col-span-6 space-y-7">
            {/* Monumental Headline with Clip-Mask Reveal & Indigo Signature Accent */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl xl:text-[6.5rem] font-bold font-display tracking-tight text-neutral-900 dark:text-white leading-[0.95]">
              <span className="overflow-hidden block">
                <span ref={heroLine1Ref} className="block will-change-transform">
                  {t("heroTitle1")}{" "}
                  <span className="text-primary underline decoration-primary/40 underline-offset-8 font-serif italic">
                    {t("heroTitle2")}
                  </span>
                </span>
              </span>
              <span className="overflow-hidden block">
                <span ref={heroLine2Ref} className="block will-change-transform">
                  {t("heroTitle3")}
                </span>
              </span>
            </h1>

            {/* Editorial Description */}
            <p
              ref={descRef}
              className="text-neutral-600 dark:text-neutral-300 text-lg sm:text-xl leading-relaxed max-w-xl font-sans"
            >
              {t("heroDesc1")}{" "}
              <span className="text-neutral-900 dark:text-white font-medium">
                {t("heroDesc2")}
              </span>{" "}
              {t("heroDesc3")}
            </p>

            {/* Direct Calls to Action (Fluid, Seamless, Crisp Engineering Aesthetic) */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="btn-fluid inline-flex min-h-12 items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold text-xs font-mono uppercase tracking-wider rounded-lg shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
              >
                <span>{t("explore")}</span>
                <ArrowUpRight size={16} />
              </a>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md shadow-md border-0">
                <a
                  href="https://github.com/0520Jose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors p-2 rounded-md hover:bg-surface-hover"
                  title="GitHub Profile"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://trebol4devop.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors p-2 rounded-md hover:bg-surface-hover"
                  title="Trebol4Devop Engineering Collective"
                  aria-label="Organización Trebol4Devop"
                >
                  <Globe size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors p-2 rounded-md hover:bg-surface-hover"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:emanuelmonzon360@gmail.com"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors p-2 rounded-md hover:bg-surface-hover"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Location & Academic Footer Strip */}
            <div
              ref={footerRef}
              className="pt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400"
            >
              <span className="w-8 h-[2px] bg-primary/40 inline-block rounded-full" />
              <span>Guatemala • USAC Ingeniería • @Trebol4Devop</span>
            </div>
          </div>

          {/* Right Column: Authentic macOS Terminal Window with 3D Tilt (Zero Borders, Crisp 12px Radius) */}
          <div ref={cardRef} className="lg:col-span-6 w-full">
            <div
              ref={macTiltRef}
              onMouseMove={onMacMouseMove}
              onMouseLeave={onMacMouseLeave}
              className="mac-window rounded-xl bg-surface/95 shadow-2xl backdrop-blur-md overflow-hidden font-mono text-xs transition-transform duration-200 ease-out will-change-transform border-0 w-full"
            >
              {/* macOS Window Chrome Header with Traffic Lights */}
              <div className="mac-titlebar px-6 py-4 bg-surface-hover/80 flex items-center justify-between border-0">
                <div className="flex items-center gap-2">
                  <div className="mac-dot mac-dot-close" title="Cerrar" />
                  <div className="mac-dot mac-dot-minimize" title="Minimizar" />
                  <div className="mac-dot mac-dot-maximize" title="Maximizar" />
                </div>

                <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 text-[11px] font-semibold">
                  <Terminal size={13} className="text-primary" />
                  <span>emanuel.ts — 80×28</span>
                </div>

                <div className="w-12" />
              </div>

              {/* Code Editor Body */}
              <div className="p-6 sm:p-7 space-y-2.5 text-neutral-600 dark:text-neutral-300 leading-relaxed bg-[#0c0d12]/95 dark:bg-[#0a0b0e]/95 text-[#f1f5f9]">
                <p>
                  <span className="text-indigo-400 font-semibold">const</span> architect = &#123;
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-400">'José Emanuel Monzón'</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-emerald-400">'Distributed Systems &amp; Cloud Architect'</span>,
                </p>
                <p className="pl-4">
                  faculty: <span className="text-emerald-400">'USAC — Fac. Ingeniería'</span>,
                </p>
                <p className="pl-4">
                  collective: <span className="text-indigo-300">'@Trebol4Devop'</span>,
                </p>
                <p className="pl-4">
                  stack: [<span className="text-amber-300">'Go'</span>, <span className="text-amber-300">'Docker'</span>, <span className="text-amber-300">'Kubernetes'</span>, <span className="text-amber-300">'React'</span>]
                </p>
                <p>&#125;;</p>
                <div className="my-3 border-b border-white/10" />
                <p>
                  <span className="text-indigo-400 font-semibold">async function</span> <span className="text-blue-400">deploySystems</span>() &#123;
                </p>
                <p className="pl-4 text-neutral-400">
                  <span className="text-indigo-400">await</span> samnu.<span className="text-purple-300">computeAlgorithms</span>(30);
                </p>
                <p className="pl-4 text-neutral-400">
                  <span className="text-indigo-400">await</span> pemtree.<span className="text-purple-300">renderGraph</span>();
                </p>
                <p className="pl-4 text-emerald-400">
                  return <span className="text-emerald-300">"Production grade resilient"</span>;
                </p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Embedded 3D Space Invaders Experience */}
        <div id="space-invaders-zone" className="mt-14 sm:mt-16 w-full border-0">
          <SpaceInvaders />
        </div>
      </div>
    </section>
  );
};
