# Review the revised first-run flow

**Revision 2 · Option 1 · Mockups only**

[Navigation and state notes](navigation.md) · [Audit](audit.md) · [ImageGen prompts](imagegen-prompts.md)

Start with the screens below in order. Account verification and recovery are branches; everyone reaches the same short setup in the selected account or demo mode.

**Splash → optional breath → Welcome → Account/Demo → Name → Practice → Goal → Save → Ready → Open Today**

Pending actions have one explicit exit, optional name accepts blank Continue, and completion distinguishes device saving from cloud syncing. These are proposed interaction states, not a working prototype.

## 1. Opening and optional breathing

Start begins breathing; Pause freezes it; Skip opens Welcome. Back stops the cue.

![Opening and optional breathing](01-opening-breath.png)

## 2. Welcome and demo choice

Resume or take the reduced-motion route. Choose Create account, Sign in, or an explicitly device-only demo.

![Welcome and demo choice](02-paused-welcome-demo.png)

## 3. Account creation

Field validation, pending request, and uncertain failure. Leave before switching mode; do not duplicate account creation.

![Account creation](03-create-account-states.png)

## 4. Verification checking

Awaiting → checking → still pending or failed. A tap alone cannot verify an account.

![Verification checking](04a-email-verification.png)

## 5. Change email and link outcomes

Update a securely authorized pending account; show new destination only after acceptance. Recover expired links; continue after actual verification.

![Change email and link outcomes](04b-change-email-and-links.png)

## 6. Sign-in

Idle, invalid credentials, pending, and verification-needed branches. Editing credentials is separate from changing an account address.

![Sign-in](05-sign-in-states.png)

## 7. Password recovery

Validation, request acceptance, expiry, new password, and successful update. Shared pending policy applies.

![Password recovery](06-password-recovery.png)

## 8. Optional preferred name

Blank Continue and Skip both use a neutral greeting. No empty-name error.

![Optional preferred name](07-preferred-name.png)

## 9. Unsaved practice

Select a mood or Skip. Practice never enters history. Back returns to Name.

![Unsaved practice](08-practice-mood.png)

## 10. Optional goal and local save

Finish without a goal or Skip. Pending save exposes Leave this request, with no competing Back/Skip.

![Optional goal and local save](09-optional-goal.png)

## 11. Completion and sync outcomes

Device failure, account pending/synced/failed, and demo ready are distinct. Open Today is available after successful device saving.

![Completion and sync outcomes](10-account-and-demo-completion.png)

## 12. Keyboard and enlarged text

Continue above keyboard; scrollable enlarged text; wrapped mood choices. Runtime accessibility remains untested.

![Keyboard and enlarged text](11-keyboard-and-large-text.png)

## Design review

Please review the first-run order, the request-exit wording, and the separate account/demo privacy messages. The audit records remaining visual or state-coverage limitations. No Today save-state, Journal, or Mood Calendar redesign has started.
