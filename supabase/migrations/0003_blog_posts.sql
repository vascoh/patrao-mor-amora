-- ════════════════════════════════════════════════════════════════
--  PATRÃO MOR AMORA — Blog posts table
-- ════════════════════════════════════════════════════════════════

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null,
  content       text not null,
  tag           text not null default 'Náutica',
  icon          text not null default '📝',
  read_time     text not null default '5 min',
  published_at  date not null default current_date,
  is_published  boolean not null default true,
  display_order int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_published_idx on public.blog_posts(published_at desc) where is_published = true;

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- RLS
alter table public.blog_posts enable row level security;

create policy "blog_posts_public_read" on public.blog_posts
  for select using (is_published = true);

create policy "blog_posts_admin_all" on public.blog_posts
  for all to authenticated using (true) with check (true);

-- Seed with current hardcoded posts
insert into public.blog_posts (slug, title, excerpt, content, tag, icon, read_time, published_at, display_order) values
  ('como-ler-carta-nautica',
   'Como Ler uma Carta Náutica: Guia Completo para Iniciantes',
   'Aprender a ler uma carta náutica é uma das competências mais importantes para qualquer navegador. Neste guia explicamos simbologia, escalas, sondas e muito mais.',
   'Uma carta náutica é o mapa do navegador. Ao contrário dos mapas terrestres, as cartas náuticas contêm informação essencial para a navegação segura no mar: profundidades, perigos submersos, balizamento, correntes e muito mais.

## Elementos Essenciais de uma Carta Náutica

### Escala
A escala indica a relação entre as distâncias no mapa e as distâncias reais. Uma carta de grande escala (ex: 1:5.000) mostra uma área pequena com muito detalhe — ideal para entradas de porto. Uma carta de pequena escala (ex: 1:500.000) cobre grandes áreas — ideal para planeamento de viagens longas.

### Sondas (Profundidades)
Os números espalhados pela carta indicam profundidades em metros. A linha batimétrica de 10 metros é normalmente a fronteira da "zona de perigo" para embarcações de recreio.

### Balizamento
O sistema IALA-A (utilizado em Portugal e Europa) define balizas laterais (vermelhas e verdes para canais navegáveis), balizas cardeais e balizas de isolado perigoso.

### Símbolos de Perigo
- Ancora: fundeadouro autorizado
- +: obstáculo com profundidade conhecida
- Asterisco (*): rocha ao nível do mar ou a descoberto
- Círculo com ponto: baixio perigoso

## Como Praticar

A melhor forma de aprender a ler cartas náuticas é praticar com cartas reais do Tejo e costa portuguesa. No curso de Patrão Local da Escola Náutica Patrão Mor, dedicamos várias sessões à leitura de cartas e ao traçado de rumos.',
   'Navegação', '🗺️', '5 min', '2025-05-12', 0),

  ('meteorologia-maritima',
   'Meteorologia Marítima: Como Interpretar Previsões',
   'Saber interpretar um boletim meteorológico marítimo pode salvar vidas. Explicamos os conceitos essenciais que todo o navegador deve conhecer.',
   'A meteorologia marítima é uma das disciplinas mais importantes para qualquer navegador. Uma má interpretação das condições meteorológicas pode transformar um passeio tranquilo numa situação perigosa.

## Fontes de Informação Meteorológica em Portugal

### IPMA (Instituto Português do Mar e da Atmosfera)
O IPMA disponibiliza boletins meteorológicos marítimos diários com previsões de vento, ondulação e visibilidade para as diferentes zonas marítimas costeiras.

### VHF Canal 16 e 11
A Autoridade Marítima Nacional transmite avisos meteorológicos nos canais VHF 16 e 11. Nunca saia sem rádio VHF e mantenha o canal 16 sempre monitorizado.

## Conceitos Fundamentais

### Força do Vento (Escala de Beaufort)
- Força 0-3: Condições ideais para navegação recreativa
- Força 4-5: Requer experiência e embarcação adequada
- Força 6+: Condições adversas — evite sair sem experiência suficiente
- Força 8+: Temporal — permaneça em porto

### Depressões e Anticiclones
Uma depressão (baixa pressão) traz normalmente vento forte e mau tempo. Um anticiclone (alta pressão) está associado a tempo estável e vento fraco ou moderado.

## Regra de Ouro
Se tiver dúvidas sobre as condições meteorológicas, não saia. É sempre melhor adiar uma saída do que enfrentar condições para as quais não está preparado.',
   'Meteorologia', '🌦️', '7 min', '2025-05-05', 1),

  ('10-dicas-patrao-local',
   '10 Dicas para Passar no Exame de Patrão Local à Primeira',
   'Com base na experiência de mais de 2.800 alunos formados, partilhamos as dicas mais eficazes para garantir aprovação no exame teórico e prático do DGRM.',
   'Com mais de 44 anos de experiência e 2.800+ alunos formados, a Escola Náutica Patrão Mor tem um segredo: preparação sistemática e confiança.

1. Domina a Regulamentação COLREGS — as Regras de Prevenção de Abalroamentos no Mar são a base do exame teórico.
2. Pratica a Leitura de Cartas Náuticas — dedica pelo menos 2-3 horas por semana.
3. Conhece a Tua Área de Navegação — o exame é específico para a área onde te inscreveste.
4. Revisa a Meteorologia — sabe identificar as condições adequadas para navegação.
5. Pratica a Manobra de Homem ao Mar — esta é uma das manobras mais avaliadas no exame prático.
6. Não Descures a Segurança — conhece o equipamento de segurança obrigatório.
7. Faz Simulações de Exame — resolve provas de exames anteriores do DGRM.
8. Dorme Bem na Noite Anterior — o descanso adequado melhora a concentração.
9. Chega Cedo ao Exame — chega 30 minutos antes.
10. Confia na Tua Preparação — com 94% de taxa de aprovação, estás em boas mãos.',
   'Exames DGRM', '📋', '10 min', '2025-04-28', 2)
on conflict (slug) do nothing;
