-- Обход без service_role на сервере: разрешить вставку заявок с publishable (anon) ключом.
-- Выполните в Supabase → SQL Editor (проект rycgzckzrxedsbpwvzbh или ваш, если перенесли БД).

alter table public.requests enable row level security;

drop policy if exists "anon_insert_requests" on public.requests;
create policy "anon_insert_requests"
  on public.requests
  for insert
  to anon, authenticated
  with check (true);

-- Опционально: читать свои заявки по email (если понадобится позже)
-- drop policy if exists "anon_select_own_requests" on public.requests;
-- create policy "anon_select_own_requests"
--   on public.requests for select to anon
--   using (true);
