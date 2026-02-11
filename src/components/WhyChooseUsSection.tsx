import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import FlowingCurves from "./FlowingCurves";
import { Zap, Eye, Award, DollarSign, ArrowRight } from "lucide-react";

const WhyChooseUsSection = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t("why.flexibility"),
      description: t("why.flexibility.desc"),
    },
    {
      icon: Eye,
      title: t("why.control"),
      description: t("why.control.desc"),
    },
    {
      icon: Award,
      title: t("why.quality"),
      description: t("why.quality.desc"),
    },
    {
      icon: DollarSign,
      title: t("why.pricing"),
      description: t("why.pricing.desc"),
    },
    {
      icon: ArrowRight,
      title: t("why.solutions"),
      description: t("why.solutions.desc"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="why-us" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden section-gradient">
      <FlowingCurves variant="why-us" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-8 sm:mb-12 lg:mb-16 ${isRTL ? 'text-right' : ''}`}
        >
          <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">{t("why.tag")}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("why.title")}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card-dark p-4 sm:p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className={`flex items-start gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-warm-orange/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
