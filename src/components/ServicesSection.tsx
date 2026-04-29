import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Truck,
  Ship,
  Plane,
  FileCheck,
  Warehouse,
  HeadphonesIcon,
} from "lucide-react";
import truckImg from "@/assets/truck-delivery.jpg";
import seaImg from "@/assets/sea-freight.png";
import airImg from "@/assets/air-freight.png";

const ServicesSection = () => {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const mainServices = [
    {
      icon: Truck,
      title: t("services.land"),
      description: t("services.land.desc"),
      image: truckImg,
      color: "hsl(45, 100%, 50%)",
      emoji: "🚚",
    },
    {
      icon: Ship,
      title: t("services.sea"),
      description: t("services.sea.desc"),
      image: seaImg,
      color: "hsl(200, 100%, 55%)",
      emoji: "🚢",
    },
    {
      icon: Plane,
      title: t("services.air"),
      description: t("services.air.desc"),
      image: airImg,
      color: "hsl(270, 90%, 65%)",
      emoji: "✈️",
    },
  ];

  const otherServices = [
    {
      icon: FileCheck,
      title: t("services.customs"),
      description: t("services.customs.desc"),
      color: "hsl(145, 75%, 50%)",
    },
    {
      icon: Warehouse,
      title: t("services.warehouse"),
      description: t("services.warehouse.desc"),
      color: "hsl(15, 100%, 60%)",
    },
    {
      icon: HeadphonesIcon,
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
      color: "hsl(320, 80%, 55%)",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, hsla(200,100%,55%,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="tag-warm mb-4 inline-block">{t("services.tag")}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("services.title")}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Main 3 Services — Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="container-card group"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, hsl(220,20%,8%) 0%, transparent 55%)`,
                  }}
                />
                {/* Top emoji badge */}
                <div
                  className="absolute top-3 left-3 text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{
                    background: "hsla(220,20%,5%,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {service.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ background: service.color }}
                  />
                  <h3 className="text-white font-bold text-lg">{service.title}</h3>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom link */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "hsla(220,30%,18%,0.6)" }}>
                  <a
                    href="#contact"
                    className="text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200"
                    style={{ color: service.color }}
                  >
                    {isAr ? "استفسر الآن" : "Inquire Now"}
                    <span className={isRTL ? "rotate-180" : ""}>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other 3 Services — Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="glass-card p-5 group hover:border-opacity-60 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${service.color}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "hsla(220,30%,25%,0.4)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${service.color}15`,
                  border: `1px solid ${service.color}30`,
                }}
              >
                <service.icon className="w-5 h-5" style={{ color: service.color }} />
              </div>
              <h3 className={`text-white font-semibold text-base mb-2 ${isRTL ? "text-right" : ""}`}>
                {service.title}
              </h3>
              <p className={`text-white/50 text-sm leading-relaxed ${isRTL ? "text-right" : ""}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
