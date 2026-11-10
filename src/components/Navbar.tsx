import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  theme: string;
  onThemeToggle: () => void;
}

export const Navbar = ({ theme, onThemeToggle }: NavbarProps) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = t("nav", { returnObjects: true }) as string[];
  const navLinks = ["about", "projects", "skills", "contact"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0a0a0a]/85 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Monogram & Identity */}
        <a
          href="#about"
          className="flex items-center gap-3 group text-fg cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-serif italic text-2xl font-normal leading-none text-neutral-900 dark:text-white group-hover:opacity-80 transition-opacity">
            EM
          </span>
          <span className="text-xs font-sans font-semibold tracking-[0.14em] uppercase leading-tight text-neutral-900 dark:text-white">
            Emanuel Monzón
            <span className="block text-[10px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400 font-normal normal-case font-mono">
              Systems Architect &amp; Dev
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            {navItems?.map?.((item: string, index: number) => (
              <a
                key={item}
                href={`#${navLinks[index]}`}
                className="relative hover:text-black dark:hover:text-white transition-colors py-2 font-medium group"
              >
                {item}
                {/* Animated underline reveal */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 dark:bg-white group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-border pl-6">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <LanguageSelector />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-surface-hover text-neutral-800 dark:text-neutral-200 hover:text-primary transition-colors cursor-pointer border-0"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-border px-6 py-6 space-y-4 shadow-lg"
          >
            <nav className="flex flex-col space-y-3">
              {navItems?.map?.((item: string, index: number) => (
                <a
                  key={item}
                  href={`#${navLinks[index]}`}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-serif text-neutral-900 dark:text-white hover:opacity-75 transition-opacity py-1"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
