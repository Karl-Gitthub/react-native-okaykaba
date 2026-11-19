# Use the Phosphor arrow for today’s Calendar check-in

## Status and baseline

Ready for implementation in the OkayKaba Expo app. The user selected the Calendar check-in link for both its empty and recorded states. The reviewed working tree is based on commit `8388d30521714015d06d71aec2e34d8bffa07cc4`. It includes modified `components/MoodCalendar.tsx` and `components/WellbeingScreens.tsx`, and an untracked `components/AppIcon.tsx`. Use these working versions.

## Problem and governing evidence

`AGENTS.md:77` assigns control icons on active screens to `AppIcon` with regular weight. Custom mood faces are an explicit exception. The Calendar tab at `app/(tabs)/_layout.tsx:18` renders `app/(tabs)/subscriptions.tsx:1`, which resolves through `components/WellbeingScreens.tsx:103` to `MoodCalendar`.

At `components/MoodCalendar.tsx:71`, selecting today displays a text arrow appended to either check-in label. The row is shared by Monthly and Year in Pixels. Home’s “Read & reflect” link at `components/WellbeingScreens.tsx:61` already uses the appropriate 17-point Phosphor arrow. Its row alignment and gap are specified at line 116. The shared icon mapping and default weight are in `components/AppIcon.tsx:39` and line 49.

## Required outcome and implementation scope

Edit the existing check-in Pressable in `components/MoodCalendar.tsx:71`. Remove the space and arrow glyph from its Text, then add `<AppIcon name="arrowRight" size={17} color={c.action}/>` as the next child. Calendar already imports the icon and palette. In the local `checkin` style at line 86, use a horizontal row, centered vertical alignment and a gap of 7, following the Home exemplar. Retain the existing vertical padding. Keep the conditional label, today-only visibility, button semantics and Home destination on the same Pressable. The header’s separate Today control shares the link text style, so apply the row layout only to `checkin`.

## Acceptance and verification

The audit verified the current icon, route and styles in source. During implementation, run `npm run typecheck` and `npm run lint`. In an Android Expo Go demo with no check-in for today, select today and verify “Check in for today” has one violet arrow beside the text. Tap it to open Home, save a demo mood, then return to Calendar and verify “Update today’s check-in” uses the same arrow. Check the row in Year in Pixels, select a different date to confirm it disappears, and inspect alignment at enlarged text size.

The existing icon component supplies the glyph. No dependency or design decision is outstanding.
