-- Полная настройка ВАШЕГО проекта Supabase (если нет rycgzckzrxedsbpwvzbh).
-- Supabase Dashboard → ваш проект → SQL Editor → вставить → Run.

-- Таблица заявок
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  applicant_name text not null,
  email text,
  phone text,
  service_type text,
  description text,
  amount numeric default 0,
  status text not null default 'new',
  iin text,
  address text,
  date_from date,
  date_to date,
  payment_method text,
  payment_status text,
  card_last4 text,
  paid_at timestamptz,
  reference_code text unique
);

create index if not exists requests_created_at_idx on public.requests (created_at desc);

alter table public.requests enable row level security;

drop policy if exists "anon_insert_requests" on public.requests;
create policy "anon_insert_requests"
  on public.requests for insert to anon, authenticated
  with check (true);

-- Профили для /staff и /admin (после регистрации пользователя)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_staff boolean default false,
  is_admin boolean default false,
  role text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
