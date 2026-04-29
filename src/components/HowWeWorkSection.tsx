import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ClipboardList,
  Search,
  Archive,
  Ship,
  PackageCheck,
} from "lucide-react";

const HowWeWorkSection = () => {
  const { t, isRTL, language } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: ClipboardList,
      titleEn: "Request Received",
      titleAr: "استلام الطلب",
      descEn: "We receive your shipping request and review all details carefully.",
      descAr: "نستلم طلب الشحن الخاص بك ونراجع جميع التفاصيل بعناية.",
      color: "hsl(45, 100%, 50%)",
    },
    {
      number: "02",
      icon: Search,
      titleEn: "Inspection",
      titleAr: "الفحص",
      descEn: "Goods are thoroughly inspected for quality and compliance.",
      descAr: "يتم فحص البضائع بعناية للتأكد من الجودة والامتثال.",
      color: "hsl(200, 100%, 55%)",
    },
    {
      number: "03",
      icon: Archive,
      titleEn: "Storage",
      titleAr: "التخزين",
      descEn: "Secure storage in our warehouses until shipment is ready.",
      descAr: "تخزين آمن في مستودعاتنا حتى تصبح الشحنة جاهزة.",
      color: "hsl(270, 100%, 65%)",
    },
    {
      number: "04",
      icon: Ship,
      titleEn: "Shipping",
      titleAr: "الشحن",
      descEn: "Cargo dispatched via land, sea, or air — on schedule.",
      descAr: "إرسال البضاعة عبر البر أو البحر أو الجو في الموعد المحدد.",
      color: "hsl(145, 80%, 45%)",
    },
    {
      number: "05",
      icon: PackageCheck,
      titleEn: "Delivery",
      titleAr: "التسليم",
      descEn: "Safe and on-time delivery to your destination worldwide.",
      descAr: "تسليم آمن وفي الوقت المحدد إلى وجهتك في أي مكان بالعالم.",
      color: "hsl(15, 100%, 60%)",
    },
  ];

  const isAr = language === "ar";

  return (
    <section
      id="how-we-work"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: "hsl(220, 20%, 7%)" }}
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`text-center mb-12 sm:mb-16 ${isRTL ? "text-right" : ""}`}
        >
          <span className="tag-warm mb-4 inline-block">
            {isAr ? "كيف نعمل" : "How We Work"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isAr ? "عمليتنا" : "Our Process"}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
            {isAr
              ? "خمس خطوات بسيطة وفعّالة تضمن وصول شحنتك بأمان وفي الوقت المحدد"
              : "Five simple and efficient steps ensuring your shipment arrives safely and on time"}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px z-0"
                  style={{
                    background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, ${step.color}40, transparent)`,
                  }}
                />
              )}

              <div className="work-step h-full group">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-4xl font-black opacity-20"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}20`,
                      border: `1px solid ${step.color}40`,
                    }}
                  >
                    <step.icon
                      className="w-5 h-5"
                      style={{ color: step.color }}
                    />
                  </div>
                </div>

                {/* Accent bar */}
                <div
                  className="w-8 h-0.5 mb-3 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: step.color }}
                />

                <h3 className="text-white font-bold text-base sm:text-lg mb-2">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
    </section>
  );
};

export default HowWeWorkSection;
