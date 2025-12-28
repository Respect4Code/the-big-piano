import { Navigation } from "@/components/Navigation";
import { Octave } from "@/components/Octave";
import { usePianoSound } from "@/hooks/use-piano-sound";
import { useRef } from "react";

export default function PlayBig() {
  const { playNote } = usePianoSound("big");
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen theme-big bg-background text-foreground transition-colors duration-500 flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-8 relative overflow-hidden">
        {/* Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-600/10 blur-[100px] rounded-full z-0" />

        <div className="w-full max-w-[95vw] relative z-10">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 tracking-widest drop-shadow-lg">
              STEINWAY & SONS
            </h1>
            <p className="text-yellow-500/60 font-mono mt-4 tracking-widest text-sm uppercase">Grand Concert Model D</p>
          </div>

          {/* The Grand Piano Body */}
          <div className="bg-black p-1 rounded-t-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border-t border-white/10 relative">
            <div className="bg-gradient-to-b from-gray-900 to-black p-6 md:p-8 rounded-t-3xl shadow-inner">
              
              {/* Fallboard Shine */}
              <div className="h-2 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4 rounded-full" />

              {/* Scrollable Keys Container */}
              <div 
                ref={scrollRef}
                className="piano-scroll overflow-x-auto pb-4 pt-2 custom-scrollbar bg-black border-t-8 border-red-900 shadow-[inset_0_10px_20px_rgba(0,0,0,1)]"
              >
                <div className="flex w-max mx-auto px-12 bg-red-950/30">
                  {/* Full 88 keys range approximated with 7 octaves */}
                  <Octave octaveNumber={1} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={2} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={3} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={4} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={5} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={6} onPlay={playNote} themeType="big" />
                  <Octave octaveNumber={7} onPlay={playNote} themeType="big" />
                </div>
              </div>
            </div>
            
            {/* Gold trim */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 opacity-60" />
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
             <p className="text-2xl font-display text-gray-400 italic leading-relaxed">
               "In a quiet study with high ceilings, sat the masterpiece. Its sound was rich, echoing with complex overtones that filled the room."
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
