# App Restructure Specification

## ⚠️ READ THIS FIRST ⚠️

### Examples of CORRECT vs INCORRECT Implementation

**✅ CORRECT - Use exact text provided:**
```
Specification says: "A small story about something big."
Your code: <p>A small story about something big.</p>
```

**❌ INCORRECT - Adding/changing text:**
```
Specification says: "A small story about something big."
Your code: <p>A small and intimate story about something big and meaningful.</p>
```
**Why wrong:** Added "intimate" and "meaningful" - these are hallucinations.

---

**✅ CORRECT - Preserve exact punctuation:**
```
Specification says: "Not your PIN? Not your app!"
Your code: <p>Not your PIN? Not your app!</p>
```

**❌ INCORRECT - Changing punctuation:**
```
Specification says: "Not your PIN? Not your app!"
Your code: <p>Not your PIN, not your app.</p>
```
**Why wrong:** Changed "?" to comma, changed "!" to period - altered tone.

---

**✅ CORRECT - Ask when unclear:**
```
Specification says: "Link to piano-bitcoin-journey.html"
But you see multiple files: piano-bitcoin-journey-FIXED.html, Piano-Bitcoin-BILINGUAL.html
Your response: "QUESTION: I see multiple Piano-Bitcoin files. Which exact file should I link to?"
```

**❌ INCORRECT - Guessing:**
```
You think: "I'll just use the one that looks newest"
Your code: <a href="Piano-Bitcoin-BILINGUAL.html">
```
**Why wrong:** You guessed instead of asking. This could break the app.

---

## REMOVE THESE ELEMENTS

### 1. Remove Elephant Gate Screen
- **DELETE:** The entire intro screen showing "Why did the elephant make a noise?" with icon
- **DELETE:** "Tap to continue" screen
- This should NOT appear at all

### 2. Remove Navigation Links
**DELETE these links entirely:**
- "The Story"
- "Piano to Bitcoin" 
- "Elephant Noise"
- "Archive of the Unspoken"

### 3. Remove Visual Elements
- **DELETE:** Book icon
- **DELETE:** "The Story" heading text
- **DELETE:** Any decorative images before content

### 4. Simplify Parent Layer Header
- **KEEP:** "Parent Layer" heading
- **REMOVE:** "Why did the elephant make a noise?" question
- **REMOVE:** Italicized explanation text
- **REMOVE:** "Tap to continue" button

---

## NEW APP FLOW

### Opening Screen: Parent Layer (PIN Entry)

**Structure:**
```
┌─────────────────────────────────────┐
│        Parent Layer                 │
│  《大钢琴》 | The Big Piano          │
│  A small story about something big. │
│                                     │
│  [Enter your PIN] [Unlock]         │
│                                     │
│  This PIN unlocks what you leave    │
│  behind" transforms security into   │
│  legacy. It is an inheritance       │
│  mechanism, a time vessel, which    │
│  connects self-custody philosophy,  │
│  to family legacy.                  │
│  Not your PIN? Not your app!        │
└─────────────────────────────────────┘
```

**PIN Entry UI:**
- Large input field: "Enter your PIN"
- "Unlock" button (prominent)
- Below PIN field, add explanatory text in smaller gray font:

**Exact text to add:**
```
"This PIN unlocks what you leave behind" transforms security into legacy.
It is an inheritance mechanism, a time vessel, which connects self-custody 
philosophy, to family legacy. Not your PIN? Not your app!
```

---

### After PIN Unlock: Direct to Content

**Immediately show:**

## What Is a Piano?

Before ownership is taught, it is felt.

My toddler is at the stage where "mine" arrives long before "yours."

Shoes. A ball. A book.

They are learning to map the world between what feels like theirs, and what belongs to others: mummy's brush, daddy's shoes.

This sense isn't explained. It emerges.

It's physical, immediate, and absolute.

Naturally, this creates friction.

The logic of sharing is foreign. Why give up what you're holding?

Why can't you have what you want, right now?

The concept of patience is just a word.

And it should be. Their world is the present moment.

What fascinates me is the briefness of this early "ownership."

A toy is clutched tightly in conflict, then discarded moments later.

The desire evaporates with access.

It's not about keeping.

It's about the act of having had.

At the same time, the word "share" is beginning to appear — not as a moral rule, but as a social tool.

"Daddy, share," they say, even while reaching for what I hold.

They use it with other toddlers, too.

I think they're noticing it softens conflict.

They see it works before they understand why.

This is where the pianos quietly entered our world.

My toddler has their own piano. A small 37-key keyboard.

It's always there, to be played or ignored.

It is unquestionably theirs.

I have a piano, too. A small, weighted keyboard.

At first, it was mine.

Then it became shared.

Slowly, without any decree, it began to feel like ours.

Then there is the Big Piano.

The full-sized one in my sister's study.

My toddler has no access to it unless we visit.

It exists elsewhere, and only sometimes.

I didn't plan this, but I see now we created a natural hierarchy:

* Their toy piano — always available
* My shared piano — accessible, negotiated  
* The big piano — rare, permission-bound

I never had to explain scarcity.

My toddler encountered it.

The Big Piano mattered differently.

Not because it was technically better — but because it wasn't always accessible.

At this stage, ownership isn't legal or ethical.

It isn't about rights or fairness.

It is about:

* this is in my hand
* this is not always here  
* this feels different when we experience it together

That felt experience — not a lesson — is the foundation.

And from this simple, personal hierarchy, a much larger story about materials, history, and value begins to unfold.

---

## A Note to Parents

What you are about to read next (elsewhere in this app) is a record of my thinking as a father.

One evening at bath time, my child asked me, "Why did the elephant make a noise?"

They were standing in the bath, looking at their toy elephant by the taps. They picked it up, stroked it, played with its tusks and long trunk, and waited for me to tell them a story.

In that moment, I realised they weren't asking for an answer. They were thinking. They were storytelling. Or asking me to make up a story called Why the Elephant Made a Noise.

I told them I would tell it the following night. **(I eventually wrote the poem with the help of Deepseek AI.)**

**↑ HYPERLINK:** The bracketed text should link to `/elephant-noise-poem.html`

My toddler's love for elephants forced me to confront the history of piano keys.

I was perplexed.

I needed a quiet, non-judgmental space to sort out my thoughts — from materials to ethics, from technology to value.

What comes next is not a lesson. It is not polished. It is not complete.

It is a preserved record of thinking, kept here for a day in the future.

It started with Meta AI. I choose Meta AI because at the time it was the least powerful and knew less about my patterns of thought.

**"The Conversation That Built This."**

**↑ HYPERLINK:** This entire sentence should link to `piano-bitcoin-journey.html` (English version)

It is a synthesis of collective intelligence—six AI models converging on a coherent, profound vision. Together we created a philosophical instrument for **intergenerational transmission**.

**↑ HYPERLINK:** The words "intergenerational transmission" should link to `archive-of-the-unspoken.html` (bilingual Chinese version with Modern/Classical toggle)

---

## FILE LINKING REQUIREMENTS

### Files That Already Exist:
1. **Elephant Noise Poem** (Bilingual EN/中文)
   - Filename: `elephant-noise-poem.html`
   - Link from: "(I eventually wrote the poem with the help of Deepseek AI.)"
   - Opens: Bilingual poem with English/中文 toggle
   - Status: ✅ Complete - has both languages

2. **Piano to Bitcoin Journey** (Bilingual EN/中文)  
   - Filename: `piano-bitcoin-journey.html`
   - Link from: "The Conversation That Built This."
   - Opens: Bilingual conversation with English/中文 toggle
   - Status: ✅ Complete - has both languages

3. **Archive of the Unspoken** (Chinese: Modern/Classical toggle)
   - Filename: `archive-of-the-unspoken.html`
   - Link from: "intergenerational transmission"
   - Opens: Chinese document with 现代/文言 toggle
   - Status: ✅ Complete - Chinese only (English translation pending)

### File That Needs to Be Created (Future):
4. **Archive of the Unspoken English** (TODO)
   - Filename: `archive-of-the-unspoken-en.html`
   - Not yet translated from Chinese
   - Will eventually be linked alongside Chinese version
   - Status: ❌ Pending translation

---

## BILINGUAL MIRRORING REQUIREMENTS

### Content Structure Mirroring
**Every section in English must exist in Chinese, and vice versa:**

| English Content | Chinese Content | Status |
|----------------|-----------------|--------|
| Parent Layer PIN screen | 父母层 PIN 屏幕 | ✅ Both exist |
| "What Is a Piano?" story | "什么是钢琴？" 故事 | ✅ Both exist |
| "A Note to Parents" section | "给父母的笔记" 部分 | ✅ Both exist |
| Elephant Noise Poem | 大象噪音诗 | ✅ Both in same file |
| Piano-Bitcoin Journey | 钢琴到比特币之旅 | ✅ Both in same file |
| Archive (Modern Chinese) | 未言之档案 (现代中文) | ✅ Exists |
| Archive (Classical Chinese) | 默境存真 (文言文) | ✅ Exists |
| Archive (English) | Archive (English) | ❌ TODO |

### Link Mirroring
**If English version links to X, Chinese version must link to same X:**
- English: "(I eventually wrote the poem...)" → `elephant-noise-poem.html`
- Chinese: "(我最终写了这首诗...)" → `elephant-noise-poem.html`
- Both link to SAME bilingual file

**This is CRITICAL:** Do not create separate files for English/Chinese links. Use the SAME bilingual HTML files.

---

## IMPLEMENTATION CHECKLIST FOR REPLIT

- [ ] Remove elephant gate intro screen completely
- [ ] Remove "Why did the elephant make a noise?" question from Parent Layer
- [ ] Remove all navigation links (The Story, Piano to Bitcoin, etc.)
- [ ] Remove book icon and decorative images
- [ ] Add PIN security text below unlock button
- [ ] Make "(I eventually wrote the poem...)" a clickable link → `/elephant-noise-poem.html`
- [ ] Make "The Conversation That Built This." a clickable link → `/piano-bitcoin-journey.html`
- [ ] Make "intergenerational transmission" a clickable link → `/archive-of-the-unspoken.html`
- [ ] Ensure all linked HTML files are in the same directory
- [ ] Test PIN unlock flow goes directly to content
- [ ] Test all hyperlinks open correct files
- [ ] Verify mobile responsiveness

---

## VISUAL FLOW SUMMARY

```
User opens app
    ↓
Parent Layer PIN screen
    ↓
Enter PIN → Unlock
    ↓
Directly shows "What Is a Piano?" content
    ↓
User reads story
    ↓
Clicks hyperlinks to:
    - Elephant Noise poem
    - Piano-Bitcoin conversation  
    - Archive document (Chinese)
```

**NO intermediate screens. NO navigation menus. Clean, linear flow.**

---

## PRE-IMPLEMENTATION CHECKLIST FOR REPLIT

**Before you start coding, confirm you understand:**

- [ ] I will use ONLY the exact text provided in this spec
- [ ] I will NOT add, modify, or "improve" any text content
- [ ] I will NOT change punctuation, capitalization, or wording
- [ ] I will ASK if any instruction is unclear or ambiguous
- [ ] I will use the exact file names specified (case-sensitive)
- [ ] I will preserve all existing functionality in linked HTML files
- [ ] I will test all hyperlinks after implementation
- [ ] I will ensure English and Chinese versions mirror each other structurally
- [ ] I understand that bilingual files (elephant poem, piano-bitcoin) are SHARED between languages
- [ ] I understand the Archive has 3 versions: Modern Chinese, Classical Chinese, and (future) English
- [ ] I will NOT create new navigation menus or add UI elements not specified
- [ ] I will implement the PIN security text exactly as written
- [ ] I will remove ALL elements listed in "REMOVE THESE ELEMENTS" section
- [ ] I will implement the flow exactly as shown: PIN → Content → Hyperlinks

**If you cannot check ALL boxes above, STOP and ASK QUESTIONS.**

---

## QUESTIONS FOR REPLIT TO ASK (Examples)

If you're unsure about anything, ask questions like these:

- "I see multiple Piano-Bitcoin files in the directory. Which one should I use for the hyperlink?"
- "The spec mentions 'elephant-noise-poem.html' but I see 'Elephant-Noise-Poem.html' (uppercase). Should I rename it?"
- "Should the PIN text be above or below the unlock button?"
- "What should happen if user clicks X button on Parent Layer modal?"
- "Should the hyperlinks open in new tabs or same tab?"
- "I don't see a Chinese version of the main app content. Should I create it?"

**Remember: Asking questions is GOOD. Guessing is BAD.**

---

## FILE NAMING CONVENTIONS

**Important:** Some files use PascalCase, others use kebab-case. Use EXACTLY as specified:

- ✅ `elephant-noise-poem.html` (lowercase, kebab-case)
- ✅ `piano-bitcoin-journey.html` (lowercase, kebab-case)
- ✅ `archive-of-the-unspoken.html` (lowercase, kebab-case)
- ❌ `Elephant-Noise-Poem.html` (wrong - don't capitalize)
- ❌ `piano_bitcoin_journey.html` (wrong - don't use underscores)

**Double-check file names in the actual directory before linking.**

---

## TESTING CHECKLIST

After implementation, verify:

- [ ] App opens to Parent Layer PIN screen (no elephant gate)
- [ ] PIN entry field and Unlock button are visible
- [ ] Security text appears below PIN field in smaller gray font
- [ ] After PIN unlock, "What Is a Piano?" content appears immediately
- [ ] No navigation menu or links to "The Story", "Piano to Bitcoin", etc.
- [ ] Hyperlink "(I eventually wrote the poem...)" opens elephant-noise-poem.html
- [ ] Hyperlink "The Conversation That Built This." opens piano-bitcoin-journey.html
- [ ] Hyperlink "intergenerational transmission" opens archive-of-the-unspoken.html
- [ ] All hyperlinks work and open correct files
- [ ] Bilingual toggles work in linked files (English/中文, Modern/Classical)
- [ ] Mobile responsive design is preserved
- [ ] No console errors
- [ ] Text content matches spec exactly (no additions or changes)

---

## SUMMARY FOR REPLIT

**What you're building:**
A minimalist, journal-style app where a parent unlocks access with a PIN, reads a philosophical story about teaching ownership to toddlers, and discovers embedded hyperlinks to deeper explorations (a poem, a conversation, and an archive).

**What makes this app special:**
- It's a time capsule for future self/children
- It connects Bitcoin's self-custody philosophy to teaching toddlers about ownership
- It preserves thinking process, not just conclusions
- It's bilingual (English/Chinese) throughout

**Your job:**
- Simplify the UI (remove clutter)
- Preserve exact text (no hallucinations)
- Link documents together (create discovery flow)
- Mirror structure across languages
- Ask when unclear

**If you understand all of this, reply: "I understand. Ready to implement. I will ask questions if unclear." Then wait for final go-ahead before starting.**

---

## CRITICAL RULES FOR REPLIT AGENT

### ⚠️ NO HALLUCINATIONS - NO TEXT CHANGES
**MOST IMPORTANT RULE:**
- **DO NOT** add, modify, or "improve" any text content
- **DO NOT** change sentence structure or wording
- **DO NOT** add explanatory text that wasn't requested
- Use ONLY the exact text provided in this specification
- If something is unclear, **ASK FOR CLARIFICATION** before proceeding
- When in doubt, DO NOTHING and ask questions

### 🔄 MIRRORING REQUIREMENT
**All content must exist in both languages:**
- English content → English HTML files
- Chinese content → Chinese HTML files (with Modern/Classical toggle where applicable)
- If English version has Section X, Chinese version must have Section X
- If Chinese version has hyperlink to Y, English version must have hyperlink to Y
- Structure, flow, and navigation must be identical across languages
- **Exception:** The Archive document has 3 versions:
  - Chinese with Modern/Classical toggle (already exists)
  - English version (TODO - not yet translated)

### ❓ ASK BEFORE PROCEEDING IF:
- Any instruction seems ambiguous
- File paths don't match existing files
- Content seems incomplete or unclear
- You're tempted to "improve" or "clarify" any text
- Navigation flow doesn't make sense
- Link destinations are unclear
- Any technical implementation detail is uncertain

## NOTES FOR REPLIT AGENT

**Priority:** Simplify the user experience. The app should feel like reading a private journal with embedded hyperlinks to deeper explorations.

**Design Philosophy:** 
- Minimal UI - remove all unnecessary elements
- Focus on content - text is the interface
- Hyperlinks are discovery mechanisms, not navigation menus
- PIN is threshold between child layer and parent layer
- Everything after PIN unlock is for adults only
- **Clean linear flow:** PIN → Content → Embedded hyperlinks → Related documents

**Technical Notes:**
- All HTML files should be standalone (can be opened independently)
- Use relative paths for links (e.g., `./elephant-noise-poem.html`)
- Maintain bilingual toggles in linked files (preserve existing functionality)
- Preserve existing formatting in linked documents (DO NOT modify styling)
- Keep mobile-first responsive design
- Test all links after implementation
- Verify PIN unlock flow works correctly
