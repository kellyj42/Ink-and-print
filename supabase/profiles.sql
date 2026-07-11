create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles
add column if not exists full_name text;
alter table public.profiles
add column if not exists phone text;
alter table public.profiles
add column if not exists email text;
alter table public.profiles
add column if not exists role text not null default 'user';
alter table public.profiles
add column if not exists created_at timestamptz not null default now();
alter table public.profiles
add column if not exists updated_at timestamptz not null default now();
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
add constraint profiles_role_check check (role in ('admin', 'user'));
create or replace function public.handle_new_user_profile() returns trigger language plpgsql security definer
set search_path = public as $$ begin
insert into public.profiles (id, email, full_name, phone, role)
values (
  new.id,
  new.email,
  new.raw_user_meta_data ->> 'full_name',
  new.raw_user_meta_data ->> 'phone',
  'user'
) on conflict (id) do
update
set
  email = excluded.email,
  full_name = coalesce(public.profiles.full_name, excluded.full_name),
  phone = coalesce(public.profiles.phone, excluded.phone),
  updated_at = now();
return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user_profile();
insert into public.profiles (id, email, role)
select id,
  email,
  'user'
from auth.users on conflict (id) do
update
set email = excluded.email;
alter table public.profiles enable row level security;
drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile" on public.profiles for
insert to authenticated with check (auth.uid() = id);
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile" on public.profiles for
select to authenticated using (auth.uid() = id);
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles for
update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
