import { Navigation } from "@/components/Navigation";
import { Octave } from "@/components/Octave";
import { usePianoSound } from "@/hooks/use-piano-sound";

export default function PlaySmall() {
  const { playNote } = usePianoSound("small");

  return (
    <div className="min-h-screen theme-small bg-wood transition-colors duration-500 flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-5xl w-full mx-auto">
          {/* Piano Casing */}
          <div className="bg-[#5c4033] p-4 rounded-t-lg shadow-2xl border-t-8 border-[#3e2b22] relative">
            <div className="h-40 bg-[#3e2b22] mb-4 relative overflow-hidden shadow-inner flex items-center justify-center rounded-sm">
               {/* Music Stand */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2 bg-[#fdf6e3] shadow-lg opacity-20"></div>
               <h1 className="text-[#c4a484] font-serif tracking-[0.5em] text-xl opacity-60">UPRIGHT</h1>
            </div>

            {/* Keys Bed */}
            <div className="bg-[#2a1d17] p-6 rounded-b-lg shadow-inner flex justify-center overflow-x-auto border-t-4 border-[#1a110d]">
              <div className="flex shadow-2xl bg-black px-1 pb-1 pt-4 rounded-sm">
                <Octave octaveNumber={3} onPlay={playNote} themeType="small" />
                <Octave octaveNumber={4} onPlay={playNote} themeType="small" />
                <Octave octaveNumber={5} onPlay={playNote} themeType="small" />
              </div>
            </div>
            
            {/* Legs shadow */}
            <div className="absolute -bottom-10 left-10 w-4 h-10 bg-[#3e2b22] rounded-b-lg"></div>
            <div className="absolute -bottom-10 right-10 w-4 h-10 bg-[#3e2b22] rounded-b-lg"></div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
             <div className="bg-[#fdf6e3] p-8 shadow-lg rotate-1 transform border border-[#d0c0a0]">
               <p className="text-xl font-serif text-[#5c4033] leading-relaxed italic">
                 "It wasn't fancy, but it was real. The keys had weight, and the sound was honest. I learned my scales here."
               </p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
