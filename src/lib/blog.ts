import type { BlogPost } from "@/types/database";

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  {
    id: "static-1",
    slug: "como-ler-carta-nautica",
    title: "Como Ler uma Carta Náutica: Guia Completo para Iniciantes",
    excerpt:
      "Aprender a ler uma carta náutica é uma das competências mais importantes para qualquer navegador. Neste guia explicamos simbologia, escalas, sondas e muito mais.",
    content: `
Uma carta náutica é o mapa do navegador. Ao contrário dos mapas terrestres, as cartas náuticas contêm informação essencial para a navegação segura no mar: profundidades, perigos submersos, balizamento, correntes e muito mais.

## Elementos Essenciais de uma Carta Náutica

### Escala
A escala indica a relação entre as distâncias no mapa e as distâncias reais. Uma carta de grande escala (ex: 1:5.000) mostra uma área pequena com muito detalhe — ideal para entradas de porto. Uma carta de pequena escala (ex: 1:500.000) cobre grandes áreas — ideal para planeamento de viagens longas.

### Sondas (Profundidades)
Os números espalhados pela carta indicam profundidades em metros (ou braças em cartas mais antigas). A linha batimétrica de 10 metros é normalmente a fronteira da "zona de perigo" para embarcações de recreio.

### Balizamento
O sistema IALA-A (utilizado em Portugal e Europa) define:
- Balizas laterais: vermelhas (boreste) e verdes (bombordo) para canais navegáveis
- Balizas cardeais: indicam o lado seguro para passar um obstáculo
- Balizas de isolado perigoso: marcam um obstáculo isolado

### Símbolos de Perigo
- Ancora: fundeadouro autorizado
- +: obstáculo com profundidade conhecida
- Asterisco (*): rocha ao nível do mar ou a descoberto
- Círculo com ponto: baixio perigoso

## Como Praticar

A melhor forma de aprender a ler cartas náuticas é praticar com cartas reais do Tejo e costa portuguesa. No curso de Patrão Local da Escola Náutica Patrão Mor, dedicamos várias sessões à leitura de cartas e ao traçado de rumos.
    `.trim(),
    tag: "Navegação",
    icon: "🗺️",
    read_time: "5 min",
    published_at: "2025-05-12",
    is_published: true,
    display_order: 0,
    created_at: "2025-05-12T00:00:00Z",
    updated_at: "2025-05-12T00:00:00Z"
  },
  {
    id: "static-2",
    slug: "meteorologia-maritima",
    title: "Meteorologia Marítima: Como Interpretar Previsões",
    excerpt:
      "Saber interpretar um boletim meteorológico marítimo pode salvar vidas. Explicamos os conceitos essenciais que todo o navegador deve conhecer.",
    content: `
A meteorologia marítima é uma das disciplinas mais importantes para qualquer navegador. Uma má interpretação das condições meteorológicas pode transformar um passeio tranquilo numa situação perigosa.

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

### Nevoeiro Marítimo
O nevoeiro é um dos maiores perigos para a navegação costeira portuguesa, especialmente no verão. Reduza a velocidade, emita os sinais sonoros adequados e use o radar ou AIS se disponível.

## Regra de Ouro
Se tiver dúvidas sobre as condições meteorológicas, não saia. É sempre melhor adiar uma saída do que enfrentar condições para as quais não está preparado.
    `.trim(),
    tag: "Meteorologia",
    icon: "🌦️",
    read_time: "7 min",
    published_at: "2025-05-05",
    is_published: true,
    display_order: 1,
    created_at: "2025-05-05T00:00:00Z",
    updated_at: "2025-05-05T00:00:00Z"
  },
  {
    id: "static-3",
    slug: "10-dicas-patrao-local",
    title: "10 Dicas para Passar no Exame de Patrão Local à Primeira",
    excerpt:
      "Com base na experiência de mais de 2.800 alunos formados, partilhamos as dicas mais eficazes para garantir aprovação no exame teórico e prático do DGRM.",
    content: `
Com mais de 44 anos de experiência e 2.800+ alunos formados, a Escola Náutica Patrão Mor tem um segredo: preparação sistemática e confiança. Aqui estão as 10 dicas que os nossos instrutores partilham com todos os alunos.

## 1. Domina a Regulamentação COLREGS

As Regras de Prevenção de Abalroamentos no Mar (COLREGS) são a base do exame teórico. Memoriza especialmente as regras de manobra, luzes e marcas de navegação.

## 2. Pratica a Leitura de Cartas Náuticas

Dedica pelo menos 2-3 horas por semana à leitura de cartas do Tejo e costa portuguesa. Identifica profundidades, balizamento e zonas de perigo.

## 3. Conhece a Tua Área de Navegação

O exame de Patrão Local é específico para a área onde te inscreveste. Conhece bem os canais navegáveis, portos, marinas e zonas de fundeadouro da tua área.

## 4. Revisa a Meteorologia

Sabe identificar as condições meteorológicas adequadas para navegação. Conhece a escala de Beaufort e sabe interpretar um boletim meteorológico marítimo.

## 5. Pratica a Manobra de Homem ao Mar

Esta é uma das manobras mais avaliadas no exame prático. Pratica até conseguires executá-la de forma fluida e segura.

## 6. Não Descures a Segurança

Conhece o equipamento de segurança obrigatório e a sua localização a bordo. Sabe como usar um extintor, coletes e sinais pirotécnicos.

## 7. Faz Simulações de Exame

Resolve provas de exames anteriores do DGRM. A Escola Patrão Mor fornece provas simuladas a todos os alunos.

## 8. Dorme Bem na Noite Anterior

O exame é de manhã. Descanso adequado melhora a concentração e reduz a ansiedade.

## 9. Chega Cedo ao Exame

Chega 30 minutos antes. Isso dá-te tempo para te ambientares, fazer perguntas e respirar fundo.

## 10. Confia na Tua Preparação

Se seguiste as aulas e estudaste, estás preparado. Confia no trabalho que fizeste.

---

A taxa de aprovação dos alunos da Escola Patrão Mor é de 94%. Inscreve-te hoje e faz parte desta estatística.
    `.trim(),
    tag: "Exames DGRM",
    icon: "📋",
    read_time: "10 min",
    published_at: "2025-04-28",
    is_published: true,
    display_order: 2,
    created_at: "2025-04-28T00:00:00Z",
    updated_at: "2025-04-28T00:00:00Z"
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
