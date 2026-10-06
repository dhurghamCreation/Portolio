import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: "ShopVibe",
    description: "Modern e-commerce platform with seamless user experience and advanced filtering system",
    image: "/api/placeholder/800/600",
    category: "Web Development",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Runny Cow",
    description: "Addictive arcade runner game with responsive controls and engaging gameplay mechanics",
    image: "/api/placeholder/800/600",
    category: "Game Development",
    tech: ["Unity", "C#", "WebGL"]
  },
  {
    id: 3,
    title: "Creative Portfolio",
    description: "Stunning visual design showcase with interactive elements and smooth animations",
    image: "/api/placeholder/800/600",
    category: "UI/UX Design",
    tech: ["Figma", "Adobe XD", "CSS"]
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "Real-time data visualization platform with interactive charts and insights",
    image: "/api/placeholder/800/600",
    category: "Data Science",
    tech: ["Python", "D3.js", "PostgreSQL"]
  },
  {
    id: 5,
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking solution with biometric authentication",
    image: "/api/placeholder/800/600",
    category: "Mobile Development",
    tech: ["React Native", "TypeScript", "Firebase"]
  }
];

interface ImageSlideshowProps {
  autoPlay?: boolean;
  interval?: number;
}

export function ImageSlideshow({ autoPlay = true, interval = 5000 }: ImageSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/20 to-teal-900/20">
        {/* Main Slide */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b4129]/20 to-[#334841]/20 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#7a4b2f] to-[#3d564f] rounded-2xl flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{slides[currentSlide].title[0]}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{slides[currentSlide].title}</h3>
                  <p className="text-gray-300 max-w-md mx-auto">{slides[currentSlide].description}</p>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-[#7a4b2f]/20 text-[#e6d7c8] rounded-full text-sm border border-[#8a5a3c]/30">
                    {slides[currentSlide].category}
                  </span>
                  <div className="flex space-x-2">
                    {slides[currentSlide].tech.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 display-text">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-gray-300 text-lg elegant-text">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {slides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
              currentSlide === index
                        ? "ring-2 ring-[#8a5a3c] ring-offset-2 ring-offset-transparent"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6b4129]/20 to-[#334841]/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold">{slide.title[0]}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-medium truncate">{slide.title}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}



