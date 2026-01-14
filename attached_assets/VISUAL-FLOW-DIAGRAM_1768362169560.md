# Visual App Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER OPENS APP                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              PARENT LAYER - PIN SCREEN                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │  《大钢琴》 | The Big Piano                         │    │
│  │  A small story about something big.                │    │
│  │                                                     │    │
│  │  [Enter your PIN]  [Unlock]                        │    │
│  │                                                     │    │
│  │  "This PIN unlocks what you leave behind"          │    │
│  │  transforms security into legacy. It is an          │    │
│  │  inheritance mechanism, a time vessel, which        │    │
│  │  connects self-custody philosophy, to family        │    │
│  │  legacy. Not your PIN? Not your app!"              │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ (User enters PIN and clicks Unlock)
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  MAIN CONTENT SCREEN                        │
│                                                             │
│  # What Is a Piano?                                         │
│                                                             │
│  Before ownership is taught, it is felt.                   │
│  My toddler is at the stage where "mine" arrives           │
│  long before "yours."                                       │
│                                                             │
│  [... full story content ...]                              │
│                                                             │
│  ┌─────────────────────────────────────────────────┐       │
│  │  # A Note to Parents                             │       │
│  │                                                  │       │
│  │  One evening at bath time, my child asked me,   │       │
│  │  "Why did the elephant make a noise?"           │       │
│  │                                                  │       │
│  │  I told them I would tell it the following      │       │
│  │  night. (I eventually wrote the poem with the   │       │
│  │  help of Deepseek AI.) ← LINK TO POEM           │       │
│  │         │                                        │       │
│  │         └─────┐                                  │       │
│  │               ▼                                  │       │
│  │  ┌────────────────────────────────┐             │       │
│  │  │ elephant-noise-poem.html       │             │       │
│  │  │ (Bilingual: English/中文)      │             │       │
│  │  └────────────────────────────────┘             │       │
│  │                                                  │       │
│  │  "The Conversation That Built This." ← LINK     │       │
│  │         │                                        │       │
│  │         └─────┐                                  │       │
│  │               ▼                                  │       │
│  │  ┌────────────────────────────────┐             │       │
│  │  │ piano-bitcoin-journey.html     │             │       │
│  │  │ (Bilingual: English/中文)      │             │       │
│  │  └────────────────────────────────┘             │       │
│  │                                                  │       │
│  │  Together we created a philosophical            │       │
│  │  instrument for intergenerational               │       │
│  │  transmission. ← LINK                           │       │
│  │         │                                        │       │
│  │         └─────┐                                  │       │
│  │               ▼                                  │       │
│  │  ┌────────────────────────────────┐             │       │
│  │  │ archive-of-the-unspoken.html   │             │       │
│  │  │ (Chinese: 现代/文言)            │             │       │
│  │  └────────────────────────────────┘             │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Points for Replit

1. **NO elephant gate screen** - That intro screen with "Why did the elephant make a noise?" is DELETED

2. **NO navigation menu** - Those links at the top (The Story, Piano to Bitcoin, etc.) are DELETED

3. **PIN → Content directly** - After unlocking, user goes straight to "What Is a Piano?" story

4. **Hyperlinks embedded in text** - The only way to access other documents is through clickable links embedded naturally in the story

5. **Three embedded hyperlinks:**
   - Link 1: "(I eventually wrote the poem...)" → elephant-noise-poem.html
   - Link 2: "The Conversation That Built This." → piano-bitcoin-journey.html  
   - Link 3: "intergenerational transmission" → archive-of-the-unspoken.html

6. **Bilingual files are shared:**
   - Elephant poem has English/中文 toggle (one file, both languages)
   - Piano-Bitcoin journey has English/中文 toggle (one file, both languages)
   - Archive has 现代/文言 toggle (one file, two Chinese styles)

---

## What Gets Removed (Visual)

### ❌ DELETE THIS (Elephant Gate Screen):
```
┌─────────────────────────────────────┐
│        Parent Layer                 │
│                                     │
│         [elephant icon]             │
│                                     │
│  Why did the elephant make a noise? │
│                                     │
│  One evening at bath time, my       │
│  child asked me this question.      │
│                                     │
│  What follows is not an answer.     │
│  It is the thinking that led to     │
│  this app.                          │
│                                     │
│      Tap to continue               │
└─────────────────────────────────────┘
```

### ❌ DELETE THIS (Navigation Menu):
```
┌─────────────────────────────────────┐
│  [📖 The Story]                     │
│  [🎹 Piano to Bitcoin]              │
│  [🐘 Elephant Noise]                │
│  [📜 Archive of the Unspoken]       │
└─────────────────────────────────────┘
```

### ❌ DELETE THIS (Book Icon Section):
```
┌─────────────────────────────────────┐
│         [📖 book icon]              │
│                                     │
│          The Story                  │
│                                     │
│      [decorative image]             │
└─────────────────────────────────────┘
```

---

## Mobile View Comparison

### BEFORE (Complex - TOO MANY SCREENS):
```
Screen 1: Elephant Gate
    ↓ (tap)
Screen 2: PIN Entry
    ↓ (unlock)
Screen 3: Navigation Menu
    ↓ (select "The Story")
Screen 4: Book Icon + Image
    ↓ (scroll down)
Screen 5: Story Content
    ↓ (need to go back to menu for other sections)
Screen 6: Navigation Menu again
    ↓ (select "Piano to Bitcoin")
Screen 7: Piano to Bitcoin content
```

### AFTER (Simple - CLEAN FLOW):
```
Screen 1: PIN Entry
    ↓ (unlock)
Screen 2: Story with embedded links
    ↓ (click hyperlink in text)
Screen 3: Linked document (poem/journey/archive)
    ↓ (back button)
Screen 2: Story (continue reading)
```

**Much simpler! Fewer screens, more intuitive.**

---

## Summary for Implementation

**Remove:**
- Elephant gate screen
- Navigation menu  
- Book icon section
- All decorative images before content

**Add:**
- PIN security text below unlock button
- Three hyperlinks embedded in story text

**Keep:**
- PIN entry screen (but simplified)
- Story content "What Is a Piano?"
- "A Note to Parents" section
- All three linked document files (already exist)

**Result:**
Clean, minimal, journal-style app with natural discovery through embedded hyperlinks.
