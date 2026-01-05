import { useState, useEffect, useRef, useCallback } from "react";
import { 
  COPY, STORY, ICONS, 
  type Lang, type Entry,
  loadEntries, saveEntries, getPin, setPin, wipeAllData,
  getPinHint, setPinHint, resetPinOnly
} from "@/lib/story";
import { Music } from "lucide-react";
import { dbPutAudio, dbGetAudio, dbDeleteAudio, dbWipeAllAudio } from "@/lib/idb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import coverImage from "@assets/man_the_big_paino_2_image-145_1767059586840.jpg";
import elephantBookImage from "@assets/image-155_1767566599607.jpg";
import thinkingRecordPdfEn from "@assets/piano_to_bitcoin_english_paginated_1767597077589.pdf";
import thinkingRecordPdfZh from "@assets/piano_to_bitcoin_chinese_1767597091754.pdf";
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
        showToast(lang === "zh" ? `PIN错误。提示：${hint}` : `Wrong PIN. Hint: ${hint}`);
      } else {
        showToast(lang === "zh" ? "PIN错误" : "Wrong PIN");
      }
    }
  };
  
  const handleForgotPin = () => {
    const confirmed = confirm(
      lang === "zh" 
        ? "忘记PIN码？这将重置您的PIN码，但保留所有保存的时刻。如需完全重置，可在家长区域内使用「清除所有数据」。继续吗？"
        : "Forgot your PIN? This will reset your PIN but keep all saved moments. To start completely fresh, use 'Wipe All Data' inside the Parent section after resetting. Continue?"
    );
    if (confirmed) {
      resetPinOnly();
      setPinInput("");
      setFailedAttempts(0);
      setShowForgotPin(false);
      setShowPinSetup(true);
      showToast(lang === "zh" ? "PIN已重置，请设置新PIN码" : "PIN reset. Please set a new PIN.");
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
      <Dialog open={parentOpen} onOpenChange={setParentOpen}>
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
          ) : (
            <div className="space-y-4">
              {/* Framing text */}
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                <p className="text-sm text-neutral-300 italic">{copy.parentFramingText}</p>
              </div>
              
              {/* Three-piano ladder */}
              <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                <h4 className="font-semibold">{copy.parentObservingTitle}</h4>
                <div className="mt-3 text-sm space-y-1">
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-neutral-800/50 text-neutral-400 text-xs">
                    <span>{copy.parentInstrument}</span>
                    <span>{copy.parentAccess}</span>
                    <span>{copy.parentAttachment}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg border border-white/5 text-xs">
                    <span>{copy.parentToyPiano}</span>
                    <span>{copy.parentToyAccess}</span>
                    <span>{copy.parentToyAttachment}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg border border-white/5 text-xs">
                    <span>{copy.parent37Key}</span>
                    <span>{copy.parent37Access}</span>
                    <span>{copy.parent37Attachment}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg border border-white/5 text-xs">
                    <span>{copy.parentBigPiano}</span>
                    <span>{copy.parentBigAccess}</span>
                    <span>{copy.parentBigAttachment}</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 mt-3">
                  {copy.parentKeyPoint}
                </p>
              </div>
              
              {/* How to ask */}
              <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                <h4 className="font-semibold">{copy.parentAskingTitle}</h4>
                <ul className="mt-2 text-sm text-neutral-300 list-disc ml-4 space-y-1">
                  <li>{copy.parentAskNeutral}</li>
                  <li>{copy.parentAskReflect}</li>
                  <li>{copy.parentAskStuck}</li>
                  <li>{copy.parentAskAvoid}</li>
                </ul>
              </div>
              
              {/* Contrarian prompts */}
              <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                <h4 className="font-semibold">{copy.parentContrarianTitle}</h4>
                <ul className="mt-2 text-sm text-neutral-300 list-disc ml-4 space-y-1">
                  <li>{copy.parentContrarian1}</li>
                  <li>{copy.parentContrarian2}</li>
                  <li>{copy.parentContrarian3}</li>
                  <li>{copy.parentContrarian4}</li>
                </ul>
              </div>
              
              {/* What Is a Piano? - Full Narrative (mobile-first locked copy) */}
              <section 
                className="rounded-xl border border-amber-500/20 p-4 md:p-5"
                style={{ background: "rgba(11,12,16,.5)", maxWidth: "680px", margin: "0 auto" }}
                aria-label="What Is a Piano"
              >
                {/* Parent Layer Header - Title Card */}
                <header className="text-center mb-8 py-4">
                  <h1 className="text-2xl md:text-3xl font-semibold text-amber-100 mb-4">
                    {copy.parentLayerTitle}
                  </h1>
                  <p className={`text-neutral-400 text-sm md:text-base mb-5 whitespace-pre-line ${lang === "en" ? "italic" : ""}`}>
                    {lang === "zh" ? copy.parentLayerSubtitleZh : copy.parentLayerSubtitleEn}
                  </p>
                  <p className={`text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-line ${lang === "en" ? "italic" : ""}`}>
                    {lang === "zh" ? copy.parentLayerLedeZh : copy.parentLayerLedeEn}
                  </p>
                </header>
                
                {/* Divider */}
                <hr className="my-6 opacity-25" />
                
                {/* Elephant Book Image */}
                <figure className="mb-6">
                  <img 
                    src={elephantBookImage} 
                    alt="Why did the elephant make a noise? — cover image"
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </figure>
                
                <h2 className="font-semibold text-amber-200 text-xl mb-4">{copy.whatIsAPianoTitle}</h2>
                
                <div className="space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
                  {copy.whatIsAPiano.map((para, i) => {
                    const isBold = para.startsWith("**") && para.endsWith("**");
                    const isBullets = para.includes("• ");
                    
                    if (isBold) {
                      return (
                        <p key={i} className="text-base md:text-lg text-amber-100 font-semibold">
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
                
                {/* Divider */}
                <hr className="my-6 opacity-25" />
                
                {/* A Note to Parents */}
                <h2 className="font-semibold text-amber-200 text-xl mb-4">{copy.noteToParentsTitle}</h2>
                
                <div className="space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
                  {copy.noteToParents.map((para, i) => (
                    <p key={i} className="whitespace-pre-line">{para}</p>
                  ))}
                </div>
                
                {/* PDF Link */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <a 
                    href={lang === "zh" ? thinkingRecordPdfZh : thinkingRecordPdfEn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 underline underline-offset-4 transition-colors"
                    data-testid="link-thinking-record-pdf"
                  >
                    {copy.thinkingRecordLink}
                  </a>
                </div>
              </section>
              
              {/* PIN settings */}
              <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(11,12,16,.35)" }}>
                <h4 className="font-semibold">{copy.parentSettingsTitle}</h4>
                <div className="flex gap-2 mt-2">
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
