import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-card-bg rounded-lg flex items-center justify-center">
            <Code2 size={16} className="text-muted" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-fg">
            Emanuel M.
          </span>
        </div>

        <p className="text-muted text-xs">© 2026 Emanuel Monzón. {t("rights")}</p>

        <div className="flex items-center gap-6">
          <a href="https://github.com/0520Jose" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/josé-emanuel-monzón-lémus-4970b4237" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors">
            <Linkedin size={18} />
          </a>
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=emanuelmonzon360@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-fg transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};