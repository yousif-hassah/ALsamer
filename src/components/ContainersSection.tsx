import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import containersImg1 from "@/assets/containers-1.jpg";
import containersImg2 from "@/assets/containers-2.jpg";
import containersImg3 from "@/assets/containers-3.jpg";

const ContainersSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const containers = [
    {
      nameEn: "20ft Standard",
      nameAr: "حاوية 20 قدم قياسية",
      descEn: "Ideal for smaller shipments. Holds up to 25 metric tons with 33m³ capacity. Perfect for medium-volume cargo.",
      descAr: "مثالية للشحنات الأصغر. تحمل ما يصل إلى 25 طنًا متريًا بسعة 33 م³. مثالية للبضائع متوسطة الحجم.",
      specs: [
        { labelEn: "Length", labelAr: "الطول", value: "5.9m" },
        { labelEn: "Width", labelAr: "العرض", value: "2.35m" },
        { labelEn: "Height", labelAr: "الارتفاع", value: "2.39m" },
        { labelEn: "Capacity", labelAr: "السعة", value: "33m³" },
      ],
      image: containersImg1,
      badge: isAr ? "الأكثر شيوعاً" : "Most Popular",
      color: "hsl(45, 100%, 50%)",
    },
    {
      nameEn: "40ft Standard",
      nameAr: "حاوية 40 قدم قياسية",
      descEn: "Double the space of the 20ft. Holds up to 28 metric tons. Great for large volume, full-load shipments.",
      descAr: "ضعف مساحة الحاوية 20 قدم. تحمل ما يصل إلى 28 طن. رائعة للشحنات ذات الحجم الكبير والتحميل الكامل.",
      specs: [
        { labelEn: "Length", labelAr: "الطول", value: "12.03m" },
        { labelEn: "Width", labelAr: "العرض", value: "2.35m" },
        { labelEn: "Height", labelAr: "الارتفاع", value: "2.39m" },
        { labelEn: "Capacity", labelAr: "السعة", value: "67.6m³" },
      ],
      image: containersImg2,
      badge: isAr ? "للشحنات الكبيرة" : "Large Loads",
      color: "hsl(200, 100%, 55%)",
    },
    {
      nameEn: "Refrigerated",
      nameAr: "حاوية مبردة",
      descEn: "Temperature-controlled for perishables. Maintains -30°C to +30°C. For food, pharmaceuticals, and sensitive cargo.",
      descAr: "مع تحكم في درجة الحرارة للبضائع القابلة للتلف. تحافظ على -30°C إلى +30°C للأغذية والأدوية والبضائع الحساسة.",
      specs: [
        { labelEn: "Temp Range", labelAr: "نطاق الحرارة", value: "-30°C to +30°C" },
        { labelEn: "Length", labelAr: "الطول", value: "11.58m" },
        { labelEn: "Capacity", labelAr: "السعة", value: "59.3m³" },
        { labelEn: "Power", labelAr: "القدرة", value: "400V/32A" },
      ],
      image: containersImg3,
      badge: isAr ? "مبرد" : "Refrigerated",
      color: "hsl(145, 75%, 50%)",
    },
    {
      nameEn: "Open Top",
      nameAr: "حاوية مكشوفة",
      descEn: "No roof for easy crane loading of oversized cargo. Tarpaulin covered. For heavy machinery and tall goods.",
      descAr: "بدون سقف لتسهيل تحميل الرافعة للبضائع الكبيرة الحجم. مغطاة بالقماش المشمع. للآلات الثقيلة والبضائع الطويلة.",
      specs: [
        { labelEn: "Length", labelAr: "الطول", value: "12.03m" },
        { labelEn: "Width", labelAr: "العرض", value: "2.35m" },
        { labelEn: "Opening", labelAr: "الفتحة", value: "Full Top" },
        { labelEn: "Max Load", labelAr: "الحد الأقصى", value: "26.5t" },
      ],
      image: containersImg1,
      badge: isAr ? "مكشوف" : "Open Top",
      color: "hsl(270, 90%, 65%)",
    },
  ];

  return (
    <section
      id="containers"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

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
            {isAr ? "أنواع الحاويات" : "Container Types"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isAr ? "الحاوية المناسبة لشحنتك" : "The Right Container for Your Cargo"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            {isAr
              ? "نوفر مجموعة متنوعة من الحاويات لتلبية جميع احتياجات شحنك الدولي"
              : "We offer a variety of containers to meet all your international shipping needs"}
          </p>
        </motion.div>

        {/* Container cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {containers.map((c, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="container-card"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={c.image}
                  alt={isAr ? c.nameAr : c.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(to top, hsl(220,20%,8%) 0%, transparent 60%)`,
                }} />
                {/* Badge */}
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded"
                  style={{
                    background: `${c.color}20`,
                    border: `1px solid ${c.color}50`,
                    color: c.color,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {c.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 rounded-full" style={{ background: c.color }} />
                  <h3 className="text-white font-bold text-lg">
                    {isAr ? c.nameAr : c.nameEn}
                  </h3>
                </div>

                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {isAr ? c.descAr : c.descEn}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-2">
                  {c.specs.map((spec, si) => (
                    <div
                      key={si}
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: `${c.color}08`,
                        border: `1px solid ${c.color}20`,
                      }}
                    >
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">
                        {isAr ? spec.labelAr : spec.labelEn}
                      </p>
                      <p className="text-white font-semibold text-sm">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="btn-primary inline-block hover:opacity-90 transition-opacity"
          >
            {isAr ? "احجز حاويتك الآن" : "Book Your Container Now"}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContainersSection;
