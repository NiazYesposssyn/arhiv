-- Выполните в Supabase SQL Editor, если таблицы profiles ещё нет.
-- После регистрации сотрудника подставьте его user id из Authentication → Users.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_staff boolean default false,
  is_admin boolean default false,
  role text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Пример: выдать права сотруднику (замените UUID)
-- insert into public.profiles (id, is_staff, is_admin, role)
-- values ('00000000-0000-0000-0000-000000000000', true, true, 'admin')
-- on conflict (id) do update set is_staff = true, is_admin = true, role = 'admin';
