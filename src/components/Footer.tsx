import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-white.webp";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const quickLinks = [
    { 
      labelEn: "Home Page", 
      labelAr: "الصفحة الرئيسية", 
      href: "#home", 
      icon: <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> 
    },
    { 
      labelEn: "About Company", 
      labelAr: "عن الشركة", 
      href: "#about", 
      icon: <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    },
    { 
      labelEn: "Prohibited Items", 
      labelAr: "المواد المحظورة", 
      href: "#", 
      icon: <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg> 
    },
    { 
      labelEn: "Contact Support", 
      labelAr: "اتصل بالدعم", 
      href: "#contact", 
      icon: <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg> 
    },
  ];

  const services = [
    { en: "Air Freight", ar: "خدمات الشحن الجوي" },
    { en: "Land Shipping", ar: "خدمات الشحن البري" },
    { en: "Sea Freight", ar: "خدمات الشحن البحري" },
    { en: "Customs Clearance", ar: "خدمات التخليص الجمركي" },
    { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
  ];

  return (
    <footer className="relative bg-background border-t" style={{ borderColor: "hsla(220,30%,15%,0.6)" }}>
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mb-12 items-start ${isRTL ? "text-right" : "text-left"}`}>

          {/* Column 1: Locations */}
          <div className="space-y-4">
            <h4 className="text-primary font-bold text-sm tracking-wide">
              {isAr ? "عنوان المقر والموقع" : "Headquarters & Location"}
            </h4>
            <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span className="text-white/70 text-[11px] leading-tight">
                {isAr 
                  ? "بغداد - حي الرياض - قرب مسبح الأرثوذكس، بلدة 908- زقاق 5- بناية 16" 
                  : "Baghdad - Riyadh District - Near the Orthodox Swimming Pool, Block 908-Alley 5- Building 16"}
              </span>
            </div>
            
            <h4 className="text-primary font-bold text-sm tracking-wide pt-4">
              {isAr ? "الفروع الدولية" : "International Branches"}
            </h4>
            <ul className="space-y-3">
              <li className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="w-3.5 h-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-[10px]">
                  {isAr ? "المنطقة الحرة بمطار دبي، المربع 24 H" : "Dubai Airport Freezone, Block 24 H"}
                </span>
              </li>
              <li className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <MapPin className="w-3.5 h-3.5 text-primary/60 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-[10px]">
                  {isAr ? "أربيل - شارع 100 طن، مقابل مطار أربيل" : "Erbil - 100m St, Opp. Erbil Airport"}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Emails */}
          <div className="space-y-4">
            <h4 className="text-primary font-bold text-sm tracking-wide">
              {isAr ? "رسائل البريد الإلكتروني" : "Our Emails"}
            </h4>
            <ul className="space-y-4 pt-2">
              {[
                "samer@alsamer-int.com",
                "Haidar@alsamer-int.com",
                "Hussain@alsamer-int.com",
                "Aya@alsamer-int.com"
              ].map((email) => (
                <li key={email} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail className="w-4 h-4 text-primary opacity-70" />
                  <a href={`mailto:${email}`} className="text-white/70 hover:text-white text-xs transition-colors break-all">
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Mobile Numbers */}
          <div className="space-y-4">
            <h4 className="text-primary font-bold text-sm tracking-wide">
              {isAr ? "أرقام هواتف المحمول" : "Mobile Phone Numbers"}
            </h4>
            <ul className="space-y-4 pt-2">
              {[
                "07738828882",
                "07760300888",
                "07905460036",
                "07724000091"
              ].map((phone) => (
                <li key={phone} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Phone className="w-4 h-4 text-primary opacity-70" />
                  <a href={`tel:${phone}`} className="text-white/70 hover:text-white text-sm font-medium transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-4 pt-1">
             <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-4 pt-2">
              {quickLinks.map((link) => (
                <li key={link.labelEn}>
                  <a href={link.href} className={`flex items-center gap-3 text-white/50 hover:text-white text-xs transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-primary">{link.icon}</span>
                    <span className="leading-none">{isAr ? link.labelAr : link.labelEn}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Services */}
          <div className="space-y-4 pt-1">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {isAr ? "خدماتنا" : "Services"}
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.en}>
                  <a href="#services" className="text-white/50 hover:text-primary text-xs transition-colors">
                    {isAr ? s.ar : s.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: Brand & About */}
          <div className="space-y-5">
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-10 h-10 flex-shrink-0">
                <img src={logo} alt="Al Samer Logo" className="w-full h-full object-contain" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <span className="text-white font-bold text-lg block leading-tight">Al Samer</span>
                <span className="text-white/40 text-[10px] tracking-widest uppercase">Int. Logistics</span>
              </div>
            </div>
            <p className="text-white/50 text-[11px] leading-relaxed">
              {isAr 
                ? "تأسست شركة السامر الدولية عام 2004، ومنذ ذلك الحين تحولت إلى شركة لوجستية عالمية رائدة. تفتخر الشركة بحضور قوي وفروع تغطي العراق والإمارات العربية المتحدة وغيرها. نلتزم بتقديم أفضل الحلول اللوجستية وتسهيل عمليات التجارة لعملائنا بكل احترافية وأمان."
                : "Established in 2004, Al Samer Int. has evolved into a leading global logistics firm. With a strong presence in Iraq and UAE, we are dedicated to providing superior logistics solutions and simplifying trade operations for our clients with professionalism and security."}
            </p>
            <div className={`flex items-center gap-3 ${isRTL ? "justify-end" : ""}`}>
              <a href="#" className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors"><Instagram className="w-4 h-4 text-white/50" /></a>
              <a href="#" className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors"><Facebook className="w-4 h-4 text-white/50" /></a>
              <a href="#" className="p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors"><Mail className="w-4 h-4 text-white/50" /></a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6" style={{ background: "hsla(220,30%,15%,0.8)" }} />

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <p className="text-white/30 text-[10px]">
            © {new Date().getFullYear()} {isAr ? "شركة السامر الدولية — جميع الحقوق محفوظة" : "Al Samer International — All Rights Reserved"}
          </p>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a href="#" className="text-white/30 hover:text-white/60 text-[10px] transition-colors">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-white/30 hover:text-white/60 text-[10px] transition-colors">{isAr ? "الشروط والأحكام" : "Terms of Service"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
