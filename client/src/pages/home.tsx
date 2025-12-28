import { useState, useEffect, useRef, useCallback } from "react";
import { STORY } from "@/lib/story";
import { idbGet, idbSet, idbDel } from "@/lib/idb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Mic, Play, Trash2, Square } from "lucide-react";

type Lang = "en" | "zh";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [pageIndex, setPageIndex] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micStatus, setMicStatus] = useState("Mic: not started");
  
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const copy = STORY[lang];
  const pages = copy.pages;
  const currentPage = pages[pageIndex];

  const pageKey = useCallback(() => `${lang}::page::${pageIndex}`, [lang, pageIndex]);

  // Check if recording exists for current page
  useEffect(() => {
    const checkRecording = async () => {
      const blob = await idbGet(pageKey());
      setHasRecording(!!blob);
      // Clean up previous audio URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
    checkRecording();
  }, [pageKey]);

  const ensureMic = async () => {
    if (mediaStreamRef.current) return mediaStreamRef.current;
    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus("Mic: ready");
      return mediaStreamRef.current;
    } catch (err) {
      setMicStatus("Mic: denied");
      throw err;
    }
  };

  const pickMimeType = () => {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
    ];
    for (const t of candidates) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  };

  const startRecording = async () => {
    try {
      const stream = await ensureMic();
      const mimeType = pickMimeType();
      const options: MediaRecorderOptions = mimeType ? { mimeType } : {};
      
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        await idbSet(pageKey(), blob);
        setHasRecording(true);
        setIsRecording(false);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecording = async () => {
    const blob = await idbGet(pageKey());
    if (!blob) return;
    
    // Clean up previous
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
    }
    
    audioUrlRef.current = URL.createObjectURL(blob);
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    audioRef.current.src = audioUrlRef.current;
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const deleteRecording = async () => {
    await idbDel(pageKey());
    setHasRecording(false);
    stopPlaying();
  };

  const goToPrev = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      stopPlaying();
    }
  };

  const goToNext = () => {
    if (pageIndex < pages.length - 1) {
      setPageIndex(pageIndex + 1);
      stopPlaying();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" data-testid="text-app-title">
              {copy.appTitle}
            </h1>
            <p className="text-sm text-neutral-300" data-testid="text-app-sub">
              {copy.appSub}
            </p>
          </div>

          {/* Language switch */}
          <div className="flex items-center gap-2">
            <Button
              variant={lang === "en" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
              data-testid="button-lang-en"
              className={lang === "en" 
                ? "bg-neutral-700 hover:bg-neutral-600 text-white border-0" 
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700"}
            >
              English
            </Button>
            <Button
              variant={lang === "zh" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setLang("zh")}
              data-testid="button-lang-zh"
              className={lang === "zh" 
                ? "bg-neutral-700 hover:bg-neutral-600 text-white border-0" 
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700"}
            >
              中文
            </Button>
          </div>
        </header>

        <main className="mt-6 space-y-4">
          {/* Story card */}
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900/50 p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-sm text-neutral-300">
                <span>{copy.pageLabel} </span>
                <span data-testid="text-page-num">{pageIndex + 1}</span>
                <span className="text-neutral-500"> / </span>
                <span data-testid="text-page-total">{pages.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrev}
                  disabled={pageIndex === 0}
                  data-testid="button-prev"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  disabled={pageIndex === pages.length - 1}
                  data-testid="button-next"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold" data-testid="text-page-title">
                {currentPage.title}
              </h2>
              <p className="mt-2 text-neutral-100 leading-relaxed whitespace-pre-wrap" data-testid="text-page-content">
                {currentPage.text}
              </p>
            </div>
          </Card>

          {/* Record & playback */}
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900/50 p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-semibold">{copy.recordTitle}</h3>
                <p className="text-sm text-neutral-300 mt-1">
                  {copy.recordHint}
                </p>
              </div>

              <div className="text-right text-sm text-neutral-300" data-testid="text-mic-status">
                {micStatus}
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {!isRecording ? (
                <Button
                  onClick={startRecording}
                  data-testid="button-record"
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold h-auto"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {lang === "en" ? "Hold to record" : "按住录音"}
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  data-testid="button-stop-record"
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-semibold h-auto"
                >
                  <Square className="h-4 w-4 mr-2" />
                  {lang === "en" ? "Stop recording" : "停止录音"}
                </Button>
              )}

              {!isPlaying ? (
                <Button
                  onClick={playRecording}
                  disabled={!hasRecording}
                  data-testid="button-play"
                  className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-semibold disabled:opacity-40 h-auto"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {lang === "en" ? "Play my recording" : "播放录音"}
                </Button>
              ) : (
                <Button
                  onClick={stopPlaying}
                  data-testid="button-stop-play"
                  className="flex-1 px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 font-semibold h-auto"
                >
                  <Square className="h-4 w-4 mr-2" />
                  {lang === "en" ? "Stop" : "停止"}
                </Button>
              )}

              <Button
                onClick={deleteRecording}
                disabled={!hasRecording}
                data-testid="button-delete"
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-semibold disabled:opacity-40 h-auto"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 text-xs text-neutral-400">
              {lang === "en" 
                ? "Saved privately on this device (IndexedDB). Nothing is uploaded."
                : "保存在本地设备上（IndexedDB）。不会上传任何内容。"}
            </div>
          </Card>

          {/* CTA */}
          <Card className="rounded-2xl border-neutral-800 bg-neutral-900/50 p-4">
            <p className="text-sm text-neutral-200">
              {copy.cta}
            </p>
          </Card>
        </main>

        <footer className="mt-8 text-xs text-neutral-500">
          Privacy-first • Works best over HTTPS • Microphone permission required
        </footer>
      </div>
    </div>
  );
}
