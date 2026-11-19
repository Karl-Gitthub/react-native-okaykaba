# Apply Plus Jakarta Sans to Calendar labels

## Status and baseline

Ready for implementation in the OkayKaba Expo app. The user selected this change for Monthly and Year in Pixels. The reviewed working tree is based on commit `8388d30521714015d06d71aec2e34d8bffa07cc4` and includes local edits to `components/MoodCalendar.tsx`. Apply the change to the working copy.

## Problem and governing evidence

`AGENTS.md:73` requires the existing Plus Jakarta Sans families. The root layout loads Plus Jakarta Sans Regular as `sans-regular` in `app/_layout.tsx:16`. The Calendar tab registered at `app/(tabs)/_layout.tsx:18` renders `MoodScreen` through `app/(tabs)/subscriptions.tsx:1`, which resolves to `MoodCalendar` at `components/WellbeingScreens.tsx:103`.

In `components/MoodCalendar.tsx:58–59`, the yearly grid renders month abbreviations and day numbers. Both modes render the count hint, mood legend and footer at lines 66 and 73–74. These Text elements sit inside views rather than text with an inherited family. Their styles at lines 85–86 omit the family, so Android uses its default alongside Calendar’s explicitly styled weekday headings and detail note.

## Required outcome and implementation scope

In the existing Calendar stylesheet, add `fontFamily: 'sans-regular'` to `pixelMonth`, `pixelDayLabel`, `legendText` and `hint`. The existing `note` style demonstrates the exact family. Preserve the existing sizes, alignment, grid geometry and colors of those four styles. The weekday headings and selected-day detail already specify their own weights.

## Acceptance and verification

The audit verified the font registration, route and four consumers in source. During implementation, run `npm run typecheck` and `npm run lint`. In Android Expo Go, open Calendar and inspect the legend and both hints in Monthly. Switch to Year in Pixels and check the month headers and day numbers, including double-digit dates, on a narrow phone. Verify the text fits its existing cells and the same legend family persists across both views.

The font asset is already registered. No dependency or design decision is outstanding.
