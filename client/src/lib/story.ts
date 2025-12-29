export type Lang = "en" | "zh";

export interface StoryContent {
  storyTitle: string;
  storyHint: string;
  questionTitle: string;
  questionText: string;
  questionHint: string;
  recordTitle: string;
  recordHint: string;
  noteTitle: string;
  noteHint: string;
  ageLabel: string;
  noteLabel: string;
  iconsTitle: string;
  iconsHint: string;
  saveHint: string;
  saveBtn: string;
  timelineTitle: string;
  timelineHint: string;
  exportBtn: string;
  wipeBtn: string;
  emptyTimeline: string;
  parentTitle: string;
  parentGateText: string;
  unlockBtn: string;
  noNote: string;
}

export const COPY: Record<Lang, StoryContent> = {
  en: {
    storyTitle: "The Big Piano",
    storyHint: "Read together. No lesson. Just the moment.",
    questionTitle: "One Question",
    questionText: "Why is the big piano special?",
    questionHint: "Let your child answer in any way: words, pointing, or silence.",
    recordTitle: "Record the child",
    recordHint: "Press start, then stop. Audio stays on this device only.",
    noteTitle: "Write one line",
    noteHint: "Type the child's words as they said them (no interpretation).",
    ageLabel: "Child age (optional)",
    noteLabel: "One line",
    iconsTitle: "Optional icons",
    iconsHint: "For pointing / pre-verbal kids. Tap any that fit.",
    saveHint: "When ready, save the moment to your local timeline.",
    saveBtn: "Save to timeline",
    timelineTitle: "Timeline",
    timelineHint: "Same question, different ages. Answers become the artifact.",
    exportBtn: "Export notes (JSON)",
    wipeBtn: "Wipe local data",
    emptyTimeline: "No saved moments yet. Read the story, ask the question, capture the reply, and save.",
    parentTitle: "Parent Layer",
    parentGateText: "This area is for adults. Enter your PIN to continue.",
    unlockBtn: "Unlock",
    noNote: "(No note)",
  },
  zh: {
    storyTitle: "《大钢琴》",
    storyHint: "一起读。没有道理。只有当下。",
    questionTitle: "一个问题",
    questionText: "为什么大钢琴很特别？",
    questionHint: "让孩子用任何方式回答：说话、指认、或沉默。",
    recordTitle: "录下孩子的声音",
    recordHint: "点击开始，再点击停止。录音仅保存在本设备。",
    noteTitle: "写一句话",
    noteHint: "照孩子说的原话写下来（不要解读）。",
    ageLabel: "孩子年龄（可选）",
    noteLabel: "一句话",
    iconsTitle: "可选图标",
    iconsHint: "适合指认或尚未能言语的孩子。点选适合的。",
    saveHint: "准备好后，保存这一刻到本地时间线。",
    saveBtn: "保存到时间线",
    timelineTitle: "时间线",
    timelineHint: "同一个问题，不同的年龄。答案成为记忆。",
    exportBtn: "导出笔记 (JSON)",
    wipeBtn: "清除本地数据",
    emptyTimeline: "还没有保存的时刻。读故事、问问题、记录回答、然后保存。",
    parentTitle: "家长层",
    parentGateText: "此区域仅限成人。请输入PIN码继续。",
    unlockBtn: "解锁",
    noNote: "（未填写文字）",
  }
};

export const STORY: Record<Lang, string[]> = {
  en: [
    "My three-year-old has their own little keyboard. It's always there—sometimes played, sometimes forgotten. It makes bright, happy sounds. They can press keys whenever they want. It's close. It's easy. It's abundant.",
    "I also have a keyboard—wooden, weighted keys, about a quarter of a real piano. I bought it for practice. Now I share it, because I want my child to feel something with weight—something that answers back.",
    "Yesterday, my child played my keyboard without looking at the keys. They looked at me. Then they looked at their mum—mouth open in surprise. The little melody sounded beautiful. They turned back, paused, turned to me again, smiled… and clapped for themselves. We clapped too. It was magnificent.",
    "The next day we went to my sister's house so my child could play with their cousin. In her study stood a real piano.",
    "My child walked up to it. I pressed one key and the sound filled the room. \"This is the big piano,\" I said. My child repeated: \"Big piano.\"",
    "Their cousin lifted them onto the stool—but that wasn't enough. My child patted the empty space beside them, asking their cousin to sit too. So the cousin sat, began to play, and my child joined in. The room filled with sound. A duet—imperfect, joyful, real.",
    "Even Grandma came to the doorway, amazed. My child lifted a hand, palm up. Grandma understood, and gently tapped their hand. Then the cousin played one note with one finger. My child copied. Back and forth, five or six times, until they looked at each other and burst out laughing. Perfect ending. We applauded.",
    "Then it was time to go. My child didn't want to leave. In my arms they twisted like a little fish and kept saying, \"Big piano… big piano.\"",
    "I realised: in my child's world, the big piano was rare. Special. Unique. So they couldn't bear to leave.",
    "On the way home, I played Mozart softly on my phone. The music flowed, and my child fell asleep."
  ],
  zh: [
    "我三岁的孩子有一架自己的电子琴。它总在那儿，有时被弹响，有时被遗忘。琴键会发出叮叮咚咚的欢快声响。想按就按，想玩就玩。它近在手边，轻松可得——它是「充足」的。",
    "我也有一架琴：木质的，37键配重键盘，大约只有真正钢琴的四分之一。我当初为练习而买，如今与孩子共享，因为我希望他能摸到更「真实」的东西——那种有分量、有回应的琴键。",
    "昨天，孩子在我的琴上弹奏。他没有看琴键，却回过头来看我；又看向妈妈——她站在那儿，惊讶得张大了嘴。那段即兴旋律美极了。小家伙停顿一下，转向我笑了，然后为自己鼓起掌来。我们也鼓掌。那一刻，真是壮丽。",
    "第二天，我们去了姐姐家，让孩子和表哥一起玩。姐姐的书房里，立着一架真正的钢琴。",
    "孩子走近它。我按下一个琴键，浑厚的声音在房间里回荡。「这是大钢琴。」我说。孩子跟着重复：「大钢琴。」",
    "表哥把他抱上琴凳，但这还不够。孩子拍拍身旁的空位，示意表哥也坐下。于是表哥坐定开始弹奏，孩子也加入进来。乐声充满整个房间——一段不完美却真实、快乐的二重奏。",
    "连奶奶也被琴声吸引到门口。孩子抬起手掌，奶奶会意，带着喜悦轻轻拍了拍他的手。表哥用一根手指按下一个音，孩子也学着按。你一下，我一下，五六次后，两人相视大笑。我们热烈鼓掌。",
    "该回家了。孩子不想走。在我怀里扭来扭去，像条想挣脱的小鱼，嘴里不停说：「大钢琴……大钢琴。」",
    "我忽然意识到：在孩子的世界里，这架大钢琴是稀缺的、特别的、独一无二的。所以，他舍不得离开。",
    "回家的路上，我在手机上轻轻放出莫扎特。琴声流淌，孩子在乐声中渐渐睡去。"
  ]
};

export interface IconOption {
  key: string;
  en: string;
  zh: string;
}

export const ICONS: IconOption[] = [
  { key: "big", en: "It's big", zh: "它很大" },
  { key: "loud", en: "It's loud", zh: "它很响" },
  { key: "rare", en: "I can't have it every day", zh: "不是每天都有" },
  { key: "cousin", en: "Cousin played with me", zh: "和表哥一起" },
  { key: "grandma", en: "Grandma came", zh: "奶奶来了" },
  { key: "feel", en: "It felt different", zh: "感觉不一样" },
  { key: "moment", en: "I didn't want to leave", zh: "我不想走" },
];

export interface Entry {
  id: string;
  createdAt: number;
  lang: Lang;
  childAge: string;
  note: string;
  icons: string[];
  hasAudio: boolean;
}

const LS_KEY = "bigpiano_entries_v1";
const LS_PIN = "bigpiano_parent_pin_v1";
const DEFAULT_PIN = "1234";

export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

export function saveEntries(entries: Entry[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

export function getPin(): string {
  return localStorage.getItem(LS_PIN) || DEFAULT_PIN;
}

export function setPin(pin: string): void {
  localStorage.setItem(LS_PIN, pin);
}

export function wipeAllData(): void {
  localStorage.removeItem(LS_KEY);
}
