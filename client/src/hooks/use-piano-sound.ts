import { useEffect, useRef } from "react";
import * as Tone from "tone";

export type PianoType = "toy" | "small" | "big";

export function usePianoSound(type: PianoType) {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);

  useEffect(() => {
    let synth: Tone.PolySynth;
    let reverb: Tone.Reverb | null = null;

    if (type === "toy") {
      // Toy: Bright, buzzy, synthetic
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "square" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 },
        volume: -10,
      }).toDestination();
    } else if (type === "small") {
      // Small: Cleaner, simpler tone
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.4 },
        volume: -8,
      }).toDestination();
    } else {
      // Big: Grand, rich with reverb
      reverb = new Tone.Reverb({ decay: 4, wet: 0.4 }).toDestination();
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.6, release: 1.5 },
        volume: -6,
      }).connect(reverb);
    }

    synthRef.current = synth;
    reverbRef.current = reverb;

    return () => {
      synth.dispose();
      reverb?.dispose();
    };
  }, [type]);

  const playNote = (note: string) => {
    if (Tone.context.state !== "running") {
      Tone.start();
    }
    synthRef.current?.triggerAttackRelease(note, "8n");
  };

  return { playNote };
}
