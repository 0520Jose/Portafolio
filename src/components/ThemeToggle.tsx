import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-xl hover:bg-surface-hover text-neutral-600 dark:text-neutral-400 hover:text-primary flex items-center justify-center transition-colors focus-visible:outline-none cursor-pointer border-0"
      aria-label="Toggle visual theme"
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? (
        <Sun size={17} strokeWidth={1.75} />
      ) : (
        <Moon size={17} strokeWidth={1.75} />
      )}
    </button>
  );
};
