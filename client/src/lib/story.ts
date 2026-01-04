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
  parentObservingTitle: string;
  parentInstrument: string;
  parentAccess: string;
  parentAttachment: string;
  parentToyPiano: string;
  parentToyAccess: string;
  parentToyAttachment: string;
  parent37Key: string;
  parent37Access: string;
  parent37Attachment: string;
  parentBigPiano: string;
  parentBigAccess: string;
  parentBigAttachment: string;
  parentKeyPoint: string;
  parentAskingTitle: string;
  parentAskNeutral: string;
  parentAskReflect: string;
  parentAskStuck: string;
  parentAskAvoid: string;
  parentContrarianTitle: string;
  parentContrarian1: string;
  parentContrarian2: string;
  parentContrarian3: string;
  parentContrarian4: string;
  parentBridgeTitle: string;
  parentBridgeText: string;
  parentBridgePlaceholder: string;
  parentLayerTitle: string;
  parentLayerSubtitleZh: string;
  parentLayerSubtitleEn: string;
  parentLayerLedeZh: string;
  parentLayerLedeEn: string;
  whatIsAPianoTitle: string;
  whatIsAPiano: string[];
  noteToParentsTitle: string;
  noteToParents: string[];
  thinkingRecordLink: string;
  parentSettingsTitle: string;
  parentSetPinBtn: string;
  parentFramingText: string;
  helperTextNote: string;
  pinSetupTitle: string;
  pinSetupText: string;
  pinSetupBtn: string;
}

export const COPY: Record<Lang, StoryContent> = {
  en: {
    storyTitle: "The Big Piano",
    storyHint: "Read together.",
    questionTitle: "One Question",
    questionText: "Why is the big piano special?",
    questionHint: "Let your child answer in any way: words, pointing, or silence.",
    recordTitle: "Record",
    recordHint: "Press start, then stop. Audio stays on this device only.",
    noteTitle: "Write one line",
    noteHint: "Type the child's words as they said them (no interpretation).",
    ageLabel: "Child age (optional)",
    noteLabel: "One line",
    iconsTitle: "Optional icons",
    iconsHint: "For pointing / pre-verbal kids. Tap any that fit.",
    saveHint: "When ready, save the moment.",
    saveBtn: "Save moment",
    timelineTitle: "Timeline",
    timelineHint: "Same question, different ages. Answers become the artifact.",
    exportBtn: "Export notes (JSON)",
    wipeBtn: "Wipe local data",
    emptyTimeline: "No saved moments yet. Read the story, ask the question, capture the reply, and save.",
    parentTitle: "Parent Layer",
    parentGateText: "This area is for adults. Enter your PIN to continue.",
    unlockBtn: "Unlock",
    noNote: "(No note)",
    parentObservingTitle: "What you're observing (the three-piano ladder)",
    parentInstrument: "Instrument",
    parentAccess: "Access",
    parentAttachment: "Attachment signal",
    parentToyPiano: "Toy piano",
    parentToyAccess: "Always there",
    parentToyAttachment: "Often discarded easily",
    parent37Key: "37-key weighted (yours)",
    parent37Access: "Shared / permission",
    parent37Attachment: "Played with intention; looks for approval",
    parentBigPiano: "Big piano",
    parentBigAccess: "Rare / time-limited / socially mediated",
    parentBigAttachment: "Resists leaving; wants continuity and co-presence",
    parentKeyPoint: "The key data point is not \"scarcity as a fact.\" It is the emotional signal: \"I don't want to leave.\" That is value formation in the wild.",
    parentAskingTitle: "How to ask without leading",
    parentAskNeutral: "Neutral: \"Why was it special?\" \"What do you remember?\"",
    parentAskReflect: "Reflect: \"You really didn't want to leave, did you?\"",
    parentAskStuck: "If stuck: \"Was it the sound, or who was there?\"",
    parentAskAvoid: "Avoid: \"Because it's rare, right?\" (that answers it for them)",
    parentContrarianTitle: "Contrarian prompts (parent-only, optional)",
    parentContrarian1: "\"If we had a big piano at home, would it still feel special?\"",
    parentContrarian2: "\"Was it special because it was big — or because cousin joined?\"",
    parentContrarian3: "\"Was the best part the sound, or the moment?\"",
    parentContrarian4: "\"What changed when grandma came to the door?\"",
    parentBridgeTitle: "Bridge layer: \"What is a piano?\" (later)",
    parentBridgeText: "This is where your next chapter lives: ivory → ebony → strings → constraints → innovation → notation as shared interpretability → decentralised trust → the Bitcoin whitepaper continuum.",
    parentBridgePlaceholder: "MVP ships without this. When you add it, store it locally as a \"Study Room\" artifact behind the parent layer.",
    parentLayerTitle: "《大钢琴》 | The Big Piano",
    parentLayerSubtitleZh: '一个关于"大"的小故事。',
    parentLayerSubtitleEn: "A small story about something big.",
    parentLayerLedeZh: "一个三岁的孩子，发现了真正的钢琴的魔力。从电子琴的叮咚声，到一件家族传世之宝的宏伟琴音——这是一个关于音乐、传承与纯粹快乐的故事。",
    parentLayerLedeEn: "A three-year-old discovers the magic of a real piano.\nFrom electronic plinks to the grand sound of a family heirloom,\nit is a story about music, legacy, and pure joy.",
    whatIsAPianoTitle: "What Is a Piano?",
    whatIsAPiano: [
      "**Before ownership is taught, it is felt.**",
      "My toddler is at the stage where \"mine\" arrives long before \"yours.\"\nShoes. A ball. A book.",
      "They are learning to map the world between what feels like theirs, and what belongs to others:\nmummy's brush, daddy's shoes.",
      "This sense isn't explained. It emerges.\nIt's physical, immediate, and absolute.",
      "Naturally, this creates friction.\nThe logic of sharing is foreign. Why give up what you're holding?\nWhy can't you have what you want, right now?",
      "The concept of patience is just a word.\nAnd it should be. Their world is the present moment.",
      "What fascinates me is the briefness of this early \"ownership.\"\nA toy is clutched tightly in conflict, then discarded moments later.\nThe desire evaporates with access.",
      "It's not about keeping.\nIt's about the act of having had.",
      "At the same time, the word \"share\" is beginning to appear —\nnot as a moral rule, but as a social tool.",
      "\"Daddy, share,\" they say, even while reaching for what I hold.\nThey use it with other toddlers, too.",
      "I think they're noticing it softens conflict.\nThey see it works before they understand why.",
      "This is where the pianos quietly entered our world.",
      "My toddler has their own piano. A small 37-key keyboard.\nIt's always there, to be played or ignored.\nIt is unquestionably theirs.",
      "I have a piano, too. A small, weighted keyboard.\nAt first, it was mine.\nThen it became shared.\nSlowly, without any decree, it began to feel like ours.",
      "Then there is the Big Piano.\nThe full-sized one in my sister's study.",
      "My toddler has no access to it unless we visit.\nIt exists elsewhere, and only sometimes.",
      "I didn't plan this, but I see now we created a natural hierarchy:\n\nTheir toy piano — always available\nMy shared piano — accessible, negotiated\nThe big piano — rare, permission-bound",
      "I never had to explain scarcity.\nMy toddler encountered it.",
      "The Big Piano mattered differently.\nNot because it was technically better —\nbut because it wasn't always accessible.",
      "At this stage, ownership isn't legal or ethical.\nIt isn't about rights or fairness.",
      "It is about:\n• this is in my hand\n• this is not always here\n• this feels different when we experience it together",
      "That felt experience — not a lesson — is the foundation.",
      "And from this simple, personal hierarchy,\na much larger story about materials, history, and value begins to unfold."
    ],
    noteToParentsTitle: "A Note to Parents",
    noteToParents: [
      "What you are about to read next (elsewhere in this app) is a record of my thinking as a father.",
      "One evening at bath time, my child asked me,\n\"Why did the elephant make a noise?\"",
      "They were standing in the bath, looking at their toy elephant by the taps.\nThey picked it up, stroked it, played with its tusks and long trunk,\nand waited for me to tell them a story.",
      "In that moment, I realised they weren't asking for an answer.\nThey were thinking.\nThey were storytelling.\nOr asking me to make up a story called Why the Elephant Made a Noise.",
      "I told them I would tell it the following night.",
      "In the meantime, their love for elephants forced me to confront the history of piano keys.\nI was perplexed.",
      "I needed a quiet, non-judgmental space to sort out my thoughts —\nfrom materials to ethics,\nfrom technology to value.",
      "What comes next is not a lesson.\nIt is not polished.\nIt is not complete.",
      "It is a preserved record of thinking,\nkept here for a day in the future."
    ],
    thinkingRecordLink: "Read the archived thinking record (PDF)",
    parentSettingsTitle: "Parent settings",
    parentSetPinBtn: "Set PIN",
    parentFramingText: "This is not written for children. It's a record of how I thought when I didn't yet know how to explain the world.",
    helperTextNote: "Fragments are okay. Misspellings are okay.",
    pinSetupTitle: "Set Your PIN",
    pinSetupText: "This space is for adult thinking. Choose a PIN you won't share yet.",
    pinSetupBtn: "Set PIN & Enter",
  },
  zh: {
    storyTitle: "《大钢琴》",
    storyHint: "一起读。",
    questionTitle: "一个问题",
    questionText: "为什么大钢琴很特别？",
    questionHint: "让孩子用任何方式回答：说话、指认、或沉默。",
    recordTitle: "录音",
    recordHint: "点击开始，再点击停止。录音仅保存在本设备。",
    noteTitle: "写一句话",
    noteHint: "照孩子说的原话写下来（不要解读）。",
    ageLabel: "孩子年龄（可选）",
    noteLabel: "一句话",
    iconsTitle: "可选图标",
    iconsHint: "适合指认或尚未能言语的孩子。点选适合的。",
    saveHint: "准备好后，保存这一刻。",
    saveBtn: "保存时刻",
    timelineTitle: "时间线",
    timelineHint: "同一个问题，不同的年龄。答案成为记忆。",
    exportBtn: "导出笔记 (JSON)",
    wipeBtn: "清除本地数据",
    emptyTimeline: "还没有保存的时刻。读故事、问问题、记录回答、然后保存。",
    parentTitle: "家长层",
    parentGateText: "此区域仅限成人访问。请输入PIN码继续。",
    unlockBtn: "解锁",
    noNote: "（未填写文字）",
    parentObservingTitle: "您所观察的（三钢琴阶梯）",
    parentInstrument: "乐器",
    parentAccess: "接触方式",
    parentAttachment: "依恋信号",
    parentToyPiano: "玩具钢琴",
    parentToyAccess: "始终在场",
    parentToyAttachment: "常被轻易放下",
    parent37Key: "37键配重琴（你的）",
    parent37Access: "共享 / 需许可",
    parent37Attachment: "有意识地弹奏；寻求认可",
    parentBigPiano: "大钢琴",
    parentBigAccess: "稀有 / 限时 / 需社交媒介",
    parentBigAttachment: "抗拒离开；渴望延续与共同在场",
    parentKeyPoint: "关键数据点不是「稀缺性这一事实」，而是情感信号：「我不想离开。」这就是价值在真实场景中的形成。",
    parentAskingTitle: "如何提问而不引导",
    parentAskNeutral: "中性：「为什么它很特别？」「你记得什么？」",
    parentAskReflect: "反映：「你真的很不想离开，对吧？」",
    parentAskStuck: "如果卡住：「是因为声音，还是因为谁在那里？」",
    parentAskAvoid: "避免：「因为它很稀有，对吗？」（这等于替他们回答了）",
    parentContrarianTitle: "反向提示（仅限家长，可选）",
    parentContrarian1: "「如果家里有一架大钢琴，它还会感觉特别吗？」",
    parentContrarian2: "「它特别是因为它很大，还是因为表哥加入了？」",
    parentContrarian3: "「最棒的部分是声音，还是那个时刻？」",
    parentContrarian4: "「奶奶来到门口时，发生了什么变化？」",
    parentBridgeTitle: "桥接层：「钢琴是什么？」（后续）",
    parentBridgeText: "这是你下一章的所在：象牙 → 乌木 → 琴弦 → 约束 → 创新 → 记谱法作为可共享的解释性 → 去中心化信任 → 比特币白皮书连续体。",
    parentBridgePlaceholder: "MVP发布时暂不包含此内容。添加时，请将其作为「书房」工件存储在家长层后。",
    parentLayerTitle: "《大钢琴》 | The Big Piano",
    parentLayerSubtitleZh: '一个关于"大"的小故事。',
    parentLayerSubtitleEn: "A small story about something big.",
    parentLayerLedeZh: "一个三岁的孩子，发现了真正的钢琴的魔力。从电子琴的叮咚声，到一件家族传世之宝的宏伟琴音——这是一个关于音乐、传承与纯粹快乐的故事。",
    parentLayerLedeEn: "A three-year-old discovers the magic of a real piano.\nFrom electronic plinks to the grand sound of a family heirloom,\nit is a story about music, legacy, and pure joy.",
    whatIsAPianoTitle: "钢琴是什么？",
    whatIsAPiano: [
      "**所有权在被教导之前，是被感受的。**",
      "我的孩子正处于「我的」远比「你的」出现得更早的阶段。\n鞋子。一个球。一本书。",
      "他们正在学习绘制这个世界的地图，区分哪些感觉像是自己的，哪些属于他人：\n妈妈的梳子，爸爸的鞋子。",
      "这种感觉并非被解释。它涌现出来。\n它是物质的、即时的、绝对的。",
      "自然，这会产生摩擦。\n「分享」的逻辑是陌生的。为什么要放弃你正握着的东西？\n为什么不能立刻拥有你想要的东西？",
      "「耐心」这个概念只是一个词。\n而且理当如此。他们的世界就是当下。",
      "让我着迷的是这种早期「所有权」的短暂性。\n一个玩具在冲突中被紧紧抓住，片刻之后便被丢弃。\n渴望随着接触而蒸发。",
      "这不是关于占有。\n而是关于曾经拥有过这一行为。",
      "与此同时，「分享」这个词开始出现——\n不是作为道德准则，而是作为一种社交工具。",
      "「爸爸，分享，」他们一边说，一边仍伸手想要我手里的东西。\n他们对其他孩子也这么说。",
      "我想他们觉察到这个词能缓和冲突。\n他们在理解原因之前，先看到了结果。",
      "就在这时，钢琴悄然进入了我们的世界。",
      "我的孩子有自己的钢琴。一个小小的37键电子琴。\n它总在那里，可以被弹奏，也可以被忽略。\n它毫无疑问是他们的。",
      "我也有架钢琴。一个小小的配重键盘。\n起初，它是我的。\n然后它变成了共享的。\n慢慢地，未经任何宣告，它开始感觉像是我们的。",
      "然后，是那架大钢琴。\n立在我姐姐书房里的那架三角钢琴。",
      "我的孩子除非我们去拜访，否则无法触及它。\n它存在于别处，而且只是偶尔。",
      "我并未计划如此，但现在我明白我们无意中建立了一个天然的层级：\n\n他们的玩具钢琴 — 永远可及\n我共享的钢琴 — 可接触，需协商\n那架大钢琴 — 稀有，需获许可",
      "我从未需要解释稀缺性。\n我的孩子遭遇了它。",
      "大钢琴之所以不同。\n并非因为它技术上更优越——\n而是因为它并非总是可及。",
      "在这个阶段，所有权无关法律或伦理。\n它与权利或公平无关。",
      "它是关于：\n• 这在我手中\n• 这不总在这里\n• 当我们共同体验时，感觉不同",
      "这种被感受到的体验——而非一堂课——才是根基。",
      "从这个简单的、个人的层级出发，\n一个关于材料、历史与价值的更宏大故事，就此展开。"
    ],
    noteToParentsTitle: "给家长的话",
    noteToParents: [
      "接下来你将读到的（在本应用其他地方），是一位父亲的思考记录。",
      "一个洗澡的夜晚，我的孩子问我：\n「为什么大象会发出声音？」",
      "他们站在浴缸里，看着水龙头旁的玩具大象。\n他们把它拿起来，抚摸它，摆弄它的象牙和长鼻子，\n等着我给他们讲一个故事。",
      "在那一刻，我意识到他们并非在寻求一个答案。\n他们在思考。\n他们在建构故事。\n或者说，在邀请我编一个名叫《为什么大象会发出声音》的故事。",
      "我告诉他们，我明天晚上再讲。",
      "与此同时，他们对大象的爱迫使我直面钢琴琴键的历史。\n我感到困惑。",
      "我需要一个安静、不受评判的空间来整理思绪——\n从材料到伦理，\n从技术到价值。",
      "接下来的内容不是一堂课。\n它未经打磨。\n它并不完整。",
      "它是一份被保存下来的思考记录，\n留待未来的某一天。"
    ],
    thinkingRecordLink: "阅读完整思考记录 (PDF)",
    parentSettingsTitle: "家长设置",
    parentSetPinBtn: "设置PIN码",
    parentFramingText: "这不是写给孩子的。这是一份思考记录——当我还不知道如何向他解释这个世界时，我是怎样思考的。",
    helperTextNote: "片段也可以。拼写错误也没关系。",
    pinSetupTitle: "设置您的PIN码",
    pinSetupText: "这个空间是给成人思考的。选择一个您暂时不会分享的PIN码。",
    pinSetupBtn: "设置PIN码并进入",
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
const LS_PIN_SET = "bigpiano_pin_set_v1";

export function isPinSet(): boolean {
  return localStorage.getItem(LS_PIN_SET) === "true";
}

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

export function getPin(): string | null {
  return localStorage.getItem(LS_PIN);
}

export function setPin(pin: string): void {
  localStorage.setItem(LS_PIN, pin);
  localStorage.setItem(LS_PIN_SET, "true");
}

export function wipeAllData(): void {
  localStorage.removeItem(LS_KEY);
  localStorage.removeItem(LS_PIN);
  localStorage.removeItem(LS_PIN_SET);
}
