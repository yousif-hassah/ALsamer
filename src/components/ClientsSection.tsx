import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "lucide-react";

const ClientsSection = () => {
  const { t, language } = useLanguage();

  const team = [
    { nameEn: "Samer Mehdi", nameAr: "سامر مهدي", positionEn: "Managing Director", positionAr: "المدير العام" },
    { nameEn: "Ahmed Hassan", nameAr: "أحمد حسن", positionEn: "Operations Manager", positionAr: "مدير العمليات" },
    { nameEn: "Ali Kareem", nameAr: "علي كريم", positionEn: "Logistics Director", positionAr: "مدير الخدمات اللوجستية" },
    { nameEn: "Omar Fadhil", nameAr: "عمر فاضل", positionEn: "Finance Manager", positionAr: "مدير المالية" },
    { nameEn: "Mustafa Jabbar", nameAr: "مصطفى جبار", positionEn: "Marketing Manager", positionAr: "مدير التسويق" },
    { nameEn: "Haider Nouri", nameAr: "حيدر نوري", positionEn: "Customs Director", positionAr: "مدير التخليص الجمركي" },
  ];

  const isAr = language === "ar";

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="tag-warm mb-3 sm:mb-4 inline-block text-[10px] sm:text-xs">{t("team.tag")}</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t("team.title")}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base px-2">
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mb-3 sm:mb-4 ring-2 ring-white/10 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white/30" />
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base">
                {isAr ? member.nameAr : member.nameEn}
              </h4>
              <p className="text-primary text-[11px] sm:text-xs mt-1">
                {isAr ? member.positionAr : member.positionEn}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative line */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex items-center justify-center gap-2 sm:gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-white/30 text-[10px] sm:text-xs lg:text-sm whitespace-nowrap">
            {isAr ? "فريق متميز" : "Excellence in Leadership"}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
