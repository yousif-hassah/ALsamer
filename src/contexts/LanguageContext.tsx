import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.tracking": "Track Container",
    "nav.contact": "Contact Us",

    // Hero Section
    "hero.title": "Logistics Without Limits",
    "hero.subtitle":
      "Fast, secure, and cost-effective delivery tailored to your business needs. We optimize routes, reduce expenses, and track every step.",
    "hero.cta": "Start Your Shipment",
    "hero.clients": "satisfied clients",
    "hero.international": "International Shipping",
    "hero.services": "Services",
    "hero.international.desc":
      "We offer a full range of international shipping services to deliver goods worldwide, ensuring reliable and timely deliveries using various modes of transportation.",
    "hero.impact": "Our Impact in Numbers",
    "hero.miles": "Driven Each Year",
    "hero.miles.value": "over 235,000 miles",
    "hero.shipped": "Shipped Monthly",
    "hero.shipped.value": "over 5 million kilograms",
    "hero.transport.modes": "All transport modes available",

    // Trust Section
    "trust.title": "Reliable Logistics You Can Trust",
    "trust.shipments": "2,000+ shipments per month",
    "trust.fleet": "Dedicated fleet",
    "trust.global": "Global network of partners",

    // About Section
    "about.tag": "About Us",
    "about.title": "Al Samer International Company for Trade and Transport",
    "about.description":
      "Al Samer International Company for Trade and Transport is an Iraqi company founded in 2020 by Mr. Samer Mehdi Al Baldawi who is the Managing Director. The Company provides a premium service in the field of logistics and transportation, facilitating the process for its clients.",
    "about.mission":
      "We always strive to satisfy customers by providing high-quality services at competitive prices in the field of public transportation.",
    "about.director": "About the Managing Director",
    "about.director.name": "Mr. Samer Mehdi Al Baldawi",
    "about.director.title": "Managing Director & Founder",
    "about.director.bio":
      "With over 20 years of experience in the logistics and transportation industry, Mr. Samer Mehdi Al Baldawi founded Al Samer International Company with a vision to provide world-class logistics services in Iraq and beyond.",
    "about.founded": "Founded",
    "about.founded.value": "2020",
    "about.experience": "Experience",
    "about.experience.value": "20+ Years",
    "about.countries": "Countries Served",
    "about.countries.value": "50+",

    // Services Section
    "services.tag": "Our Services",
    "services.title": "Comprehensive Logistics Solutions",
    "services.subtitle":
      "Al Samer International Company for Trade and Transport offers land, air and sea transport at highly competitive prices",
    "services.land": "Land Transport",
    "services.land.desc":
      "Efficient road freight solutions with modern fleet across Middle East and beyond.",
    "services.sea": "Sea Freight",
    "services.sea.desc":
      "Global ocean shipping with FCL and LCL options to all major ports worldwide.",
    "services.air": "Air Freight",
    "services.air.desc":
      "Express air cargo services for time-sensitive shipments to any destination.",
    "services.customs": "Customs Clearance",
    "services.customs.desc":
      "Complete customs brokerage and documentation services for smooth import/export.",
    "services.warehouse": "Warehousing",
    "services.warehouse.desc":
      "Secure storage facilities with inventory management and distribution services.",
    "services.consulting": "Logistics Consulting",
    "services.consulting.desc":
      "Expert advice on supply chain optimization and logistics strategy.",

    // Tracking Section
    "tracking.tag": "Container Tracking",
    "tracking.title": "Track Your Container Worldwide",
    "tracking.subtitle":
      "Enter your container number to get real-time tracking information and see your shipment location on the map.",
    "tracking.placeholder": "Enter container number (e.g., MSCU1234567)",
    "tracking.button": "Track Container",
    "tracking.searching": "Searching...",
    "tracking.status": "Status",
    "tracking.location": "Current Location",
    "tracking.updated": "Last Updated",
    "tracking.vessel": "Vessel",
    "tracking.eta": "ETA",
    "tracking.origin": "Origin",
    "tracking.destination": "Destination",
    "tracking.notfound":
      "Container number not found. Please check the number and try again.",
    "tracking.error": "Unable to fetch tracking data. Please try again later.",
    "tracking.invalid": "Please enter a valid container number.",

    // Air Tracking Section
    "airtracking.tag": "Air Cargo Tracking",
    "airtracking.title": "Track Your Air Shipment Worldwide",
    "airtracking.subtitle":
      "Enter your Air Waybill (AWB) number to get real-time tracking information and see your shipment location on the map.",
    "airtracking.placeholder": "Enter AWB number (e.g., 123-12345678)",
    "airtracking.button": "Track Shipment",
    "airtracking.searching": "Searching...",
    "airtracking.status": "Status",
    "airtracking.location": "Current Location",
    "airtracking.updated": "Last Updated",
    "airtracking.flight": "Flight",
    "airtracking.eta": "ETA",
    "airtracking.origin": "Origin",
    "airtracking.destination": "Destination",
    "airtracking.notfound":
      "AWB number not found. Please check the number and try again.",
    "airtracking.error":
      "Unable to fetch tracking data. Please try again later.",
    "airtracking.invalid": "Please enter a valid AWB number.",

    // Why Choose Us Section
    "why.tag": "Why Choose Us",
    "why.title": "Your Trusted Logistics Partner",
    "why.flexibility": "Flexibility & Adaptability",
    "why.flexibility.desc":
      "We adapt to your changing needs with agile solutions that scale with your business.",
    "why.control": "Full Control at Every Stage",
    "why.control.desc":
      "Real-time visibility and complete control over your shipments from origin to destination.",
    "why.quality": "Quality Service",
    "why.quality.desc":
      "Commitment to excellence with industry-leading service standards and customer satisfaction.",
    "why.pricing": "Competitive Pricing",
    "why.pricing.desc":
      "Transparent and competitive rates without compromising on service quality.",
    "why.solutions": "End-to-End Solutions",
    "why.solutions.desc":
      "Complete logistics solutions from pickup to delivery, handling all aspects of your supply chain.",

    // Team Section
    "team.tag": "Our Team",
    "team.title": "Meet Our Leadership",
    "team.subtitle":
      "A dedicated team of professionals driving excellence in logistics",

    // Contact Section
    "contact.tag": "Contact Us",
    "contact.title": "Get in Touch",
    "contact.subtitle":
      "For any questions and inquiries please contact us or visit the company headquarters",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.address": "Address",
    "contact.address.value":
      "Baghdad – Riyadh District – Near the Orthodox Swimming Pool, Block 908 – Alley 5 – Building 16",
    "contact.phone.value": "+964 XXX XXX XXXX",
    "contact.email.value": "info@alsamer.iq",
    "contact.email.click": "Click on Email to send",
    "contact.whatsapp.click": "Click on the number to message on WhatsApp",
    "contact.modal.title": "Send Email",
    "contact.modal.description": "Send a message to:",
    "contact.modal.yourname": "Your Name",
    "contact.modal.youremail": "Your Email",
    "contact.modal.message": "Message",
    "contact.modal.cancel": "Cancel",
    "contact.modal.send": "Send Email",

    // Footer
    "footer.description":
      "Your trusted partner for global logistics solutions. We deliver reliability, speed, and excellence in every shipment.",
    "footer.quicklinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "Al-Samer International Company",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.made": "Made by Al Samer Company Creative Projects",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.tracking": "تتبع الحاوية",
    "nav.contact": "اتصل بنا",

    // Hero Section
    "hero.title": "لوجستيات بلا حدود",
    "hero.subtitle":
      "توصيل سريع وآمن وفعال من حيث التكلفة مصمم خصيصًا لاحتياجات عملك. نقوم بتحسين المسارات وتقليل النفقات وتتبع كل خطوة.",
    "hero.cta": "ابدأ شحنتك",
    "hero.clients": "عميل راضٍ",
    "hero.international": "الشحن الدولي",
    "hero.services": "الخدمات",
    "hero.international.desc":
      "نقدم مجموعة كاملة من خدمات الشحن الدولي لتوصيل البضائع في جميع أنحاء العالم، مما يضمن التسليم الموثوق والسريع باستخدام وسائل نقل متنوعة.",
    "hero.impact": "تأثيرنا بالأرقام",
    "hero.miles": "أميال سنويًا",
    "hero.miles.value": "أكثر من 235,000 ميل",
    "hero.shipped": "شحن شهريًا",
    "hero.shipped.value": "أكثر من 5 ملايين كيلوغرام",
    "hero.transport.modes": "جميع وسائل النقل متوفرة",

    // Trust Section
    "trust.title": "لوجستيات موثوقة يمكنك الاعتماد عليها",
    "trust.shipments": "+2,000 شحنة شهريًا",
    "trust.fleet": "أسطول مخصص",
    "trust.global": "شبكة عالمية من الشركاء",

    // About Section
    "about.tag": "من نحن",
    "about.title": "شركة السامر الدولية للتجارة والنقل",
    "about.description":
      "شركة السامر الدولية للتجارة والنقل هي شركة عراقية تأسست عام 2020 على يد السيد سامر مهدي البلداوي وهو المدير العام. تقدم الشركة خدمة متميزة في مجال الخدمات اللوجستية والنقل، مما يسهل العملية على عملائها.",
    "about.mission":
      "نسعى دائمًا لإرضاء العملاء من خلال تقديم خدمات عالية الجودة بأسعار تنافسية في مجال النقل العام.",
    "about.director": "عن المدير العام",
    "about.director.name": "السيد سامر مهدي البلداوي",
    "about.director.title": "المدير العام والمؤسس",
    "about.director.bio":
      "مع أكثر من 20 عامًا من الخبرة في صناعة الخدمات اللوجستية والنقل، أسس السيد سامر مهدي البلداوي شركة السامر الدولية برؤية لتقديم خدمات لوجستية عالمية المستوى في العراق وخارجه.",
    "about.founded": "التأسيس",
    "about.founded.value": "2020",
    "about.experience": "الخبرة",
    "about.experience.value": "+20 سنة",
    "about.countries": "الدول المخدومة",
    "about.countries.value": "+50",

    // Services Section
    "services.tag": "خدماتنا",
    "services.title": "حلول لوجستية شاملة",
    "services.subtitle":
      "تقدم شركة السامر الدولية للتجارة والنقل خدمات النقل البري والجوي والبحري بأسعار تنافسية للغاية",
    "services.land": "النقل البري",
    "services.land.desc":
      "حلول شحن بري فعالة مع أسطول حديث عبر الشرق الأوسط وخارجه.",
    "services.sea": "الشحن البحري",
    "services.sea.desc":
      "شحن بحري عالمي مع خيارات حاويات كاملة وجزئية إلى جميع الموانئ الرئيسية.",
    "services.air": "الشحن الجوي",
    "services.air.desc":
      "خدمات شحن جوي سريع للشحنات الحساسة للوقت إلى أي وجهة.",
    "services.customs": "التخليص الجمركي",
    "services.customs.desc":
      "خدمات وساطة جمركية كاملة وتوثيق لاستيراد/تصدير سلس.",
    "services.warehouse": "التخزين",
    "services.warehouse.desc":
      "مرافق تخزين آمنة مع إدارة المخزون وخدمات التوزيع.",
    "services.consulting": "الاستشارات اللوجستية",
    "services.consulting.desc":
      "نصائح خبراء حول تحسين سلسلة التوريد واستراتيجية الخدمات اللوجستية.",

    // Tracking Section
    "tracking.tag": "تتبع الحاوية",
    "tracking.title": "تتبع حاويتك في جميع أنحاء العالم",
    "tracking.subtitle":
      "أدخل رقم الحاوية للحصول على معلومات التتبع في الوقت الفعلي ومشاهدة موقع شحنتك على الخريطة.",
    "tracking.placeholder": "أدخل رقم الحاوية (مثال: MSCU1234567)",
    "tracking.button": "تتبع الحاوية",
    "tracking.searching": "جاري البحث...",
    "tracking.status": "الحالة",
    "tracking.location": "الموقع الحالي",
    "tracking.updated": "آخر تحديث",
    "tracking.vessel": "السفينة",
    "tracking.eta": "وقت الوصول المتوقع",
    "tracking.origin": "المنشأ",
    "tracking.destination": "الوجهة",
    "tracking.notfound":
      "رقم الحاوية غير موجود. يرجى التحقق من الرقم والمحاولة مرة أخرى.",
    "tracking.error": "تعذر جلب بيانات التتبع. يرجى المحاولة مرة أخرى لاحقًا.",
    "tracking.invalid": "يرجى إدخال رقم حاوية صالح.",

    // Air Tracking Section
    "airtracking.tag": "تتبع الشحن الجوي",
    "airtracking.title": "تتبع شحنتك الجوية في جميع أنحاء العالم",
    "airtracking.subtitle":
      "أدخل رقم بوليصة الشحن الجوي (AWB) للحصول على معلومات التتبع في الوقت الفعلي ومشاهدة موقع شحنتك على الخريطة.",
    "airtracking.placeholder": "أدخل رقم AWB (مثال: 123-12345678)",
    "airtracking.button": "تتبع الشحنة",
    "airtracking.searching": "جاري البحث...",
    "airtracking.status": "الحالة",
    "airtracking.location": "الموقع الحالي",
    "airtracking.updated": "آخر تحديث",
    "airtracking.flight": "الرحلة",
    "airtracking.eta": "وقت الوصول المتوقع",
    "airtracking.origin": "المنشأ",
    "airtracking.destination": "الوجهة",
    "airtracking.notfound":
      "رقم AWB غير موجود. يرجى التحقق من الرقم والمحاولة مرة أخرى.",
    "airtracking.error":
      "تعذر جلب بيانات التتبع. يرجى المحاولة مرة أخرى لاحقًا.",
    "airtracking.invalid": "يرجى إدخال رقم AWB صالح.",

    // Why Choose Us Section
    "why.tag": "لماذا تختارنا",
    "why.title": "شريكك اللوجستي الموثوق",
    "why.flexibility": "المرونة والقدرة على التكيف",
    "why.flexibility.desc":
      "نتكيف مع احتياجاتك المتغيرة بحلول مرنة تنمو مع عملك.",
    "why.control": "تحكم كامل في كل مرحلة",
    "why.control.desc":
      "رؤية في الوقت الفعلي وتحكم كامل في شحناتك من المنشأ إلى الوجهة.",
    "why.quality": "خدمة عالية الجودة",
    "why.quality.desc":
      "التزام بالتميز مع معايير خدمة رائدة في الصناعة ورضا العملاء.",
    "why.pricing": "أسعار تنافسية",
    "why.pricing.desc": "أسعار شفافة وتنافسية دون المساومة على جودة الخدمة.",
    "why.solutions": "حلول شاملة",
    "why.solutions.desc":
      "حلول لوجستية كاملة من الاستلام إلى التسليم، تتعامل مع جميع جوانب سلسلة التوريد الخاصة بك.",

    // Team Section
    "team.tag": "فريقنا",
    "team.title": "تعرف على فريق القيادة",
    "team.subtitle": "فريق متخصص من المحترفين يقود التميز في الخدمات اللوجستية",

    // Contact Section
    "contact.tag": "اتصل بنا",
    "contact.title": "تواصل معنا",
    "contact.subtitle":
      "لأي أسئلة واستفسارات يرجى الاتصال بنا أو زيارة مقر الشركة",
    "contact.name": "اسمك",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "رسالتك",
    "contact.send": "إرسال الرسالة",
    "contact.address": "العنوان",
    "contact.address.value":
      "بغداد – حي الرياض – قرب مسبح الأرثوذكس، محلة 908 – زقاق 5 – بناية 16",
    "contact.phone.value": "+964 XXX XXX XXXX",
    "contact.email.value": "info@alsamer.iq",
    "contact.email.click": "اضغط على الإيميل للإرسال",
    "contact.whatsapp.click": "اضغط على الرقم للمراسلة عبر واتساب",
    "contact.modal.title": "إرسال بريد إلكتروني",
    "contact.modal.description": "إرسال رسالة إلى:",
    "contact.modal.yourname": "اسمك",
    "contact.modal.youremail": "بريدك الإلكتروني",
    "contact.modal.message": "الرسالة",
    "contact.modal.cancel": "إلغاء",
    "contact.modal.send": "إرسال البريد",

    // Footer
    "footer.description":
      "شريكك الموثوق لحلول الخدمات اللوجستية العالمية. نقدم الموثوقية والسرعة والتميز في كل شحنة.",
    "footer.quicklinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "شركة السامر الدولية",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
    "footer.made": "صنع بواسطة مشاريع شركة السامر الإبداعية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    if (saved === "ar" || saved === "en") return saved;
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ar")) return "ar";
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
    if (isRTL) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [isRTL, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
