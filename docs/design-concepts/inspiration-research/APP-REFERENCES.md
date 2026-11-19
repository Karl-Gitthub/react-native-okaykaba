# OkayKaba: three app design references

Research date: November 17, 2026. This is a design reference shortlist, not an app implementation or a claim that every current screen and animation was tested. Published screenshots can show earlier versions. No OkayKaba application files were changed for this research.

## 1. Stoic — recommended primary visual direction

Official product: https://www.getstoic.com/

App Store screenshots: https://apps.apple.com/us/app/stoic-journal-mental-health/id1312926037

Published screenshot presentation by Val Pieŭnioŭ / The Screenshot First Company: https://dribbble.com/shots/27232248-App-Store-Screenshots-stoic-journal-mental-health

Study its restrained typography, clear daily routine, whitespace and focused writing experience. For OkayKaba, use this as the main reference for page hierarchy, journal and daily inspiration. Retain our own lilac/violet palette, activity carousel and mood faces. The recommendation concerns layout and interaction principles, not copying branding or assets.

## 2. How We Feel — mood check-in and history reference

Official product: https://howwefeel.org/

Screenshot gallery published by co-creator Marc Brackett: https://marcbrackett.com/how-we-feel-app-3/

App Store screenshots: https://apps.apple.com/us/app/how-we-feel/id1562706384

Study its focused emotion selection and transition from check-in to patterns and tools. OkayKaba should retain its own five mood labels and faces. Use the reference to make that existing flow clearer, with optional reflection after a quick check-in. Its multiple emotion colors are a reference for semantic clarity, not a replacement brand palette.

## 3. Gentler Streak — insights and information hierarchy reference

Official product and screenshots: https://gentlerstories.com/gentlerstreak

Apple design case study: https://developer.apple.com/news/?id=3m0ht22s

2024 Apple Design Award: https://developer.apple.com/design/awards/2024/

Study explanatory chart captions, grouping of metrics and comparisons with a person's own history. For OkayKaba, apply those principles to mood calendar and weekly insights using actual saved records. Do not introduce fitness metrics that OkayKaba does not collect. Respect the user's no-mascot/no-illustration direction.

## Recommended synthesis

Use Stoic as the visual foundation, How We Feel for the mood interaction, and Gentler Streak for insight clarity. Keep one coherent OkayKaba component system instead of giving each screen a different brand style.

- Approximately 60% off-white #FAF9FC, 30% pale lavender #EEE7FC, 10% violet/magenta accents #7D7CF9 to #C621E5.
- Home hierarchy: greeting, quick mood check-in, horizontal activity cards, today's reflection.
- Four stable destinations: Home, Insights, Calendar, Account. Keep the active-label pill chosen by the user. Secondary flows use a back arrow.
- Journal and quotes prioritize reading and writing, with minimal surrounding controls.
- Keep original branding, icons and functional mood faces. No borrowed mascots or decorative character art.
- Proposed motion: finger-following swipes, approximately 180–240 ms tab transitions, and coordinated task movement/ring changes. These are our proposed timings, not verified measurements of the reference apps. Respect reduced motion.

Before writing the implementation prompt, select the primary direction and approve one Home / Journal / Calendar comparison. State concrete typography, spacing, icon and navigation rules in the prompt. Preserve working features and all existing local data.
