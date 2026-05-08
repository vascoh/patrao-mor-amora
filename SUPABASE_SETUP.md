Preparar o projecto para Supabase

Passos recomendados (resumido):

1) Criar um projecto no Supabase
   - No painel Supabase, criar um novo projecto.
   - Ir a Settings → API e copiar:
     - URL do projecto (ex: https://<project-ref>.supabase.co)
     - ANON public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
     - Service Role key (SUPABASE_SERVICE_ROLE_KEY)

2) Configurar variáveis de ambiente
   - Copiar `.env.example` para `.env.local` e preencher as chaves.
   - Nunca commitar `.env.local`.

3) Instalar e configurar Supabase CLI (opcional, para migrações locais)
   - Instalar: https://supabase.com/docs/guides/cli
   - Linkar o projecto local: `supabase link --project-ref <project-ref>` (usa o project ref do painel)
   - Iniciar o ambiente local (requere Docker): `supabase start`

4) Aplicar migrações e seed
   - Existem migrações em `supabase/migrations/` e um `supabase/seed.sql`.
   - Para aplicar migrações remotas, usar o Supabase CLI (`supabase db push`) após linkar o projecto.
   - Para popular dados, usar o SQL Editor no painel Supabase ou executar o `supabase/seed.sql` com psql apontando para `SUPABASE_DB_URL`.

5) Desenvolvimento local e deploy
   - Desenvolver normalmente com `npm run dev`.
   - Para hosting estático, gerar build `npm run build` e usar o Hosting do Supabase (ou outro provedor).
   - Nota: Este projecto usa Next.js e funcionalidades SSR via `@supabase/ssr`; para SSR completo, recomenda-se hospedar numa plataforma que suporte Node.js (ex: Vercel). Supabase Hosting foca em sites estáticos e Edge Functions.

Se quiser, aplico as alterações automáticas (criar `.env.example`, adicionar scripts npm e instruções).