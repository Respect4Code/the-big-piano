import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface StoryCardProps {
  title: string;
  description: string;
  link: string;
  colorClass: string;
  delay?: number;
}

export function StoryCard({ title, description, link, colorClass, delay = 0 }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`
        relative group overflow-hidden rounded-3xl p-8 
        ${colorClass} shadow-xl border border-white/10
        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
      `}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 font-display">{title}</h3>
        <p className="text-lg opacity-90 mb-8 leading-relaxed font-body max-w-md">
          {description}
        </p>
        
        <Link 
          href={link}
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-full 
            bg-white/20 hover:bg-white/30 backdrop-blur-sm 
            font-bold transition-colors
          "
        >
          Play This Piano <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Abstract Background Shapes */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute top-10 -left-10 w-32 h-32 rounded-full bg-black/5 blur-2xl" />
    </motion.div>
  );
}
