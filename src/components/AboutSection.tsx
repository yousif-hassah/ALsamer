import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Globe, Clock, Users } from "lucide-react";

const AboutSection = () => {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    {
      icon: Clock,
      labelEn: "Years Experience",
      labelAr: "سنة خبرة",
      value: "15+",
      color: "hsl(45, 100%, 50%)",
    },
    {
      icon: Award,
      labelEn: "Professionalism",
      labelAr: "احترافية",
      value: "100%",
      color: "hsl(200, 100%, 55%)",
    },
    {
      icon: Globe,
      labelEn: "Countries Served",
      labelAr: "دولة",
      value: "50+",
      color: "hsl(145, 75%, 50%)",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(ellipse at 30% 50%, hsla(45,60%,20%,0.15) 0%, transparent 60%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center ${
            isRTL ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={isRTL ? "lg:col-start-2" : ""}
          >
            <span className="tag-warm mb-4 inline-block">{t("about.tag")}</span>

            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight ${isRTL ? "text-right" : ""}`}>
              {t("about.title")}
            </h2>

            {/* Accent line */}
            <div className="w-12 h-0.5 mb-6 rounded-full" style={{ background: "hsl(45,100%,50%)" }} />

            <p className={`text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5 ${isRTL ? "text-right" : ""}`}>
              {isAr
                ? "شركة السامر الدولية للتجارة والنقل شركة عراقية تأسست على يد السيد سامر مهدي البلداوي — المدير العام. تقدم خدمة متميزة في اللوجستيات والنقل، مما يسهّل عمليات الاستيراد والتصدير لعملائها."
                : "Al Samer International Company for Trade and Transport is an Iraqi company founded by Mr. Samer Mehdi Al Baldawi — the Managing Director. The company delivers premium logistics and transport services, simplifying import/export for its clients."}
            </p>
            <p className={`text-white/60 text-sm sm:text-base leading-relaxed mb-7 sm:mb-9 ${isRTL ? "text-right" : ""}`}>
              {t("about.mission")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-3 sm:p-4 text-center group hover:border-opacity-60 transition-colors duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${stat.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "hsla(220,30%,25%,0.4)";
                  }}
                >
                  <stat.icon
                    className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1.5"
                    style={{ color: stat.color }}
                  />
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">
                    {isAr ? stat.labelAr : stat.labelEn}
                  </p>
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
            className={isRTL ? "lg:col-start-1" : ""}
          >
            <div className="glass-card-warm p-5 sm:p-7 lg:p-8">
              {/* Header */}
              <div className={`flex items-center gap-4 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsla(45,100%,50%,0.1)", border: "1px solid hsla(45,100%,50%,0.2)" }}
                >
                  <Users className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-yellow-400" />
                </div>
                <div className={`min-w-0 ${isRTL ? "text-right" : ""}`}>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                    {t("about.director.name")}
                  </h3>
                  <p className="text-yellow-400/80 text-xs sm:text-sm mt-0.5">
                    {t("about.director.title")}
                  </p>
                </div>
              </div>

              <h4 className={`text-base sm:text-lg font-semibold text-white mb-3 ${isRTL ? "text-right" : ""}`}>
                {t("about.director")}
              </h4>
              <p className={`text-white/60 text-sm sm:text-base leading-relaxed ${isRTL ? "text-right" : ""}`}>
                {t("about.director.bio")}
              </p>

              {/* Decorative bottom */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: "hsla(45,100%,50%,0.12)" }}>
                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, hsl(45,100%,50%), hsl(48,90%,65%))" }} />
                  <span className="text-xs sm:text-sm text-white/40">
                    {isAr ? "خبرة تمتد لأكثر من 15 عامًا" : "15+ Years of Industry Experience"}
                  </span>
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
