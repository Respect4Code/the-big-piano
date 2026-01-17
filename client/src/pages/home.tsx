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
      showToast(lang === "zh" ? "麦克风访问被拒绝" : "Microphone access denied");
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

  const exportNotes = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      entries: entries.map(e => ({
        id: e.id,
        timestamp: e.createdAt,
        date: formatDate(e.createdAt),
        icons: e.icons,
        childAge: e.childAge,
        note: e.note,
        hasAudio: e.hasAudio
      }))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `big-piano-journey-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(lang === "zh" ? "旅程已导出" : "Journey exported");
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
              {copy.splashSubtitle}
            </p>
          </div>
          
          <button
            onClick={dismissSplash}
            data-testid="button-skip-splash"
            className="absolute bottom-8 right-8 px-4 py-2 text-sm text-amber-100/70 hover:text-amber-100 transition-colors rounded-full border border-amber-100/30 hover:border-amber-100/50"
            style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.3)" }}
          >
            {copy.skipBtn}
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10" 
              style={{ background: "rgba(11,12,16,.7)", backdropFilter: "blur(10px)" }}>
        <div>
          <h1 className="text-lg font-bold text-white" data-testid="text-app-title">{copy.appTitle}</h1>
          <p className="text-xs text-neutral-400">{copy.appSubtitle}</p>
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
            {copy.parentBtn}
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
                  {copy.startBtn}
                </Button>
                <Button 
                  onClick={stopRecording} 
                  disabled={!isRecording}
                  data-testid="button-record-stop"
                  className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border-cyan-500/30"
                  size="sm"
                >
                  {copy.stopBtn}
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
                {copy.clearBtn}
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
                      {entry.childAge && ` • ${copy.agePrefix}${entry.childAge}`}
                      {entry.hasAudio && copy.hasAudioLabel}
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
                        {playingEntryId === entry.id ? copy.playingText : copy.playAudioBtn}
                      </button>
                    )}
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="text-xs text-red-300 hover:text-red-200"
                    >
                      {copy.deleteBtn}
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
              <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
                {lang === "zh" 
                  ? "「这个PIN码解锁你留下的东西」将安全转化为传承。它是一种继承机制，一个时间容器，将自我托管哲学与家庭传承连接起来。不是你的PIN码？不是你的应用！"
                  : "\"This PIN unlocks what you leave behind\" transforms security into legacy. It is an inheritance mechanism, a time vessel, which connects self-custody philosophy, to family legacy. Not your PIN? Not your app!"}
              </p>
            </div>
          ) : (
            <div className="space-y-4" style={{ maxWidth: "680px", margin: "0 auto" }}>
              {/* Parent Layer Header */}
              <header className="text-center py-4">
                <h1 className="text-xl md:text-2xl font-semibold text-amber-100 mb-2">
                  {copy.parentLayerTitle}
                </h1>
                <p className={`text-neutral-400 text-sm whitespace-pre-line ${lang === "en" ? "italic" : ""}`}>
                  {lang === "zh" ? copy.parentLayerSubtitleZh : copy.parentLayerSubtitleEn}
                </p>
              </header>
              
              
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
                      <p className="whitespace-pre-line">
                        {lang === "zh" 
                          ? "接下来你将读到的（在本应用其他地方），是一位父亲的思考记录。"
                          : "What you are about to read next (elsewhere in this app) is a record of my thinking as a father."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "一个洗澡的夜晚，我的孩子问我：\n「为什么大象会发出声音？」"
                          : "One evening at bath time, my child asked me,\n\"Why did the elephant make a noise?\""}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "他们站在浴缸里，看着水龙头旁的玩具大象。\n他们把它拿起来，抚摸它，摆弄它的象牙和长鼻子，\n等着我给他们讲一个故事。"
                          : "They were standing in the bath, looking at their toy elephant by the taps.\nThey picked it up, stroked it, played with its tusks and long trunk,\nand waited for me to tell them a story."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "在那一刻，我意识到他们并非在寻求一个答案。\n他们在思考。\n他们在建构故事。\n或者说，在邀请我编一个名叫《为什么大象会发出声音》的故事。"
                          : "In that moment, I realised they weren't asking for an answer.\nThey were thinking.\nThey were storytelling.\nOr asking me to make up a story called Why the Elephant Made a Noise."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh" ? (
                          <>我告诉他们，我明天晚上再讲。<a href="/elephant-noise-poem-zh.html" className="text-amber-300 hover:text-amber-200 underline underline-offset-2" data-testid="link-poem">（我最终在Deepseek AI的帮助下写了这首诗。）</a></>
                        ) : (
                          <>I told them I would tell it the following night. <a href="/elephant-noise-poem-en.html" className="text-amber-300 hover:text-amber-200 underline underline-offset-2" data-testid="link-poem">(I eventually wrote the poem with the help of Deepseek AI.)</a></>
                        )}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "与此同时，他们对大象的爱迫使我直面钢琴琴键的历史。\n我感到困惑。"
                          : "In the meantime, their love for elephants forced me to confront the history of piano keys.\nI was perplexed."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "我需要一个安静、不受评判的空间来整理思绪——\n从材料到伦理，\n从技术到价值。"
                          : "I needed a quiet, non-judgmental space to sort out my thoughts —\nfrom materials to ethics,\nfrom technology to value."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "接下来的内容不是一堂课。\n它未经打磨。\n它并不完整。"
                          : "What comes next is not a lesson.\nIt is not polished.\nIt is not complete."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "它是一份被保存下来的思考记录，\n留待未来的某一天。"
                          : "It is a preserved record of thinking,\nkept here for a day in the future."}
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh"
                          ? "它始于Meta AI。我选择Meta AI，是因为当时它是最弱的，也是我认为最不了解我思维模式的那一个。"
                          : "It started with Meta AI, I choose Meta AI because at the time is was the least powerful and the one I thought new less about my patterns of thought."}
                      </p>
                      <p className="whitespace-pre-line">
                        <a 
                          href={lang === "zh" ? "/piano-bitcoin-journey-zh.html" : "/piano-bitcoin-journey.html"}
                          className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 font-semibold"
                          data-testid="link-journey"
                        >
                          {lang === "zh" ? "「构建这一切的对话。」" : "\"The Conversation That Built This.\""}
                        </a>
                      </p>
                      <p className="whitespace-pre-line">
                        {lang === "zh" ? (
                          <>这是集体智慧的综合——六个AI模型汇聚成一个连贯而深刻的愿景。我们共同创造了一个用于<a href="/archive-of-the-unspoken-zh.html" className="text-rose-300 hover:text-rose-200 underline underline-offset-2" data-testid="link-archive">代际传承</a>的哲学工具。</>
                        ) : (
                          <>It is a synthesis of collective intelligence—six AI models converging on a coherent, profound vision. Together we created a philosophical instrument for <a href="/archive-of-the-unspoken-en.html" className="text-rose-300 hover:text-rose-200 underline underline-offset-2" data-testid="link-archive">intergenerational transmission</a>.</>
                        )}
                      </p>
                    </div>
                    
                  </AccordionContent>
                </AccordionItem>
                
                {/* Settings */}
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
