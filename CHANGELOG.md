# CHANGELOG — Patrão Mor Amora

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [2.0.0] — 2026-05-09 — Production Hardening

### Added
- Blog CRUD in admin panel (/admin/blog, /admin/blog/novo, /admin/blog/[id])
- BlogPostForm shared component (create/edit blog posts)
- Supabase migration 0003_blog_posts (table + RLS + seed from static data)
- src/services/blog.ts — Supabase blog service with fallback to static data
- AdminNav: Blog link (✍️)
- Email notifications via Supabase Edge Function (notify-admin) + Resend API
- src/lib/notify.ts — fire-and-forget notifyAdmin helper
- Google Consent Mode v2 (default denied for analytics/ads)
- CookieConsent banner (accept/deny, localStorage persistence, accessible)
- tsconfig.json: supabase/functions excluded from TypeScript compilation

### Fixed
- Build blocker: getCourseSlugs() now returns [] when SUPABASE env vars absent
- OG image prerender crash on Windows (path with spaces): added dynamic="force-dynamic"
- Type duplication: Testimonial/FaqItem/Partner/SiteStat/BlogPost consolidated in database.ts
- content.ts now imports types from database.ts and re-exports
- useEffect missing deps warning in Testimonials.tsx
- Focus ring CSS: rgba() instead of CSS var opacity modifier (Tailwind JIT compat)
- Hero/FAQ/Partners/Testimonials FALLBACK arrays updated to match full DB interface

### Changed
- lib/blog.ts: interface migrated to use published_at/read_time (matching database.ts)
- seo.ts: uses BlogPost from @/types/database; buildArticleJsonLd uses published_at
- blog/page.tsx: async, fetches Supabase with fallback; uses published_at/read_time
- blog/[slug]/page.tsx: async, fetches Supabase with fallback; revalidate=60
- Blog.tsx (home): accepts posts prop from page.tsx
- page.tsx: fetches blogPosts and passes to Blog component
- sitemap.ts: uses Supabase blog with fallback; updated_at for lastModified

---

## [1.4.0] — 2026-05-08 — Security + Admin + Content + CI/CD

### Added
- Rate limiting middleware for API routes (enrollments + leads)
- Content-Security-Policy and additional security headers
- Admin: /admin/cursos/novo — create new course
- Admin: /admin/cursos/[id] — edit existing course
- Admin: /admin/datas — course dates CRUD (list, new, edit)
- Admin: /admin/leads — leads management with CSV export
- Admin: /admin/inscricoes — enrollments management with status actions
- AdminNav updated with all sections + active state
- Supabase migrations: testimonials, faq_items, partners, site_stats tables
- Services: testimonials, faq, partners, siteStats fetching from Supabase
- Testimonials, FAQ, Partners, Hero stats now fetched from Supabase (with hardcoded fallback)
- next/image for school photo in About section
- Custom 404 page (not-found.tsx) with navigation
- Custom error page (error.tsx) with retry
- GitHub Actions CI/CD pipeline (lint + typecheck + build)
- Netlify build cache configuration
- TASKS.md and CHANGELOG.md

### Changed
- netlify.toml: improved with cache headers and security headers
- next.config.mjs: added CSP and additional security headers
- About section: replaced placeholder with actual school photo

---

## [1.3.0] — 2026-05-08 — Accessibility

### Added
- PromoPopup: WCAG focus trap, Escape key, aria-modal, focus restore
- Testimonials: keyboard carousel navigation (←/→), aria-live region, role="tablist" dots
- AnnouncementBar: hover pause, prefers-reduced-motion, sr-only static alternative
- Navbar: aria-expanded, Escape key, focus management, role="dialog" mobile menu
- FAQ: WAI-ARIA accordion pattern (h3 headings, aria-controls, role="region")
- MobileCTA: aria-label on WhatsApp link, aria-hidden on emoji
- globals.css: focus-visible styles, prefers-reduced-motion, Windows High Contrast

---

## [1.2.0] — 2026-05-08 — Advanced SEO

### Added
- src/lib/seo.ts with siteConfig and JSON-LD builders (Org, Course, Article, Breadcrumb, FAQ)
- Dynamic OG images via next/og for school, courses, and blog posts
- Organization + LocalBusiness + WebSite JSON-LD in root layout
- Course JSON-LD + CourseInstance + BreadcrumbList on course pages
- Article JSON-LD + BreadcrumbList on blog post pages
- Twitter Cards metadata throughout
- Canonical URLs on all pages
- Local SEO keywords in PT for Amora/Seixal region

---

## [1.1.0] — 2026-05-08 — Quick Wins

### Added
- src/components/forms/FormField.tsx — shared form field component
- src/components/shared/StatusBadge.tsx — shared status badge
- src/lib/blog.ts — centralized blog post data with isoDate field
- /blog and /blog/[slug] pages (previously 404)
- src/app/sitemap.ts — dynamic sitemap with courses + blog
- public/robots.txt — blocks /admin, references sitemap
- Skip-to-content link for accessibility
- id="main-content" on main element

### Changed
- Hero: fixed hardcoded gold color to use CSS var(--accent)
- Footer: social links now use NEXT_PUBLIC_* env vars (hidden if unset)
- Admin layout: added robots noindex

---

## [1.0.0] — 2026-05-01 — Initial Build

### Added
- Full Next.js 14 App Router site
- Supabase integration (courses, course_dates, enrollments, leads)
- Authentication-protected /admin area
- Course pages with dynamic slugs
- Contact and enrollment forms with Zod validation + honeypot
- Responsive design with dark/light theme
- Tailwind CSS with custom design tokens
- AnnouncementBar, Navbar, Hero, About, Courses, Calendar, Simulator,
  Testimonials, Contact, FAQ, Blog, Partners, Newsletter, Footer
- WhatsApp floating button
- PromoPopup
- CSV export for leads
