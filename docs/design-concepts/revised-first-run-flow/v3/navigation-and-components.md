# First-run refinement — revision 3
Design review only · 19 November 2026

This revision changes only three parts of Option 1: the shared setup header, enlarged-text mood choices, and Change email errors. The [revision 2 route](../v2/navigation.md) remains the flow baseline. No app source is edited. No Today save states, Journal, or Mood Calendar screens are designed here.

## What supersedes the earlier boards
- The shared-header board governs header geometry in Name, Practice, and Goal, including their previously drawn variants. Previous bar widths are superseded.
- The enlarged-text board supersedes revision 2's accessibility board for its mood-face treatment. Keyboard and optional-name behavior stay the same.
- The Change email error board supplements the existing normal, accepted-update, expired-link, and verified states. It does not create a new signup path.

## Shared setup component
All coordinates below are design targets in a 390 × 844 logical frame, not measurements inferred from generated images.

| Property | Value |
| --- | --- |
| Progress track | 180 × 6, centered; x=105, y=112 |
| Fill at Name | 60, Step 1 of 3 |
| Fill at Practice | 120, Step 2 of 3 |
| Fill at Goal | 180, Step 3 of 3 |
| Track background | Pale periwinkle |
| Fill | Denim #155579 |
| Header controls | Back left; centered brand; Skip right |
| Mode line | Demo · This device or Account setup |
| Role | Current step position, never loading or percentage of profile completed |

Use the same header container and spacing for all setup steps. Text enlargement can increase header height; move the entire component down with reflow rather than overlaying labels. In narrow layouts, a shared width constraint can reduce the track equally across all steps. Do not animate header width between steps.

Continue from Name accepts blank/whitespace and uses a neutral greeting. Continue from Practice requires a mood; Skip remains available. Finish setup works with no goal. Account and demo use identical setup controls with different storage messaging.

## Mood artwork and enlarged text
Use one asset set for Low, Meh, Okay, Good, Great. Expressions are semantic, not merely color:
- Low: closed/downturned eyes and frown.
- Meh: dot eyes and slight frown.
- Okay: dot eyes and straight mouth.
- Good: curved closed eyes and small smile.
- Great: curved closed eyes and open smile.

The yellow material, dark features, proportions and expression mapping must match the orb and each repeated mood choice. Reuse assets rather than substituting an outline icon or OS emoji. This board depicts that reuse; final raster mockups are not an export-ready sprite set.

At enlarged text sizes, let labels and rows grow. Use a wrapping two-column group, with Great on its own full-width row. Keep all five choices, selected state and Skip reachable by scrolling. Never reduce the chosen text size to fit a fixed card. Empty orb means no choice; selecting a mood updates the orb and selected state. Practice creates no real check-in or history record.

Keyboard-open Name keeps its label, focused field and Continue above the keyboard. Android Back dismisses the keyboard first. On the next Back, follow the existing route. There is no app tab bar on setup screens.

## Change email state and navigation contract
The pending account must be securely authorized. Changing an address edits that pending identity, not a new account.

| State | Trigger and content | Available action and destination |
| --- | --- | --- |
| Validation | Invalid new address; show field label and textual error; no request sent | Correct the field → Update email. Back → prior Verification screen. |
| Pending | Valid address submitted; disable editing/repeat submit; show Updating email | Leave this request → editable Change email with an outcome-uncertain notice. Hide Back/Skip and other modes while pending. |
| Confirmed failure | Service confirms update was rejected; retain typed new email; current address unchanged | Try again resubmits explicitly; Back → Verification. |
| Expired session | Authorization has expired; do not attempt the mutation | Back to sign in → authenticate → explicitly resume Change email. Back to welcome exits. |
| Accepted update | Service acknowledges the authorized address update | Show new destination; request/check verification using existing board. Never equate request acceptance with inbox delivery. |
| Uncertain outcome | Timeout, departure or lost response; cannot prove whether service applied it | Say “We couldn't confirm the change.” Recheck current account address after authorization before retrying. Do not assert the old address is unchanged. |

The failure panel illustrates a confirmed rejection. For uncertain network outcomes use the distinct copy above; do not reuse the unchanged-address claim.

Leave warns “This may still finish after you leave.” A late response cannot redirect the person or override a newer address/mode choice. Returning reconciles the service's current address. Going to Demo still requires the explicit Welcome → demo explanation → Continue in demo route. No personal records import automatically.

After session expiry, preserve only the intended destination in navigation. Restore a typed email only within an explicitly resumed, securely authorized account context; do not carry it into another account. Never retain a password for resumption.

The top-left Back arrow on the expired-session screen returns to Welcome, matching Back to welcome. It must not return to an actionable Change email form without authorization. The Sign in button starts reauthentication and retains only the intended return destination.

Errors use icon + text and persistent labels. On validation, focus the field and associate its error. Announce pending, success and failure once; avoid announcing each spinner or countdown tick.

## Apple-inspired material and accessibility alternatives
Preserve Option 1 and Plus Jakarta Sans. Use hierarchy, grouping and spacing before adding glass effects.

### Opaque surface alternative
For reduced transparency, higher contrast, unsupported blur or a busy backdrop: replace glass input/panel surfaces with solid warm white #FAFBF7, retain dark navy text and denim controls, and keep a visible input boundary. Preserve the same padding, dimensions, focus state and navigation. Do not rely on blur or shadow to identify controls. Selected mood/goal states also need a marker/outline and an accessible selected state.

### Reduced motion alternative
Replace orb pulsing/scaling, large translations and progress-fill interpolation with immediate stable states. Keep textual state changes and an accessible status announcement. Loading can show static “Updating email…” text instead of a rotating spinner. Optional breathing retains its static quiet-moment route and Skip. Essential actions never require a gesture.

### Prototype checks deferred
Measure contrast and actual touch targets; exercise real system text scaling, long names/emails, keyboard avoidance, TalkBack reading order and focus return from email. Verify request departure, reauthentication, status reconciliation and late-result handling against the actual backend. The mockups do not prove those behaviors or establish accessibility compliance.

## Review boundary
Review these refinements and the scoped audit before approving first-run. Implementation and the remaining app screens await that review.
