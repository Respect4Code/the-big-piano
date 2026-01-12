import { useState, useEffect, useRef, useCallback } from "react";
import { 
  COPY, STORY, ICONS, 
  type Lang, type Entry,
  loadEntries, saveEntries, getPin, setPin, wipeAllData,
  getPinHint, setPinHint, resetPinOnly
} from "@/lib/story";
import { Music, BookOpen, FileText, Download, Settings, ChevronDown } from "lucide-react";
import { dbPutAudio, dbGetAudio, dbDeleteAudio, dbWipeAllAudio } from "@/lib/idb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import coverImage from "@assets/man_the_big_paino_2_image-145_1767059586840.jpg";
import elephantBookImageEn from "@assets/image-155_1767566599607.jpg";
import elephantBookImageZh from "@assets/Chinese_Cover_1768167832940.png";
import journeyPdfEn from "@assets/Piano_to_Bitcoin_Journey_EN_1768167567650.pdf";
import journeyPdfZh from "@assets/Piano_to_Bitcoin_Journey_CN_1768167580634.pdf";
import archiveOfUnspokenPdfEn from "@assets/Archive_of_the_Unspoken_EN_(1)_1768167672548.pdf";
import archiveOfUnspokenPdfZh from "@assets/默境存真_人机共魂对话录_(1)_1768167682008.pdf";
import elephantNoisePdfEn from "@assets/Elephant_Noise_EN_(1)_1768167894347.pdf";
import elephantNoisePdfZh from "@assets/Elephant_Noise_CN_(1)_1768167903445.pdf";
import hendrixCoderImage from "@assets/image-159_1768174458558.jpg";
import aiSynthesisImage from "@assets/Screenshot_2026-01-06_at_22.50.52_1768174515494.png";
import mozartAudio from "@assets/mozart_rondo_alla_turca.mp3";
import beethovenAudio from "@assets/beethoven_moonlight_sonata.mp3";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const [childAge, setChildAge] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedMime, setRecordedMime] = useState<string>("");
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  // Parent modal state
  const [parentOpen, setParentOpen] = useState(false);
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [hintInput, setHintInput] = useState("");
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showForgotPin, setShowForgotPin] = useState(false);
  
  // Elephant Gate state
  const [elephantGatePassed, setElephantGatePassed] = useState(false);
  const [elephantGateFading, setElephantGateFading] = useState(false);
  const [showIvoryContext, setShowIvoryContext] = useState(false);
  const [showPinWhisper, setShowPinWhisper] = useState(false);

  // Classical music player state
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<"mozart" | "beethoven">("mozart");
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const CLASSICAL_TRACKS = {
    mozart: { title: "Mozart - Rondo Alla Turca", url: mozartAudio },
    beethoven: { title: "Beethoven - Moonlight Sonata", url: beethovenAudio }
  };

  const copy = COPY[lang];
  const story = STORY[lang];

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        dismissSplash();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const dismissSplash = () => {
    setSplashFading(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 500);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const toggleIcon = (key: string) => {
    setSelectedIcons(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearIcons = () => setSelectedIcons(new Set());

  const pickMimeType = () => {
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
    for (const t of candidates) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  };

  const startRecording = async () => {
    try {
      if (!mediaStreamRef.current) {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      const mimeType = pickMimeType();
      const options: MediaRecorderOptions = mimeType ? { mimeType } : {};
      
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, options);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        setRecordedBlob(blob);
        setRecordedMime(mimeType || "audio/webm");
        if (recordedUrl) URL.revokeObjectURL(recordedUrl);
        setRecordedUrl(URL.createObjectURL(blob));
        setIsRecording(false);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
      showToast("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const saveEntry = async () => {
    const id = `entry_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    
    if (recordedBlob) {
      await dbPutAudio(id, recordedBlob, recordedMime);
    }
    
    const entry: Entry = {
      id,
      createdAt: Date.now(),
      lang,
      childAge: childAge.trim(),
      note: note.trim(),
      icons: Array.from(selectedIcons),
      hasAudio: !!recordedBlob,
    };
    
    const updated = [entry, ...entries];
    saveEntries(updated);
    setEntries(updated);
    
    // Reset form
    setChildAge("");
    setNote("");
    setSelectedIcons(new Set());
    setRecordedBlob(null);
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    
    // Show save confirmation with animation
    setJustSaved(true);
    showToast(lang === "zh" ? "时刻已保存" : "Moment saved");
    setTimeout(() => setJustSaved(false), 2000);
  };

  const deleteEntry = async (id: string) => {
    await dbDeleteAudio(id);
    const updated = entries.filter(e => e.id !== id);
    saveEntries(updated);
    setEntries(updated);
    showToast(lang === "zh" ? "已删除" : "Deleted");
  };

  const [playingEntryId, setPlayingEntryId] = useState<string | null>(null);
  const entryAudioRef = useRef<HTMLAudioElement | null>(null);

  const playEntryAudio = async (id: string) => {
    const data = await dbGetAudio(id);
    if (!data) return;
    
    if (entryAudioRef.current) {
      entryAudioRef.current.pause();
    }
    
    const url = URL.createObjectURL(data.blob);
    entryAudioRef.current = new Audio(url);
    entryAudioRef.current.onended = () => {
      setPlayingEntryId(null);
      URL.revokeObjectURL(url);
    };
    entryAudioRef.current.play();
    setPlayingEntryId(id);
  };

  const exportData = () => {
    const data = JSON.stringify(entries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bigpiano_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wipeData = async () => {
    if (!confirm(lang === "zh" ? "确定要删除所有本地数据吗？" : "Delete all local data?")) return;
    
    // Stop any playing audio
    if (entryAudioRef.current) {
      entryAudioRef.current.pause();
      entryAudioRef.current = null;
    }
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
      musicAudioRef.current = null;
    }
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    
    // Clear all data
    await dbWipeAllAudio();
    wipeAllData();
    
    // Force page reload to ensure clean state
    window.location.reload();
  };

  const unlockParent = () => {
    const storedPin = getPin();
    if (storedPin === null) {
      // No PIN set yet, show setup flow
      setShowPinSetup(true);
    } else if (pinInput === storedPin) {
      setParentUnlocked(true);
      setPinInput("");
      setFailedAttempts(0);
      setShowForgotPin(false);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      const hint = getPinHint();
      if (newAttempts >= 3) {
        setShowForgotPin(true);
      }
      if (newAttempts === 1 && hint) {
        showToast(lang === "zh" ? `PIN错误。再试一次。提示：${hint}` : `Wrong PIN. Try again. Hint: ${hint}`);
      } else {
        showToast(lang === "zh" ? "PIN错误。再试一次。" : "Wrong PIN. Try again.");
      }
    }
  };
  
  const handleForgotPin = () => {
    const confirmed = confirm(
      lang === "zh" 
        ? "重置您的PIN码？您的录音不会被删除。"
        : "Reset your PIN? Your recordings won't be deleted."
    );
    if (confirmed) {
      resetPinOnly();
      setPinInput("");
      setFailedAttempts(0);
      setShowForgotPin(false);
      setShowPinSetup(true);
      showToast(lang === "zh" ? "PIN已清除。请设置新PIN码以重新锁定家长区域。" : "PIN cleared. Set a new one to lock the Parent area again.");
    }
  };
  
  const handlePinSetup = () => {
    if (newPinInput.length >= 4) {
      setPin(newPinInput);
      if (hintInput.trim()) {
        setPinHint(hintInput.trim());
      }
      setNewPinInput("");
      setHintInput("");
      setShowPinSetup(false);
      setParentUnlocked(true);
      setElephantGatePassed(true);
      setShowPinWhisper(true);
      setTimeout(() => setShowPinWhisper(false), 4000);
      showToast(lang === "zh" ? "PIN已设置" : "PIN set");
    } else {
      showToast(lang === "zh" ? "PIN需至少4位" : "PIN must be at least 4 digits");
    }
  };
  
  const openParentModal = () => {
    const storedPin = getPin();
    if (storedPin === null) {
      setShowPinSetup(true);
    }
    setParentOpen(true);
  };

  const updatePin = () => {
    if (newPinInput.length >= 4) {
      setPin(newPinInput);
      setNewPinInput("");
      showToast(lang === "zh" ? "PIN已更新" : "PIN updated");
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString(undefined, { 
      year: "numeric", month: "short", day: "2-digit", 
      hour: "2-digit", minute: "2-digit" 
    });
  };

  const toggleMusic = () => {
    if (!musicAudioRef.current) {
      musicAudioRef.current = new Audio(CLASSICAL_TRACKS[currentTrack].url);
      musicAudioRef.current.loop = true;
      musicAudioRef.current.volume = 0.4;
    }
    if (musicPlaying) {
      musicAudioRef.current.pause();
      setMusicPlaying(false);
    } else {
      musicAudioRef.current.play().catch(console.error);
      setMusicPlaying(true);
    }
  };

  const switchTrack = (track: "mozart" | "beethoven") => {
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
      musicAudioRef.current = null;
    }
    setCurrentTrack(track);
    setMusicPlaying(false);
  };

  return (
    <div className="min-h-screen" style={{
      background: `radial-gradient(1000px 500px at 20% 0%, rgba(110,231,255,.09), transparent 60%),
                   radial-gradient(900px 500px at 80% 10%, rgba(52,211,153,.06), transparent 60%),
                   #0b0c10`
    }}>
      {/* Splash/Cover Page */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-50 transition-opacity duration-500 ease-out ${
            splashFading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%), url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
          }}
          data-testid="splash-screen"
        >
          <div className="absolute top-8 left-8 md:top-12 md:left-12">
            <h1 
              className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide"
              style={{ 
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)"
              }}
            >
              《大钢琴》
            </h1>
            <h2 
              className="text-2xl md:text-4xl font-serif text-amber-100/90 mt-2 tracking-wider"
              style={{ 
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)"
              }}
            >
              The Big Piano
            </h2>
            <p className="mt-4 text-amber-100/60 text-xs md:text-sm tracking-widest uppercase">
              A story about what makes things special
            </p>
          </div>
          
          <button
            onClick={dismissSplash}
            data-testid="button-skip-splash"
            className="absolute bottom-8 right-8 px-4 py-2 text-sm text-amber-100/70 hover:text-amber-100 transition-colors rounded-full border border-amber-100/30 hover:border-amber-100/50"
            style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.3)" }}
          >
            Skip
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10" 
              style={{ background: "rgba(11,12,16,.7)", backdropFilter: "blur(10px)" }}>
        <div>
          <h1 className="text-lg font-bold text-white" data-testid="text-app-title">The Big Piano</h1>
          <p className="text-xs text-neutral-400">Story → One Question → Local Timeline</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/10 p-1" style={{ background: "rgba(18,19,26,.6)" }}>
            <button 
              onClick={() => setLang("en")}
              data-testid="button-lang-en"
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                lang === "en" ? "bg-white/10 text-white" : "text-neutral-400"
              }`}
            >
              English
            </button>
            <button 
              onClick={() => setLang("zh")}
              data-testid="button-lang-zh"
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                lang === "zh" ? "bg-white/10 text-white" : "text-neutral-400"
              }`}
            >
              中文
            </button>
          </div>
          <button 
            onClick={openParentModal}
            data-testid="button-parent"
            className="px-3 py-1.5 text-sm text-neutral-300 hover:text-white transition-colors"
          >
            Parent
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-[1.2fr_.8fr] gap-4">
        {/* Story & Capture Card */}
        <div className="rounded-2xl border border-white/10 p-4" style={{ background: "rgba(18,19,26,.85)" }}>
          <h2 className="text-lg font-semibold text-white" data-testid="text-story-title">{copy.storyTitle}</h2>
          <p className="text-sm text-neutral-400 mt-1">{copy.storyHint}</p>
          
          <div className="mt-4 text-sm text-neutral-200 leading-relaxed space-y-3" data-testid="text-story-body">
            {story.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          
          <div className="h-px bg-white/10 my-4" />
          
          {/* Question */}
          <h3 className="font-semibold text-white">{copy.questionTitle}</h3>
          <p className="text-lg text-white mt-1" data-testid="text-question">{copy.questionText}</p>
          <p className="text-sm text-neutral-400 mt-1">{copy.questionHint}</p>
          
          <div className="h-px bg-white/10 my-4" />
          
          {/* Capture Grid */}
          <div className="grid md:grid-cols-3 gap-3">
            {/* Record */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
              <h4 className="text-sm font-semibold text-white">{copy.recordTitle}</h4>
              <p className="text-xs text-neutral-400 mt-1">{copy.recordHint}</p>
              <div className="flex gap-2 mt-3">
                <Button 
                  onClick={startRecording} 
                  disabled={isRecording}
                  data-testid="button-record-start"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                  size="sm"
                >
                  Start
                </Button>
                <Button 
                  onClick={stopRecording} 
                  disabled={!isRecording}
                  data-testid="button-record-stop"
                  className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border-cyan-500/30"
                  size="sm"
                >
                  Stop
                </Button>
              </div>
              {recordedUrl && (
                <audio src={recordedUrl} controls className="w-full mt-3 h-8" data-testid="audio-playback" />
              )}
            </div>
            
            {/* Note */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
              <h4 className="text-sm font-semibold text-white">{copy.noteTitle}</h4>
              <p className="text-xs text-neutral-400 mt-1">{copy.noteHint}</p>
              <label className="block text-xs text-neutral-400 mt-3">{copy.ageLabel}</label>
              <Input 
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g., 3 / 5 / 8"
                data-testid="input-age"
                className="mt-1 bg-neutral-900 border-white/10 text-white text-sm"
              />
              <label className="block text-xs text-neutral-400 mt-2">{copy.noteLabel}</label>
              <Textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={lang === "zh" ? "例如：「大。表哥。不走。」" : "e.g., \"Big. Cousin. Don't go.\""}
                data-testid="input-note"
                className="mt-1 bg-neutral-900 border-white/10 text-white text-sm resize-none"
                rows={2}
              />
              <p className="text-xs text-neutral-500 mt-1">{copy.helperTextNote}</p>
            </div>
            
            {/* Icons */}
            <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
              <h4 className="text-sm font-semibold text-white">{copy.iconsTitle}</h4>
              <p className="text-xs text-neutral-400 mt-1">{copy.iconsHint}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {ICONS.map(icon => (
                  <button
                    key={icon.key}
                    onClick={() => toggleIcon(icon.key)}
                    data-testid={`icon-${icon.key}`}
                    className={`min-h-[44px] px-3 py-2 text-sm rounded-full border transition-colors ${
                      selectedIcons.has(icon.key) 
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200" 
                        : "bg-neutral-900 border-white/10 text-neutral-300"
                    }`}
                  >
                    {lang === "zh" ? icon.zh : icon.en}
                  </button>
                ))}
              </div>
              <button 
                onClick={clearIcons}
                data-testid="button-clear-icons"
                className="text-xs text-neutral-400 hover:text-white mt-2"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="h-px bg-white/10 my-4" />
          
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-neutral-400">{copy.saveHint}</p>
            <Button 
              onClick={saveEntry}
              data-testid="button-save"
              className={`min-h-[44px] px-6 text-base transition-all duration-300 ${
                (recordedBlob || note.trim() || selectedIcons.size > 0)
                  ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              } ${justSaved ? "scale-105" : ""}`}
            >
              {copy.saveBtn}
            </Button>
          </div>
          
          {toast && (
            <div className="mt-3 px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm text-white" data-testid="toast">
              {toast}
            </div>
          )}
        </div>
        
        {/* Timeline Card */}
        <div className="rounded-2xl border border-white/10 p-4" style={{ background: "rgba(18,19,26,.85)" }}>
          <h2 className="text-lg font-semibold text-white">{copy.timelineTitle}</h2>
          <p className="text-sm text-neutral-400 mt-1">{copy.timelineHint}</p>
          
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button onClick={exportData} size="sm" data-testid="button-export"
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border-cyan-500/20">
              {copy.exportBtn}
            </Button>
            <Button onClick={wipeData} size="sm" data-testid="button-wipe"
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-200 border-red-500/20">
              {copy.wipeBtn}
            </Button>
          </div>
          
          <div className="h-px bg-white/10 my-4" />
          
          {entries.length === 0 ? (
            <div className="border border-dashed border-white/20 rounded-xl p-4 text-sm text-neutral-400" data-testid="text-empty-timeline">
              {copy.emptyTimeline}
            </div>
          ) : (
            <div className="space-y-3" data-testid="timeline-list">
              {entries.map(entry => (
                <div key={entry.id} className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <span className="text-xs text-neutral-400">{formatDate(entry.createdAt)}</span>
                    <span className="text-xs text-neutral-400">
                      {entry.lang === "zh" ? "中文" : "English"}
                      {entry.childAge && ` • Age: ${entry.childAge}`}
                      {entry.hasAudio && " • Audio"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-200">
                    {entry.note || copy.noNote}
                  </p>
                  {entry.icons.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.icons.map(key => {
                        const icon = ICONS.find(i => i.key === key);
                        return (
                          <span key={key} className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300">
                            {icon ? (entry.lang === "zh" ? icon.zh : icon.en) : key}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    {entry.hasAudio && (
                      <button 
                        onClick={() => playEntryAudio(entry.id)}
                        className="text-xs text-cyan-300 hover:text-cyan-200"
                      >
                        {playingEntryId === entry.id ? "Playing..." : "Play audio"}
                      </button>
                    )}
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="text-xs text-red-300 hover:text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Parent Modal */}
      <Dialog open={parentOpen} onOpenChange={(open) => {
        setParentOpen(open);
        if (!open) {
          setElephantGatePassed(false);
          setElephantGateFading(false);
          setShowIvoryContext(false);
          setShowPinWhisper(false);
        }
      }}>
        <DialogContent className="max-w-2xl bg-neutral-900 border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{copy.parentTitle}</DialogTitle>
          </DialogHeader>
          
          {showPinSetup ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <h3 className="font-semibold text-amber-200">{copy.pinSetupTitle}</h3>
                <p className="text-sm text-neutral-300 mt-2">{copy.pinSetupText}</p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    type="password"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder={lang === "zh" ? "选择您的PIN码（至少4位）" : "Choose your PIN (at least 4 digits)"}
                    data-testid="input-setup-pin"
                    className="bg-neutral-800 border-white/10 text-white"
                  />
                  <Button onClick={handlePinSetup} data-testid="button-setup-pin" className="min-h-[44px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/30">
                    {copy.pinSetupBtn}
                  </Button>
                </div>
                <Input 
                  type="text"
                  value={hintInput}
                  onChange={(e) => setHintInput(e.target.value)}
                  placeholder={lang === "zh" ? "提示（可选，例如：孩子的出生年份）" : "Hint (optional, e.g., child's birth year)"}
                  data-testid="input-pin-hint"
                  className="bg-neutral-800 border-white/10 text-white"
                />
              </div>
            </div>
          ) : !parentUnlocked ? (
            <div className="space-y-3">
              <p className="text-sm text-neutral-400">{copy.parentGateText}</p>
              <div className="flex gap-2">
                <Input 
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={lang === "zh" ? "输入您的PIN码" : "Enter your PIN"}
                  data-testid="input-pin"
                  className="bg-neutral-800 border-white/10 text-white"
                />
                <Button onClick={unlockParent} data-testid="button-unlock" className="min-h-[44px] bg-white/10 hover:bg-white/20 text-white">
                  {copy.unlockBtn}
                </Button>
              </div>
              {showForgotPin && (
                <button
                  onClick={handleForgotPin}
                  className="text-sm text-neutral-500 hover:text-neutral-300 underline underline-offset-2"
                  data-testid="button-forgot-pin"
                >
                  {lang === "zh" ? "忘记PIN码？" : "Forgot PIN?"}
                </button>
              )}
            </div>
          ) : !elephantGatePassed ? (
            /* Elephant Question Gate - Full-screen threshold */
            <div 
              className={`flex flex-col items-center justify-center min-h-[60vh] text-center transition-opacity duration-700 ${elephantGateFading ? "opacity-0" : "opacity-100"}`}
              onClick={() => {
                setElephantGateFading(true);
                setTimeout(() => {
                  setElephantGatePassed(true);
                  setShowPinWhisper(true);
                  setTimeout(() => setShowPinWhisper(false), 4000);
                }, 700);
              }}
              data-testid="elephant-gate"
            >
              {/* Elephant silhouette fade-in */}
              <div className="w-24 h-24 mb-8 opacity-30">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-neutral-500">
                  <path d="M85 45c0-5-2-10-5-14-2-3-5-5-8-6V15c0-2-2-4-4-4s-4 2-4 4v8h-8V15c0-2-2-4-4-4s-4 2-4 4v8H30c-11 0-20 9-20 20v25c0 11 9 20 20 20h40c11 0 20-9 20-20V52c0-2-1-5-5-7zm-45 35c-6 0-10-4-10-10h20c0 6-4 10-10 10zm30 0c-6 0-10-4-10-10h20c0 6-4 10-10 10z"/>
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-amber-100 mb-6">
                {copy.elephantGateTitle}
              </h2>
              
              <p className="text-neutral-400 text-sm md:text-base mb-3 max-w-md">
                {copy.elephantGateLine1}
              </p>
              <p className="text-neutral-500 text-xs md:text-sm mb-8 max-w-md italic">
                {copy.elephantGateLine2}
              </p>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIvoryContext(!showIvoryContext);
                }}
                className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors mb-4"
                data-testid="button-ivory-context"
              >
                {showIvoryContext ? "" : copy.elephantGateTapHint}
              </button>
              
              {showIvoryContext && (
                <p className="text-xs text-neutral-500 max-w-sm p-3 rounded-lg border border-white/5 bg-white/5">
                  {copy.elephantGateIvorySnippet}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4" style={{ maxWidth: "680px", margin: "0 auto" }}>
              {/* PIN Whisper - Post-unlock framing */}
              {showPinWhisper && (
                <div className="text-center py-4 transition-opacity duration-1000">
                  <p className="text-sm text-neutral-500 italic">
                    {copy.pinWhisperText}
                  </p>
                </div>
              )}
              
              {/* Parent Layer Header */}
              <header className="text-center py-4">
                <h1 className="text-xl md:text-2xl font-semibold text-amber-100 mb-2">
                  {copy.parentLayerTitle}
                </h1>
                <p className={`text-neutral-400 text-sm whitespace-pre-line ${lang === "en" ? "italic" : ""}`}>
                  {lang === "zh" ? copy.parentLayerSubtitleZh : copy.parentLayerSubtitleEn}
                </p>
              </header>
              
              {/* Quick-nav chips */}
              <div className="flex flex-wrap gap-2 justify-center pb-4">
                <a href="#section-story" data-testid="chip-nav-story" className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors">
                  <BookOpen className="w-3 h-3" />
                  {copy.accordionStory}
                </a>
                <a href="#section-journey" data-testid="chip-nav-journey" className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors">
                  <FileText className="w-3 h-3" />
                  {copy.accordionJourney}
                </a>
                <a href="#section-elephant" data-testid="chip-nav-elephant" className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors">
                  <FileText className="w-3 h-3" />
                  {copy.accordionElephant}
                </a>
                <a href="#section-archive" data-testid="chip-nav-archive" className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors">
                  <FileText className="w-3 h-3" />
                  {copy.accordionArchive}
                </a>
                <a href="#section-settings" data-testid="chip-nav-settings" className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors">
                  <Settings className="w-3 h-3" />
                  {copy.accordionSettings}
                </a>
              </div>
              
              {/* Accordion sections */}
              <Accordion type="single" collapsible defaultValue="section-story" className="space-y-2">
                
                {/* Section 1: The Story (What Is a Piano) */}
                <AccordionItem value="section-story" id="section-story" className="border border-amber-500/20 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <span className="flex items-center gap-2 text-amber-200">
                      <BookOpen className="w-4 h-4" />
                      {copy.accordionStory}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    {/* Elephant Book Image - Language-aware */}
                    <figure className="mb-6">
                      <img 
                        src={lang === "zh" ? elephantBookImageZh : elephantBookImageEn} 
                        alt={lang === "zh" ? "大象为什么发出声音？" : "Why did the elephant make a noise?"}
                        className="w-full h-auto rounded-xl"
                        loading="lazy"
                      />
                    </figure>
                    
                    <h3 className="font-semibold text-amber-200 text-lg mb-4">{copy.whatIsAPianoTitle}</h3>
                    
                    <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                      {copy.whatIsAPiano.map((para, i) => {
                        const isBold = para.startsWith("**") && para.endsWith("**");
                        const isBullets = para.includes("• ");
                        
                        if (isBold) {
                          return (
                            <p key={i} className="text-base text-amber-100 font-semibold">
                              {para.replace(/\*\*/g, "")}
                            </p>
                          );
                        }
                        
                        if (isBullets) {
                          const lines = para.split("\n");
                          const titleLine = lines[0];
                          const bulletLines = lines.filter(l => l.startsWith("• "));
                          return (
                            <div key={i}>
                              <p>{titleLine}</p>
                              <ul className="mt-2 ml-5 space-y-1 list-disc">
                                {bulletLines.map((line, j) => (
                                  <li key={j}>{line.replace("• ", "")}</li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                        
                        return (
                          <p key={i} className="whitespace-pre-line">
                            {para}
                          </p>
                        );
                      })}
                    </div>
                    
                    <hr className="my-6 opacity-25" />
                    
                    <h3 className="font-semibold text-amber-200 text-lg mb-4">{copy.noteToParentsTitle}</h3>
                    
                    <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                      {copy.noteToParents.map((para, i) => (
                        <p key={i} className="whitespace-pre-line">{para}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Section 2: Piano to Bitcoin Journey */}
                <AccordionItem value="section-journey" id="section-journey" className="border border-cyan-500/20 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <span className="flex items-center gap-2 text-cyan-200">
                      <FileText className="w-4 h-4" />
                      {copy.accordionJourney}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-neutral-400 text-sm mb-4">
                      {copy.parentBridgeText}
                    </p>
                    <a 
                      href={lang === "zh" ? journeyPdfZh : journeyPdfEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 transition-colors"
                      data-testid="link-journey-pdf"
                    >
                      <FileText className="w-4 h-4" />
                      {copy.journeyPdfLink}
                    </a>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Section 3: Elephant Noise (Outro/Poem) */}
                <AccordionItem value="section-elephant" id="section-elephant" className="border border-purple-500/20 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <span className="flex items-center gap-2 text-purple-200">
                      <FileText className="w-4 h-4" />
                      {copy.accordionElephant}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-neutral-400 text-sm mb-4 italic">
                      {copy.elephantNoiseTitle}
                    </p>
                    <a 
                      href={lang === "zh" ? elephantNoisePdfZh : elephantNoisePdfEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 transition-colors"
                      data-testid="link-elephant-noise-pdf"
                    >
                      <FileText className="w-4 h-4" />
                      {copy.elephantNoisePdfLink}
                    </a>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Section 4: Archive of the Unspoken */}
                <AccordionItem value="section-archive" id="section-archive" className="border border-rose-500/20 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <span className="flex items-center gap-2 text-rose-200">
                      <FileText className="w-4 h-4" />
                      {copy.accordionArchive}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <h3 className="font-semibold text-rose-200 text-lg mb-2">{copy.archiveTitle}</h3>
                    <p className="text-neutral-500 text-xs mb-4">{copy.archiveSubtitle}</p>
                    
                    <p className="text-neutral-400 text-sm mb-4">
                      {copy.archiveFraming}
                    </p>
                    
                    {/* Hendrix coder & AI synthesis images */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <figure>
                        <img 
                          src={hendrixCoderImage} 
                          alt="Human-AI synthesis"
                          className="w-full h-auto rounded-lg"
                          loading="lazy"
                        />
                      </figure>
                      <figure>
                        <img 
                          src={aiSynthesisImage} 
                          alt="AI synthesis visualization"
                          className="w-full h-auto rounded-lg"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                    
                    <p className="text-neutral-500 text-xs mb-4 italic">
                      {copy.archiveAudienceLine}
                    </p>
                    
                    <a 
                      href={lang === "zh" ? archiveOfUnspokenPdfZh : archiveOfUnspokenPdfEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 transition-colors"
                      data-testid="link-archive-pdf"
                    >
                      <FileText className="w-4 h-4" />
                      {copy.archivePdfLink}
                    </a>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Section 5: Settings */}
                <AccordionItem value="section-settings" id="section-settings" className="border border-white/10 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white/5">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <Settings className="w-4 h-4" />
                      {copy.accordionSettings}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    {/* PIN Settings */}
                    <div>
                      <h4 className="font-semibold text-neutral-200 mb-2">{copy.parentSettingsTitle}</h4>
                      <div className="flex gap-2">
                        <Input 
                          type="password"
                          value={newPinInput}
                          onChange={(e) => setNewPinInput(e.target.value)}
                          placeholder={lang === "zh" ? "新PIN码" : "New PIN"}
                          data-testid="input-new-pin"
                          className="bg-neutral-800 border-white/10 text-white"
                        />
                        <Button onClick={updatePin} className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border-cyan-500/20">
                          {copy.parentSetPinBtn}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Export Journey */}
                    <div>
                      <Button 
                        onClick={exportNotes} 
                        variant="outline" 
                        className="w-full justify-center gap-2 border-white/10 text-neutral-300"
                        data-testid="button-export-journey"
                      >
                        <Download className="w-4 h-4" />
                        {copy.exportJourneyBtn}
                      </Button>
                    </div>
                    
                    {/* Observation tools - Three-piano ladder */}
                    <div className="rounded-lg border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                      <h5 className="font-semibold text-sm mb-2">{copy.parentObservingTitle}</h5>
                      <div className="text-xs space-y-1">
                        <div className="grid grid-cols-3 gap-2 p-2 rounded bg-neutral-800/50 text-neutral-400">
                          <span>{copy.parentInstrument}</span>
                          <span>{copy.parentAccess}</span>
                          <span>{copy.parentAttachment}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 p-2 rounded border border-white/5">
                          <span>{copy.parentToyPiano}</span>
                          <span>{copy.parentToyAccess}</span>
                          <span>{copy.parentToyAttachment}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 p-2 rounded border border-white/5">
                          <span>{copy.parent37Key}</span>
                          <span>{copy.parent37Access}</span>
                          <span>{copy.parent37Attachment}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 p-2 rounded border border-white/5">
                          <span>{copy.parentBigPiano}</span>
                          <span>{copy.parentBigAccess}</span>
                          <span>{copy.parentBigAttachment}</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-2">{copy.parentKeyPoint}</p>
                    </div>
                    
                    {/* How to ask & Contrarian prompts */}
                    <details className="text-sm">
                      <summary className="cursor-pointer text-neutral-400 hover:text-neutral-200">{copy.parentAskingTitle}</summary>
                      <ul className="mt-2 text-neutral-300 list-disc ml-4 space-y-1 text-xs">
                        <li>{copy.parentAskNeutral}</li>
                        <li>{copy.parentAskReflect}</li>
                        <li>{copy.parentAskStuck}</li>
                        <li>{copy.parentAskAvoid}</li>
                      </ul>
                    </details>
                    
                    <details className="text-sm">
                      <summary className="cursor-pointer text-neutral-400 hover:text-neutral-200">{copy.parentContrarianTitle}</summary>
                      <ul className="mt-2 text-neutral-300 list-disc ml-4 space-y-1 text-xs">
                        <li>{copy.parentContrarian1}</li>
                        <li>{copy.parentContrarian2}</li>
                        <li>{copy.parentContrarian3}</li>
                        <li>{copy.parentContrarian4}</li>
                      </ul>
                    </details>
                  </AccordionContent>
                </AccordionItem>
                
              </Accordion>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Floating Classical Music Player */}
      {!showSplash && (
        <div 
          className="fixed bottom-4 left-4 z-40 rounded-xl border border-white/10 p-3"
          style={{ background: "rgba(18,19,26,.95)", backdropFilter: "blur(10px)" }}
          data-testid="music-player"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-amber-300/70" />
              <button
                onClick={toggleMusic}
                data-testid="button-music-toggle"
                className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: musicPlaying ? "rgba(234,179,8,.2)" : "rgba(255,255,255,.1)" }}
              >
                {musicPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <button
                  onClick={() => switchTrack("mozart")}
                  data-testid="button-track-mozart"
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    currentTrack === "mozart" ? "bg-amber-500/20 text-amber-200" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Mozart
                </button>
                <button
                  onClick={() => switchTrack("beethoven")}
                  data-testid="button-track-beethoven"
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    currentTrack === "beethoven" ? "bg-amber-500/20 text-amber-200" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Beethoven
                </button>
              </div>
              <p className="text-xs text-neutral-500 max-w-[140px] truncate">
                {CLASSICAL_TRACKS[currentTrack].title}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <footer className="max-w-6xl mx-auto px-4 py-6 text-xs text-neutral-500">
        Local-only. No tracking. No uploads. Built for presence-first learning.
      </footer>
    </div>
  );
}
