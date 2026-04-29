import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

const LocationsSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const locations = [
    {
      cityEn: "Erbil",
      cityAr: "أربيل",
      countryEn: "Kurdistan Region, Iraq",
      countryAr: "إقليم كردستان، العراق",
      descEn: "Our northern hub serving Kurdistan region and northern Iraq with full logistics capabilities.",
      descAr: "مركزنا الشمالي يخدم إقليم كردستان وشمال العراق بقدرات لوجستية كاملة.",
      mapsUrl: "https://www.google.com/maps/search/Erbil,+Iraq",
      icon: "🏙️",
      color: "hsl(200, 100%, 55%)",
    },
    {
      cityEn: "Baghdad",
      cityAr: "بغداد",
      countryEn: "Baghdad, Iraq",
      countryAr: "بغداد، العراق",
      descEn: "Our main headquarters in the Riyadh District — the heart of our operations serving all of Iraq.",
      descAr: "مقرنا الرئيسي في حي الرياض — قلب عملياتنا التي تخدم كل العراق.",
      mapsUrl: "https://maps.app.goo.gl/doHAPDhBn8JZtS497",
      icon: "🏛️",
      color: "hsl(45, 100%, 50%)",
    },
  ];

  return (
    <section
      id="locations"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ background: "hsl(220, 20%, 7%)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="tag-warm mb-4 inline-block">
            {isAr ? "مواقعنا" : "Our Locations"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isAr ? "نحن في قلب العراق" : "We're in the Heart of Iraq"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            {isAr
              ? "مكتبان استراتيجيان في بغداد وأربيل لخدمة عملائنا في جميع أنحاء البلاد"
              : "Two strategic offices in Baghdad and Erbil to serve our clients nationwide"}
          </p>
        </motion.div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {locations.map((loc, index) => (
            <motion.a
              key={index}
              href={loc.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="location-card block group"
            >
              {/* City icon + map badge */}
              <div className="flex items-start justify-between mb-5">
                <div className="text-4xl">{loc.icon}</div>
                <div
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded"
                  style={{
                    background: `${loc.color}15`,
                    color: loc.color,
                    border: `1px solid ${loc.color}30`,
                  }}
                >
                  <Navigation className="w-3 h-3" />
                  {isAr ? "فتح الخريطة" : "Open Map"}
                </div>
              </div>

              {/* City name */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: loc.color }} />
                  <h3 className="text-white font-bold text-xl">
                    {isAr ? loc.cityAr : loc.cityEn}
                  </h3>
                </div>
                <p className="text-white/40 text-xs ml-6">
                  {isAr ? loc.countryAr : loc.countryEn}
                </p>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {isAr ? loc.descAr : loc.descEn}
              </p>

              {/* Bottom bar */}
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: `1px solid ${loc.color}20` }}
              >
                <span className="text-xs font-medium" style={{ color: loc.color }}>
                  {isAr ? "اضغط لفتح الخريطة" : "Click to open in Maps"}
                </span>
                <ExternalLink
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: loc.color }}
                />
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${loc.color}, transparent)` }}
              />
            </motion.a>
          ))}
        </div>

        {/* Iraq map hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-white/30 text-xs">
            {isAr ? "📍 نغطي جميع محافظات العراق" : "📍 We cover all provinces of Iraq"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationsSection;
