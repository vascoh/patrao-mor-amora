"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./hub.module.css";

const SLIDES = [
  { src: "/images/hero/sailboat-sunset.jpg", alt: "Veleiro ao pôr do sol no Rio Tejo",  pos: "center 40%" },
  { src: "/images/courses/vela.jpg",          alt: "Vela ligeira em regata",              pos: "center 50%" },
  { src: "/images/about/marina.jpg",          alt: "Marina Patrão Mor",                  pos: "center 35%" },
  { src: "/images/courses/formacao.jpg",      alt: "Formação náutica certificada",        pos: "center 45%" },
  { src: "/images/courses/mergulho.jpg",      alt: "Mergulhador em águas do Tejo",       pos: "center 50%" },
];

export function HubPageClient() {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const dotsRef      = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);

  useEffect(() => {
    const slideshowEl = slideshowRef.current;
    const dotsEl      = dotsRef.current;
    const heroEl      = heroRef.current;
    if (!slideshowEl || !dotsEl || !heroEl) return;

    let current = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const INTERVAL = 6200;

    const slideEls = SLIDES.map((s) => {
      const el = document.createElement("div");
      el.className = styles.slide;
      el.style.backgroundImage    = `url('${s.src}')`;
      el.style.backgroundPosition = s.pos;
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", s.alt);
      slideshowEl.appendChild(el);
      return el;
    });

    const dotEls = SLIDES.map((_, i) => {
      const btn = document.createElement("button");
      btn.className = styles.slideDot;
      btn.setAttribute("aria-label", `Imagem ${i + 1}`);
      btn.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(btn);
      return btn;
    });

    function activate(idx: number) {
      slideEls[current]?.classList.remove(styles.slideActive);
      dotEls[current]?.classList.remove(styles.slideDotActive);
      current = idx;
      slideEls[current].classList.add(styles.slideActive);
      dotEls[current].classList.add(styles.slideDotActive);
      slideEls[current].style.transition = "opacity 1.6s ease, transform 9s linear";
      slideEls[current].style.transform  = "scale(1.0)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slideEls[current].style.transform = "scale(1.06)";
        });
      });
    }

    function goTo(idx: number) {
      if (idx === current) return;
      clearTimeout(timer!);
      activate(idx);
      schedule();
    }

    function schedule() {
      timer = setTimeout(() => goTo((current + 1) % SLIDES.length), INTERVAL);
    }

    activate(0);
    schedule();

    const onVisibility = () => {
      if (document.hidden) clearTimeout(timer!);
      else schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH   = heroEl.offsetHeight;
        if (scrollY <= heroH) {
          slideshowEl.style.transform = `translateY(${(scrollY / heroH) * 11}%)`;
        }
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const panels = document.querySelectorAll<HTMLElement>(`.${styles.destPanel}`);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add(styles.destPanelVisible);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.07 }
      );
      panels.forEach((p) => io.observe(p));
    } else {
      panels.forEach((p) => p.classList.add(styles.destPanelVisible));
    }

    panels.forEach((panel) => {
      const link = panel.querySelector("a");
      if (!link) return;
      panel.setAttribute("tabindex", "0");
      panel.setAttribute("role", "link");
      panel.addEventListener("click", (e) => {
        if (!link.contains(e.target as Node)) link.click();
      });
      panel.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); link.click(); }
      });
    });

    return () => {
      clearTimeout(timer!);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.hub}>

      {/* HERO */}
      <section ref={heroRef} className={styles.hero} aria-label="Entrada Patrão Mor">
        <div ref={slideshowRef} className={styles.heroSlideshow} aria-hidden="true" />
        <div className={styles.heroVignette} aria-hidden="true" />
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.heroNoise}    aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.patraomor.pt/assets/themes/patraomor/images/menu/logotipo_menu_patraomor.png"
            alt="Patrão Mor"
            className={styles.heroLogo}
            width={240}
            height={68}
            loading="eager"
          />
          <div className={styles.heroRule} aria-hidden="true" />
          <h1 className={styles.heroH1}>O mar começa aqui.</h1>
          <p className={styles.heroSub}>Escolha a sua experiência náutica</p>
          <div className={styles.heroBadges} aria-label="Credenciais">
            <span className={styles.badge}>Desde 1981</span>
            <span className={styles.badge}>Certificado DGRM</span>
            <span className={styles.badge}>Amora · Oeiras</span>
          </div>
        </div>

        <button
          className={styles.scrollCue}
          aria-label="Rolar para baixo"
          onClick={() => document.getElementById("bridge")?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className={styles.scrollTrack} aria-hidden="true" />
          <span className={styles.scrollLabel}>Explorar</span>
        </button>

        <div ref={dotsRef} className={styles.slideDots} aria-label="Navegar entre imagens" role="group" />
      </section>

      {/* BRIDGE */}
      <section id="bridge" className={styles.bridge} aria-labelledby="bridge-heading">
        <p className={styles.bridgeEyebrow}>As nossas escolas</p>
        <h2 className={styles.bridgeHeading} id="bridge-heading">Escolha a sua escola náutica</h2>
        <p className={styles.bridgeSub}>Dois locais. Uma só paixão pelo mar.</p>
        <div className={styles.bridgeRule} aria-hidden="true" />
      </section>

      {/* DESTINATION PANELS */}
      <section className={styles.destination} aria-label="Escolas Patrão Mor">

        {/* AMORA */}
        <article className={styles.destPanel} aria-label="Patrão Mor Amora">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.panelImg}
            src="/images/hero/sailboat-sunset.jpg"
            alt="Veleiro ao pôr do sol no Rio Tejo, Patrão Mor Amora"
            width={960}
            height={1080}
            loading="lazy"
          />
          <div className={styles.panelOverlay} aria-hidden="true" />
          <div className={styles.panelBody}>
            <p className={styles.panelTag}>Rio Tejo · Amora</p>
            <h3 className={styles.panelTitle}>Patrão Mor<br />Amora</h3>
            <p className={styles.panelDesc}>
              Cursos de navegação, formação náutica e experiências únicas no Rio Tejo.
              Aprenda a navegar com segurança desde 1981.
            </p>
            <Link href="/amora" className={styles.panelCta} aria-label="Entrar no site da Patrão Mor Amora">
              Explorar <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        {/* OEIRAS */}
        <article className={styles.destPanel} aria-label="Patrão Mor Oeiras">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.panelImg}
            src="https://www.patraomor.pt/assets/components/phpthumbof/cache/vela.052b6e58d3b34bdcb79df2779cd1b77b.jpg"
            alt="Veleiro em mar aberto ao largo de Oeiras, Patrão Mor"
            width={960}
            height={1080}
            loading="lazy"
          />
          <div className={styles.panelOverlay} aria-hidden="true" />
          <div className={styles.panelBody}>
            <p className={styles.panelTag}>Linha de Cascais · Oeiras</p>
            <h3 className={styles.panelTitle}>Patrão Mor<br />Oeiras</h3>
            <p className={styles.panelDesc}>
              Formação náutica moderna junto à linha de Cascais. Certificações DGRM,
              instrutores experientes e localização privilegiada no Atlântico.
            </p>
            <a
              href="https://www.patraomor.pt"
              className={styles.panelCta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar no site da Patrão Mor Oeiras"
            >
              Entrar <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.patraomor.pt/assets/themes/patraomor/images/footer/logotipo_patrao_mor_footer.png"
          alt="Patrão Mor"
          className={styles.footerLogo}
          width={140}
          height={40}
          loading="lazy"
        />
        <p className={styles.footerCopy}>Patrão Mor © {new Date().getFullYear()}</p>
        <nav className={styles.footerLinks} aria-label="Links rodapé">
          <a href="mailto:geral@patraomor.pt">Contactos</a>
          <a href="https://www.instagram.com/patrao_mor/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/PatraoMorformacao/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/company/patr-o-mor---forma-o-n-utica-lda-/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <p className={styles.footerCert}>Entidade Formadora Reconhecida pela DGRM</p>
      </footer>

    </div>
  );
}
