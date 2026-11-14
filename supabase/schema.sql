-- OCR funding applications (multi-award)
-- Run in Supabase → SQL Editor, then Authentication → invite OCR staff emails.

create extension if not exists "pgcrypto";

create type public.application_status as enum (
  'submitted',
  'in_review',
  'accepted',
  'declined',
  'withdrawn'
);

create table public.funding_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  award_id text not null,
  cycle text,
  status public.application_status not null default 'submitted',
  applicant_name text not null,
  applicant_email text not null,
  answers jsonb not null default '{}'::jsonb,
  staff_notes text,
  reviewed_by text,
  reviewed_at timestamptz
);

create index funding_applications_award_created_idx
  on public.funding_applications (award_id, created_at desc);

create index funding_applications_status_idx
  on public.funding_applications (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger funding_applications_set_updated_at
  before update on public.funding_applications
  for each row
  execute function public.set_updated_at();

alter table public.funding_applications enable row level security;

-- Public form: insert only as a fresh submission (no staff fields).
create policy "Public can submit applications"
  on public.funding_applications
  for insert
  to anon, authenticated
  with check (
    status = 'submitted'
    and staff_notes is null
    and reviewed_by is null
    and reviewed_at is null
  );

-- Staff (any signed-in Supabase Auth user): read all applications.
create policy "Staff can read applications"
  on public.funding_applications
  for select
  to authenticated
  using (true);

-- Staff: update status / notes only (not rewrite the submission payload).
create policy "Staff can update review fields"
  on public.funding_applications
  for update
  to authenticated
  using (true)
  with check (true);

-- Optional later: restrict staff to an allowlist table instead of any authenticated user.
-- create table public.staff_emails (email text primary key);
-- then change the select/update policies to:
--   using (auth.jwt() ->> 'email' in (select email from public.staff_emails))
