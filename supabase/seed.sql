-- ════════════════════════════════════════════════════════════════
--  SEED — Cursos e datas iniciais
-- ════════════════════════════════════════════════════════════════
truncate table public.course_dates restart identity cascade;
truncate table public.courses restart identity cascade;

insert into public.courses (slug, name, category, description, price, level, duration, age_min, location, badge, icon, highlights, is_featured) values
  ('patrao-local', 'Patrão Local', 'carta',
   'A habilitação náutica mais procurada em Portugal. Permite navegar em águas costeiras até 3 milhas e interiores. Ideal para quem quer usar barco de recreio.',
   320, 'iniciante', '3–4 meses', 16, 'Amora / Seixal', 'Mais Procurado', '🚤',
   '["Navegação até 3 milhas","Águas interiores","Aulas práticas no Tejo","Material incluído"]'::jsonb, true),

  ('patrao-costa', 'Patrão de Costa', 'carta',
   'Navegação costeira até 20 milhas da costa. Inclui teoria avançada de navegação, meteorologia, comunicações e segurança no mar.',
   480, 'intermedio', '5–6 meses', 18, 'Amora / Online', 'DGRM', '⛵',
   '["Navegação até 20 milhas","Meteorologia avançada","Comunicações VHF","Cartas náuticas"]'::jsonb, true),

  ('alto-mar', 'Patrão de Alto Mar', 'carta',
   'A mais completa habilitação náutica. Navegação oceânica sem limites, incluindo técnicas de navegação astronómica e gestão avançada de crises a bordo.',
   780, 'profissional', '8–10 meses', 18, 'Amora', 'DGRM', '🚢',
   '["Sem limites de distância","Navegação astronómica","Gestão de crises","Travessias oceânicas"]'::jsonb, false),

  ('marinheiro', 'Marinheiro / Júnior', 'carta',
   'Introdução à náutica. Ideal para jovens a partir dos 14 anos ou para quem quer começar com uma base sólida antes de progredir para Patrão.',
   180, 'iniciante', '2 meses', 14, 'Amora', 'DGRM', '⚓',
   '["Para jovens 14+","Bases sólidas","Pré-requisito útil","Material incluído"]'::jsonb, false),

  ('vela', 'Vela Ligeira e Cruzeiro', 'vela',
   'Aprende a navegar à vela de forma segura e eficiente. Inclui teoria e prática em embarcação de vela, manobras, táticas de regata e gestão de vento.',
   290, 'intermedio', '3 meses', 0, 'Rio Tejo', 'Novo', '🌊',
   '["Teoria + prática","Manobras","Gestão de vento","Regata"]'::jsonb, false),

  ('padi', 'PADI Open Water', 'mergulho',
   'O mais reconhecido certificado de mergulho do mundo. Teoria, piscina e mergulhos em mar aberto. Certificado internacional PADI válido para todo o mundo.',
   420, 'iniciante', '3–5 semanas', 10, 'Amora / Sesimbra', 'Popular', '🤿',
   '["Certificado internacional","Inclui material PADI","Mergulhos mar aberto","Validade vitalícia"]'::jsonb, true),

  ('seguranca', 'Segurança no Mar', 'seguranca',
   'Formação essencial em primeiros socorros marítimos, sobrevivência no mar, uso de balsas e equipamento de emergência. Obrigatório para tripulantes profissionais.',
   120, 'intermedio', '2 dias', 0, 'Amora', 'DGRM', '🛡️',
   '["Primeiros socorros","Sobrevivência","Balsas e EPI","Inclui manual"]'::jsonb, false),

  ('meteo', 'Meteorologia Náutica', 'formacao',
   'Interpreta previsões meteorológicas, lê cartas de tempo e toma decisões seguras a bordo. Fundamental para todos os navegadores que planeiam travessias.',
   95, 'intermedio', '1 mês', 0, 'Online / Presencial', 'Novo 2025', '🌤️',
   '["100% online disponível","Cartas de tempo","Apoio à decisão","Acesso vitalício"]'::jsonb, false),

  ('cartas', 'Cartas Náuticas Avançado', 'seguranca',
   'Domina a leitura e utilização de cartas náuticas, plotagem de rotas, cálculo de marés, uso de instrumentos de navegação e chartplotter.',
   145, 'avancado', '3 semanas', 0, 'Amora', 'DGRM', '🗺️',
   '["Plotagem de rotas","Cálculo de marés","Chartplotter","Inclui atlas"]'::jsonb, false);

-- ───────── DATAS ─────────
insert into public.course_dates (course_id, start_date, schedule, location, total_slots, available_slots) values
  ((select id from public.courses where slug = 'patrao-local'),  cast('2025-06-07' as date), 'Sábados 09h–13h', 'Escola Amora', 12, 5),
  ((select id from public.courses where slug = 'seguranca'),     cast('2025-06-14' as date), 'Fim de semana intensivo', 'Escola Amora', 20, 12),
  ((select id from public.courses where slug = 'patrao-costa'),  cast('2025-07-05' as date), 'Sábados + quinzenais presenciais', 'Amora / Online', 10, 3),
  ((select id from public.courses where slug = 'padi'),          cast('2025-07-12' as date), 'Fins de semana · Amora + Sesimbra', 'Amora / Sesimbra', 8, 4),
  ((select id from public.courses where slug = 'alto-mar'),      cast('2025-09-06' as date), 'Sextas + Sábados', 'Escola Amora', 8, 8),
  ((select id from public.courses where slug = 'meteo'),         cast('2025-09-20' as date), '100% Online · acesso imediato', 'Online', 30, 30);
