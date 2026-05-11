import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="relative flex items-center">
      <Languages size={20} className="text-muted absolute left-2 pointer-events-none" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none bg-transparent text-fg hover:text-primary text-sm font-bold pl-8 pr-2 py-1 outline-none cursor-pointer transition-colors"
      >
        <option value="es" className="bg-bg text-fg">ES</option>
        <option value="en" className="bg-bg text-fg">EN</option>
        <option value="fr" className="bg-bg text-fg">FR</option>
        <option value="de" className="bg-bg text-fg">DE</option>
        <option value="it" className="bg-bg text-fg">IT</option>
        <option value="pt" className="bg-bg text-fg">PT</option>
      </select>
    </div>
  );
};