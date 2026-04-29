import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import containersImage from "@/assets/containers-1.jpg";

const HeroSection = () => {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-16"
      style={{
        background: "linear-gradient(135deg, hsl(220,25%,5%) 0%, hsl(220,20%,8%) 60%, hsl(220,30%,10%) 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsla(45,100%,50%,1) 1px, transparent 1px),
            linear-gradient(90deg, hsla(45,100%,50%,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(45,100%,50%,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(200,100%,55%,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 flex flex-col min-h-[calc(100vh-64px)]">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center flex-1 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className={`space-y-6 sm:space-y-8 ${isRTL ? "lg:col-start-2 text-right lg:text-right" : "text-left lg:text-left"} text-center lg:text-left`}
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="tag-warm">
                {isAr ? "شركة السامر الدولية" : "Al Samer International"}
              </span>
            </motion.div>

            {/* Headline */}
            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"} text-center lg:text-left`}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] sm:leading-[1.05] text-white">
                {t("hero.title").split(" ").slice(0, -1).join(" ")}
                <br />
                <span className="gradient-text-warm">
                  {t("hero.title").split(" ").slice(-1).join(" ")}
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-white/55 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center lg:justify-start ${isRTL ? "sm:flex-row-reverse" : ""}`}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-fit sm:w-auto"
              >
                <Button variant="hero" size="lg" className="w-fit px-5 py-3 h-auto gap-2 font-bold text-xs sm:text-sm sm:px-6 sm:py-3.5">
                  {t("hero.cta")}
                  <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </motion.a>
              <motion.a
                href={`https://wa.me/9647738828882`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <button
                  className="px-7 py-4 h-auto flex items-center gap-2 font-bold text-sm text-white/80 hover:text-white transition-colors duration-200"
                  style={{
                    background: "hsla(220,20%,12%,0.8)",
                    border: "1px solid hsla(220,30%,25%,0.6)",
                    borderRadius: "6px",
                  }}
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  {isAr ? "تواصل على واتساب" : "WhatsApp Us"}
                </button>
              </motion.a>
            </div>

            {/* Transport modes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`flex items-center gap-4 pt-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className={`flex ${isRTL ? "-space-x-reverse -space-x-3" : "-space-x-3"}`}>
                {[
                  { icon: "🚢", label: "Sea" },
                  { icon: "✈️", label: "Air" },
                  { icon: "🚛", label: "Land" },
                  { icon: "📦", label: "Cargo" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base shadow-lg"
                    style={{
                      background: "hsla(220,20%,14%,1)",
                      border: "2px solid hsla(220,20%,6%,1)",
                    }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50">
                {t("hero.transport.modes")}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Cards */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className={`space-y-4 ${isRTL ? "lg:col-start-1" : ""}`}
          >
            {/* Main shipping card */}
            <div className="glass-card p-5 sm:p-6">
              <div className="space-y-4">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {t("hero.international")}
                  </h3>
                  <span className="tag text-xs">{t("hero.services")}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  {t("hero.international.desc")}
                </p>
                {/* Container Image */}
                <div className="image-card aspect-video">
                  <img
                    src={containersImage}
                    alt="Shipping containers"
                    className="w-full h-full object-cover"
                  />
                  {/* Image overlay badge */}
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-xs font-bold text-white"
                    style={{ background: "hsla(220,20%,5%,0.8)", backdropFilter: "blur(8px)" }}
                  >
                    🚢 {isAr ? "شحن دولي" : "International Freight"}
                  </div>
                </div>
              </div>
            </div>

            {/* Impact numbers card */}
            <div className="glass-card p-5 sm:p-6">
              <h3 className={`text-base sm:text-lg font-bold text-white mb-4 ${isRTL ? "text-right" : ""}`}>
                {t("hero.impact")}
              </h3>
              <div className="space-y-0">
                <div className={`stat-row ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-white/50">{t("hero.miles")}</span>
                  <span className="text-sm text-yellow-400 font-bold">{t("hero.miles.value")}</span>
                </div>
                <div className={`stat-row ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-white/50">{t("hero.shipped")}</span>
                  <span className="text-sm text-yellow-400 font-bold">{t("hero.shipped.value")}</span>
                </div>
                <div className={`stat-row ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-white/50">{isAr ? "سنوات الخبرة" : "Years of Experience"}</span>
                  <span className="text-sm text-yellow-400 font-bold">15+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center pb-4 mt-6"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">
              {isAr ? "اكتشف المزيد" : "Explore"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
