import { motion, AnimatePresence } from "motion/react";
import { Code2, Menu, X } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = t("nav", { returnObjects: true }) as string[];
  const navLinks = ["about", "projects", "skills", "contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div
          className="flex items-center gap-2 group cursor-pointer z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Code2 className="text-white" size={24} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-fg">
            Emanuel M.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems?.map?.((item: string, index: number) => (
            <a
              key={item}
              href={`#${navLinks[index]}`}
              className="text-sm font-medium text-muted hover:text-fg transition-colors"
            >
              {item}
            </a>
          ))}

          <div className="flex items-center gap-3 border-l border-border pl-6">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <LanguageSelector />
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 bg-fg text-bg rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all duration-300"
          >
            {t("hireMe")}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4 z-50">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <LanguageSelector />
          <button 
            className="text-fg" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden"
          >
            {navItems?.map?.((item: string, index: number) => (
              <a
                key={item}
                href={`#${navLinks[index]}`}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-fg hover:text-primary transition-colors block py-2"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-5 py-3 bg-fg text-bg rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 mt-2"
            >
              {t("hireMe")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};