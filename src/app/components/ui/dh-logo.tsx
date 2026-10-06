import { motion } from "motion/react";
import { Sparkles, Code2 } from "lucide-react";

interface DhLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animated?: boolean;
}

export function DhLogo({ size = "md", showText = true, animated = true }: DhLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg", 
    xl: "text-xl"
  };

  const LogoComponent = (
    <div className="flex items-center space-x-3 group">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`relative ${sizeClasses[size]}`}
      >
        {/* Main logo background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7a4b2f] via-orange-500 to-blue-500 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-teal-300/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300" />
        
        {/* DH letters */}
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="flex items-baseline">
            <span className="text-white font-bold text-lg sm:text-xl xl:text-2xl leading-none">D</span>
            <span className="text-white font-bold text-base sm:text-lg xl:text-xl leading-none ml-0.5">h</span>
          </div>
        </div>

        {/* Animated sparkles */}
        {animated && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-300 opacity-70" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1 -left-1"
            >
              <Code2 className="w-3 h-3 text-[#c8d3dc] opacity-70" />
            </motion.div>
          </>
        )}
      </motion.div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <span className={`font-bold text-white ${textSizes[size]} display-text`}>
            Dhurgham
          </span>
          <span className="text-xs text-gray-400 elegant-text">
            Creative Developer
          </span>
        </motion.div>
      )}
    </div>
  );

  return LogoComponent;
}

export function DhSignature({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`font-bold ${sizeClasses[size]} elegant-text`}
    >
      <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-blue-300 bg-clip-text text-transparent">
        Dhrg
      </span>
    </motion.div>
  );
}



