import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import containersImg1 from "@/assets/containers-1.jpg";
import containersImg2 from "@/assets/containers-2.jpg";
import containersImg3 from "@/assets/containers-3.jpg";
import { Warehouse, CheckCircle2 } from "lucide-react";

const StorageSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const features = [
    { en: "Secure 24/7 surveillance", ar: "مراقبة آمنة على مدار الساعة" },
    { en: "Climate-controlled facilities", ar: "مرافق تحكم بدرجة الحرارة" },
    { en: "Flexible short & long-term contracts", ar: "عقود مرنة قصيرة وطويلة الأمد" },
    { en: "Inventory management system", ar: "نظام إدارة المخزون" },
    { en: "Loading & unloading services", ar: "خدمات التحميل والتفريغ" },
    { en: "Fire suppression & safety systems", ar: "أنظمة مكافحة الحريق والسلامة" },
  ];

  return (
    <section
      id="storage"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: "hsl(220, 20%, 7%)" }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="tag-warm mb-4 inline-block">
            {isAr ? "التخزين" : "Storage"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isAr ? "مستودعاتنا الآمنة" : "Our Secure Warehouses"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            {isAr
              ? "مستودعات حديثة ومجهزة بالكامل في بغداد وأربيل لحفظ بضائعك بأمان"
              : "Fully equipped modern warehouses in Baghdad and Erbil to keep your goods safe"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Images collage */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 h-[420px]"
          >
            {/* Large image */}
            <div className="col-span-1 row-span-2 image-card overflow-hidden">
              <img
                src={containersImg1}
                alt="Warehouse"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Two smaller images */}
            <div className="image-card overflow-hidden">
              <img
                src={containersImg2}
                alt="Warehouse storage"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="image-card overflow-hidden">
              <img
                src={containersImg3}
                alt="Secure storage"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Stats overlay */}
            <div
              className="col-span-2 glass-card-warm p-4 -mt-3"
            >
              <div className="flex items-center justify-around">
                {[
                  { val: "50,000+", labelEn: "sq. ft.", labelAr: "قدم مربع" },
                  { val: "2", labelEn: "Locations", labelAr: "موقع" },
                  { val: "24/7", labelEn: "Operations", labelAr: "عمليات" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-black text-yellow-400">{s.val}</div>
                    <div className="text-white/50 text-xs">{isAr ? s.labelAr : s.labelEn}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className={isAr ? "text-right" : ""}
          >
            <div className="flex items-center gap-3 mb-5" style={isAr ? { justifyContent: "flex-end" } : {}}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "hsla(45,100%,50%,0.1)", border: "1px solid hsla(45,100%,50%,0.2)" }}
              >
                <Warehouse className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {isAr ? "مستودعات متطورة" : "State-of-the-Art Warehouses"}
                </h3>
                <p className="text-white/40 text-xs">
                  {isAr ? "بغداد • أربيل" : "Baghdad • Erbil"}
                </p>
              </div>
            </div>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-7">
              {isAr
                ? "توفر مستودعاتنا بيئة مثالية وآمنة لتخزين بضائعك — سواء لفترة قصيرة أثناء انتظار الشحنة، أو لفترة طويلة كحل تخزيني متكامل. فريقنا يدير المخزون بدقة ويوفر تقارير دورية."
                : "Our warehouses provide an ideal and safe environment for storing your goods — whether short-term while awaiting shipment, or long-term as an integrated storage solution. Our team manages inventory precisely and provides regular reports."}
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-yellow-400" />
                  <span className="text-white/70 text-sm">
                    {isAr ? f.ar : f.en}
                  </span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-block">
              {isAr ? "استفسر عن التخزين" : "Inquire About Storage"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorageSection;
