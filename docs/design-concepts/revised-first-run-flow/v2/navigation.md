# OkayKaba first-run flow — revision 2
Mockups for design review · 19 November 2026 · Selected Option 1 direction

This folder is a new revision. The earlier mockups and audit remain intact. The screen boards depict intended interaction states; no application or authentication code was changed.

## Route
Splash → optional breathing invitation → Welcome → Account or Demo → Preferred name → Practice mood → Optional goal → Device save → Ready → Open Today.

Account creation branches through email verification before setup. Sign-in goes to Today if setup is complete, or resumes the first incomplete setup step. Password recovery returns to sign-in. Practice never creates a mood record.

## Design contract
- Option 1: pale cream/periwinkle/aqua background, dark navy text, denim primary actions, translucent white supporting surfaces, Plus Jakarta Sans. Preserve the existing yellow mood expressions and glass orb.
- Mobile content frames represent 390 × 844 logical pixels. Generated raster art is a visual reference; exact geometry is governed by these notes.
- Setup header: Back left, brand centered, Skip right; mode underneath; centered 180 × 6 logical-pixel progress track; Step N of 3. Fill marks current step position, not completed work or loading percentage.
- Progress, input, and button components have one shared specification across Name, Practice, and Goal. Enlarged text may reflow the header; it must not collide with controls.
- Body text baseline 16; targets at least 48 logical pixels in the Android design specification. These are targets to verify later.
- Demo mode says “Demo · This device.” Account setup says “Account setup.” Device-only privacy copy must never appear as a general claim about account data.

## Request navigation policy
During create-account, sign-in, verification check, resend, address update, reset request, password update, and device setup saving:
1. Show one pending action with a spinner and descriptive text. Disable repeat submission and editing conflicting fields.
2. Hide ordinary Back, Skip, and mode-changing links. Expose one enabled “Leave this request” action. Android Back invokes that same action.
3. Leaving is immediate: return to the initiating editable screen in a neutral state. It invalidates that screen's pending navigation. It does not promise to reverse a server operation or device write.
4. Never let a late result redirect the person into a different mode. To switch to Demo: Leave → form → Try the demo → demo explanation → Continue in demo. This takes an explicit choice and never uploads demo data.
5. For account creation, show “The request may still finish. Check your email or sign in before trying again.” before allowing another creation attempt. If a session arrives after leaving, do not use it to change the selected demo context.
6. For sign-in, a late successful session must not activate account mode after Demo was chosen. End or quarantine that session before further account actions. This is a required implementation behavior to verify later.
7. For device save, leaving returns to Goal with in-session choices retained. A completed write may exist, but it cannot force navigation; resume reconciles the saved setup.
8. A slow request remains escapable. A failed request restores editing and relevant navigation and explains the outcome. Use “We couldn't confirm…” when the result is uncertain.
9. Retry requires a new explicit action. It must not duplicate non-idempotent account creation or overwrite a newer email change.

## Board navigation and state notes

### 1. Opening and breathing
Start alone begins one guided breath. Skip to welcome bypasses or ends it. Pause freezes the visual cue; Resume continues. Android Back stops the cue and returns to the invitation. Completing the breath opens Welcome. No artificial splash delay, background audio, or continued animation after leaving.

Breathing is optional comfort guidance, not treatment. The proposed four-second inhale and six-second exhale remain reviewable timing choices. Reduced motion opens the static quiet-moment route instead; Continue to welcome is always available.

### 2. Welcome and demo
Create account → board 3. Sign in → board 5. Try the demo → device-storage explanation → Continue in demo → Name. Back to welcome returns without replaying breathing. Privacy is a readable document explaining demo storage, account sync, and explicit import separately.

Demo data is not synced to an account. Account import of mood/journal data will require an explicit choice in a later flow. No automatic import happens at sign-in.

### 3. Create account
Validate email and the stated password minimum before sending. Keep labels and specific field errors. Password visibility has Show password/Hide password labels. Keep passwords only in the active form, not persistent draft storage.

Accepted creation → verification. Uncertain failure offers Sign in and Check verification rather than blindly creating again. Check verification from an uncertain, unauthenticated outcome must ask the service for a safe status or offer a verification request; it must not disclose whether someone else's email exists or claim a session.

Pending and leaving follow the shared policy above. At idle Back → Welcome; Sign in preserves only email; Try the demo → explanation.

### 4a. Verification checking
Check verification inspects actual session/status. It does not accept the person's tap as proof.
- Checking → verified, still pending, or request failed.
- Still pending → open email link and check again.
- Request failed → Retry check; retain address.
- Resend → sending state → accepted confirmation and provider-governed cooldown, or inline recoverable error. The 30-second panel is sample cooldown copy, not a hard-coded provider rule.
- Change email → dedicated board 4b.
- Back → Sign in; it never creates another account.

### 4b. Pending-account email change and link outcomes
This is an authenticated/securely authorized pending-account address update, not a second sign-up form.
- Back from Change email → verification with the existing address.
- Invalid new address → field error; no request sent.
- Update email → pending policy → service-accepted update or inline failure.
- Keep the current address authoritative until the service accepts the update. On acceptance show the new destination and fresh verification requirement. Do not claim inbox delivery.
- Failed update retains the typed new address and explains that the prior address remains current.
- If authorization for pending-account changes is unavailable, offer return to sign-in or support rather than creating another account. Exact authorization is a backend dependency for later review.
- Expired link → request fresh link; success confirms the request; failure allows retry.
- Verified → setup only with a valid session. Verification in an external email app without an active session → Sign in with “Email verified. Sign in to continue.”

### 5. Sign-in
Invalid credentials receive one generic message. Pending follows the shared policy. Forgot password → Recovery with email carried over, never password. Verification needed → Open verification. “Edit sign-in email” edits credentials locally; it does not mutate a pending account address.

Successful sign-in routes by real setup status. Completed users bypass setup. Back → Welcome.

### 6. Recovery
Validate email, show sending, and confirm request acceptance generically. Do not equate accepted request with email delivery. Expired link offers a fresh request. New password uses conceal/reveal, validation, pending, and recoverable error. Show Password updated only after success; return to Sign in. Pending and leave controls use the shared request pattern even where not separately repeated on this retained board.

### 7. Preferred name
Preferred name is optional. Continue with blank or whitespace → Practice, using a neutral “Welcome” greeting. There is no empty-field error. Continue with Alex → Practice with that in-session display name. Skip has the same omission outcome.

Back → mode-appropriate Welcome with session retained; returning resumes values. No age/gender questions in first run. Edit those later in Account if desired.

### 8. Practice mood
Empty orb begins with no mood. Continue is unavailable until a choice; Skip remains available.
Low, Meh, Okay, Good, Great map to the same five expressions everywhere. Continue or Skip → Goal; Skip discards practice. Back → Name.
All practice selections stay outside real mood history and are discarded at completion. Reduced motion changes the expression without pulsing.

### 9. Goal and device save
Goal is optional and single-select. Finish setup works without selection; Skip clears the goal and starts the same save. Back → Practice.
After Finish or Skip, show device saving with Leave this request in place of Back/Skip. No percentages.
Device failure → choices retained, Retry save or Back to setup. Successful device save marks setup available locally. Account mode then attempts cloud sync; demo never does.

### 10. Completion and account sync
- Device save failed: cannot call setup complete. Retain choices; Retry save or Back to Goal.
- Account local save succeeded, cloud pending: Open Today is available. Show pending status honestly.
- Account sync confirmed: Setup synced. This claim covers setup preferences only, not journals or mood entries.
- Account cloud failure: Open Today remains available from local setup; Retry sync retries cloud work only. It must not silently upload demo records.
- Demo ready: device-only copy; no account sync spinner or cloud claim.
- Review setup, where offered → Name with choices retained; edits require another save. The cloud-pending panel offers Open Today; setup editing remains available later through Account. Open Today → the existing selected Today design. This pass does not create its later save states.
- Existing accounts retain actual history. New users have no real mood history. Practice must not populate it.
- Background sync updates status without stealing focus or redirecting. New edits must not be replaced by older successful requests.

### 11. Keyboard and enlarged text
Keyboard-open Name: field label and input visible; Continue immediately above keyboard. Scroll content rather than overlaying the field. Android Back first dismisses keyboard; a subsequent Back follows navigation.
Enlarged text: use scrollable content and wrapped headings; keep action reachable without shrinking text. Mood selection wraps into a two-column grid. The orb may shrink or move above the fold.
No floating app dock appears in onboarding. Keyboard layout is a mockup, not a verified system keyboard.

## Shared accessibility and privacy rules
Use named controls, selected states, visible focus, persistent labels, text errors, and status announcements. Move focus to the first invalid field, and to a new screen heading after navigation. Announce request outcomes once; do not announce every cooldown tick. Do not announce a decorative orb twice.

System reduced motion stops automatic scaling; static routes remain complete. Screen-reader users can skip breathing. Enlarged text and keyboard layouts must stay scrollable with safe-area clearance. Measure final contrast and target sizes in the eventual prototype.

These are design intentions, not verified authentication, storage, accessibility, or cloud-sync behavior. Privacy text must match the eventual implementation, including backups and data deletion. This revision concerns setup only; it does not implement consent documents or data import.

## Review boundary
The generated boards approximate geometry: progress-track widths and offsets still vary slightly. The shared 180 × 6 specification governs a later precision-design pass. Enlarged-text captions represent an intended scenario, not measured system font scaling. Some shared secondary errors are specified rather than separately drawn; see the audit for the remaining handoff checklist.

Review this first-run flow before any app implementation or remaining Today, Journal, or Mood Calendar state design.
