import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Eye, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface GallerySlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

interface Cylindrical3DGalleryProps {
  slides: GallerySlide[];
  title?: string;
  subtitle?: string;
  className?: string;
}

/**
 * High-End 3D Cylindrical Ring Carousel
 * Inspired by SAMNU scientific software showcase architecture.
 * Implements genuine CSS 3D matrix transforms (preserve-3d, perspective, translateZ, rotateY).
 */
export const Cylindrical3DGallery: React.FC<Cylindrical3DGalleryProps> = ({
  slides,
  title,
  subtitle,
  className = "",
}) => {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideCount = slides.length;
  const anglePerSlide = slideCount > 0 ? 360 / slideCount : 0;

  // Calculate cylinder radius dynamically based on screen width
  const radius = useMemo(() => {
    if (slideCount <= 1) return 0;
    const isMobile = viewportWidth < 640;
    const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
    const cardWidth = isMobile ? 260 : isTablet ? 340 : 420;
    const angleRad = (anglePerSlide * Math.PI) / 360;
    const computedRadius = Math.round(cardWidth / 2 / Math.tan(angleRad) + 60);
    const minRadius = isMobile ? 320 : isTablet ? 480 : 620;
    return Math.max(minRadius, computedRadius);
  }, [slideCount, anglePerSlide, viewportWidth]);

  const nextSlide = useCallback(() => {
    if (slideCount < 2) return;
    setRotationY((prev) => prev - anglePerSlide);
    setActiveIdx((prev) => (prev + 1) % slideCount);
  }, [slideCount, anglePerSlide]);

  const prevSlide = useCallback(() => {
    if (slideCount < 2) return;
    setRotationY((prev) => prev + anglePerSlide);
    setActiveIdx((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount, anglePerSlide]);

  const goToSlide = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeIdx) return;
      let diff = targetIdx - activeIdx;
      if (diff > slideCount / 2) diff -= slideCount;
      if (diff < -slideCount / 2) diff += slideCount;
      setRotationY((prev) => prev - diff * anglePerSlide);
      setActiveIdx(targetIdx);
    },
    [activeIdx, slideCount, anglePerSlide]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Sync active thumbnail scroll
  useEffect(() => {
    const container = thumbnailsRef.current;
    if (!container) return;
    const activeEl = container.children[activeIdx] as HTMLElement | undefined;
    if (!activeEl) return;
    const cRect = container.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();
    const offset = tRect.left - cRect.left - cRect.width / 2 + tRect.width / 2;
    container.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeIdx]);

  const currentSlide = slides[activeIdx] || slides[0];

  return (
    <div className={`space-y-10 select-none ${className}`}>
      {/* Header if provided */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-primary text-xs font-mono font-semibold uppercase tracking-widest">
              <Layers size={14} />
              <span>3D Cylindrical View</span>
            </div>
            {title && (
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Diapositiva anterior"
              className="p-3.5 rounded-2xl bg-surface hover:bg-surface-hover text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all shadow-md hover:shadow-xl cursor-pointer backdrop-blur-md active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="px-4 py-2 rounded-xl bg-surface/80 text-xs font-mono text-muted shadow-xs">
              <span className="text-primary font-bold">{activeIdx + 1}</span> / {slideCount}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente diapositiva"
              className="p-3.5 rounded-2xl bg-surface hover:bg-surface-hover text-neutral-700 dark:text-neutral-300 hover:text-primary transition-all shadow-md hover:shadow-xl cursor-pointer backdrop-blur-md active:scale-95"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 3D Cylindrical Stage */}
      <div
        className="relative flex min-h-[440px] sm:min-h-[500px] md:min-h-[560px] w-full flex-col items-center justify-center overflow-hidden py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={(e) => {
          const t0 = e.touches[0];
          touchStartRef.current = { x: t0.clientX, y: t0.clientY };
        }}
        onTouchEnd={(e) => {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (!start || slideCount < 2) return;
          const end = e.changedTouches[0];
          const dx = start.x - end.clientX;
          const dy = start.y - end.clientY;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) nextSlide();
            else prevSlide();
          }
        }}
      >
        <div
          className="relative flex w-full flex-1 items-center justify-center"
          style={{ perspective: "1500px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${rotationY}deg)`,
              transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === activeIdx;
              const angle = idx * anglePerSlide;

              return (
                <div
                  key={slide.id}
                  onClick={() => !isActive && goToSlide(idx)}
                  className={`absolute w-[280px] sm:w-[360px] md:w-[440px] rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer border-0 ${
                    isActive
                      ? "shadow-2xl shadow-primary/20 opacity-100 bg-surface scale-100"
                      : "bg-surface/75 opacity-40 hover:opacity-75 blur-[0.5px] scale-95"
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Safari Window Header (Seamless, Borderless) */}
                  <div className="px-5 py-3.5 bg-surface-hover/70 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider truncate max-w-[160px]">
                      {slide.category}
                    </span>
                    <span className="text-[10px] text-primary font-semibold">0{idx + 1}</span>
                  </div>

                  {/* Image Canvas Frame */}
                  <div className="relative aspect-[16/10] bg-[#0c0d12]/90 flex items-center justify-center overflow-hidden p-4">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/75 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
                          <Eye size={12} /> Click para enfocar
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content (Clean & Direct) */}
                  <div className="p-6 space-y-3 bg-surface">
                    <div>
                      <h4 className="font-display text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-neutral-500 font-sans mt-1 line-clamp-1">
                        {slide.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {slide.tech.map((tItem) => (
                        <span
                          key={tItem}
                          className="px-2.5 py-0.5 bg-surface-hover rounded-lg text-[10px] font-mono text-neutral-600 dark:text-neutral-300"
                        >
                          {tItem}
                        </span>
                      ))}
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-2 pt-3">
                        {slide.liveUrl && (
                          <a
                            href={slide.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-fluid flex-1 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-mono font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                        {slide.githubUrl && (
                          <a
                            href={slide.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-surface-hover text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                            title="Repositorio GitHub"
                          >
                            <Github size={15} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Synchronized Thumbnails Dock (Seamless, Borderless) */}
      <div
        ref={thumbnailsRef}
        className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-4 no-scrollbar"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shrink-0 border-0 ${
                isActive
                  ? "bg-primary text-white font-bold shadow-md shadow-primary/25 scale-105"
                  : "bg-surface/80 text-muted hover:bg-surface-hover hover:text-fg shadow-xs"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? "bg-white" : "bg-neutral-400 dark:bg-neutral-600"
                }`}
              />
              <span className="truncate max-w-[140px]">{slide.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
