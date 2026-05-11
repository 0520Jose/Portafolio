import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="font-display text-5xl font-bold text-fg">
              {t("contactTitle1")} <br />
              {t("contactTitle2")} <span className="text-gradient">{t("contactTitle3")}</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">{t("contactDesc")}</p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-border w-fit">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                    {t("email")}
                  </p>
                  <p className="font-medium px-2 text-fg">emanuelmonzon360@gmail.com</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-border w-fit">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                    {t("whatsapp")}
                  </p>
                  <p className="font-medium px-2 text-fg">+502 4275 2670</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4 bento-card p-8">
            {/* Name & Type Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted px-2 uppercase">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("placeName")}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted px-2 uppercase">
                  {t("typeLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("placeType")}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted px-2 uppercase">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                placeholder={t("placeEmail")}
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted px-2 uppercase">
                {t("msgLabel")}
              </label>
              <textarea
                rows={4}
                placeholder={t("placeMsg")}
                className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-fg focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98]"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
