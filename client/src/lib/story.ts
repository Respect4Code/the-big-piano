export interface StoryPage {
  title: string;
  text: string;
}

export interface StoryContent {
  appTitle: string;
  appSub: string;
  pageLabel: string;
  recordTitle: string;
  recordHint: string;
  cta: string;
  pages: StoryPage[];
}

export const STORY: Record<"en" | "zh", StoryContent> = {
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
    appSub: "一个关于「大」的小故事。",
    pageLabel: "第",
    recordTitle: "录下你的声音",
    recordHint: "像坐在孩子身边那样读就好。不需要完美。",
    cta: "读完后，你可以为每一页录音。孩子会在故事里听见你的声音。",
    pages: [
      {
        title: "在家",
        text: `我三岁的孩子有一架自己的电子琴。它总在那儿，有时被弹响，有时被遗忘。

我也有一架小小的配重键盘琴。我愿意和孩子分享，只希望他能摸到更「真实」的琴键——有分量、有回应。`
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

「这是大钢琴。」我说。

孩子跟着重复：「大钢琴。」`
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

「大钢琴……大钢琴……」

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
