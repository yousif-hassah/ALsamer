import { motion } from "framer-motion";

interface FlowingCurvesProps {
  variant?: "hero" | "section" | "why-us";
}

const FlowingCurves = ({ variant = "hero" }: FlowingCurvesProps) => {
  if (variant === "hero") {
    return (
      <div className="flowing-curves">
        {/* Main gradient glow */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[hsl(0,70%,20%)] via-[hsl(5,60%,15%)] to-transparent opacity-80 blur-2xl" />
        </div>

        {/* Flowing curve layers - more organic and layered */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="curveGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 70%, 18%)" stopOpacity="1" />
              <stop offset="40%" stopColor="hsl(8, 75%, 28%)" stopOpacity="0.9" />
              <stop offset="70%" stopColor="hsl(15, 80%, 38%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(22, 85%, 48%)" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="curveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 65%, 15%)" stopOpacity="0.95" />
              <stop offset="50%" stopColor="hsl(10, 75%, 30%)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(20, 82%, 42%)" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="curveGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 60%, 12%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(5, 65%, 22%)" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="curveGradient4" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(3, 72%, 22%)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="hsl(12, 78%, 35%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(25, 88%, 50%)" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Deepest background curve */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.1 }}
            d="M-100 350 C 150 180, 400 280, 650 220 S 950 180, 1200 280 S 1400 200, 1540 250 L 1540 950 L -100 950 Z"
            fill="url(#curveGradient3)"
          />

          {/* Second layer curve */}
          <motion.path
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            d="M-100 420 C 200 280, 450 380, 700 320 S 1000 260, 1250 360 S 1450 300, 1540 340 L 1540 950 L -100 950 Z"
            fill="url(#curveGradient1)"
          />

          {/* Third layer - mid bright */}
          <motion.path
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d="M-100 500 C 250 350, 500 450, 750 400 S 1050 340, 1300 440 S 1480 380, 1540 420 L 1540 950 L -100 950 Z"
            fill="url(#curveGradient2)"
          />

          {/* Front curve - brightest orange */}
          <motion.path
            initial={{ opacity: 0, x: -90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            d="M-100 580 C 300 420, 550 520, 800 470 S 1100 410, 1350 510 S 1500 460, 1540 490 L 1540 950 L -100 950 Z"
            fill="url(#curveGradient4)"
          />
        </svg>

        {/* Subtle glow spots */}
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(12,75%,30%)] opacity-25 blur-[120px]" />
        <div className="absolute top-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-[hsl(20,80%,40%)] opacity-20 blur-[100px]" />
      </div>
    );
  }

  if (variant === "why-us") {
    return (
      <div className="flowing-curves">
        {/* Red/orange curves for Why Us section */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="whyUsGradient1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 70%, 25%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(15, 80%, 40%)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="whyUsGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(5, 75%, 30%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(20, 85%, 45%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            d="M-100 800 Q 200 500, 500 650 T 900 550 T 1200 700 T 1540 600 L 1540 0 L -100 0 Z"
            fill="url(#whyUsGradient1)"
          />

          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            d="M-100 800 Q 300 550, 600 700 T 1000 600 T 1300 750 T 1540 650 L 1540 0 L -100 0 Z"
            fill="url(#whyUsGradient2)"
          />
        </svg>

        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(0,70%,25%)] opacity-20 blur-[120px]" />
      </div>
    );
  }

  return null;
};

export default FlowingCurves;
