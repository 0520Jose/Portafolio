import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 bg-[#efeae3] dark:bg-[#08080a] transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-xl leading-none text-neutral-900 dark:text-white">
            EM
          </span>
          <span className="text-xs font-sans font-medium tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
            Emanuel Monzón
            <span className="block text-[10px] text-neutral-400 font-mono tracking-widest normal-case">
              USAC • Engineering
            </span>
          </span>
        </div>

        <p className="text-neutral-500 text-xs font-mono">
          © 2026 Emanuel Monzón. {t("rights")}
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/0520Jose"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://trebol4devop.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            title="Organización Trebol4Devop"
            aria-label="Trebol4Devop"
          >
            <Globe size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:emanuelmonzon360@gmail.com"
            className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            title="Email"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
