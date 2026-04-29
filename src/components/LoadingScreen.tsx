import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-white.webp";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(hsla(45,100%,50%,0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsla(45,100%,50%,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 relative">
                <img
                  src={logo}
                  alt="Al Samer"
                  className="w-full h-full object-contain"
                />
                {/* Rotating ring */}
                <div
                  className="absolute inset-0 border-2 border-transparent animate-spin-slow"
                  style={{
                    borderTopColor: "hsl(45, 100%, 50%)",
                    borderRadius: "50%",
                    margin: "-8px",
                  }}
                />
              </div>

              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white font-bold text-2xl tracking-widest"
                >
                  AL SAMER
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/50 text-xs tracking-wider uppercase"
                >
                  International Logistics
                </motion.p>
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 relative overflow-hidden"
              style={{ background: "hsla(220, 20%, 20%, 1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  background: "linear-gradient(90deg, hsl(45,100%,50%), hsl(48,90%,65%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "hsl(45, 100%, 50%)" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
