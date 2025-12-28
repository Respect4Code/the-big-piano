import { motion } from "framer-motion";

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  onPlay: (note: string) => void;
  label?: string;
  className?: string;
}

export function PianoKey({ note, isBlack, onPlay, label, className = "" }: PianoKeyProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95, y: isBlack ? 2 : 4 }}
      onClick={() => onPlay(note)}
      className={`
        relative flex flex-col justify-end items-center pb-2 select-none outline-none
        ${isBlack 
          ? "z-10 h-32 w-8 -mx-4 rounded-b-lg text-white/50 text-xs shadow-lg" 
          : "z-0 h-48 w-12 rounded-b-xl border border-black/10 shadow-md active:shadow-inner"
        }
        ${className}
      `}
    >
      {label && <span className="opacity-50 font-mono text-[10px]">{label}</span>}
    </motion.button>
  );
}
