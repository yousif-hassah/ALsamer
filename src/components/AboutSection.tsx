import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Globe, Calendar, Users } from "lucide-react";

const AboutSection = () => {
  const { t, isRTL } = useLanguage();

  const stats = [
    { icon: Calendar, label: t("about.founded"), value: t("about.founded.value") },
    { icon: Award, label: t("about.experience"), value: t("about.experience.value") },
    { icon: Globe, label: t("about.countries"), value: t("about.countries.value") },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(0,40%,8%)] via-background to-background opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:col-start-2' : ''}
          >
            <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">{t("about.tag")}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
              {t("about.description")}
            </p>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {t("about.mission")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-3 sm:p-4 text-center"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Director Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={isRTL ? 'lg:col-start-1' : ''}
          >
            <div className="glass-card-warm p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-warm-orange/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{t("about.director.name")}</h3>
                  <p className="text-white/50 text-xs sm:text-sm">{t("about.director.title")}</p>
                </div>
              </div>
              
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">{t("about.director")}</h4>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {t("about.director.bio")}
              </p>

              {/* Decorative element */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-primary to-warm-orange rounded-full" />
                  <span className="text-xs sm:text-sm text-white/40">Since 2020</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
