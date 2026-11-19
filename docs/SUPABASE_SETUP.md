# Supabase setup and Clerk migration

The app now uses only Supabase Auth at runtime. Previous Clerk screens are preserved in components/LegacySignIn.tsx and LegacySignUp.tsx; Clerk package dependencies remain for these archived components. No Clerk account or server data was deleted or changed.

## Activate cloud accounts

1. Create a Supabase Free project. Apply the versioned migrations in order: `supabase/migrations/202611170001_wellbeing.sql`, then `supabase/migrations/202611170002_inspiration_preferences.sql`, using the SQL editor or Supabase CLI. Apply each once. The second migration adds optional Bible verses and saved reflection IDs to preferences without replacing records or changing ownership policies. Review before applying to an existing database.
2. Copy the project URL and public publishable key to .env.local using .env.example. Never ship a service-role/secret key. Restart Expo after changing environment variables.
3. Enable email/password authentication and email confirmation. Configure Site URL and allowed redirect URLs for your actual localhost port (currently http://127.0.0.1:8083/** and http://localhost:8083/**) and production host. For native development builds allow reactnativeokaykaba://**; Expo Go callback URLs vary and must be configured separately. Password reset returns to /reset-password. Test verification and recovery on each platform before release.
4. Configure a real SMTP provider for verification and recovery emails. Supabase's default mail service has testing restrictions; check your provider's free allowance and domain requirements. No email provider, domain, OAuth client, or paid plan was purchased or configured by this change.
5. Test two separate users: user A must not read or write user B's records. Check signed-out access is denied. The migration includes owner-only SELECT/INSERT/UPDATE/DELETE policies on every table, plus foreign keys, constraints and user/date indexes. Hosted SQL execution and RLS behavior are not yet verified because project credentials were not supplied.
6. In Settings choose Sign in or create account. Browser demo mode can remain enabled while users explicitly choose an account. Google and other social providers are intentionally not shown until configured.

## Preserve existing users

Do not silently create replacement identities. Before any production cutover, take authorized backups/exports from Clerk and any existing database. Record an old Clerk ID to new Supabase UUID mapping in a server-side migration ledger, reconcile verified email ownership, and migrate application rows under the mapped UUIDs. Use an authenticated password-reset/invitation flow if password hashes cannot be imported in a supported format. Never copy plaintext passwords or place admin credentials in this app. Test a sample account and have a rollback window before disabling Clerk. No production user migration has been executed here.

## Data separation and demo import

The original browser demo storage key okaykaba.wellbeing.preview.v1 is retained. Native demo persistence now uses AsyncStorage. Account cache keys include the Supabase user UUID. Demo journals, tasks, and moods upload only after a signed-in user selects Import demo records and confirms. Duplicate IDs/dates retain account records; demo data remains on device.

Account writes save locally then sync to Supabase; errors remain visible and Settings offers Retry. Current reconciliation favors a device's cached records with the same ID/date, so this is a basic offline cache rather than a conflict-free collaborative system. Concurrent editing on multiple devices requires conflict-resolution work before a broader release. Task deletion is soft deletion with an immediate Undo. Journal drafts are local in demo mode and synced only within the signed-in account. AsyncStorage is unencrypted application storage; native auth sessions use chunked SecureStore. Do not describe this as end-to-end encryption.

## Limits and costs

Stay on Supabase Free while developing. Check current database, storage, active-user, egress, email and inactivity limits at https://supabase.com/pricing and https://supabase.com/docs/guides/auth/auth-smtp. SMS, paid social-provider accounts, custom domains and production email delivery can have separate costs. This app uses no SMS and has no paid upgrade configured.

## Validation still requiring external setup

Run signup, verify-email link, sign-in, session restart, reset-password link, sign-out, RLS isolation, account import, and cross-device sync against your own configured Supabase project. Native keyboard positioning, touch swiping, SecureStore and native deep links require iOS/Android device testing. Browser tests do not establish those results.
