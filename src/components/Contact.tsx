import { useRef, useState } from "react";
import { Mail, Building2, MapPin, ArrowUpRight, Github, Linkedin, Check, Copy, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { AsanohaWatermark, KamonCrest } from "./JapaneseDecorations";

export const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText("emanuelmonzon360@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

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
          { scaleX: 0, transformOrigin: "left center", duration: 0.6 },
          "-=0.4"
        )
        .from(
          headerDescRef.current,
          { opacity: 0, y: 16, duration: 0.5 },
          "-=0.3"
        );

      // Contact cards — stagger from left
      gsap.utils.toArray<HTMLElement>(".gsap-contact-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });

      // Contact form — reveal from right
      gsap.from(".gsap-contact-form", {
        scrollTrigger: {
          trigger: ".gsap-contact-form",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Social links footer
      gsap.from(".gsap-social-links", {
        scrollTrigger: {
          trigger: ".gsap-social-links",
          start: "top 92%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 px-6 relative overflow-hidden bg-[#f4f7f5] dark:bg-[#0e1312] transition-colors duration-700"
    >
      {/* Shoji Lattice Grid Texture */}
      <div className="pixel-grid absolute inset-0 z-0 pointer-events-none opacity-20" />

      {/* Asanoha Geometric Kumiko Art Watermark */}
      <div className="absolute -bottom-10 right-4 lg:right-16 pointer-events-none z-0 text-neutral-800/10 dark:text-neutral-500/15">
        <AsanohaWatermark size={300} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              {/* Kamon Visual Crest */}
              <div className="text-neutral-400/40 dark:text-neutral-500/35 mb-2">
                <KamonCrest size={32} />
              </div>

              <h2
                ref={headerTitleRef}
                className="text-3xl sm:text-5xl md:text-6xl font-bold font-display text-neutral-900 dark:text-white tracking-tight leading-tight"
              >
                {t("contactTitle1")}{" "}
                <span className="text-primary italic font-serif">
                  {t("contactTitle2")}
                </span>{" "}
                {t("contactTitle3")}
              </h2>

              <div
                ref={headerLineRef}
                className="w-16 h-[2px] bg-primary/50 my-4"
              />

              <p
                ref={headerDescRef}
                className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-sans"
              >
                {t("contactDesc")}
              </p>
            </div>

            {/* Direct Contact Cards (Clean, Seamless, Borderless) */}
            <div className="space-y-4 pt-2">
              {/* Email with 1-click copy */}
              <div className="gsap-contact-card feature-card flex items-center gap-4 p-5 rounded-2xl bg-surface/90 shadow-md hover:shadow-xl transition-all group border-0">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    {t("email")}
                  </span>
                  <a
                    href="mailto:emanuelmonzon360@gmail.com"
                    className="text-sm font-medium text-neutral-900 dark:text-white truncate block hover:text-primary transition-colors"
                  >
                    emanuelmonzon360@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-md bg-surface-hover text-[11px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 border-0 shadow-xs"
                  title="Copiar correo"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Organization */}
              <a
                href="https://trebol4devop.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-contact-card feature-card flex items-center gap-4 p-5 rounded-2xl bg-surface/90 shadow-md hover:shadow-xl transition-all group border-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <Building2 size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    {t("organization")}
                  </span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white truncate block group-hover:text-primary transition-colors">
                    Trebol4Devop Engineering
                  </span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-neutral-400 group-hover:text-primary transition-colors"
                />
              </a>

              {/* Location */}
              <div className="gsap-contact-card feature-card flex items-center gap-4 p-5 rounded-2xl bg-surface/90 shadow-md border-0">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    Ubicación
                  </span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                    Guatemala (Remoto &amp; Presencial)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="gsap-social-links flex items-center gap-4 pt-2">
              <a
                href="https://github.com/0520Jose"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors"
              >
                <Github size={15} />
                <span>GitHub ↗</span>
              </a>
              <span className="text-neutral-400">•</span>
              <a
                href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary-light transition-colors"
              >
                <Linkedin size={15} />
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Contact Form Card (Structured, Borderless) */}
          <div className="lg:col-span-7">
            <div className="gsap-contact-form feature-card rounded-2xl bg-surface/95 backdrop-blur-md shadow-2xl p-7 sm:p-10 border-0">
              <form
                action="https://formspree.io/f/xkoknvkg"
                method="POST"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      {t("nameLabel")}
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={t("placeName")}
                      className="w-full bg-surface-hover rounded-xl px-5 py-3.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-neutral-500 border-0 shadow-inner"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      {t("typeLabel")}
                    </label>
                    <input
                      name="project_type"
                      type="text"
                      placeholder={t("placeType")}
                      className="w-full bg-surface-hover rounded-xl px-5 py-3.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-neutral-500 border-0 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                    {t("emailLabel")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t("placeEmail")}
                    className="w-full bg-surface-hover rounded-xl px-5 py-3.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-neutral-500 border-0 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                    {t("msgLabel")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={t("placeMsg")}
                    className="w-full bg-surface-hover rounded-xl px-5 py-3.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-neutral-500 resize-none border-0 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-fluid w-full inline-flex min-h-12 items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 cursor-pointer"
                >
                  <Send size={15} />
                  <span>{t("send")}</span>
                  <ArrowUpRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
