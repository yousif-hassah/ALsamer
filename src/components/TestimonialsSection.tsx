import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const testimonials = [
    {
      nameEn: "Karim Al-Mansouri",
      nameAr: "كريم المنصوري",
      roleEn: "Import Manager, Baghdad",
      roleAr: "مدير الاستيراد، بغداد",
      textEn: "Al Samer has transformed our supply chain. Their attention to detail and on-time delivery is unmatched in the region. Highly recommend!",
      textAr: "غيّرت شركة السامر سلسلة التوريد لدينا. اهتمامها بالتفاصيل والتسليم في الوقت المحدد لا مثيل له في المنطقة. أنصح بها بشدة!",
      rating: 5,
      avatar: "KM",
    },
    {
      nameEn: "Sara Al-Rashidi",
      nameAr: "سارة الراشدي",
      roleEn: "CEO, Erbil Trading Co.",
      roleAr: "الرئيسة التنفيذية، شركة أربيل للتجارة",
      textEn: "Their sea freight service from China is exceptional. We've been using Al Samer for 3 years — professional, reliable, and always on budget.",
      textAr: "خدمة الشحن البحري من الصين استثنائية. نستخدم السامر منذ 3 سنوات — محترفون وموثوقون ودائماً في حدود الميزانية.",
      rating: 5,
      avatar: "SR",
    },
    {
      nameEn: "Haider Al-Zubaidi",
      nameAr: "حيدر الزبيدي",
      roleEn: "Operations Director, Basra",
      roleAr: "مدير العمليات، البصرة",
      textEn: "Fast air cargo, excellent customs clearance, and a team that truly cares about your shipment. Al Samer is our go-to partner.",
      textAr: "شحن جوي سريع وتخليص جمركي ممتاز وفريق يهتم بشحنتك حقاً. السامر هو شريكنا الأول.",
      rating: 5,
      avatar: "HZ",
    },
    {
      nameEn: "Nour Al-Tamimi",
      nameAr: "نور التميمي",
      roleEn: "Procurement Head, Mosul",
      roleAr: "رئيس المشتريات، الموصل",
      textEn: "The storage facilities are top class and the team communicates every step. We've never lost a package with Al Samer.",
      textAr: "مرافق التخزين من الدرجة الأولى والفريق يتواصل في كل خطوة. لم نفقد أي طرد مع السامر.",
      rating: 5,
      avatar: "NT",
    },
    {
      nameEn: "Faris Al-Bayati",
      nameAr: "فارس البياتي",
      roleEn: "Retail Owner, Baghdad",
      roleAr: "صاحب متجر، بغداد",
      textEn: "Their shopping partner service and cash on delivery made expanding our product catalog from Turkey incredibly easy. 10/10!",
      textAr: "خدمة شريك التسوق والدفع عند الاستلام جعلت توسيع كتالوج منتجاتنا من تركيا سهلاً للغاية. 10/10!",
      rating: 5,
      avatar: "FB",
    },
    {
      nameEn: "Layla Hassan",
      nameAr: "ليلى حسن",
      roleEn: "E-Commerce Manager, Erbil",
      roleAr: "مديرة التجارة الإلكترونية، أربيل",
      textEn: "As an e-commerce business, speed is everything. Al Samer delivers consistently fast and their tracking updates keep us informed.",
      textAr: "كونها تجارة إلكترونية، السرعة هي كل شيء. السامر يسلم بسرعة باستمرار وتحديثات التتبع تبقينا على علم.",
      rating: 5,
      avatar: "LH",
    },
  ];

  const avatarColors = [
    "hsl(45, 100%, 50%)",
    "hsl(200, 100%, 55%)",
    "hsl(270, 90%, 60%)",
    "hsl(145, 75%, 50%)",
    "hsl(15, 100%, 60%)",
    "hsl(320, 80%, 55%)",
  ];

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: "hsl(220, 20%, 7%)" }}
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
            {isAr ? "آراء عملائنا" : "Customer Reviews"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isAr ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            {isAr
              ? "تجارب حقيقية من عملاء حول العراق يؤمنون بخدماتنا اللوجستية"
              : "Real experiences from clients across Iraq who trust our logistics services"}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="testimonial-card"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: "hsl(45, 100%, 50%)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                &ldquo;{isAr ? t.textAr : t.textEn}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `${avatarColors[index]}20`,
                    border: `1px solid ${avatarColors[index]}40`,
                    color: avatarColors[index],
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {isAr ? t.nameAr : t.nameEn}
                  </p>
                  <p className="text-white/40 text-xs">
                    {isAr ? t.roleAr : t.roleEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-6 glass-card p-6 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-white">5.0</div>
            <div className="flex gap-1 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/40 text-xs mt-1">
              {isAr ? "متوسط تقييم العملاء" : "Average Customer Rating"}
            </p>
          </div>
          <div className="w-px h-16 bg-white/10" />
          <div className="text-center">
            <div className="text-4xl font-black" style={{ color: "hsl(45,100%,50%)" }}>
              98%
            </div>
            <p className="text-white/40 text-xs mt-2">
              {isAr ? "معدل رضا العملاء" : "Client Satisfaction Rate"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
