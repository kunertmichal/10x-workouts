-- migration: create profiles, workouts, and generations tables with rls enabled
-- created: 2023-10-11 00:00:00 utc
-- description: this migration creates the profiles, workouts, and generations tables as per db-plan.md. note: the users table is managed by supabase auth.

-- create table: profiles
create table if not exists profiles (
    user_id uuid primary key references auth.users on delete cascade, -- profile identifier matching supabase auth
    birthday date,
    weight numeric,
    training_goals text,
    equipment text[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- create enum type for workout source if not exists
-- note: creating type with if not exists is available in newer postgres versions
create type workout_source as enum ('manual','ai','ai-edited');

-- create table: workouts
create table if not exists workouts (
    id uuid primary key,
    owner uuid not null references profiles(user_id) on delete cascade,
    name text not null,
    structure jsonb not null check (char_length(structure::text) <= 1000),
    source workout_source not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- create table: generations
create table if not exists generations (
    id uuid primary key,
    owner uuid not null references profiles(user_id) on delete cascade,
    prompt text not null check (char_length(prompt) <= 1000),
    answer text not null check (char_length(answer::text) <= 1000),
    is_valid boolean not null,
    is_accepted boolean not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
); 

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
