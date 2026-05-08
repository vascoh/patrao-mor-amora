-- ════════════════════════════════════════════════════════════════
--  PATRÃO MOR AMORA — Schema inicial
-- ════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ───────── ENUMS ─────────
do $$ begin
  create type course_level as enum ('iniciante', 'intermedio', 'avancado', 'profissional');
exception when duplicate_object then null; end $$;

do $$ begin
  create type date_status as enum ('available', 'few', 'full', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type enrollment_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type course_category as enum ('carta', 'vela', 'seguranca', 'mergulho', 'formacao');
exception when duplicate_object then null; end $$;

-- ───────── COURSES ─────────
create table if not exists public.courses (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  category      course_category not null default 'carta',
  description   text not null,
  price         numeric(10,2) not null,
  level         course_level not null default 'iniciante',
  duration      text not null,
  age_min       int default 0,
  location      text default 'Amora',
  badge         text,
  icon          text,
  highlights    jsonb default '[]'::jsonb,
  is_featured   boolean not null default false,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists courses_active_idx on public.courses(is_active);
create index if not exists courses_category_idx on public.courses(category);
create unique index if not exists courses_slug_idx on public.courses(slug);

-- ───────── COURSE_DATES ─────────
create table if not exists public.course_dates (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid not null references public.courses(id) on delete cascade,
  start_date      date not null,
  end_date        date,
  schedule        text,
  location        text default 'Amora',
  total_slots     int not null default 12,
  available_slots int not null default 12,
  status          date_status not null default 'available',
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists course_dates_start_idx on public.course_dates(start_date);
create index if not exists course_dates_course_idx on public.course_dates(course_id);

-- ───────── LEADS ─────────
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text not null,
  message         text,
  course_interest text,
  source          text default 'website',
  user_agent      text,
  created_at      timestamptz not null default now()
);

create index if not exists leads_created_idx on public.leads(created_at desc);
create index if not exists leads_email_idx on public.leads(email);

-- ───────── ENROLLMENTS ─────────
create table if not exists public.enrollments (
  id              uuid primary key default gen_random_uuid(),
  course_id       uuid references public.courses(id) on delete set null,
  course_date_id  uuid references public.course_dates(id) on delete set null,
  user_name       text not null,
  email           text not null,
  phone           text not null,
  message         text,
  status          enrollment_status not null default 'pending',
  created_at      timestamptz not null default now()
);

create index if not exists enrollments_status_idx on public.enrollments(status);
create index if not exists enrollments_created_idx on public.enrollments(created_at desc);

-- ───────── TRIGGERS ─────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_courses_updated on public.courses;
create trigger trg_courses_updated
  before update on public.courses
  for each row execute function public.touch_updated_at();

-- Atualiza automaticamente o status da data com base nas vagas
create or replace function public.refresh_date_status()
returns trigger language plpgsql as $$
begin
  if new.available_slots <= 0 then
    new.status := 'full';
  elsif new.available_slots <= 3 then
    new.status := 'few';
  else
    new.status := 'available';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_course_dates_status on public.course_dates;
create trigger trg_course_dates_status
  before insert or update of available_slots on public.course_dates
  for each row execute function public.refresh_date_status();

-- ════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════
alter table public.courses        enable row level security;
alter table public.course_dates   enable row level security;
alter table public.leads          enable row level security;
alter table public.enrollments    enable row level security;

-- COURSES: leitura pública dos ativos, escrita só admin
drop policy if exists "courses_public_read" on public.courses;
create policy "courses_public_read" on public.courses
  for select using (is_active = true);

drop policy if exists "courses_admin_all" on public.courses;
create policy "courses_admin_all" on public.courses
  for all to authenticated using (true) with check (true);

-- COURSE_DATES: leitura pública, escrita admin
drop policy if exists "course_dates_public_read" on public.course_dates;
create policy "course_dates_public_read" on public.course_dates
  for select using (true);

drop policy if exists "course_dates_admin_all" on public.course_dates;
create policy "course_dates_admin_all" on public.course_dates
  for all to authenticated using (true) with check (true);

-- LEADS: insert público (formulário), leitura/update apenas admin
drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert" on public.leads
  for insert to anon, authenticated with check (true);

drop policy if exists "leads_admin_read" on public.leads;
create policy "leads_admin_read" on public.leads
  for select to authenticated using (true);

drop policy if exists "leads_admin_modify" on public.leads;
create policy "leads_admin_modify" on public.leads
  for all to authenticated using (true) with check (true);

-- ENROLLMENTS: insert público, leitura/update admin
drop policy if exists "enrollments_public_insert" on public.enrollments;
create policy "enrollments_public_insert" on public.enrollments
  for insert to anon, authenticated with check (true);

drop policy if exists "enrollments_admin_all" on public.enrollments;
create policy "enrollments_admin_all" on public.enrollments
  for all to authenticated using (true) with check (true);
