# TASKS — Patrão Mor Amora

Tracking production-readiness improvements. Last updated: 2026-05-08.

## ✅ Completed

### Phase 1 — Quick Wins (2026-05-08)
- [x] Extract shared `FormField` component from duplicate form code
- [x] Extract shared `StatusBadge` component from admin pages
- [x] Move blog post data to `src/lib/blog.ts`
- [x] Create `/blog` and `/blog/[slug]` pages (previously 404)
- [x] Create dynamic `sitemap.ts` with courses + blog posts
- [x] Create `public/robots.txt` (blocks /admin, points to sitemap)
- [x] Add `robots: noindex` to admin layout
- [x] Add skip-to-content link for accessibility
- [x] Fix Hero gold color to use CSS variable
- [x] Footer social links from env vars (hidden if unset)

### Phase 2 — Advanced SEO (2026-05-08)
- [x] Create `src/lib/seo.ts` — central siteConfig + JSON-LD builders
- [x] Dynamic OG image for school (`/opengraph-image.tsx`)
- [x] Dynamic OG image per course (`/cursos/[slug]/opengraph-image.tsx`)
- [x] Dynamic OG image per blog post (`/blog/[slug]/opengraph-image.tsx`)
- [x] Organization + LocalBusiness + WebSite JSON-LD in root layout
- [x] Course JSON-LD + CourseInstance + BreadcrumbList on course pages
- [x] Article JSON-LD + BreadcrumbList on blog post pages
- [x] Twitter Cards metadata site-wide
- [x] Canonical URLs on all pages
- [x] Local SEO keywords (PT)

### Phase 3 — Accessibility WCAG 2.1 AA (2026-05-08)
- [x] PromoPopup: focus trap, Escape, aria-modal, auto-focus, focus restore
- [x] Testimonials: keyboard carousel (←/→), aria-live, role="tablist"
- [x] AnnouncementBar: hover pause, prefers-reduced-motion, aria-hidden + sr-only
- [x] Navbar: aria-expanded, Escape, focus management, role="dialog"
- [x] FAQ: WAI-ARIA accordion (h3 wrapping, aria-controls, role="region")
- [x] MobileCTA: aria-label + aria-hidden on emoji
- [x] globals.css: focus-visible, prefers-reduced-motion, Windows High Contrast

### Phase 4 — Security + Admin + Content + CI/CD (2026-05-08)
- [x] Rate limiting on /api/enrollments and /api/leads
- [x] Security headers (CSP, HSTS, Permissions-Policy)
- [x] Admin: /admin/cursos/novo (new course)
- [x] Admin: /admin/cursos/[id] (edit course)
- [x] Admin: /admin/datas (course dates CRUD)
- [x] Admin: /admin/leads (leads management)
- [x] Admin: /admin/inscricoes (enrollments management + status actions)
- [x] AdminNav updated with all sections
- [x] Supabase migrations: testimonials, faq_items, partners, site_stats
- [x] Move hardcoded content to Supabase (Testimonials, FAQ, Partners, Hero stats)
- [x] Performance: next/image for school photo, ISR tuning
- [x] UX: custom 404 + error pages, form success feedback
- [x] GitHub Actions CI/CD pipeline
- [x] Netlify configuration optimized

## 🔲 Backlog

- [ ] Email notifications for enrollments/leads via Supabase Edge Functions
- [ ] Full test suite (Vitest unit + Playwright e2e)
- [ ] Blog CRUD in admin panel
- [ ] WhatsApp Business API integration
- [ ] Google Analytics 4 + consent banner
