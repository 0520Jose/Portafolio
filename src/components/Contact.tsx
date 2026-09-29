import { Mail, Building2, ExternalLink, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-28 px-6 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              COMMUNICATION CHANNEL
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
              {t("contactTitle1")}{" "}
              <span className="text-primary">{t("contactTitle2")}</span>{" "}
              {t("contactTitle3")}
            </h2>

            <p className="text-muted text-base leading-relaxed max-w-md">
              {t("contactDesc")}
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <a
                href="mailto:emanuelmonzon360@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-border-hover transition-colors group"
              >
                <div className="w-10 h-10 bg-surface-hover border border-border rounded-lg flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider">
                    {t("email")}
                  </p>
                  <p className="font-medium text-sm text-fg truncate">emanuelmonzon360@gmail.com</p>
                </div>
              </a>

              {/* Organization Card */}
              <a
                href="https://trebol4devop.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-border-hover transition-colors group"
              >
                <div className="w-10 h-10 bg-surface-hover border border-border rounded-lg flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider">
                    {t("organization")}
                  </p>
                  <p className="font-medium text-sm text-fg flex items-center gap-1.5">
                    Trebol4Devop
                    <ExternalLink size={13} className="text-muted group-hover:text-primary transition-colors" />
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Minimalist Contact Form Column */}
          <div className="lg:col-span-7">
            <form 
              action="https://formspree.io/f/xkoknvkg" 
              method="POST"
              className="space-y-4 rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              {/* Name & Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
                    {t("nameLabel")}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t("placeName")}
                    className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
                    {t("typeLabel")}
                  </label>
                  <input
                    name="project_type"
                    type="text"
                    placeholder={t("placeType")}
                    className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
                  {t("emailLabel")}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t("placeEmail")}
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors placeholder:text-muted/60"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider">
                  {t("msgLabel")}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t("placeMsg")}
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted/60"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-mono shadow-sm"
              >
                <span>{t("send")}</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
