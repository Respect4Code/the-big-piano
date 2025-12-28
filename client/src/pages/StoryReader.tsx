
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mic, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORY = {
  en: {
    appTitle: "The Big Piano",
    appSub: "A small story about something big.",
    pageLabel: "Page",
    recordTitle: "Record your voice",
    recordHint: "Read it like you're sitting next to them. Perfect is not required.",
    cta: "After you finish, you can record each page. Your child will hear your voice inside the story.",
    pages: [
      {
        title: "At Home",
        text: `My three-year-old has an electronic piano keyboard. It's theirs—always there, sometimes played, sometimes ignored.

I have a small weighted piano too. I share it with my toddler so they can feel something bigger—keys with weight and response.`
      },
      {
        title: "The Surprise",
        text: `Yesterday my toddler played on my piano. They didn't look at the keys. They looked at me. Then at their mother.

The tune they were improvising sounded amazing.

They turned back, smiled, and applauded themselves.

Of course we applauded too.`
      },
      {
        title: "The Big Piano",
        text: `Later we went to my sister's house.

In her study sat a full-sized piano.

I pressed the keys and the sound filled the room.

"This is a big piano," I said.

My toddler repeated: "Big Piano."`
      },
      {
        title: "The Duet",
        text: `Their cousin lifted them onto the stool, then sat beside them.

They played together—one finger, then one finger—copying each other in time.

They both looked up, laughed, and we cheered.

Grandmother offered a high five, and my toddler slapped it with glee.`
      },
      {
        title: "Scarcity",
        text: `It was time to go, but my toddler twisted and wriggled in my arms:

"Big Piano… Big Piano…"

They didn't want to leave.

In my toddler's world, the big piano was scarce. Special. Unique.`
      },
      {
        title: "Mozart",
        text: `Eventually, I buckled them into the buggy.

As we left, I played Mozart on my phone.

The music flowed.

And my toddler drifted off to sleep.`
      }
    ]
  },
  zh: {
    appTitle: "《大钢琴》",
    appSub: "一个关于"大"的小故事。",
    pageLabel: "第",
    recordTitle: "录下你的声音",
    recordHint: "像坐在孩子身边那样读就好。不需要完美。",
    cta: "读完后，你可以为每一页录音。孩子会在故事里听见你的声音。",
    pages: [
      {
        title: "在家",
        text: `我三岁的孩子有一架自己的电子琴。它总在那儿，有时被弹响，有时被遗忘。

我也有一架小小的配重键盘琴。我愿意和孩子分享，只希望他能摸到更"真实"的琴键——有分量、有回应。`
      },
      {
        title: "惊喜",
        text: `昨天，孩子在我的琴上弹奏。他没有看琴键，却回过头来看我，又看向妈妈。

那段即兴旋律，美妙得让人惊讶。

他转回来，笑着为自己鼓掌。

我们当然也一起鼓掌。`
      },
      {
        title: "大钢琴",
        text: `后来我们去了姐姐家。

书房里有一架真正的大钢琴。

我按下琴键，浑厚的声音充满房间。

"这是大钢琴。"我说。

孩子跟着重复："大钢琴。"`
      },
      {
        title: "二重奏",
        text: `表哥把他抱上琴凳，又坐到他身旁。

他们你一下、我一下，用一根手指相互模仿，节奏竟然很默契。

他们抬头相视而笑，我们欢呼鼓掌。

奶奶伸手击掌，孩子开心地拍了上去。`
      },
      {
        title: "稀缺",
        text: `该回家了，可孩子在我怀里扭来扭去：

"大钢琴……大钢琴……"

他不想走。

在他的世界里，这架大钢琴是稀缺的、特别的、独一无二的。`
      },
      {
        title: "莫扎特",
        text: `最终，我把他放进婴儿车。

离开时，我在手机上放起莫扎特。

琴声流淌。

孩子在乐声里慢慢睡着了。`
      }
    ]
  }
};

const DB_NAME = "bigpiano_audio_v1";
const STORE_NAME = "recordings";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key: string, blob: Blob): Promise<boolean> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGet(key: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function idbDel(key: string): Promise<boolean> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export default function StoryReader() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [pageIndex, setPageIndex] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micStatus, setMicStatus] = useState("Mic: tap record when ready");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const copy = STORY[lang];
  const pages = copy.pages;
  const currentPage = pages[pageIndex];
  const pageKey = `${lang}::page::${pageIndex}`;

  useEffect(() => {
    checkRecording();
  }, [pageIndex, lang]);

  async function checkRecording() {
    const blob = await idbGet(pageKey);
    setHasRecording(!!blob);
    if (!blob) {
      setAudioUrl(null);
    }
  }

  async function ensureMic() {
    if (mediaStream) return mediaStream;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setMediaStream(stream);
    setMicStatus("Mic: ready");
    return stream;
  }

  function pickMimeType() {
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
  }

  async function startRecording() {
    if (isRecording) return;
    const stream = await ensureMic();

    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    const recordedChunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };

    recorder.onstop = async () => {
      try {
        const blob = new Blob(recordedChunks, { type: recorder.mimeType || "audio/webm" });
        await idbSet(pageKey, blob);
        setMicStatus("Mic: saved ✓");
        await checkRecording();
      } catch (err) {
        console.error(err);
        setMicStatus("Mic: save failed");
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
    setMicStatus("Mic: recording…");
  }

  function stopRecording() {
    if (!isRecording || !mediaRecorder) return;
    setIsRecording(false);
    setMicStatus("Mic: ready");
    try {
      mediaRecorder.stop();
    } catch (e) {
      console.error(e);
    }
  }

  async function playRecording() {
    const blob = await idbGet(pageKey);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    const audio = new Audio(url);
    audio.play().catch(() => {});
  }

  async function deleteRecording() {
    await idbDel(pageKey);
    setMicStatus("Mic: deleted");
    setAudioUrl(null);
    await checkRecording();
  }

  function goToPrevPage() {
    setPageIndex(Math.max(0, pageIndex - 1));
  }

  function goToNextPage() {
    setPageIndex(Math.min(pages.length - 1, pageIndex + 1));
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-2xl">
        <header className="flex items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">{copy.appTitle}</h1>
            <p className="text-neutral-300 mt-1">{copy.appSub}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={lang === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "zh" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("zh")}
            >
              中文
            </Button>
          </div>
        </header>

        <Card className="bg-neutral-900/50 border-neutral-800 mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-300">
                <span>{copy.pageLabel}</span>
                <span className="ml-1">{pageIndex + 1}</span>
                <span className="text-neutral-500 mx-1">/</span>
                <span>{pages.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevPage}
                  disabled={pageIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={pageIndex === pages.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-3">{currentPage.title}</h2>
            <p className="text-neutral-100 leading-relaxed whitespace-pre-wrap">
              {currentPage.text}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800 mb-4">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{copy.recordTitle}</CardTitle>
                <p className="text-sm text-neutral-300 mt-1">{copy.recordHint}</p>
              </div>
              <div className="text-sm text-neutral-300">{micStatus}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                onTouchEnd={stopRecording}
              >
                <Mic className="h-4 w-4" />
                {isRecording ? "🔴 Recording… release to stop" : "Hold to record"}
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={playRecording}
                disabled={!hasRecording}
              >
                <Play className="h-4 w-4" />
                Play my recording
              </Button>

              <Button
                variant="outline"
                onClick={deleteRecording}
                disabled={!hasRecording}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>

            <div className="mt-3 text-xs text-neutral-400">
              Saved privately on this device (IndexedDB). Nothing is uploaded.
            </div>

            {audioUrl && (
              <audio src={audioUrl} controls className="hidden" />
            )}
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-200">{copy.cta}</p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-xs text-neutral-500 text-center">
          Privacy-first • Works best over HTTPS • Microphone permission required
        </footer>
      </main>
    </div>
  );
}
