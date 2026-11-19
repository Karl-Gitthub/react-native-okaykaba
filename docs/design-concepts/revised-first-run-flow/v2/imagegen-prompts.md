# ImageGen prompt record — revision 2

## Preferred-name track correction

Edit ONLY the three progress bars on the FIRST attached board (optional preferred name). SECOND board is progress-bar width reference only. Increase each Name progress TRACK width to match the same relative width as the Goal board track: approximately half each mobile frame's width, centered. All three Name tracks identical width and thickness; fill exactly one third, denim #155579. Keep every word, input, button, header and all vertical positions on Name unchanged. No goal UI in output. Output same THREE Name frames, same dimensions as first image. Do not add any new elements.


Built-in ImageGen tool. No CLI fallback. Existing mockups were attached as image references. Earlier variants remain in the generated-images directory; the review uses the selected corrected results.

## Shared first-pass prompt

Use case: ui-mockup. Revise this existing OKAYKABA? first-run UI board, preserving its selected Option 1 visual direction. This is ONE coherent flow, not alternative designs. Create realistic production-quality UI mockups, strong hierarchy, purposeful spacing. Each mobile content frame represents 390 x 844 logical pixels; place them side by side on a flat light-neutral review sheet with short state captions ABOVE frames. App content only: no phone hardware, status bar, notch, home indicator, perspective or device shadows. Match the attached existing board: very pale cream/pink top-left, periwinkle middle, aqua lower background; dark navy #10182D headings; muted navy body; solid denim #155579 primary buttons (no button gradients); Plus Jakarta Sans; translucent white surfaces with fine borders, restrained radius. Body 16px. Use consistent 48px controls and line icons. No mascot or extra illustrations. The orb is only used on mood/breathing screens. Date anchor November 19 2026 if dates appear. Ensure all text and every control fits; no cropped content. Never fabricate working backend claims: these are proposed states.
PENDING POLICY: primary request is disabled with spinner. Form inputs unavailable while pending. Back, mode switches, and Skip are replaced by ONE enabled outlined 'Leave this request' action, helper 'Leaving stops this screen from updating.' Its navigation is specified separately; do not draw active mode switches while pending. After error restore controls. No long blocking wait and no fake percent.
SETUP HEADER applies ONLY to Name, Practice and Goal, never to authentication or completion. Authentication screens must have NO Skip, NO step counter, NO progress track, NO Demo label. For setup screens ONLY: brand centered; back left; Skip right. Progress track exactly 180px wide, 6px high, centered, at same y-position on all 3 setup steps; text Step 1 of 3 / Step 2 of 3 / Step 3 of 3. Filled 1/3, 2/3, 3/3 indicates position, not loading. Mode caption 'Demo · This device' or 'Account setup'. IMPORTANT: Do not invent a Skip or progress tracker on any authentication, verification, change-email or completion screen. Their states are not numbered setup steps.

## 03-create-account-states.png

Reference: 03-create-account-states.png

Four frames: Create account / Validation / Creating account / Request error. Retain idle email/password labels, helper At least 8 characters, Privacy and Terms, account sync copy from reference. Idle has Back, Create account, Sign in, Try the demo. Validation has invalid email alex@ and password short with explicit rust error text; keep values. Pending uses alex@example.com concealed password and disabled Creating account…; remove all Back, Sign in and Demo actions, replace with Leave this request and its helper. Error: 'We couldn't confirm account creation. Try signing in or checking your email before trying again.' Actions 'Sign in', 'Check verification', Try the demo and Back are enabled; NO automatic duplicate sign-up retry. Avoid revealing whether address exists.

## 04a-email-verification.png

Reference: 04-email-verification.png

Four frames: Awaiting verification / Checking / Still pending / Check failed. Header back and brand. Email destination alex@example.com. First: 'Check your email', 'Open the link we sent to alex@example.com.', primary Check verification; secondary Resend email; Change email text. helper Check spam if you don't see it. Checking: spinner Checking verification… disabled; ONE Leave this request action, no resend/change/back actions. Still pending: 'Your email isn't verified yet. Open the email link, then check again.' Keep Check verification, Resend email, Change email. Check failed: rust text 'We couldn't check verification. Check your connection and try again.' Retry check primary, Change email and Back restored. No practice-mood footer.

## 04b-change-email-and-links.png

Reference: 04-email-verification.png

Four frames: Change pending email / Email updated / Expired link / Verified. First dedicated screen heading Change email; 'Update the address for this pending account.' current address alex@example.com as text, persistent New email label and input alex.student@example.com. Primary Update email; Back. Small helper 'Your current address stays until the change is accepted.' Second confirmed 'Verification email requested' 'Open the link sent to alex.student@example.com.' primary Check verification, Resend in 30s disabled, Change email. Third 'This link has expired' primary Send a new link, Change email, Back to sign in. Fourth 'Email verified' and 'Continue to set up your account.' primary Continue to setup. No new sign-up form. No decorative faces. Distinguish accepted request from actual inbox delivery.

## 05-sign-in-states.png

Reference: 05-sign-in-states.png

Four frames Sign in / Invalid credentials / Signing in / Verification needed. Preserve email/password and Forgot password, Create account, Try the demo on idle and invalid. Generic invalid email or password error text. Pending remove Back, Forgot password, Create account, Demo: only spinner disabled Signing in… and active Leave this request with helper. Last show 'Verify your email to continue.' primary Open verification; secondary Edit sign-in email and Back to sign in. Do NOT label editing credential field as Change email because that means modifying pending account address in separate flow.

## 07-preferred-name.png

Reference: 07-preferred-name.png

Three frames Blank is allowed / Name entered / Neutral greeting preview. Use shared setup header all three Step 1 of 3, Demo · This device, identical 180px progress track. Heading What should we call you? Helper A first name or nickname is enough. Field label Preferred name (optional). Frame1 blank input Your name; ENABLED Continue, helper 'Leave blank for a neutral greeting.' Frame2 input Alex enabled Continue. Frame3 blank optional input, helper 'No name? That's okay. You'll see “Welcome” instead.' ENABLED Continue. Skip at top of all three. No error red borders or validation for omission. Footer Edit this later in Account. Consistent positions across frames.

## 08-practice-mood.png

Reference: 08-practice-mood.png

Three frames No selection / Low selected / Good selected. Use EXACT shared setup header and 180px centered progress bar Step 2 of 3, Demo · This device. Heading How are you feeling? helper Try a check-in. This one won't be saved. Center same iridescent glass orb; first empty, second yellow face closed eyes/frown Low, third yellow closed curved eyes/small smile Good. Mood labels Low Meh Okay Good Great with comfortable 48px tap cells. First no selected option, Continue disabled, helper Choose a mood or Skip. Other frames selected pill matches Low or Good, Continue enabled. Skip and Back always visible. No real mood history in practice.

## 09-optional-goal.png

Reference: 09-optional-goal.png

Three frames No goal / Goal selected / Saving locally. First two same shared setup header Step 3 of 3 Demo · This device, 180px track. Heading What would help right now? Optional. Choose one to guide your shortcuts. Three choices Handle school stress / Understand my moods / Make time for myself with graduation cap / face / lotus line icons and radios. None or second selected. Finish setup enabled with or without goal; Skip top. Third keep Step 3 of 3, remove back/Skip, heading Saving setup on this device, subtle spinner, disabled Saving… plus Leave this request and helper Leaving stops this screen from updating. No fake percentage. Changes aren't complete until device save succeeds.

## 10-account-and-demo-completion.png

Reference: 10-completion-and-first-today.png

Create FIVE frames same 390x844 each, wide sheet: Device save failed / Account sync pending / Account synced / Account sync failed / Demo ready. No need to draw Today or any new app screens. Frame1 'Couldn't save setup' 'Your choices are still here.' Retry save primary, Back to setup secondary; mark Account setup. Frame2 'Saved on this device' 'Account sync is still pending. You can continue while it finishes.' subtle spinner near text, Open Today primary and Review setup secondary. Frame3 'Setup synced' 'Your account setup is saved to your account.' check icon, Open Today, Review setup. Frame4 'Saved on this device' rust status 'Account sync failed. Your setup is still available here.' Open Today primary, Retry sync secondary, Review setup text. Frame5 Demo · This device, 'You're ready' 'Demo data stays on this device. It isn't synced to an account.' Open Today primary, Review setup secondary. No fabricated % or claim journal upload. No sync spinner on demo. All frames legible.

## 11-keyboard-and-large-text.png

Reference: 07-preferred-name.png

Three frames: Keyboard open / Large text name / Large text practice. Same Option1 style. First show Android-style letter keyboard as schematic native keyboard lower 280px; field Preferred name(optional) with Alex focused and label fully visible; Step1 of3 same 180px track; Continue button PINNED immediately ABOVE keyboard, no bottom dock. Heading What should we call you? can scroll. Second enlarged text 200% body scenario, Step1of3; single column scroll layout, heading wraps naturally, optional name label wraps, blank input, Continue at bottom, no clipped text. Small visual scroll cue, no keyboard. Third 200% body scenario Step2of3; How are you feeling? heading, unsaved practice explanation, compact EMPTY glass orb, mood controls wrap into 2 columns over 3 rows with last Great fullwidth if needed; unselected; Continue disabled with choose mood helper and Skip active. Entire content scrollable with CTA separated below, no clipping/overlap. Caption may say 'Scrollable · enlarged text' outside frame. No fixed content height forcing all large text above fold. Each frame logical 390x844, preserve a useful viewport and indicate more content by scroll position not clipped words.

## Targeted correction prompts

### 03-create-account-states.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Remove EVERY top-right Skip action from EVERY frame. Remove ALL progress bars and ALL Step x of 3 labels from ALL frames. These are authentication or completion screens, never numbered setup steps. Leave that area clean or reflow the main content upward gently. Keep brand at top. Remove ALL 'Demo · This device' labels from authentication frames. In completion only, keep demo label ONLY in the last Demo ready frame; keep Account setup in the first four completion frames. Do not add any new progress, skip or percentages anywhere.
In any request pending frame remove top Back arrow, bottom Back, and mode switching actions. Keep only Leave this request as active navigation; spinner/pending action stays. Replace helper 'Leaving stops this screen from updating.' with 'This may still finish after you leave.' Any idle/error Back stays.


### 04a-email-verification.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Remove EVERY top-right Skip action from EVERY frame. Remove ALL progress bars and ALL Step x of 3 labels from ALL frames. These are authentication or completion screens, never numbered setup steps. Leave that area clean or reflow the main content upward gently. Keep brand at top. Remove ALL 'Demo · This device' labels from authentication frames. In completion only, keep demo label ONLY in the last Demo ready frame; keep Account setup in the first four completion frames. Do not add any new progress, skip or percentages anywhere.
In any request pending frame remove top Back arrow, bottom Back, and mode switching actions. Keep only Leave this request as active navigation; spinner/pending action stays. Replace helper 'Leaving stops this screen from updating.' with 'This may still finish after you leave.' Any idle/error Back stays.


### 04b-change-email-and-links.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Remove EVERY top-right Skip action from EVERY frame. Remove ALL progress bars and ALL Step x of 3 labels from ALL frames. These are authentication or completion screens, never numbered setup steps. Leave that area clean or reflow the main content upward gently. Keep brand at top. Remove ALL 'Demo · This device' labels from authentication frames. In completion only, keep demo label ONLY in the last Demo ready frame; keep Account setup in the first four completion frames. Do not add any new progress, skip or percentages anywhere.
In any request pending frame remove top Back arrow, bottom Back, and mode switching actions. Keep only Leave this request as active navigation; spinner/pending action stays. Replace helper 'Leaving stops this screen from updating.' with 'This may still finish after you leave.' Any idle/error Back stays.
On second frame DELETE footer 'This confirms your new email address for your account.' Replace it with 'Verification is still required.' Do not assert verification until final Email verified frame.

### 05-sign-in-states.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Remove EVERY top-right Skip action from EVERY frame. Remove ALL progress bars and ALL Step x of 3 labels from ALL frames. These are authentication or completion screens, never numbered setup steps. Leave that area clean or reflow the main content upward gently. Keep brand at top. Remove ALL 'Demo · This device' labels from authentication frames. In completion only, keep demo label ONLY in the last Demo ready frame; keep Account setup in the first four completion frames. Do not add any new progress, skip or percentages anywhere.
In any request pending frame remove top Back arrow, bottom Back, and mode switching actions. Keep only Leave this request as active navigation; spinner/pending action stays. Replace helper 'Leaving stops this screen from updating.' with 'This may still finish after you leave.' Any idle/error Back stays.


### 08-practice-mood.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. First image is edit target; second image is the approved HEADER GEOMETRY reference only. Change all headers of target to match second image's Name headers: Back left and Skip right on idle, centered brand, Demo · This device UNDER BRAND, then a centered 180px track (46% of each frame's width) at exactly same vertical position as name reference, then Step 2 of 3. Track fill two thirds, solid denim #155579, no bright electric blue. Keep existing target main content and mood expressions unchanged. For goal's third saving panel: no Back and no Skip; brand/mode/track geometry matches idle; Leave this request helper becomes 'This may still finish after you leave.' Do not introduce any auth labels.

### 09-optional-goal.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. First image is edit target; second image is the approved HEADER GEOMETRY reference only. Change all headers of target to match second image's Name headers: Back left and Skip right on idle, centered brand, Demo · This device UNDER BRAND, then a centered 180px track (46% of each frame's width) at exactly same vertical position as name reference, then Step 3 of 3. Track fill full, solid denim #155579, no bright electric blue. Keep existing target main content and mood expressions unchanged. For goal's third saving panel: no Back and no Skip; brand/mode/track geometry matches idle; Leave this request helper becomes 'This may still finish after you leave.' Do not introduce any auth labels.

### 10-account-and-demo-completion.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Remove EVERY top-right Skip action from EVERY frame. Remove ALL progress bars and ALL Step x of 3 labels from ALL frames. These are authentication or completion screens, never numbered setup steps. Leave that area clean or reflow the main content upward gently. Keep brand at top. Remove ALL 'Demo · This device' labels from authentication frames. In completion only, keep demo label ONLY in the last Demo ready frame; keep Account setup in the first four completion frames. Do not add any new progress, skip or percentages anywhere.
In any request pending frame remove top Back arrow, bottom Back, and mode switching actions. Keep only Leave this request as active navigation; spinner/pending action stays. Replace helper 'Leaving stops this screen from updating.' with 'This may still finish after you leave.' Any idle/error Back stays.
Remove extraneous default top Back arrows from completion frames as well. Retain the explicit Retry save/Back to setup/Open Today/Review setup/Retry sync buttons already present. Success check should be denim rather than green.

### 11-keyboard-and-large-text.png

Edit this existing UI board precisely. Keep its frame count, palette, all main content, typography and layout. This is the same OkayKaba first-run flow, not a new design. Each frame 390x844 logical content, no device hardware or OS status bar. Change ONLY third enlarged-text practice frame: replace 'This is a practice request. Your response won't be saved.' with 'Try a check-in. This one won't be saved.' Replace first mood label Not great with Low and its face with a frown. Replace A bit down with Meh and its face with a slight frown. Keep Okay, Good, Great, use corresponding mood faces, NOT a star for Great. All five must match Low, Meh, Okay, Good, Great exactly. Keep two-column wrapping and large text, no emoji duplication. First keyboard frame keep Continue above keyboard. Second and third keep scrollability. Do not change the first two frames.

## Final text corrections

### 04a-email-verification.png

Edit only one text label in this existing four-panel UI board. In FOURTH rightmost panel, beneath OKAYKABA?, replace 'Demo · This device' with 'Account setup'. Preserve everything else in all four panels exactly. No other text changes, no layout changes, no new buttons, no progress tracks.

### 05-sign-in-states.png

Edit two text labels only in this existing four-panel UI board. In FOURTH rightmost panel beneath OKAYKABA?, replace 'Demo · This device' with 'Account setup'. Above FIRST panel replace caption 'Sign in (Step 1 of 3, idle)' with 'Sign in'. Preserve all other content and every action exactly. No new controls, no progress trackers, no Skip.

### 08-practice-mood.png

Edit ONLY THIRD rightmost frame in this existing three-panel practice-mood board. Add top-left Back arrow and top-right Skip in the identical positions to first and second frames. Replace helper 'This may still finish after you leave.' above Continue with 'Practice only · No mood record is created'. This is an idle Good-selected practice, no network request. Preserve ALL other content including faces and mood labels, existing progress bar, colors, dimensions, no other changes.
