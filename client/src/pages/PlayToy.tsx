import { Navigation } from "@/components/Navigation";
import { Octave } from "@/components/Octave";
import { usePianoSound } from "@/hooks/use-piano-sound";
import { Cat, Dog, Music4 } from "lucide-react";
import { useState } from "react";
import * as Tone from "tone";

export default function PlayToy() {
  const { playNote } = usePianoSound("toy");
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  // Simple sound effects for the toy mode
  const playEffect = (effect: string) => {
    setActiveEffect(effect);
    setTimeout(() => setActiveEffect(null), 300);

    const synth = new Tone.MembraneSynth().toDestination();
    if (effect === "cat") synth.triggerAttackRelease("C6", "8n");
    if (effect === "dog") synth.triggerAttackRelease("A2", "8n");
    if (effect === "duck") synth.triggerAttackRelease("F3", "8n");
  };

  return (
    <div className="min-h-screen theme-toy bg-background transition-colors duration-500 flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,220,0.5),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl w-full mx-auto relative z-10">
          <div className="bg-rose-500 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(255,100,150,0.4)] border-b-8 border-rose-700">
            {/* Header / Speakers */}
            <div className="flex justify-between items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-rose-800 bg-[radial-gradient(circle,transparent_2px,#9f1239_3px)] bg-[length:8px_8px] border-4 border-rose-400 opacity-80" />
              
              <div className="bg-yellow-300 px-8 py-4 rounded-xl shadow-inner border-4 border-yellow-500 transform -rotate-2">
                <h1 className="text-4xl font-display font-black text-rose-600 tracking-wider">
                  FUN-KEY 3000
                </h1>
              </div>
              
              <div className="w-24 h-24 rounded-full bg-rose-800 bg-[radial-gradient(circle,transparent_2px,#9f1239_3px)] bg-[length:8px_8px] border-4 border-rose-400 opacity-80" />
            </div>

            {/* Sound Effect Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button 
                onClick={() => playEffect("cat")}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-transform ${activeEffect === 'cat' ? 'bg-yellow-400 scale-90' : 'bg-yellow-500 hover:scale-110'}`}
              >
                <Cat />
              </button>
              <button 
                onClick={() => playEffect("dog")}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-transform ${activeEffect === 'dog' ? 'bg-blue-400 scale-90' : 'bg-blue-500 hover:scale-110'}`}
              >
                <Dog />
              </button>
              <button 
                onClick={() => playEffect("duck")}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-transform ${activeEffect === 'duck' ? 'bg-green-400 scale-90' : 'bg-green-500 hover:scale-110'}`}
              >
                <Music4 />
              </button>
            </div>

            {/* Piano Keys Container */}
            <div className="bg-white rounded-xl p-2 md:p-4 shadow-inner flex justify-center overflow-x-auto">
              <div className="flex">
                <Octave octaveNumber={4} onPlay={playNote} themeType="toy" showLabels />
                <Octave octaveNumber={5} onPlay={playNote} themeType="toy" showLabels />
                <Octave octaveNumber={6} onPlay={playNote} themeType="toy" showLabels />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl max-w-2xl mx-auto">
             <p className="text-xl font-display text-rose-800">
               "My parents bought me a cheap, plastic electronic keyboard. It had glowing buttons and keys that clacked loudly."
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
