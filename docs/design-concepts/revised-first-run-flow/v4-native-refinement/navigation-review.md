# Navigation review changes

This revision is a design proposal. It does not change app behavior.

- Setup completion uses a one-way transition: Back must not reopen a finished first-run or sign-in route.
- Native Back on editable setup pages still returns to the previous meaningful step.
- The short committing phase of an email update is guarded. Slow/interrupted work must resolve to an escapable uncertain-outcome state, not an endless spinner.
- An uncertain response must show the previous/last-known email as historical information; it must not label it as confirmed current. Check status reconciles the actual address before retry.
- Following expiry, authenticate the intended account before resuming a change. Never start another signup to change an existing pending identity.
- Demo remains explicitly separate; no automatic journal import.

The pending-phase guard replaces the older Leave this request proposal only if this revision is approved.
