import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-white.webp";
import { CONTACT_CONFIG } from "@/config/contact";

const Footer = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.tracking"), href: "#tracking" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="relative py-10 sm:py-12 lg:py-16 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 ${isRTL ? "text-right" : ""}`}
        >
          {/* Logo & Description */}
          <div className="col-span-2 space-y-3 sm:space-y-4">
            <div
              className={`flex items-center gap-2 sm:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <img
                  src={logo}
                  alt="Al Samer Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <span className="text-white font-bold text-sm sm:text-lg block">
                  Al Samer International
                </span>
                <span className="text-white/50 text-[10px] sm:text-xs">
                  Company for Trade and Transport
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
              {t("footer.quicklinks")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="text-xs sm:text-sm text-white/50 break-all">
                {CONTACT_CONFIG.primaryEmail}
              </li>
              <li className="text-xs sm:text-sm text-white/50">
                {CONTACT_CONFIG.phones[0].label}
              </li>
              <li className="text-xs sm:text-sm text-white/50">
                Baghdad, Iraq
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}
        >
          <div className="text-center sm:text-left">
            <p className="text-[10px] sm:text-xs text-white/40">
              {t("footer.rights")}
            </p>
            <p className="text-[10px] sm:text-xs text-white/30 mt-0.5 sm:mt-1">
              {t("footer.made")}
            </p>
          </div>
          <div
            className={`flex items-center gap-4 sm:gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <a
              href="#"
              className="text-[10px] sm:text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#"
              className="text-[10px] sm:text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
