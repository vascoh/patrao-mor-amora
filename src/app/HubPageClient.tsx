import Link from "next/link";
import styles from "./hub.module.css";

export function HubPageClient() {
  return (
    <div className={styles.hub}>

      {/* Full-bleed background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOverlay} />
      </div>

      {/* Header — dark pill badge floating on the scene */}
      <header className={styles.header}>
        <span className={styles.anchor} aria-hidden="true">⚓</span>
        <div className={styles.brand}>
          <span className={styles.brandName}>Patrão Mor</span>
          <span className={styles.brandSub}>Formação Náutica Certificada · DGRM</span>
        </div>
      </header>

      {/* Two choice cards */}
      <main className={styles.main} id="main-content">
        <div className={styles.cards} role="list">

          {/* Oeiras */}
          <a
            href="https://www.patraomor.pt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            role="listitem"
            aria-label="Patrão Mor — Aceder ao website principal em Oeiras"
          >
            <div className={styles.cardPhoto}>
              <img
                src="/images/courses/vela.jpg"
                alt="Veleiro em navegação — escola náutica Patrão Mor"
                className={styles.cardImg}
                loading="eager"
                width="480"
                height="320"
              />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>Linha de Cascais · Oeiras</span>
              <h2 className={styles.cardTitle}>Patrão Mor Oeiras</h2>
              <p className={styles.cardDesc}>Aceda ao website principal.</p>
              <span className={styles.cardBtn}>
                Entrar
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.btnArrow}>
                  <path d="M1 6h10M6.5 1.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </a>

          {/* Amora */}
          <Link
            href="/amora"
            className={styles.card}
            role="listitem"
            aria-label="Patrão Mor Amora — Explorar a unidade do Rio Tejo"
          >
            <div className={styles.cardPhoto}>
              <img
                src="/images/about/marina.jpg"
                alt="Marina Patrão Mor Amora, Rio Tejo"
                className={styles.cardImg}
                loading="eager"
                width="480"
                height="320"
              />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>Rio Tejo · Amora</span>
              <h2 className={styles.cardTitle}>Patrão Mor Amora</h2>
              <p className={styles.cardDesc}>Explore a unidade da Amora.</p>
              <span className={styles.cardBtn}>
                Explorar
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.btnArrow}>
                  <path d="M1 6h10M6.5 1.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>

        </div>
      </main>

      {/* Minimal footer */}
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Patrão Mor</span>
        <span className={styles.dot} aria-hidden="true">·</span>
        <a href="mailto:geral@patraomor.pt" className={styles.footerLink}>Contacto</a>
        <span className={styles.dot} aria-hidden="true">·</span>
        <a
          href="https://www.instagram.com/patrao_mor/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          Instagram
        </a>
      </footer>

    </div>
  );
}
