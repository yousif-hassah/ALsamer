import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import containersImage from "@/assets/containers-1.jpg";
import truckImage from "@/assets/truck-delivery.jpg";

const ComprehensiveSection = () => {
  const features = [
    "Personal Account Manager",
    "Cargo Protection Guarantee",
    "Custom Tailored Delivery Plans",
    "Global Network, Local Expertise",
    "Smart Cargo Tracking",
    "Priority Handling",
  ];

  return (
    <section id="services" className="relative py-24 bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(0,30%,8%)] to-background opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Comprehensive
            <br />
            Logistics Solution
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-lg text-white/50 leading-relaxed">
              We provide a full range of logistics services to meet 
              your business needs. From international and domestic 
              shipping to warehousing and customs clearance, we 
              ensure fast, secure, and cost-effective delivery.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Features</h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Optimization</h4>
                <p className="text-sm text-white/50 leading-relaxed">
                  We combine international reach with on-the-ground 
                  specialists to navigate complex regulations 
                  and optimize routes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* International Shipping Card */}
            <div className="glass-card-warm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">International Shipping</h3>
                  <span className="tag">Services</span>
                </div>
              </div>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                We offer a full range of international shipping services to 
                deliver goods worldwide, ensuring reliable and timely 
                deliveries using various modes of transportation.
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-white/40">Freight</p>
                  <p className="text-sm text-white/70">Air, Sea, Shipping</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/40">Type</p>
                  <p className="text-sm text-white/70">Ground, Multimodal</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="image-card flex-1 h-24 overflow-hidden">
                  <img
                    src={containersImage}
                    alt="Containers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="hero" size="sm" className="whitespace-nowrap">
                  Start Your Shipment
                </Button>
              </div>
            </div>

            {/* Delivery Times Card */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Delivery Times</h3>
              
              <div className="image-card h-32 mb-4 overflow-hidden">
                <img
                  src={truckImage}
                  alt="Delivery truck"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0">
                <div className="stat-row">
                  <span className="text-sm text-white/50">Minimum Weight</span>
                  <span className="text-sm text-white font-medium">50 kg (110 lbs)</span>
                </div>
                <div className="stat-row">
                  <span className="text-sm text-white/50">Delivery Time</span>
                  <span className="text-sm text-white font-medium">5-15 business days</span>
                </div>
              </div>
            </div>

            {/* Our Experience Card */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Our Experience</h3>
              
              <div className="space-y-0">
                <div className="stat-row">
                  <span className="text-sm text-white/50">Successfully Delivered</span>
                  <span className="text-sm text-white font-medium">10,000+ international shipments</span>
                </div>
                <div className="stat-row">
                  <span className="text-sm text-white/50">Countries</span>
                  <span className="text-sm text-white font-medium">over 50</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSection;
