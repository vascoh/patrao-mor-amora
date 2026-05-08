-- ════════════════════════════════════════════════════════════════
--  PATRÃO MOR AMORA — Content tables (testimonials, faq, partners, site_stats)
-- ════════════════════════════════════════════════════════════════

-- ───────── TESTIMONIALS ─────────
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  text          text not null,
  course        text not null,
  author        text not null,
  info          text not null,
  avatar        text not null,
  stars         int not null default 5 check (stars between 1 and 5),
  display_order int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists testimonials_order_idx on public.testimonials(display_order, created_at);

-- ───────── FAQ ITEMS ─────────
create table if not exists public.faq_items (
  id            uuid primary key default gen_random_uuid(),
  question      text not null,
  answer        text not null,
  display_order int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists faq_items_order_idx on public.faq_items(display_order, created_at);

-- ───────── PARTNERS ─────────
create table if not exists public.partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  icon          text not null default '',
  url           text,
  display_order int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists partners_order_idx on public.partners(display_order);

-- ───────── SITE STATS ─────────
create table if not exists public.site_stats (
  id            uuid primary key default gen_random_uuid(),
  key           text not null unique,
  value         text not null,
  label         text not null,
  display_order int not null default 0
);

-- ════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY — content tables are public read, admin write
-- ════════════════════════════════════════════════════════════════
alter table public.testimonials  enable row level security;
alter table public.faq_items     enable row level security;
alter table public.partners      enable row level security;
alter table public.site_stats    enable row level security;

-- Public read
create policy "testimonials_public_read" on public.testimonials
  for select using (is_active = true);
create policy "testimonials_admin_all" on public.testimonials
  for all to authenticated using (true) with check (true);

create policy "faq_public_read" on public.faq_items
  for select using (is_active = true);
create policy "faq_admin_all" on public.faq_items
  for all to authenticated using (true) with check (true);

create policy "partners_public_read" on public.partners
  for select using (is_active = true);
create policy "partners_admin_all" on public.partners
  for all to authenticated using (true) with check (true);

create policy "site_stats_public_read" on public.site_stats
  for select using (true);
create policy "site_stats_admin_all" on public.site_stats
  for all to authenticated using (true) with check (true);

-- ════════════════════════════════════════════════════════════════
--  SEED — initial content (mirrors current hardcoded data)
-- ════════════════════════════════════════════════════════════════

-- Testimonials
insert into public.testimonials (text, course, author, info, avatar, stars, display_order) values
  ('Fiz o curso de Patrão Local na Patrão Mor e foi uma experiência fantástica. Os instrutores são extremamente competentes e o método de ensino é muito eficaz. Passei à primeira tentativa!',
   'Patrão Local', 'João Pinto', 'Aluno 2024 · Almada', 'JP', 5, 0),
  ('Escola de excelência. Fiz aqui o Patrão de Costa após ter feito o Local noutro sítio, e a diferença é enorme. A qualidade dos materiais, a dedicação dos professores e o apoio até ao exame são incomparáveis.',
   'Patrão de Costa', 'Rita Santos', 'Aluna 2024 · Seixal', 'RS', 5, 1),
  ('O curso de mergulho PADI foi incrível! A instrutora foi paciente e muito profissional. Sinto-me completamente preparado para mergulhar em qualquer parte do mundo.',
   'PADI Open Water', 'Miguel Costa', 'Aluno 2025 · Setúbal', 'MC', 5, 2),
  ('Sonhei durante anos em obter o Patrão de Alto Mar. A Patrão Mor tornou isso possível com um programa bem estruturado e professores que transmitem conhecimento e paixão pelo mar em igual medida.',
   'Patrão de Alto Mar', 'Ana Ferreira', 'Aluna 2023 · Lisboa', 'AF', 5, 3),
  ('Excelente formação em segurança marítima. Aprendi coisas que nunca aprendi nos outros cursos e que me vão certamente salvar a vida um dia. Muito prático e orientado para o mundo real.',
   'Segurança no Mar', 'Tiago Lopes', 'Aluno 2025 · Amora', 'TL', 4, 4)
on conflict do nothing;

-- FAQ
insert into public.faq_items (question, answer, display_order) values
  ('Que documentos preciso para me inscrever?',
   'Para a maioria dos cursos precisas de: BI/Cartão de Cidadão, certificado médico de aptidão náutica (podemos ajudar a obtê-lo) e, para menores, autorização do encarregado de educação. Para cursos PADI adicionalmente precisas de declaração médica de aptidão para mergulho.',
   0),
  ('Qual a diferença entre Patrão Local e Patrão de Costa?',
   'O Patrão Local permite navegar até 3 milhas náuticas da costa e em águas interiores. O Patrão de Costa permite navegar até 20 milhas náuticas da costa e requer maiores conhecimentos técnicos em navegação, meteorologia e comunicações. É recomendado para quem pretende fazer viagens mais longas.',
   1),
  ('Os cursos têm aulas online disponíveis?',
   'Sim! A componente teórica de alguns cursos pode ser feita online com os nossos materiais digitais e aulas em vídeo. A componente prática (manobras, simulações, etc.) é sempre presencial. O curso de Meteorologia Náutica é 100% online.',
   2),
  ('Como funcionam os exames DGRM?',
   'Os exames são realizados na sede da DGRM e dividem-se em prova escrita (teórica) e prova prática (manobras em embarcação). A nossa escola prepara-te completamente para ambas as componentes. Com 94% de taxa de aprovação, estás em boas mãos.',
   3),
  ('Qual o prazo de validade das habilitações náuticas?',
   'As habilitações DGRM não têm prazo de validade — são válidas para toda a vida. No entanto, o certificado médico de aptidão náutica tem de ser renovado periodicamente. Para embarcações profissionais há requisitos adicionais de atualização de formação.',
   4),
  ('É possível pagar em prestações?',
   'Sim! Oferecemos a possibilidade de pagar em 2 a 3 prestações sem juros para a maioria dos cursos. Entra em contacto connosco para discutir a melhor solução para o teu caso. Aceitamos MBWay, transferência bancária e cartão de crédito.',
   5),
  ('Preciso de ter barco para fazer o curso?',
   'Não! A escola disponibiliza as embarcações necessárias para a componente prática dos cursos. Não precisas de ter barco próprio para frequentar qualquer um dos nossos cursos.',
   6),
  ('A certificação PADI tem validade internacional?',
   'Sim! O certificado PADI é reconhecido em mais de 180 países e mais de 6.600 centros de mergulho em todo o mundo. É o certificado de mergulho mais reconhecido internacionalmente. Uma vez obtido, é válido para toda a vida.',
   7)
on conflict do nothing;

-- Partners
insert into public.partners (name, icon, display_order) values
  ('DGRM', '🏛️', 0),
  ('PADI International', '🤿', 1),
  ('Marina de Seixal', '⚓', 2),
  ('Capitania do Porto de Lisboa', '🚢', 3),
  ('IEFP', '🎓', 4),
  ('FPN — Federação', '🌊', 5)
on conflict do nothing;

-- Site stats
insert into public.site_stats (key, value, label, display_order) values
  ('years_experience', '44+', 'Anos de Experiência', 0),
  ('students_trained', '2.800+', 'Alunos Formados', 1),
  ('approval_rate', '94%', 'Taxa de Aprovação', 2),
  ('certifications', '9', 'Certificações', 3)
on conflict (key) do nothing;
