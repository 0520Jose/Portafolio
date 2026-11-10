import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="relative inline-flex items-center">
      <Globe size={14} className="text-neutral-500 dark:text-neutral-400 absolute left-2 pointer-events-none" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Seleccionar idioma"
        className="appearance-none bg-transparent hover:bg-surface-hover text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white text-xs font-mono font-medium pl-7 pr-3 py-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none border-0"
      >
        <option value="es" className="bg-bg text-fg">ES</option>
        <option value="en" className="bg-bg text-fg">EN</option>
        <option value="fr" className="bg-bg text-fg">FR</option>
        <option value="de" className="bg-bg text-fg">DE</option>
        <option value="it" className="bg-bg text-fg">IT</option>
        <option value="pt" className="bg-bg text-fg">PT</option>
        <option value="ja" className="bg-bg text-fg">JA</option>
      </select>
    </div>
  );
};
