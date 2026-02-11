import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-white.webp";

const Navbar = () => {
  const { t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.tracking"), href: "#tracking" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-md bg-background/80 border-b border-white/5"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Logo */}
          <a
            href="#"
            className={`flex items-center gap-2 sm:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <img
                src={logo}
                alt="Al Samer Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className={`${isRTL ? "text-right" : "text-left"}`}>
              <span className="text-white font-bold text-sm sm:text-lg block leading-tight">
                ALSamer
              </span>
              <span className="text-white/50 text-[10px] sm:text-xs hidden sm:block">
                International Company
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link text-sm">
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side - Language Toggle & Mobile Menu */}
          <div
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <LanguageToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <nav className="relative z-10 flex flex-col items-center justify-center gap-8 p-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
