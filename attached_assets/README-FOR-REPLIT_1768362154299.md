# 📋 MASTER INSTRUCTIONS FOR REPLIT AGENT

**Read these documents in order:**

1. **APP-RESTRUCTURE-SPEC.md** - Complete restructure requirements
2. **VISUAL-FLOW-DIAGRAM.md** - Visual flow and before/after comparison
3. **FILE-MAPPING-GUIDE.md** - Which files to use and rename

---

## 🎯 Quick Summary

**Goal:** Simplify the Big Piano app by removing clutter and creating a clean, journal-style experience with embedded hyperlinks.

**What you're doing:**
1. Remove elephant gate screen
2. Remove navigation menu
3. Simplify PIN entry screen
4. Add embedded hyperlinks in story text
5. Clean up file naming

**Critical rules:**
- ⚠️ **NO HALLUCINATIONS** - Use exact text provided
- ⚠️ **ASK IF UNCLEAR** - Don't guess
- ⚠️ **MIRROR LANGUAGES** - English structure = Chinese structure
- ⚠️ **TEST EVERYTHING** - Verify all links work

---

## 📚 What Each Document Contains

### APP-RESTRUCTURE-SPEC.md
- ✅ Complete list of elements to remove
- ✅ New app flow specification
- ✅ Exact text for PIN security message
- ✅ Hyperlink requirements
- ✅ Examples of correct vs incorrect implementation
- ✅ Bilingual mirroring requirements
- ✅ Pre-implementation checklist

### VISUAL-FLOW-DIAGRAM.md
- ✅ ASCII diagrams showing old vs new flow
- ✅ Mobile view comparison
- ✅ Visual examples of what to delete
- ✅ Screen-by-screen breakdown

### FILE-MAPPING-GUIDE.md
- ✅ Which HTML files currently exist
- ✅ Which files to use for each hyperlink
- ✅ File renaming instructions
- ✅ Cleanup checklist
- ✅ Troubleshooting guide

---

## ⚡ Quick Start Checklist

Before you code anything:

- [ ] Read all three documents
- [ ] Understand the no-hallucination rule
- [ ] Know which files to use (Piano-Bitcoin-BILINGUAL.html, etc.)
- [ ] Understand the flow: PIN → Content → Hyperlinks
- [ ] Have questions ready if anything is unclear

---

## 🚫 Common Mistakes to Avoid

1. **Adding text that wasn't specified**
   - ❌ "Welcome to the Big Piano app!" (not in spec)
   - ✅ Only use text from specification documents

2. **Guessing file names**
   - ❌ "I'll use Piano-Bitcoin-FINAL.html, seems newest"
   - ✅ Check FILE-MAPPING-GUIDE.md for correct files

3. **Changing punctuation or wording**
   - ❌ "Not your PIN, not your app." (changed from ?)
   - ✅ "Not your PIN? Not your app!" (exact match)

4. **Creating new navigation**
   - ❌ Adding a menu bar with Back/Home buttons
   - ✅ Only embedded hyperlinks as specified

5. **Not asking when unclear**
   - ❌ Proceeding with assumptions
   - ✅ STOP and ASK questions

---

## 📞 When to Ask Questions

**Immediate questions (ask before starting):**
- "Should I create a backup of the current app first?"
- "Do you want me to rename files or update links to match existing names?"
- "Should hyperlinks open in same tab or new tab?"

**During implementation (ask if you encounter):**
- "I see multiple versions of Piano-Bitcoin. Which one is canonical?"
- "The spec says 'elephant-noise-poem.html' but file is capitalized. Rename?"
- "Should I delete old files or keep them as backups?"

**After implementation (before declaring done):**
- "I've completed changes. Should I run a test checklist first?"
- "All links work on desktop. Should I test on mobile simulator too?"

---

## 🎨 Design Philosophy (Keep in Mind)

This app is:
- A **time capsule** for parent to child
- A **journal** of thinking process
- A **philosophical instrument** for teaching
- A **legacy tool** connecting Bitcoin to parenting

This app is NOT:
- A traditional story book app
- A learning management system
- A content discovery platform
- A social sharing tool

**The UI should get out of the way and let the content speak.**

---

## 📁 File Organization After Implementation

```
big-piano-app/
├── index.html                      (Main app - PIN + Story)
├── elephant-noise-poem.html        (Bilingual poem)
├── piano-bitcoin-journey.html      (Bilingual conversation)
├── archive-of-the-unspoken.html    (Chinese archive)
└── [old files deleted]
```

**Clean. Minimal. Focused.**

---

## ✅ Definition of Done

You're done when:

1. **Removed:**
   - Elephant gate screen is gone
   - Navigation menu is gone
   - Book icon section is gone

2. **Added:**
   - PIN security text below unlock button
   - Three working hyperlinks in story

3. **Tested:**
   - App opens to PIN screen
   - PIN unlocks to story (no intermediate screens)
   - All three hyperlinks open correct files
   - Bilingual toggles work in linked files
   - Mobile responsive

4. **Verified:**
   - Text matches spec exactly
   - No hallucinations or additions
   - File names are consistent
   - No console errors

---

## 🆘 Emergency Contacts

**If something goes wrong:**
1. STOP coding
2. Document what went wrong
3. Ask for help
4. Don't try to fix by guessing

**If you're stuck:**
1. Review the three specification docs again
2. List specific questions
3. Ask before proceeding

**If you're unsure:**
1. That's normal - this is detailed work
2. Better to ask than to guess wrong
3. User prefers questions over mistakes

---

## 🎯 Final Reminders

1. **Exact text only** - No creativity with wording
2. **Ask first** - Better safe than sorry
3. **Test thoroughly** - All links, all toggles
4. **Mirror languages** - English structure = Chinese structure
5. **Stay minimal** - Remove more than you add

**Ready? Review the three docs, then confirm you understand before starting.**

**Reply with:**
"I have read all three documents. I understand the requirements. I will ask questions if anything is unclear. Ready to begin implementation."

**Then wait for final approval before coding.**

---

*Good luck! You've got this. Remember: asking questions = good, guessing = bad.* 🚀
