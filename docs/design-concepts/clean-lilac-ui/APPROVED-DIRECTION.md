# OkayKaba visual direction

## Latest boards

- `01-home-inspiration-chat-v3.png`: Home, Daily Inspiration, Talk it through.
- `02-calendar-journal-tasks-settings-v2.png`: Mood calendar, Journal, Daily tasks, Account.

These supersede earlier boards for visual direction. They are static proposals generated with the built-in image-generation tool, not implemented screens. Exact prompts are saved in `prompt-01-v3.md`, `prompt-02-v2.md`, and `prompt-02-v2-correction.md`.

## Color and layout

- Approximately 60% off-white `#FAF9FC`, 30% pale lavender `#EEE7FC`, 10% violet/magenta accents. Treat this as visual balance, not a pixel quota.
- Accent gradient: `#7D7CF9` to `#C621E5`; limit it to activity cards, active navigation, and progress treatments.
- Dark charcoal text, restrained borders and corners, generous space. No mascots or character illustrations.
- Home activities form one horizontal strip: two complete cards and a clipped next card. Swipe or mouse-drag sideways; no pagination dots.
- Navigation: Home, Insights, Calendar, Account. Only the active tab shows a label in a pill. Journal and tasks open from Home activities.
- Inspiration uses a large horizontally swipeable quote card without dots or helper text. Quotes default; optional Bible verses off initially.
- Calendar retains Monthly and Year in Pixels, with five distinct labeled mood faces. The monthly grid is sample content; implementation must derive dates correctly.
- Journal saving states must reflect actual storage. AI sharing requires choosing an entry; no global automatic-sharing toggle.

## Intended motion for implementation

- Activity strip: touch/mouse dragging with predictable settling; preserve vertical page scrolling. Provide keyboard-operable cards and accessible previous/next controls when needed.
- Active tab: animate width and label opacity over approximately 220 ms without moving the outer bar or reducing touch targets.
- Tasks: completion moves the same row between lists with a coordinated layout transition; interpolate the ring to the actual completed/total ratio. Keep quick-add clear of keyboard, safe areas and navigation.
- Mood selection: subtle face emphasis; calendar selection reveals that day's record without inventing entries.
- Reduced motion: immediate state changes or brief fades instead of sliding, scaling and spring effects.

## Limits

These boards do not verify animation, keyboard handling, persistence, authentication or AI responses. Before implementation, test white labels against the brightest gradient area and darken the label backing where necessary for accessible contrast. Keep all sample content distinct from user records. The running app and Git remote were not modified by these design revisions.
