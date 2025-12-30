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
    parentGateText: "此区域仅限成人访问。请输入PIN码继续。",
    unlockBtn: "解锁",
    noNote: "（未填写文字）",
  }
};

export const STORY: Record<Lang, string[]> = {
  en: [
    "My three-year-old has an electronic piano keyboard. It's theirs - always there, sometimes played, sometimes ignored. It makes cheerful plinks and plonks. They can bash away at it whenever they fancy. It's portable and has built-in 8 tones, 8 rhythms, 11 demos, 4 percussions, 4 animal sounds, volume and tempo control. The 37-key kid piano is an excellent musical toy they enjoy. Sometimes they even leave it on, and a happy melody plays in the background whilst our toddler is reading a book with their mother. Regardless, it's just... there.",
    "I have a piano too. A 37-key weighted one, made of wood - about a quarter the size of a proper piano. This digital piano features 37 keys and 3 full octave scales. It was my ideal introduction to music. I bought it to practise when I was taking lessons. Now I share it with my toddler because I want them to get a sense of something bigger, something with proper weighted keys.",
    "Yesterday, my toddler played on my piano. They didn't look at the keys - they looked over their shoulder at me instead. Then at their mother, who was standing there with her mouth wide open, shocked. The tune they were improvising sounded amazing. Then, our toddler slowly turned forward to face the piano, still not looking at the keys. They paused, turned back towards me, smiled, and applauded. Of course I applauded too. So did their mother. It was magnificent. I ran over to them and picked them up, gave them lots of kisses and twirled them around in the air. They giggled with excitement, laughed and smiled at their mother.",
    "Later that day I went to my sister's house so my toddler could play with their older cousin.",
    "My sister has a full-sized piano in her study.",
    "My toddler walked up to it. I pressed the keys and as the sound reverberated around the study, I said \"This is a big piano\" and my toddler repeated \"Big Piano\". It was rare for them to see a big piano.",
    "Their cousin lifted them onto the stool, but that wasn't enough. My toddler wanted their cousin to sit next to them. So the cousin sat down and started playing, and my toddler joined in. The glorious sound filled the study. They played a duet. Of course my toddler's notes were not as fluid and in tune as their cousin's, but my toddler didn't know that. They were both having so much fun. The music was so good that it drew my toddler's grandmother into the study. She stood at the door, marvelling at what she was seeing and hearing. My toddler raised their hand up in the air and offered their palm for a high five, and their grandmother patted their hand with joy.",
    "Then, their cousin paused for a second and used one finger to play a note, and my toddler copied them and used one finger to play a note. They did this about six times in time with each other - first their cousin, then my toddler. Then finally, they both looked at each other, no fingers on the keys, and both laughed. It was a perfect ending and we applauded and cheered loudly. Grandmother offered her palm up for a high five, and my toddler slapped it with glee.",
    "It was time for us to go.",
    "I picked up my toddler and walked them into the hallway towards their buggy, but they twisted, turned and wriggled in my arms trying to get free, and they said \"Big Piano, The big Piano.\"",
    "They didn't want to leave. They pointed in the direction of the study. They wanted to play with the big piano. They wanted to hear the magnificent full sound of the big piano.",
    "Grandmother came into the hallway to see what the commotion was about. My toddler was crying, so grandmother took them from me, comforted them and placed them on the ground. My toddler ran towards the study, saying \"Big Piano!\"",
    "\"Now, this big piano is the real deal,\" said Grandmother to the toddler. \"It's not the sound of a small digital piano that you have, or the 37-key piano that your father has. The big piano is exactly that - big. It sounds different. The keys have a different feel. My mother gave it to me. It has a lot of history. My mother used to play the big piano in an opera house in Vienna, then she shipped it to me, and I gave it to your auntie because she was the only one in the family with space big enough to have the big piano.\"",
    "And I realised that In my toddler's world, the big piano was scarce. Special. Unique.",
    "So, they didn't want to leave.",
    "My toddler sat proudly on the stool next to their cousin and they played the big piano. I could see my toddler was drawn to the sound of the big piano and the smooth feel of the keys.",
    "Eventually, after a lot more crying and fighting to get out of my hands, my toddler allowed me to put them in the buggy. They were still asking for the big piano. They still didn't want to leave. But as I pushed the buggy away from my sister's house, I found some music from Mozart on my phone and placed it on top of the buggy's head cover.",
    "Mozart's piano playing made my toddler drift off to sleep."
  ],
  zh: [
    `我三岁的孩子有一架自己的电子琴。它总在那儿，有时被弹响，有时被遗忘。琴键能发出叮叮咚咚的欢快声响。孩子想敲就敲，想玩就玩。这架37键的小琴便携有趣，里面藏着各种声音、节奏和小惊喜，是他们心爱的音乐玩具。有时他们甚至不关它，任一首欢快的曲子轻轻流淌，成为他们依偎在妈妈怀里看书的背景音。它就在那里，触手可及。`,
    `我也有一架琴。一架37键的配重键盘，木质的，体积大约只有标准钢琴的四分之一。它曾是我音乐之旅的理想开端，是我为了上课练习而买的。现在，我让它与我的孩子共享，因为我希望他能触摸到更"真实"的东西——那种有分量、有回应的琴键。`,
    `昨天，孩子在我的琴上弹奏。他没有看琴键，却回过头来看我。然后又看向他的妈妈——她正站在那儿，惊讶得张大了嘴。那段即兴的旋律，听起来如此美妙。接着，小家伙慢慢转回身，面向钢琴，目光依然没有落在琴键上。他停顿了一下，再次转向我，笑了，然后为自己鼓起掌来。我当然也鼓掌了。妈妈也是。那一刻，精彩极了。我跑过去抱起他，亲了又亲，让他在空中转圈。他咯咯地笑，兴奋不已，冲着妈妈绽开笑脸。`,
    `那天晚些时候，我们去了姐姐家，让孩子和他的表哥一起玩。`,
    `姐姐的书房里，立着一架真正的三角钢琴。`,
    `孩子走向它。我按下一个琴键，浑厚的声音在书房里回荡。"这是大钢琴。"我说。孩子跟着重复："大钢琴。"他很少见到这么大的钢琴。`,
    `表哥把他抱上琴凳，但这还不够。我的孩子拍拍身旁的空位，示意表哥也坐下。于是，表哥坐定，开始演奏，我的孩子也加入了进来。辉煌的乐声充满了整个房间。他们完成了一段二重奏。当然，孩子的音符不如表哥的流畅和谐，但他并不知道。他们只是玩得非常、非常开心。美妙的琴声甚至把孩子的奶奶也引到了书房门口。她站在那里，眼中满是惊叹。我的孩子高高举起手，掌心向上，奶奶会意，带着喜悦轻轻拍了拍他的小手。`,
    `接着，表哥停顿了一下，用一根手指按下一个琴键。我的孩子看见了，也学着用一根手指按下一个琴键。他们就这样，你一下，我一下，默契地重复了大约五六次。最后，两人同时望向对方，手指离开琴键，一起大笑起来。这真是完美的收尾，我们热烈地鼓掌、喝彩。奶奶再次伸出手掌，孩子开心地用力击了上去。`,
    `该回家了。`,
    `我抱起孩子，走向走廊里的婴儿车。可他在我怀里扭来扭去，像条想挣脱的小鱼，嘴里不停说着："大钢琴，要大钢琴。"`,
    `他不想走。小手指着书房的方向。他想再去弹那架大钢琴，想再听听它发出的、那种饱满又宏大的声音。`,
    `奶奶闻声来到走廊。孩子哭了起来。奶奶从我手中接过他，轻声安慰，把他放回地上。刚一落地，小家伙就跑向书房，嘴里喊着："大钢琴！"`,
    `"这架大钢琴啊，可是个真正的宝贝。"奶奶对孩子，也像是对我们说。"它发出的声音，和你那小电子琴不一样，也和爸爸那架37键的琴不一样。大钢琴就是'大'，声音不同，琴键的触感也不同。这是我母亲留给我的，它有很多故事。我母亲曾经在维也纳的歌剧院里弹奏它，后来它远渡重洋来到我身边。现在，我把它送给了你姨妈，因为只有她家，才放得下这样一架'大钢琴'。"`,
    `我忽然意识到，在我孩子的世界里，这架大钢琴是稀缺的。是特别的。是独一无二的。`,
    `所以，他舍不得离开。`,
    `我的孩子骄傲地重新坐上琴凳，紧挨着表哥。我能看出，他被大钢琴那浑厚的音色和丝滑的琴键深深吸引住了。`,
    `最终，在又一番哭泣和挣扎之后，他总算允许我把他放进婴儿车。但他依然在问："大钢琴呢？"他依然不想走。当我推着婴儿车缓缓离开姐姐家时，我在手机上找出莫扎特的钢琴曲，把手机轻轻放在婴儿车的遮阳篷上。`,
    `莫扎特的琴声流淌出来，我的孩子，在乐声中渐渐沉入了梦乡。`
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
