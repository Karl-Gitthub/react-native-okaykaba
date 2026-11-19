# ImageGen prompt record

Built-in ImageGen was used. Prior OkayKaba mockups were attached by local path. Publisher previews were studied separately; they were not attached to generation calls.

## Shared initial design brief

Use case ui-mockup. Improve this existing OkayKaba first-run design using studied native mobile patterns, NOT a new product or three alternate concepts. Reference images are the previous design to refine. Preserve OkayKaba identity, Plus Jakarta Sans font, yellow mood-face artwork and iridescent orb as meaningful mood content. No mascots or extra illustrations.
Mobile screens each represent 390 x 844 logical pixels, side by side on a neutral review canvas with short captions ABOVE content, no device hardware/notch/status bar/browser/home indicator. Highest visual quality. No layout clips. Date anchor November19 2026 if dates appear.
NATIVE DESIGN SYSTEM: one accent denim #155579 in light theme; cool navy text #17202C and secondary #5D6775; warm-white #FAFBF7 base is dominant. Very pale existing periwinkle/aqua only as supporting tint, not full saturated mesh. No gradient CTAs, glow, shadows, sparkles or glass on every card. The orb may keep its branded iridescence. One 8px spacing rhythm, 24px side padding, consistent line icons, controls at least48px. Brand font remains. One headline per screen at28px semibold; body16px with comfortable line height. Action radius pill; input12; grouped choice container16 with lightweight row separators. One primary bottom action in a fixed safe-area-aware footer when appropriate. Native-look navigation top row Back left, centered Set up title, Skip right on OPTIONAL SETUP ONLY. Avoid repeated large wordmark and redundant bottom helper footers. Header title16, not a giant branding block. Immediately below, small Demo · This device line and fixed centered180x4 progress track, Step N of3. Same header geometry in all setup screens.
Any decorative gradients must have product reason: only faint existing brand tint behind mood orb, other content plain legible. Native controls and grouped list rows, not stacks of decorative rounded cards. Explicit text/error feedback. Do not use emoji as chrome/icons; yellow faces are product mood content. No backend or accessibility-verification claims.

## 01-setup-light.png

Reference: C:/Users/laran/Documents/ChatGPT/Okaykaba APP/design-concepts/revised-first-run-flow/v3/01-shared-setup-header.png

THREE light screens: Name / Practice / Goal. Use same compact navigator header, same mode line and progress track width/vertical positions with one/two/three thirds fill.
NAME: What should we call you? helper A name or nickname is enough. Preferred name (optional) persistent label, white text field Alex with clear cool-grey boundary. Helper Leave blank for a neutral greeting. Continue primary at bottom.
PRACTICE: How are you feeling? helper Try it out. This check-in won't be saved. Moderately sized 180px iridescent glass orb with yellow Good small smile, one faint pale tint area behind orb only. Below five equal comfortable mood cells with samefamily small yellow faces+labels Low Meh Okay Good Great, Good selected through denim border/check. Continue bottom. No realhistory.
GOAL: What would help right now? helper Optional. You can change this later. SINGLE grouped white native-style selection list with thin dividers, three rows Handle school stress / Understand my moods / Make time for myself. One restrained line icon per row, denim selected radio/check for second. Finish setup bottom. No bigcardsinsidecards, no decorative separator icons. Make layout feel intentional and native, preserve calm whitespace without enormous dead zones.

## 02-email-recovery.png

Reference: C:/Users/laran/Documents/ChatGPT/Okaykaba APP/design-concepts/revised-first-run-flow/v3/03-change-email-errors.png

FOUR light auth-state screens Invalid address / Updating / Couldn't confirm / Session expired. AUTH ONLY: top native row Back left and title Change email centered (except pending no Back); NO Skip, progress track, demo label or oversized brand logo. Solid warm-white background, one native grouped form, NO giant envelope art or orb. Page title concise once, 28px heading if needed. Intro Update the address for your pending account. Current address alex@example.com secondary text. Persistent New email label.
INVALID: alex.student@ input, clear rust boundary, text Enter a valid email address. Update email primary. Back in navigator returns Verification.
UPDATING: alex.student@example.com disabledfield, compact inline spinner next to Updating email… in disabledbutton. helper Keep this screen open while we confirm the change. Brief committing state, no back/cancel mode switches; don't draw any fabricated percentage. Keep same form geometry. Slow-request handling specified in notes.
COULDN'T CONFIRM: preserve typed alex.student@example.com, rust icon and inline 'We couldn’t confirm the change. Check your account status before trying again.' primary Check status, text Back to verification. DO NOT claim old address unchanged aftertimeout.
EXPIRED: native top back goes Welcome, heading Sign in to continue, helper Your session expired. Sign in again to change your email. Primary Sign in bottom. Secondary Back to welcome text. Noactiveupdateform, no Create account or duplicate signup. Restore spacious native form hierarchy. Same denim action acrossstates.

## 03-accessible-layouts.png

Reference: C:/Users/laran/Documents/ChatGPT/Okaykaba APP/design-concepts/revised-first-run-flow/v3/02-enlarged-text-moods.png

THREE light first-run accessibility states Keyboard open / Enlarged name / Enlarged practice. Apply new compact native header and quiet warm-white/very pale brandtints instead of fullmeshgradient. Each390x844 logical. Preserve brand font. No exact200% claim.
KEYBOARD: actual-looking Androidkeyboard schematic lowerarea, focused optional name Alex and persistent label fullyvisible. Continue pinned immediately ABOVE keyboard, no tabbar. Compact native Set up header, Back Skip, mode Demo · This device, step1of3 trackfixed180x4.
ENLARGED NAME: largerbodytext24px, headings32px, optionalname label wraps, blankfield and neutralgreeting helper, scrollcue. Continue reachable inbottomfooter, safeareaclearance. No forcedfit thatshrinkslargefont.
ENLARGED PRACTICE: compact header step2of3, How are you feeling? unsavedpracticecopy. Smallerempty glassorb, scrollable TWO-COLUMN choicegroup using same shaded yellow canonical faces Low(closedeyesfrown), Meh(doteyesslightfrown), Okay(doteyesstraightmouth), Good(closedcurvedeyessmallsmile), Great(closedeyesopensmile). Greatfullwidthlastrow. All fiveexactlabels retained, body24px, controlsgrow, none selected. Continue disabled, Choose a mood or Skip. Solid whitechoicesurfaces, visibleboundaries. YellowfacesarecontentNOToutlineicons. Nooverlapsortruncation.

## 04-setup-dark.png

Reference: C:/Users/laran/Documents/ChatGPT/Okaykaba APP/design-concepts/revised-first-run-flow/v3/01-shared-setup-header.png

THREE DARK THEME counterparts of the refined Name / Practice / Goal screens. Same layout andcompactnative header as specified, same font, controls andmeaning. Darkcanvas #111820, grouped/inputsurfaces #1C2632, primarytext #F2F5F8, secondary #B5BFCA, boundaries #617080. SAME accentfamily in accessible lighterdenim #90BEDF, buttontext #111820. No new purple/green accents. Subdued periwinkle/aqua only smalltintbehindorb, nofullscreenglow.
NAME optionalfield Alex, Continue.
PRACTICE canonicalyellow Goodsmallsmile in180px glassorb, fivecanonicalyellow moodchoices Low Meh Okay Good Great, Good selected viaoutlineandcheck, Continue. Moodfacefamily same lighttheme, notnegativeinverted. Unsavedpracticecopy.
GOAL singlegrouped darknativechoicelist withdividers, secondselected, Finish setup.
HeaderBack Set up Skip, modeDemo · This device, progress same180x4 atsameverticalpositionandsteps1/2/3. Footerandnavreadable, shadow-free darksurfaces. These are correspondingtheme states inONE design, not new alternatives.

## Targeted corrections

### 02-email-recovery.png

Edit this FOUR-panel email form board. Remove ALL decorative yellow faces and ALL glass orbs from ALL four panels. They do not belong on account forms. Fill cleared areas with the existing plain warm-white background and gently reflow headings upward. Keep all field labels, typed emails, buttons, error messages and pending/expired states unchanged. One native navigation title per screen. No illustrations, no replacement icons, no new content. Preserve palette, 4 mobile content frames, font and quiet grouped forms. Fix only the unwanted decorations.

### 04-setup-dark.png

First image is DARK edit target. Second LIGHT image is exact layout reference. Match the Dark target's content and arrangement to the Light master while keeping its existing dark colors and lighter-denim accent. Specifically add the exact five yellow mood faces above labels Low Meh Okay Good Great in the dark Practice frame, with same selected Good bordered cell/check as Light. Make dark goal rows match the Light grouped list, without extra vertical dividers. Add 'Leave blank for a neutral greeting.' below optional Name input. Preserve shared headers, Step1/2/3, progress, native Back/Skip, CTA bottoms, canonical Good orb, and all dark-theme token colors. No extra controls, no new illustrations, no layout differences between themes except colors. Same three 390x844 content frames.

### 03-accessible-layouts.png

Edit only ONE helper sentence in the MIDDLE enlarged-name frame of this three-panel board. Replace 'Hi! What should we call you?' beneath the name input with 'Leave blank for a neutral greeting.' Preserve all other words, layout, type scale, faces, keyboard, color, buttons and geometry exactly. No other changes.

## Final email label correction

Edit this FOUR-panel email form board. Remove ALL decorative yellow faces and ALL glass orbs from ALL four panels. They do not belong on account forms. Fill cleared areas with the existing plain warm-white background and gently reflow headings upward. Keep all field labels, typed emails, buttons, error messages and pending/expired states unchanged. One native navigation title per screen. No illustrations, no replacement icons, no new content. Preserve palette, 4 mobile content frames, font and quiet grouped forms. Fix only the unwanted decorations.

Final label correction:
In the THIRD frame ONLY (Couldn't confirm) of this existing four-panel email UI board, change the field label 'Current address' above alex@example.com to 'Previous address'. Do not change that label in the first or second frames. It must not assert a current address after an uncertain request. Preserve every other pixel, text, input, button, spacing, colors, all four frames, and the lack of decorative artwork. One label edit only.
