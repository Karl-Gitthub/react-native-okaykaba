-- OkayKaba v1. No credentials or existing auth users are modified by this migration.
begin;
create table public.profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 preferred_name text not null default '' check (char_length(preferred_name)<=100),
 age integer check (age between 1 and 120), gender text check (char_length(gender)<=100),
 onboarding_completed boolean not null default false, setup_completed boolean not null default false,
 updated_at timestamptz not null default now()
);
create table public.mood_checkins (
 user_id uuid not null references auth.users(id) on delete cascade,
 local_date date not null, mood smallint not null check (mood between 0 and 4),
 timezone text not null check (char_length(timezone) between 1 and 100),
 updated_at timestamptz not null default now(), primary key(user_id,local_date)
);
create table public.journal_entries (
 user_id uuid not null references auth.users(id) on delete cascade,
 id text not null check(char_length(id) between 1 and 100), body text not null check(char_length(body) between 1 and 100000),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), primary key(user_id,id)
);
create table public.tasks (
 user_id uuid not null references auth.users(id) on delete cascade,
 id text not null check(char_length(id) between 1 and 100), title text not null check(char_length(title) between 1 and 500),
 local_date date not null, completed_at timestamptz, deleted boolean not null default false,
 position bigint not null default 0, updated_at timestamptz not null default now(), primary key(user_id,id)
);
create table public.preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 journal_draft text not null default '' check(char_length(journal_draft)<=100000),
 reduced_motion text not null default 'system' check(reduced_motion in ('system','reduce')),
 updated_at timestamptz not null default now()
);
create index journal_recent on public.journal_entries(user_id,created_at desc);
create index tasks_daily on public.tasks(user_id,local_date,position) where not deleted;
create function public.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at=now(); return new; end $$;
do $$ declare tab text; begin
 foreach tab in array array['profiles','mood_checkins','journal_entries','tasks','preferences'] loop
  execute format('alter table public.%I enable row level security',tab);
  execute format('create policy owner_select on public.%I for select to authenticated using ((select auth.uid())=user_id)',tab);
  execute format('create policy owner_insert on public.%I for insert to authenticated with check ((select auth.uid())=user_id)',tab);
  execute format('create policy owner_update on public.%I for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id)',tab);
  execute format('create policy owner_delete on public.%I for delete to authenticated using ((select auth.uid())=user_id)',tab);
  execute format('create trigger updated_at before update on public.%I for each row execute function public.touch_updated_at()',tab);
  execute format('revoke all on public.%I from anon',tab);
  execute format('grant select, insert, update, delete on public.%I to authenticated',tab);
 end loop;
end $$;
commit;
