import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { DhSignature } from "./ui/dh-logo";

interface QuoteData {
  text: string;
  author: string;
  category: string;
}

const inspiringQuotes: QuoteData[] = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
    category: "Passion"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "Development"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    category: "Design"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "Action"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Design"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Development"
  }
];

interface QuoteCardProps {
  quote: QuoteData;
  index: number;
}

function QuoteCard({ quote, index }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        scale: 1.03, 
        y: -10,
        boxShadow: "0 20px 40px rgba(56, 189, 248, 0.3)"
      }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-sky-500/50 transition-all duration-300 h-full">
        <div className="flex items-start space-x-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-300 mb-4 elegant-text leading-relaxed">
              "{quote.text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">{quote.author}</p>
                <p className="text-gray-500 text-xs">{quote.category}</p>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function QuotesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-slate-900/10 rounded-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 display-text">
            <span className="bg-gradient-to-r from-sky-300 to-blue-300 bg-clip-text text-transparent">
              Words That Inspire
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto elegant-text">
            Quotes that fuel my passion for creativity, innovation, and excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {inspiringQuotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-sky-200 text-sm elegant-text">My personal mantra:</span>
            <DhSignature size="md" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
