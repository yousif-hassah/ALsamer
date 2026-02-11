import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full p-1 bg-white/5 border border-white/10">
      <motion.button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
          language === 'ar'
            ? 'bg-gradient-to-r from-primary to-warm-orange text-white'
            : 'text-white/60 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        AR
      </motion.button>
      <motion.button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
          language === 'en'
            ? 'bg-gradient-to-r from-primary to-warm-orange text-white'
            : 'text-white/60 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
