# Account choice — cancellation and recovery revision
19 November 2026 · First-run only · Mockup proposal

## Scope
Revise only account-choice labels, demo helper and Google handoff recovery. The approved dark palette, default typography, layout hierarchy and button order remain fixed. Google authentication is not configured or verified by this design work.

No app code is changed and nothing is committed or pushed to GitHub. The prior first-run screens and the following demo storage explanation remain unchanged.

## Exact action order
1. Continue with Google.
2. Sign up with email.
3. Sign in with email.
4. Try the demo, immediately followed by No account needed.

Privacy and Terms remain readable document links. The Google G retains provider branding; no other social providers or separate Gmail option are added.

## Five distinct screen states
| # | State | Visible feedback | Available recovery |
| --- | --- | --- | --- |
| 1 | Idle account choice | No pending or error message; all account/demo choices available | Select Google, email or demo; normal Back returns to the preceding Welcome |
| 2 | Opening Google | Opening Google… and external-flow instruction; competing choices unavailable | Cancel, or Android Back in the handoff context, restores account choice |
| 3 | User cancellation | Google sign-in cancelled. Choose how to continue. Neutral inline status; all choices restored | Retry Google, choose email, or enter the existing demo explanation; no confirmation screen |
| 4 | Connection failure | Written inline error near Google; all choices restored | Continue with Google starts one fresh attempt; email/demo remain alternatives |
| 5 | Stalled handoff | Waiting for Google… and Taking longer than expected; no fabricated percentage | Cancel returns to account choice; then choose Google/email/demo explicitly |

The stalled state does not silently start another Google request. No account success is inferred from elapsed time or an opened provider window.

## Back and Cancel contract
- On the app's Opening Google and Stalled screens: Android Back has the same outcome as Cancel. Invalidate the active handoff before restoring choices.
- When the external Google surface owns focus: its system Back/dismissal returns to OkayKaba and restores account choice as a neutral cancellation, not a connection error.
- Merely foregrounding the app while the provider flow is still open is not proof of cancellation or failure. Keep a valid pending state or offer the stalled recovery according to actual provider/transport events.
- After cancellation: display the restored choice layout with brief neutral feedback. Do not add a blocking “Confirm cancellation” page.
- Normal Back on idle/cancelled/error account choice returns to the existing preceding Welcome. It does not replay breathing or imply a provider transaction was undone.
- Cancel abandons this attempt's app-side intent; it must not promise that a server-side operation could never complete.
- A confirmed accepted session moves forward by the existing first-run rules. Subsequent Back cannot reopen stale login/onboarding. The account branch is not itself a new screen design beyond first-run.

## Preventing late responses from overriding demo
This is an intended behavior specification, not an implementation claim.

1. A Google attempt has a unique identity associated with the current account-choice intent.
2. Cancel, provider dismissal, connection-failure completion, leaving the flow, and switching intent invalidate the abandoned attempt before another route becomes active.
3. A new Google retry gets a new attempt identity; only one active external handoff exists.
4. Accept a callback only when it belongs to the still-current attempt and the person still intends account mode.
5. An old result cannot route into account setup, replace a newer mode choice, change the demo storage context, or import/upload journal or mood data.
6. If an SDK persists an unexpected late session, reconcile/clear/quarantine it without activating account mode or modifying demo content. Exact mechanics require SDK/backend verification later.
7. Do not delete a user account or reset credentials to recover from this race.
8. If the person cancels and chooses demo, any later use of an account requires a fresh explicit account action.

## Recovery transitions
Idle → Google → Opening.
Opening → explicit cancellation/dismissal → Cancelled account choice.
Opening → confirmed launch/network failure → Connection failure.
Opening → prolonged unresolved handoff → Stalled.
Stalled → Cancel/Android Back → Cancelled account choice.
Cancelled/Connection failure → Continue with Google → one new Opening attempt.
Cancelled/Connection failure → email action → existing email form.
Cancelled/Connection failure → Try the demo → existing device-storage explanation.
Only a valid current accepted session can advance through the account branch.

“Try again” in the connection-error sentence refers to the existing Continue with Google action. Do not add a duplicate provider button.

## Demo privacy
No account needed explains only entry eligibility. It does not claim encrypted storage, backups, cloud availability or server privacy. The next existing demo screen must still explain device-only storage, lack of account sync/backup and explicit later import. Do not enter demo immediately or upload anything from this account-choice tap.

## Focus and accessible feedback
- Give Google, both email actions, demo, Cancel, Back, Privacy and Terms distinct accessible names. Use the visible email-specific names.
- Announce opening, cancellation, failure and stalled feedback once, with status/error semantics appropriate to the state.
- On return to account choice, restore focus predictably to the heading or Google action; do not force a new external provider launch.
- Disabled competing controls are semantically unavailable. Keep Cancel clearly enabled in opening and stalled states.
- Error meaning uses written text as well as color. Neutral cancellation does not use failure styling.
- Preserve user text scaling and scrolling; no marquee, fixed-size shrink-to-fit or new enlarged-text preview is introduced here.
- Opaque dark surfaces remain the fallback for transparency/contrast needs. Reduced motion may replace the opening spinner with stable descriptive text; the stalled status is static.

## Prototype verification still required
- Android Back on the app screen and actual Google surface.
- Provider dismissal, connection failure, stalled return, rapid taps and one-active-attempt behavior.
- Cancel → demo → delayed success/failure callback; no mode override or personal-record import.
- Cancel → retry Google → old callback; only the current attempt can advance.
- Valid session/profile routing, persistent-session side effects and sign-out.
- Focus restoration, TalkBack, real font scaling, targets, contrast and safe areas.

No Google window or real account request is opened for these mockups. Use an approved provider button asset when implementing; generated logo/type are not a production asset or a brand-compliance sign-off.

## Review boundary
Review the five mockup states and this contract. No other first-run screens, Today, Journal or Mood Calendar are changed. App implementation and GitHub updates remain outside this request.
