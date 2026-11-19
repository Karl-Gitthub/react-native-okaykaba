-- Additive only. Existing preferences and owner-only RLS policies are preserved.
begin;
alter table public.preferences
  add column bible_verses boolean not null default false,
  add column saved_reflections text[] not null default '{}'
    check (cardinality(saved_reflections) <= 1000);
commit;
