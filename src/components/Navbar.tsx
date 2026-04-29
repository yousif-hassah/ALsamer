import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-white.webp";

// Full searchable index — keyword → { id, label }
const SEARCH_INDEX = [
  // Sections (Priority 1)
  { type: 'section', keywords: ["home", "hero", "main", "start", "shipment", "الرئيسية", "رئيسي", "بداية", "شحن"], id: "home", labelEn: "Home / Hero", labelAr: "الرئيسية", emoji: "🏠" },
  { type: 'section', keywords: ["about", "who", "company", "history", "samer", "من نحن", "شركة", "السامر", "تأسست", "قصة"], id: "about", labelEn: "About Al Samer", labelAr: "من نحن - شركة السامر", emoji: "🏢" },
  { type: 'section', keywords: ["why", "reason", "trust", "speed", "security", "لماذا", "ثقة", "أمان", "سرعة", "احترافية", "مميزات"], id: "why-us", labelEn: "Why Choose Us", labelAr: "لماذا السامر؟", emoji: "⭐" },
  { type: 'section', keywords: ["how", "work", "process", "steps", "workflow", "كيف", "عمل", "خطوات", "عملية", "طريقة"], id: "how-we-work", labelEn: "How We Work", labelAr: "كيف نعمل (خطواتنا)", emoji: "⚙️" },
  { type: 'section', keywords: ["services", "land", "sea", "air", "freight", "shipping", "transport", "خدمات", "شحن", "بري", "بحري", "جوي", "نقل"], id: "services", labelEn: "Primary Shipping Services", labelAr: "خدمات الشحن الرئيسية", emoji: "🚢" },
  { type: 'section', keywords: ["exclusive", "shopping", "cod", "cash", "delivery", "pickup", "quality", "حصري", "تسوق", "دفع", "استلام", "جودة"], id: "exclusive-services", labelEn: "Exclusive Logistics Services", labelAr: "خدماتنا الحصرية", emoji: "💎" },
  { type: 'section', keywords: ["container", "20ft", "40ft", "refrigerated", "open top", "حاوية", "حاويات", "مبرد", "مكشوف"], id: "containers", labelEn: "Container Types & Specs", labelAr: "أنواع الحاويات ومواصفاتها", emoji: "📦" },
  { type: 'section', keywords: ["storage", "warehouse", "store", "stock", "تخزين", "مستودع", "مخزن", "مخازن", "أحمال"], id: "storage", labelEn: "Storage & Warehousing", labelAr: "خدمات التخزين", emoji: "🏭" },
  { type: 'section', keywords: ["track", "tracking", "container track", "id", "bill", "تتبع", "حاوية تتبع", "رقم بوليصة"], id: "tracking", labelEn: "Shipment Tracking", labelAr: "تتبع الشحنات", emoji: "🗺️" },
  { type: 'section', keywords: ["testimonials", "reviews", "clients", "feedback", "rating", "آراء", "تقييم", "عملاء", "تعليقات"], id: "testimonials", labelEn: "Client Testimonials", labelAr: "آراء عملائنا", emoji: "💬" },
  { type: 'section', keywords: ["location", "office", "erbil", "baghdad", "dubai", "map", "موقع", "مكتب", "أربيل", "بغداد", "دبي", "خريطة"], id: "locations", labelEn: "Our Offices & Locations", labelAr: "مكاتبنا ومواقعنا", emoji: "📍" },
  { type: 'section', keywords: ["contact", "phone", "email", "whatsapp", "message", "اتصال", "هاتف", "بريد", "واتساب", "رسالة"], id: "contact", labelEn: "Contact & Support", labelAr: "اتصل بنا والدعم", emoji: "📞" },

  // Content Snippets / "Speech" parts (Priority 2)
  { type: 'content', keywords: ["dangerous", "prohibited", "illegal", "material", "forbidden", "مواد محظورة", "غير قانوني", "ممنوع", "خطر"], id: "contact", labelEn: "Dangerous & Prohibited Materials", labelAr: "قائمة المواد المحظورة", emoji: "⚠️" },
  { type: 'content', keywords: ["samer", "mahdi", "baldawi", "ceo", "founder", "سامر مهدي", "البلداوي", "المدير العام"], id: "about", labelEn: "CEO - Samer Mahdi Al-Baldawi", labelAr: "المدير العام - سامر مهدي", emoji: "👤" },
  { type: 'content', keywords: ["riyadh", "district", "orthodox", "building", "address", "حي الرياض", "مسبح الأرثوذكس", "عنوان", "بناية"], id: "contact", labelEn: "Detailed Address in Baghdad", labelAr: "عنوان بغداد بالتفصيل", emoji: "🏢" },
  { type: 'content', keywords: ["cod", "cash on delivery", "payment", "money", "دفع عند الاستلام", "نقدي", "تحصيل"], id: "exclusive-services", labelEn: "Cash on Delivery (COD) Service", labelAr: "خدمة الدفع عند الاستلام", emoji: "💵" },
  { type: 'content', keywords: ["pickup", "supplier", "factory", "china", "turkey", "dubai", "استلام من المورد", "مصنع", "الصين", "تركيا"], id: "exclusive-services", labelEn: "Supplier Pickup Service", labelAr: "استلام من المورد مباشرة", emoji: "🚛" },
  { type: 'content', keywords: ["quality", "check", "inspection", "verify", "فحص الجودة", "تفتيش", "تأكد"], id: "exclusive-services", labelEn: "Product Quality Check", labelAr: "فحص جودة المنتجات", emoji: "🔍" },
  { type: 'content', keywords: ["dubai airport", "freezone", "block 24", "مطار دبي", "المنطقة الحرة"], id: "locations", labelEn: "Headquarters - Dubai Airport", labelAr: "المقر الرئيسي - مطار دبي", emoji: "🇦🇪" },
  { type: 'content', keywords: ["15 years", "experience", "since 2004", "15 سنة", "خبرة", "منذ 2004"], id: "about", labelEn: "15+ Years of Logistics Experience", labelAr: "أكثر من 15 سنة خبرة", emoji: "🎖️" },
];

const scrollToSection = (id: string) => {
  const el = 
    document.getElementById(id) || 
    document.querySelector(`[id="${id}"]`) || 
    document.querySelector(`#${id}`);
  if (el) {
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const Navbar = () => {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.tracking"), href: "#tracking" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  // Live-filter results
  const q = searchQuery.trim().toLowerCase();
  const results = q.length >= 1
    ? SEARCH_INDEX.filter((item) =>
        item.keywords.some((kw) => kw.includes(q)) ||
        item.labelEn.toLowerCase().includes(q) ||
        item.labelAr.toLowerCase().includes(q)
      ).sort((a, b) => {
        if (a.type === 'section' && b.type !== 'section') return -1;
        if (a.type !== 'section' && b.type === 'section') return 1;
        return 0;
      }).slice(0, 10)
    : [];

  const doSearch = (id: string) => {
    scrollToSection(id);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      doSearch(results[0].id);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled
            ? "hsla(220, 20%, 4%, 0.98)"
            : "hsla(220, 20%, 6%, 0.85)",
          borderBottom: scrolled
            ? "1px solid hsla(220,30%,18%,0.8)"
            : "1px solid hsla(220,30%,15%,0.3)",
          boxShadow: scrolled ? "0 4px 30px hsla(0,0%,0%,0.3)" : "none",
        }}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => scrollToSection("home")}
            className={`flex items-center gap-2.5 flex-shrink-0 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9">
              <img
                src={logo}
                alt="Al Samer Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={`hidden sm:block ${isRTL ? "text-right" : "text-left"}`}
            >
              <span className="text-white font-bold text-base block leading-tight">
                ALSamer
              </span>
              <span className="text-white/40 text-[10px]">
                International Company
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center gap-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: Search + Language + Mobile */}
          <div
            className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {/* Search — Desktop */}
            <div ref={searchRef} className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit}>
                <div
                  className="flex items-center gap-2 px-3 transition-all duration-300 overflow-hidden"
                  style={{
                    background: isSearchOpen
                      ? "hsla(220, 20%, 10%, 0.95)"
                      : "hsla(220, 20%, 10%, 0.7)",
                    border: isSearchOpen
                      ? "1px solid hsla(45, 100%, 50%, 0.5)"
                      : "1px solid hsla(220, 30%, 22%, 0.6)",
                    borderRadius: "6px",
                    height: "36px",
                    width: isSearchOpen ? "220px" : "140px",
                    boxShadow: isSearchOpen
                      ? "0 0 0 3px hsla(45,100%,50%,0.08)"
                      : "none",
                  }}
                >
                  <Search
                    className="w-3.5 h-3.5 flex-shrink-0 cursor-pointer"
                    style={{
                      color: isSearchOpen
                        ? "hsl(45,100%,55%)"
                        : "hsla(0,0%,100%,0.3)",
                    }}
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder={isAr ? "ابحث في الموقع..." : "Search..."}
                    className="bg-transparent text-white text-xs outline-none w-full placeholder:text-white/30"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </form>

              {/* Live Results Dropdown */}
              <AnimatePresence>
                {isSearchOpen && results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-64 overflow-hidden"
                    style={{
                      background: "hsl(220, 20%, 8%)",
                      border: "1px solid hsla(220,30%,20%,0.8)",
                      borderRadius: "8px",
                      boxShadow: "0 16px 48px hsla(0,0%,0%,0.5)",
                      right: isRTL ? "auto" : 0,
                      left: isRTL ? 0 : "auto",
                      zIndex: 200,
                    }}
                  >
                    <div className="px-3 py-2 border-b" style={{ borderColor: "hsla(220,30%,18%,0.6)" }}>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">
                        {isAr ? "نتائج البحث" : "Results"}
                      </p>
                    </div>
                    {results.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => doSearch(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white/5 transition-colors duration-150 ${
                          isRTL ? "flex-row-reverse text-right" : ""
                        }`}
                      >
                        <span className="text-base flex-shrink-0">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {isAr ? item.labelAr : item.labelEn}
                          </p>
                          <p className="text-white/30 text-[9px] uppercase tracking-tighter">
                            {item.type === 'section' 
                              ? (isAr ? "قسم رئيسي" : "Main Section") 
                              : (isAr ? "محتوى / تفاصيل" : "Content / Details")}
                          </p>
                        </div>
                        <ArrowRight
                          className={`w-3 h-3 text-yellow-400/60 flex-shrink-0 ${
                            isRTL ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* No results */}
                {isSearchOpen && q.length >= 2 && results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-2 w-64"
                    style={{
                      background: "hsl(220, 20%, 8%)",
                      border: "1px solid hsla(220,30%,20%,0.8)",
                      borderRadius: "8px",
                      padding: "16px",
                      right: isRTL ? "auto" : 0,
                      left: isRTL ? 0 : "auto",
                      zIndex: 200,
                    }}
                  >
                    <p className="text-white/40 text-sm text-center">
                      {isAr ? "لا توجد نتائج" : "No results found"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <LanguageToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-1.5"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden pt-16"
          >
            <div
              className="absolute inset-0"
              style={{
                background: "hsla(220, 20%, 4%, 0.98)",
                backdropFilter: "blur(24px)",
              }}
            />
            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-5 p-8">
              {/* Mobile Search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (results.length > 0) doSearch(results[0].id);
                }}
                className="w-full max-w-xs"
              >
                <div
                  className="flex items-center gap-2 px-4"
                  style={{
                    background: "hsla(220, 20%, 10%, 0.9)",
                    border: "1px solid hsla(220,30%,22%,0.6)",
                    borderRadius: "8px",
                    height: "46px",
                  }}
                >
                  <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isAr ? "ابحث في الموقع..." : "Search anything..."}
                    className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/30"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                {/* Mobile results */}
                {results.length > 0 && (
                  <div
                    className="mt-2 overflow-hidden"
                    style={{
                      background: "hsl(220, 20%, 9%)",
                      border: "1px solid hsla(220,30%,20%,0.8)",
                      borderRadius: "8px",
                    }}
                  >
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => doSearch(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                      >
                        <span>{item.emoji}</span>
                        <span className="text-white text-sm">
                          {isAr ? item.labelAr : item.labelEn}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </form>

              {/* Nav Items */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="text-xl font-semibold text-white/70 hover:text-yellow-400 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
