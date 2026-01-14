# File Mapping Guide for Replit

## Current Files in Directory

```
Archive-of-the-Unspoken.html          (Capitalized version)
Elephant-Noise-Poem.html              (Capitalized version)
Piano-Bitcoin-BASE.html               (Old version)
Piano-Bitcoin-BILINGUAL.html          (This is the one to use)
Piano-Bitcoin-FINAL.html              (Old version)
Piano-Bitcoin-Journey-COMPLETE.html   (Old version)
Piano-Bitcoin-WORKING.html            (Old version)
Piano_to_Bitcoin_CN.html              (Underscore version - separate Chinese)
Piano_to_Bitcoin_EN.html              (Underscore version - separate English)
archive-of-the-unspoken.html          (Lowercase - use this one)
piano-bitcoin-journey-FIXED.html      (Old version)
```

---

## Which Files to Use for Hyperlinks

### For App Hyperlinks (lowercase, kebab-case):

1. **Elephant Noise Poem Link:**
   - **Use:** Rename `Elephant-Noise-Poem.html` to `elephant-noise-poem.html` (lowercase)
   - **Or:** Use existing `Elephant-Noise-Poem.html` and update links to match
   - **Recommendation:** Lowercase is cleaner
   - **Status:** Bilingual (EN/中文 toggle) ✅

2. **Piano to Bitcoin Journey Link:**
   - **Use:** `Piano-Bitcoin-BILINGUAL.html`
   - **Rename to:** `piano-bitcoin-journey.html` (for consistency)
   - **Reason:** BILINGUAL version has both EN/中文
   - **Status:** Bilingual (EN/中文 toggle) ✅

3. **Archive of the Unspoken Link:**
   - **Use:** `archive-of-the-unspoken.html` (already lowercase)
   - **Status:** Chinese only (现代/文言 toggle) ✅

---

## Recommended File Structure (After Cleanup)

```
app-root/
├── index.html                          (Main app with PIN)
├── elephant-noise-poem.html            (Bilingual poem EN/中文)
├── piano-bitcoin-journey.html          (Bilingual conversation EN/中文)
└── archive-of-the-unspoken.html        (Chinese archive 现代/文言)
```

**Delete these old/duplicate files:**
- Piano-Bitcoin-BASE.html
- Piano-Bitcoin-FINAL.html
- Piano-Bitcoin-Journey-COMPLETE.html
- Piano-Bitcoin-WORKING.html
- piano-bitcoin-journey-FIXED.html
- Piano_to_Bitcoin_CN.html (separate file not needed)
- Piano_to_Bitcoin_EN.html (separate file not needed)
- Archive-of-the-Unspoken.html (capitalized duplicate)
- Elephant-Noise-Poem.html (if renamed to lowercase)

---

## Hyperlink Implementation

### In HTML, use relative paths:

```html
<!-- Link 1: Elephant poem -->
<a href="./elephant-noise-poem.html">(I eventually wrote the poem with the help of Deepseek AI.)</a>

<!-- Link 2: Piano-Bitcoin conversation -->
<a href="./piano-bitcoin-journey.html">The Conversation That Built This.</a>

<!-- Link 3: Archive document -->
<a href="./archive-of-the-unspoken.html">intergenerational transmission</a>
```

**Note:** Use `./` prefix for same-directory relative paths.

---

## File Renaming Steps for Replit

1. **Rename Elephant-Noise-Poem.html → elephant-noise-poem.html**
   ```bash
   mv Elephant-Noise-Poem.html elephant-noise-poem.html
   ```

2. **Rename Piano-Bitcoin-BILINGUAL.html → piano-bitcoin-journey.html**
   ```bash
   mv Piano-Bitcoin-BILINGUAL.html piano-bitcoin-journey.html
   ```

3. **Keep archive-of-the-unspoken.html as is** (already lowercase)

4. **Delete duplicate Archive-of-the-Unspoken.html**
   ```bash
   rm Archive-of-the-Unspoken.html
   ```

5. **Delete old Piano-Bitcoin versions**
   ```bash
   rm Piano-Bitcoin-BASE.html
   rm Piano-Bitcoin-FINAL.html
   rm Piano-Bitcoin-Journey-COMPLETE.html
   rm Piano-Bitcoin-WORKING.html
   rm piano-bitcoin-journey-FIXED.html
   ```

6. **Delete separate language files (not needed with bilingual versions)**
   ```bash
   rm Piano_to_Bitcoin_CN.html
   rm Piano_to_Bitcoin_EN.html
   ```

---

## Verification Checklist

After renaming and cleanup, verify:

- [ ] `elephant-noise-poem.html` exists (lowercase)
- [ ] `piano-bitcoin-journey.html` exists (lowercase)
- [ ] `archive-of-the-unspoken.html` exists (lowercase)
- [ ] All three files open correctly in browser
- [ ] Bilingual toggles work in elephant and piano-bitcoin files
- [ ] Chinese toggle (现代/文言) works in archive file
- [ ] No duplicate or old version files remain

---

## If Replit Encounters File Not Found

**Problem:** Clicking hyperlink shows "404 File Not Found"

**Debugging steps:**
1. Check exact filename (case-sensitive)
2. Check file location (same directory as index.html?)
3. Verify path in href attribute
4. Test opening file directly in browser

**Common mistakes:**
- Using uppercase when file is lowercase: `Elephant-Noise-Poem.html` vs `elephant-noise-poem.html`
- Wrong path: `/elephant-noise-poem.html` vs `./elephant-noise-poem.html`
- File in wrong directory: `subdirectory/file.html` vs `file.html`

---

## Summary for Replit

**Your task:**
1. Rename the 3 main files to lowercase kebab-case
2. Delete old/duplicate files
3. Update hyperlinks in main app to use new filenames
4. Test all links work correctly
5. Verify bilingual toggles still function

**Final structure:**
- index.html (main app)
- elephant-noise-poem.html (bilingual)
- piano-bitcoin-journey.html (bilingual)
- archive-of-the-unspoken.html (Chinese)

**Clean, organized, ready to deploy.**
