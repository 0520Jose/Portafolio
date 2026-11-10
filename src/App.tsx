import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  Navbar,
  Hero,
  Projects,
  Skills,
  Contact,
  Footer,
} from "./components";
import { useTheme } from "./hooks/useTheme";
import { ArrowUp } from "lucide-react";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme("dark");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg text-fg relative overflow-x-hidden selection:bg-primary/25 selection:text-white">
      {/* Precision Scroll Progress Bar with Signature Accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-primary z-[60] origin-left shadow-sm shadow-primary/50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            title="Volver arriba"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-surface/90 text-neutral-800 dark:text-neutral-200 border border-border shadow-lg hover:border-primary/50 hover:text-primary transition-all duration-200 cursor-pointer backdrop-blur-md"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
