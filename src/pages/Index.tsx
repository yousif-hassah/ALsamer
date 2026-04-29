import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ServicesSection from "@/components/ServicesSection";
import ExclusiveServicesSection from "@/components/ExclusiveServicesSection";
import ContainersSection from "@/components/ContainersSection";
import StorageSection from "@/components/StorageSection";
import ContainerTracking from "@/components/ContainerTracking";
import AirTracking from "@/components/AirTracking";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationsSection from "@/components/LocationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Fixed sticky social sidebar */}
      <SocialSidebar />

      {/* Sticky Navbar with search */}
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust / Social proof */}
      <TrustSection />

      {/* 3. Who is Al Samer */}
      <AboutSection />

      {/* 4. Why Al Samer (Speed, Security, Trust, International XP, Professionalism) */}
      <WhyChooseUsSection />

      {/* 5. How We Work (Request → Inspect → Store → Ship → Deliver) */}
      <HowWeWorkSection />

      {/* 6. Main Services (Land, Sea, Air + others) */}
      <ServicesSection />

      {/* 7. Exclusive Services (Shopping Partners, COD, Storage, QC, Pickup) */}
      <ExclusiveServicesSection />

      {/* 8. Container Types (20ft, 40ft, Refrigerated, Open Top) */}
      <ContainersSection />

      {/* 9. Storage Section */}
      <StorageSection />

      {/* 10. Container Tracking */}
      <ContainerTracking />

      {/* 11. Air Tracking */}
      <AirTracking />

      {/* 12. Animated Stats (15+ Yrs, 24/7, 5000+) */}
      <StatsSection />

      {/* 13. Customer Testimonials */}
      <TestimonialsSection />

      {/* 14. Our Locations (Erbil + Baghdad → Google Maps) */}
      <LocationsSection />

      {/* 16. Contact */}
      <ContactSection />

      {/* 17. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
