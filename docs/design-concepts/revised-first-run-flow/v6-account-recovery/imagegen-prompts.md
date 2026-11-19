# Account-choice revision prompts

Reference: ../v5-dark-account/03-account-choice.png

## Shared direction

Use case: ui-mockup. Precisely revise the attached existing OkayKaba account-choice mockups. ONE coherent design, not alternate concepts. Preserve approved dark palette, default typography, layout hierarchy, button order and shapes: background #111820, main text #F2F5F8, secondary #B5BFCA, surface #1C2632, boundary #617080, light-denim #90BEDF with dark text. Plus Jakarta Sans. Restrained default headline24–28 logical px semibold, body16–17, readable labels, no giantboldposterheadings. Preserve original welcome header and generous spacing but allow modest vertical tightening for helper text.
Each content frame represents390x844 logical pixels, framed side by side at equal scale on a flat neutral review canvas, short state captions above. No device hardware/status bar/notch/homeindicator/browserchrome. No mascot/orb/moodart/greenpalette/no Apple/Facebook/X. No progressbar/Skip onauth. No marquee. DateanchorNov19 2026 if needed.
ALL frames use exact header smallbrand OkayKaba, heading Welcome to OkayKaba, subtitle A space to check in with yourself. Same control slots and readablePrivacy · Terms atbottom.
IDLE/RESTORED action order, EXACT labels: white fullwidth Continue with Google button with standard multicolor G; divider or continue with email; denim Sign up with email; outlined Sign in with email; text Try the demo; helper immediately underneath No account needed. Providerbutton brandappearance stays recognizable, G not recolored. NoGmailprovider separate. No fake successful login.
Outside app frames in board footer: Authentication concept — configuration and verification pending. Never put setup/configuration technical copy inside the product screen.

## 01-idle-opening-cancelled.png

THREE frames in order Idle / Opening Google / User cancelled.
IDLE: above exact actions, normal Back top-left to previousWelcome.
OPENING: keep action slots fixed. Googlebutton becomes disabled spinner Opening Google…; helper Finish sign-in with Google. Emailbuttons and Trydemo visibly unavailable, exact updated email labels and Noaccountneeded helper retained. Add active outlined Cancel action below actiongroup. No topBack arrow, Cancel is clear enabled exit. Allcopyfits withoutoverlap, footerprivacyreadable.
USER CANCELLED: restore same complete accountchoice actions and topBack as idle. Add quiet neutral inline feedback belowGooglebutton: Google sign-in cancelled. Choose how to continue. NOredalert and NOclaimnothingchangedatserver. SameGooglebuttonandemail/demo actions enabled. The cancelledframe is the restored accountchoice screen, not another blocking confirmation. NoClose/Continueconfirmation button. Preservedefaultfont sizes andbuttonhierarchy.

## 02-failure-stalled.png

TWO frames in order Connection failure / Stalled handoff.
CONNECTION FAILURE: complete RESTORED accountchoice layout withGooglebutton Continue with Google, updated emailactions Sign up with email and Sign in with email, Try the demo plus No account needed. TopBack active. Inlinecoralerror underGoogle: Couldn’t connect to Google. Try again or use email. No successfulsigninclaim. Retry uses the same Continue with Google button, no duplicate socialbutton.
STALLED HANDOFF: keep exact same controls/slots as OpeningGoogle state fromreference. Googlebuttondisabled with staticclocklineicon and Waiting for Google… (not a constantlyrotatingspinner). Status under it Taking longer than expected. Further helper Cancel to choose another way to continue. Updatedemail/demoactions unavailable untilCancel; showNo accountneeded underTrydemo consistently. One active outlinedCancel action. No topBackarrow; AndroidBackwillfollowCancel via separate notes. No arbitrarycounter/percentage. No automaticretry, no hiddenparallelrequest. CancelrestoresIdle and personcanthenretryGoogleorchooseemail/demo. Preservelegibilityandverticalclearance.
