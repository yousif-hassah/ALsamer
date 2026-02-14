import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import containersImage2 from "@/assets/containers-2.jpg";
import containersImage3 from "@/assets/containers-3.jpg";

const TrustSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Floating Elements Container */}
        <div className="relative h-48 sm:h-64 lg:h-80 mb-12 sm:mb-16 lg:mb-20">
          {/* Left floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute left-[2%] sm:left-[8%] lg:left-[15%] top-0 z-10"
          >
            <div className="glass-card p-3 sm:p-4 lg:p-5 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="image-card w-40 h-28 sm:w-56 sm:h-40 lg:w-72 lg:h-48 overflow-hidden rounded-xl">
                <img
                  src={containersImage2}
                  alt="Containers"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-white/60 mt-2 sm:mt-3 text-center font-medium">
                {t("trust.shipments")}
              </p>
            </div>
          </motion.div>

          {/* Right floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute right-[2%] sm:right-[8%] lg:right-[15%] top-4 sm:top-8 z-10"
          >
            <div className="glass-card p-3 sm:p-4 lg:p-5 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="image-card w-40 h-28 sm:w-56 sm:h-40 lg:w-72 lg:h-48 overflow-hidden rounded-xl">
                <img
                  src={containersImage3}
                  alt="Containers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 sm:gap-3 mt-2 sm:mt-3 px-1">
                <span className="text-xs sm:text-sm lg:text-base text-white/60 font-medium">
                  {t("trust.fleet")}
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center globe icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute left-1/2 -translate-x-1/2 top-12 sm:top-16 lg:top-20 z-20"
          >
            <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl">
              <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary via-[hsl(43,100%,45%)] to-soft-yellow flex items-center justify-center shadow-xl shadow-primary/40">
                <svg
                  className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-white/60 mt-2 sm:mt-3 text-center whitespace-nowrap font-medium">
                {t("trust.global")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-6 lg:mt-8"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight px-2">
            {t("trust.title")}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
