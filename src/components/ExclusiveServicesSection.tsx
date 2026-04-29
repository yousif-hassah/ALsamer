import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingBag, CreditCard, Warehouse, ClipboardCheck, Truck } from "lucide-react";

const ExclusiveServicesSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const services = [
    {
      icon: ShoppingBag,
      titleEn: "Shopping Partners",
      titleAr: "شركاء التسوق",
      descEn: "We shop on your behalf from any supplier or marketplace worldwide and ship to your door.",
      descAr: "نتسوق نيابةً عنك من أي مورد أو سوق في العالم ونشحن إلى بابك مباشرةً.",
      color: "hsl(45, 100%, 50%)",
    },
    {
      icon: CreditCard,
      titleEn: "Cash on Delivery",
      titleAr: "الدفع عند الاستلام",
      descEn: "Flexible cash-on-delivery options so your customers pay when they receive their orders.",
      descAr: "خيارات الدفع عند الاستلام المرنة حتى يدفع عملاؤك عند استلام طلباتهم.",
      color: "hsl(145, 75%, 50%)",
    },
    {
      icon: Warehouse,
      titleEn: "Storage",
      titleAr: "التخزين",
      descEn: "Secure, climate-controlled warehouses in Erbil and Baghdad for short or long-term storage.",
      descAr: "مستودعات آمنة ومتحكم بدرجة حرارتها في أربيل وبغداد للتخزين قصير أو طويل الأمد.",
      color: "hsl(200, 100%, 55%)",
    },
    {
      icon: ClipboardCheck,
      titleEn: "Product Quality Inspection",
      titleAr: "فحص جودة المنتجات",
      descEn: "Our experts inspect goods before shipping to ensure they meet your quality standards.",
      descAr: "يفحص خبراؤنا البضائع قبل الشحن للتأكد من مطابقتها لمعايير الجودة الخاصة بك.",
      color: "hsl(270, 90%, 65%)",
    },
    {
      icon: Truck,
      titleEn: "Supplier Pickup",
      titleAr: "الاستلام من المورد",
      descEn: "We pick up directly from your suppliers anywhere in the world, handling all logistics.",
      descAr: "نستلم مباشرةً من مورديك في أي مكان في العالم ونتولى جميع الخدمات اللوجستية.",
      color: "hsl(15, 100%, 60%)",
    },
  ];

  return (
    <section
      id="exclusive-services"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-background"
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, hsla(45,100%,50%,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="tag-warm mb-4 inline-block">
              {isAr ? "خدمات حصرية" : "Exclusive Services"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {isAr ? (
                <>
                  خدمات مصممة{" "}
                  <span className="gradient-text-warm">لتسهيل</span>{" "}
                  أعمالك
                </>
              ) : (
                <>
                  Services Designed to{" "}
                  <span className="gradient-text-warm">Simplify</span>{" "}
                  Your Business
                </>
              )}
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
              {isAr
                ? "نقدم حلولاً متكاملة تتجاوز مجرد الشحن — نحن نعتني بكل جانب من جوانب رحلة منتجاتك."
                : "We offer comprehensive solutions that go beyond just shipping — we take care of every aspect of your product's journey."}
            </p>

            {/* Feature highlight */}
            <div className="glass-card-warm p-5 inline-block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsla(45,100%,50%,0.15)", border: "1px solid hsla(45,100%,50%,0.3)" }}>
                  <ShoppingBag className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {isAr ? "خدمة شاملة 360°" : "Full 360° Service"}
                  </p>
                  <p className="text-white/50 text-xs">
                    {isAr ? "من الطلب حتى التسليم" : "From order to doorstep"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Services list */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="exclusive-card group"
                style={{
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (isAr) {
                    el.style.borderRightColor = service.color;
                    el.style.transform = "translateX(-4px)";
                  } else {
                    el.style.borderLeftColor = service.color;
                    el.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderLeftColor = "transparent";
                  el.style.borderRightColor = "transparent";
                  el.style.transform = "none";
                }}
              >
                <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.color}15`,
                      border: `1px solid ${service.color}30`,
                    }}
                  >
                    <service.icon className="w-5 h-5" style={{ color: service.color }} />
                  </div>
                  <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
                    <h3 className="text-white font-semibold text-sm mb-0.5">
                      {isAr ? service.titleAr : service.titleEn}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {isAr ? service.descAr : service.descEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveServicesSection;
