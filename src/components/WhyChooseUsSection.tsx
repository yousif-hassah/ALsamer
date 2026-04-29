import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Shield, Heart, Globe, Award } from "lucide-react";

const WhyChooseUsSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const features = [
    {
      icon: Zap,
      titleEn: "Exceptional Speed",
      titleAr: "سرعة استثنائية",
      descEn:
        "Lightning-fast shipping and processing. We optimize every route to get your cargo delivered as quickly as possible.",
      descAr:
        "شحن ومعالجة سريعة للغاية. نحسّن كل مسار لتوصيل شحنتك في أقصر وقت ممكن.",
      color: "hsl(45, 100%, 50%)",
    },
    {
      icon: Shield,
      titleEn: "Security",
      titleAr: "الأمان",
      descEn:
        "Your cargo is protected with real-time tracking, secure handling, and comprehensive insurance coverage.",
      descAr:
        "شحنتك محمية بتتبع في الوقت الفعلي ومناولة آمنة وتغطية تأمينية شاملة.",
      color: "hsl(200, 100%, 55%)",
    },
    {
      icon: Heart,
      titleEn: "Trust",
      titleAr: "الثقة",
      descEn:
        "Built on years of reliability. Our clients trust us because we always deliver on our promises.",
      descAr:
        "مبنية على سنوات من الموثوقية. يثق بنا عملاؤنا لأننا نوفي دائماً بوعودنا.",
      color: "hsl(350, 90%, 60%)",
    },
    {
      icon: Globe,
      titleEn: "International Experience",
      titleAr: "الخبرة الدولية",
      descEn:
        "15+ years operating globally. We know every port, every route, and every customs requirement.",
      descAr:
        "أكثر من 15 عامًا من العمل على المستوى الدولي. نعرف كل ميناء ومسار ومتطلبات جمركية.",
      color: "hsl(145, 75%, 50%)",
    },
    {
      icon: Award,
      titleEn: "High Professionalism",
      titleAr: "الاحترافية العالية",
      descEn:
        "A dedicated team of logistics experts committed to excellence, transparency, and world-class service standards.",
      descAr:
        "فريق متخصص من خبراء اللوجستيات ملتزم بالتميز والشفافية ومعايير الخدمة العالمية.",
      color: "hsl(270, 90%, 65%)",
    },
  ];

  return (
    <section
      id="why-us"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(220,20%,7%) 0%, hsl(220,20%,9%) 50%, hsl(220,20%,7%) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, hsla(45,100%,50%,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 sm:mb-16 ${isAr ? "text-right" : ""}`}
        >
          <span className="tag-warm mb-4 inline-block">
            {isAr ? "لماذا السامر؟" : "Why Al Samer?"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
            {isAr ? "شريكك اللوجستي الموثوق" : "Your Trusted Logistics Partner"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base text-center">
            {isAr
              ? "خمسة مبادئ تجعلنا الخيار الأول لشركات الاستيراد والتصدير في العراق"
              : "Five principles that make us the first choice for import/export companies in Iraq"}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 group hover:border-opacity-60 transition-all duration-300"
              style={{
                borderColor: "hsla(220,30%,25%,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${feature.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "hsla(220,30%,25%,0.4)";
              }}
            >
              {/* Icon + number */}
              <div className={`flex items-start justify-between mb-5 ${isAr ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <span className="text-3xl font-black opacity-10 text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Accent bar */}
              <div
                className="w-8 h-0.5 mb-4 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: feature.color }}
              />

              <h3 className={`text-white font-bold text-lg mb-2 ${isAr ? "text-right" : ""}`}>
                {isAr ? feature.titleAr : feature.titleEn}
              </h3>
              <p className={`text-white/50 text-sm leading-relaxed ${isAr ? "text-right" : ""}`}>
                {isAr ? feature.descAr : feature.descEn}
              </p>
            </motion.div>
          ))}

          {/* CTA card (6th spot in grid) */}
          {features.length % 3 !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: features.length * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-warm p-6 flex flex-col items-center justify-center text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white font-bold text-lg mb-2">
                {isAr ? "هل أنت مستعد؟" : "Ready to Start?"}
              </h3>
              <p className="text-white/50 text-sm mb-5">
                {isAr ? "تواصل معنا الآن لأفضل حلول الشحن" : "Contact us now for the best shipping solutions"}
              </p>
              <a href="#contact" className="btn-primary text-sm">
                {isAr ? "تواصل معنا" : "Contact Us"}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
