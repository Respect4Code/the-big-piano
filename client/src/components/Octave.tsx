import { PianoKey } from "./PianoKey";

interface OctaveProps {
  octaveNumber: number;
  onPlay: (note: string) => void;
  showLabels?: boolean;
  themeType: "toy" | "small" | "big";
}

export function Octave({ octaveNumber, onPlay, showLabels = false, themeType }: OctaveProps) {
  // Styles based on theme
  const getStyles = (isBlack: boolean) => {
    if (themeType === "toy") {
      return isBlack 
        ? "bg-purple-900 border-2 border-purple-950" 
        : "bg-gradient-to-b from-pink-100 to-pink-200 border-2 border-pink-300";
    }
    if (themeType === "small") {
      return isBlack
        ? "bg-stone-800 border-b-4 border-stone-900"
        : "bg-[#fdf6e3] border-b-4 border-[#d0c0a0]";
    }
    // Big Piano
    return isBlack
      ? "bg-black border border-gray-800 shadow-xl"
      : "bg-white border-l border-r border-gray-300";
  };

  const notes = [
    { note: `C${octaveNumber}`, isBlack: false },
    { note: `C#${octaveNumber}`, isBlack: true },
    { note: `D${octaveNumber}`, isBlack: false },
    { note: `D#${octaveNumber}`, isBlack: true },
    { note: `E${octaveNumber}`, isBlack: false },
    { note: `F${octaveNumber}`, isBlack: false },
    { note: `F#${octaveNumber}`, isBlack: true },
    { note: `G${octaveNumber}`, isBlack: false },
    { note: `G#${octaveNumber}`, isBlack: true },
    { note: `A${octaveNumber}`, isBlack: false },
    { note: `A#${octaveNumber}`, isBlack: true },
    { note: `B${octaveNumber}`, isBlack: false },
  ];

  return (
    <div className="flex relative">
      {notes.map((n) => (
        <PianoKey
          key={n.note}
          note={n.note}
          isBlack={n.isBlack}
          onPlay={onPlay}
          label={showLabels && !n.isBlack ? n.note : undefined}
          className={getStyles(n.isBlack)}
        />
      ))}
    </div>
  );
}
