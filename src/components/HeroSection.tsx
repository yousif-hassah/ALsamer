import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import FlowingCurves from "./FlowingCurves";
import { Button } from "@/components/ui/button";
import containersImage from "@/assets/containers-1.jpg";

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20 sm:pt-24">
      <FlowingCurves variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:py-24">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`space-y-6 sm:space-y-8 ${isRTL ? 'lg:col-start-2 text-right' : ''}`}
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                {t("hero.title").split(" ").slice(0, 2).join(" ")}
                <br />
                <span className="gradient-text-warm">{t("hero.title").split(" ").slice(2).join(" ")}</span>
              </h1>
              <p className="text-base sm:text-lg text-white/60 max-w-md leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="#contact">
                <Button variant="hero" size="lg" className="px-8 py-4 h-auto">
                  {t("hero.cta")}
                </Button>
              </a>
            </motion.div>

            {/* Logistics Images Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`flex items-center gap-3 sm:gap-4 pt-6 sm:pt-8 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex ${isRTL ? 'space-x-reverse -space-x-2 sm:-space-x-3' : '-space-x-2 sm:-space-x-3'}`}>
                {[
                  { icon: "🚢", label: "Sea" },
                  { icon: "✈️", label: "Air" },
                  { icon: "🚛", label: "Land" },
                  { icon: "📦", label: "Cargo" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-background flex items-center justify-center shadow-lg"
                  >
                    <span className="text-sm sm:text-base">{item.icon}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-white/60 font-medium">
                {t("hero.transport.modes")}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Cards */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`space-y-4 sm:space-y-6 ${isRTL ? 'lg:col-start-1' : ''}`}
          >
            {/* International Shipping Card */}
            <div className={`glass-card p-4 sm:p-6 max-w-md mx-auto lg:mx-0 ${isRTL ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{t("hero.international")}</h3>
                
                <span className="tag text-[10px] sm:text-xs">{t("hero.services")}</span>
                
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  {t("hero.international.desc")}
                </p>

                {/* Container Image */}
                <div className="image-card aspect-video mt-3 sm:mt-4">
                  <img
                    src={containersImage}
                    alt="Shipping containers"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Our Impact in Numbers Card */}
            <div className={`glass-card p-4 sm:p-6 max-w-md mx-auto lg:mx-0 ${isRTL ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">{t("hero.impact")}</h3>
              
              <div className="space-y-0">
                <div className={`stat-row ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs sm:text-sm text-white/50">{t("hero.miles")}</span>
                  <span className="text-xs sm:text-sm text-white font-medium">{t("hero.miles.value")}</span>
                </div>
                <div className={`stat-row ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs sm:text-sm text-white/50">{t("hero.shipped")}</span>
                  <span className="text-xs sm:text-sm text-white font-medium">{t("hero.shipped.value")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
