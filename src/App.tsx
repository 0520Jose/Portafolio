import { motion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";
import { Navbar, Hero, Projects, Skills, Contact, Footer } from "./components";
import { useTheme } from "./hooks/useTheme";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme("dark");

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Content */}
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}