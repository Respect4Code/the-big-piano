import { Navigation } from "@/components/Navigation";
import { StoryCard } from "@/components/StoryCard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Navigation />

      <main className="container mx-auto px-4 pt-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6">
              The Three Pianos
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-body max-w-2xl mx-auto">
              A musical journey through the life of a musician, from a toddler's toy to a maestro's grand piano.
            </p>
          </motion.div>

          <div className="space-y-8">
            <StoryCard
              title="The Toy Keyboard"
              description="It started when I was three. My parents bought me a cheap, plastic electronic keyboard. It had glowing buttons, pre-recorded animal sounds, and keys that clacked loudly."
              link="/play/toy"
              colorClass="bg-gradient-to-br from-pink-400 to-rose-500 text-white"
              delay={0.1}
            />

            <StoryCard
              title="The Small Upright"
              description="By age ten, the plastic toy was gone. In its place stood a sturdy wooden upright. It wasn't fancy, but it was real. The keys had weight, and the sound was honest."
              link="/play/small"
              colorClass="bg-gradient-to-br from-amber-700 to-yellow-900 text-amber-50"
              delay={0.2}
            />

            <StoryCard
              title="The Grand Piano"
              description="Years later, in a quiet study with high ceilings, sat the masterpiece. A polished black grand piano. Its sound was rich, echoing with complex overtones that filled the room."
              link="/play/big"
              colorClass="bg-gradient-to-br from-slate-900 to-slate-800 text-white"
              delay={0.3}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
