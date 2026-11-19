# Final design handoff · ImageGen prompts

## 02-sign-up-and-sign-in-recovery.png

Reference: full-app-design/01-opening-and-email.png

Make one landscape OkayKaba storyboard. Mobile content only, equal full-height 390×844 portrait frames with short external captions, no phone hardware or status bars. Exact approved dark visual language from the supplied reference: near-black #111820, #1C2632, white text, light denim #90BEDF controls, subtle outline, Plus Jakarta Sans-style hierarchy. Auth is a pushed flow without bottom dock, illustrations or orb. Error meaning always written, pale coral only if useful. Back arrow only where specified. Keep text concise and legible at phone sizes.
Exactly 5 framed screens: (1) 'Sign-up validation': Back above Create an account. Email with alex@ plus inline “Enter a valid email address.” Password with field and “Use at least 8 characters.” Primary Create account. (2) 'Creating account': no Back, disabled email and masked password fields then muted “Creating account…” and enabled “Leave this request”. Helper “This may still finish after you leave.” (3) 'Sign-up outcome uncertain': Back, heading “Couldn’t confirm account creation”, helper “Check your email or sign in before trying again.” filled Sign in, outlined Check verification. (4) 'Sign-in error': Back, heading Sign in, labeled Email and masked Password, single generic error “Email or password is incorrect.” filled Try again and text Forgot password? (5) 'Signing in': no Back, Sign in, disabled email and masked password fields, muted “Signing in…” and active “Leave this request”. Show all five panels, no duplicated screens.

## 03-verification-recovery.png

Reference: revised-first-run-flow/v7-first-run-bridges/02-dark-change-email.png

Make one landscape OkayKaba storyboard. Mobile content only, equal full-height 390×844 portrait frames with short external captions, no phone hardware or status bars. Exact approved dark visual language from the supplied reference: near-black #111820, #1C2632, white text, light denim #90BEDF controls, subtle outline, Plus Jakarta Sans-style hierarchy. Auth is a pushed flow without bottom dock, illustrations or orb. Error meaning always written, pale coral only if useful. Back arrow only where specified. Keep text concise and legible at phone sizes.
Exactly five panels. (1) Checking: header Verify email, heading “Checking verification…”, simple pending icon, only enabled “Leave this request”, no passive hardware Back icon. (2) Still pending: Back, heading “Email not verified yet”, “Open the link in your email, then check again.” filled Check verification, outlined Resend email, text Change email. (3) Check failed: Back, “Couldn’t check verification”, “Check your connection and try again.” primary Retry check, secondary Back to verification. (4) Expired verification link: Back, “This verification link expired”, “Request a new link to continue.” primary Send a new link, secondary Back to sign in. (5) Verified without session: heading “Email verified”, “Sign in to continue.” primary Sign in. No ‘continue to setup’ in the no-session case.

## 04-password-link-and-access-recovery.png

Reference: revised-first-run-flow/v7-first-run-bridges/03-dark-password-recovery.png

Make one landscape OkayKaba storyboard. Mobile content only, equal full-height 390×844 portrait frames with short external captions, no phone hardware or status bars. Exact approved dark visual language from the supplied reference: near-black #111820, #1C2632, white text, light denim #90BEDF controls, subtle outline, Plus Jakarta Sans-style hierarchy. Auth is a pushed flow without bottom dock, illustrations or orb. Error meaning always written, pale coral only if useful. Back arrow only where specified. Keep text concise and legible at phone sizes.
Exactly five panels. (1) Expired reset link: Back, heading “This reset link expired”, primary Request a new link plus Back to sign in. (2) New password: Back, “Choose a new password”, persistent New password label with masked dots, “Use at least 8 characters.” primary Update password. (3) Updating password: “Updating password…”, disabled field and disabled submit, active Back to sign in, no success claim. (4) Password updated: clean success check, heading “Password updated”, “Sign in with your new password.” primary Sign in. (5) Change email session expired: Back, “Sign in to continue”, “Sign in again to change your email.” primary Sign in, secondary Back to welcome. No pending panel tells the user that a request was undone.

## 05-today-activity-entry.png

Reference: today-check-in/02-saved-and-error.png

Make one landscape OkayKaba storyboard. Mobile content only, equal full-height 390×844 portrait frames with short external captions, no phone hardware or status bars. Exact approved dark visual language from the supplied reference: near-black #111820, #1C2632, white text, light denim #90BEDF controls, subtle outline, Plus Jakarta Sans-style hierarchy. Auth is a pushed flow without bottom dock, illustrations or orb. Error meaning always written, pale coral only if useful. Back arrow only where specified. Keep text concise and legible at phone sizes.
Create one static board with three panels. Same approved dark Today screen in all three: title Today, Fri Nov 20, compact saved Good check-in orb card, Your week with exactly six empty rings and a Good face on Friday 20, four-tab dock Home, Insights, Calendar, Account with only Home labeled. Under Your week show a horizontal activity strip with large easy to scan cards, each with a line icon and title, two cards complete and a subtle next-card edge hint when appropriate. Three views of the same strip at different scroll offsets: panel 1 shows Journal and Self-care, plus an edge of To-do; panel 2 shows To-do and Daily Inspiration; panel 3 shows Daily Inspiration and Talk it through, with no fake additional card beyond it. No status bar or other UI decoration. External captions “Start of activity row”, “More activities”, “End of activity row”.

## Reset request and verification resend

One five-screen landscape board of dark OkayKaba auth recovery in the same visual system as this reference. Clean cropped app frames without device bezel or bottom dock. Title 24–28 semibold and light denim buttons on #111820. 1 Fogot password form: title “Forgot password?”, label Email, empty email input, “Send reset link”, secondary “Back to sign in”. 2 Resend in progress: title “Requesting a new link…”, subdued pending status, active “Leave this request”, no other action. 3 Resend accepted: title “Check your email”, text “A new verification link was requested.” primary “Check verification”, disabled status “Resend temporarily unavailable”. 4 Resend request failed: title “Couldn’t request a new link”, text “Check your connection and try again.” primary “Try again”, secondary “Back to verification”. 5 Verified with session: title “Email verified”, text “You can continue setting up your account.” primary “Continue to setup”. Keep copy exact. No fake delivery claims or progress percentages.

## Finishing edits

In the THIRD screen only, replace the two sentences under “Updating password…” with “The request may still finish after you leave.” Replace the exclamation icon on that same screen with a small neutral indeterminate spinner icon. The Back to sign in action remains enabled. Keep the exact geometry and content of the other four screens, with no other changes.

On the THIRD frame only, replace the small text 'A safe space to share' under the Talk it through card with 'Find support'. Keep all other text, imagery, screens and layout exactly the same. This destination currently offers resources rather than live chat.
