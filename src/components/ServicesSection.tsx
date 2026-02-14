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

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Truck,
      title: t("services.land"),
      description: t("services.land.desc"),
    },
    {
      icon: Ship,
      title: t("services.sea"),
      description: t("services.sea.desc"),
    },
    {
      icon: Plane,
      title: t("services.air"),
      description: t("services.air.desc"),
    },
    {
      icon: FileCheck,
      title: t("services.customs"),
      description: t("services.customs.desc"),
    },
    {
      icon: Warehouse,
      title: t("services.warehouse"),
      description: t("services.warehouse.desc"),
    },
    {
      icon: HeadphonesIcon,
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
    },
  ];

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(45,30%,10%)] to-background opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">
            {t("services.tag")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t("services.title")}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="glass-card p-4 sm:p-6 lg:p-8 h-full hover:shadow-card-hover transition-all duration-500">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-soft-yellow/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
