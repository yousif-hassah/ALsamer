import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Headphones, Package } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="stat-counter">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    {
      icon: TrendingUp,
      value: 15,
      suffix: "+",
      labelEn: "Years Experience",
      labelAr: "سنة خبرة",
      descEn: "Trusted by businesses across the region",
      descAr: "موثوق به من الشركات في المنطقة",
      color: "hsl(45, 100%, 50%)",
    },
    {
      icon: Headphones,
      value: 24,
      suffix: "/7",
      labelEn: "Support",
      labelAr: "دعم متواصل",
      descEn: "Round the clock customer support",
      descAr: "دعم عملاء على مدار الساعة",
      color: "hsl(200, 100%, 55%)",
    },
    {
      icon: Package,
      value: 5000,
      suffix: "+",
      labelEn: "Shipments",
      labelAr: "شحنة منجزة",
      descEn: "Successfully delivered worldwide",
      descAr: "تم تسليمها بنجاح حول العالم",
      color: "hsl(145, 75%, 50%)",
    },
  ];

  return (
    <section
      id="stats"
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(220,25%,8%) 0%, hsl(45,30%,10%) 50%, hsl(220,25%,8%) 100%)",
      }}
    >
      {/* Top / Bottom borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsla(45,100%,50%,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="tag-warm mb-4 inline-block">
            {isAr ? "بالأرقام" : "By The Numbers"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {isAr ? "إنجازاتنا" : "Our Achievements"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="glass-card p-8 hover:border-yellow-400/30 transition-colors duration-300">
                {/* Icon */}
                <div className="relative mx-auto mb-5 w-fit">
                  {/* Pulse ring — only on first stat (15+ Years) */}
                  {index === 0 && (
                    <span
                      className="absolute inset-0 rounded-xl animate-ping"
                      style={{ background: `${stat.color}20`, animationDuration: "2s" }}
                    />
                  )}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                    style={{
                      background: `${stat.color}15`,
                      border: `1px solid ${stat.color}30`,
                    }}
                  >
                    <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                  </div>
                </div>

                {/* Counter */}
                <div
                  className="text-5xl sm:text-6xl font-black mb-2 leading-none"
                  style={{ color: stat.color }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} duration={2} />
                </div>

                {/* Label */}
                <h3 className="text-white font-bold text-lg mb-2">
                  {isAr ? stat.labelAr : stat.labelEn}
                </h3>

                {/* Desc */}
                <p className="text-white/40 text-sm">
                  {isAr ? stat.descAr : stat.descEn}
                </p>

                {/* Bottom accent */}
                <div
                  className="mt-5 mx-auto w-10 h-0.5 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: stat.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
