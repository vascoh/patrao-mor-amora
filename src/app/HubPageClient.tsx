import Link from "next/link";
import styles from "./hub.module.css";

export function HubPageClient() {
  return (
    <div className={styles.hub}>

      {/* Full-bleed background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOverlay} />
      </div>

      {/* Top: logo */}
      <header className={styles.header}>
        <div className={styles.anchor} aria-hidden="true">⚓</div>
        <div className={styles.brand}>
          <span className={styles.brandName}>Patrão Mor</span>
          <span className={styles.brandSub}>Formação Náutica Certificada · Escola Náutica DGRM</span>
        </div>
      </header>

      {/* Center: two cards */}
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
            <span className={styles.cardTag}>Linha de Cascais · Oeiras</span>
            <h2 className={styles.cardTitle}>Patrão Mor</h2>
            <p className={styles.cardDesc}>Aceda ao website principal.</p>
            <span className={styles.cardBtn}>
              Entrar
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className={styles.btnArrow}>
                <path d="M1 6.5h11M7 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          {/* Amora */}
          <Link
            href="/amora"
            className={styles.card}
            role="listitem"
            aria-label="Patrão Mor Amora — Explorar a unidade da Amora"
          >
            <span className={styles.cardTag}>Rio Tejo · Amora</span>
            <h2 className={styles.cardTitle}>Patrão Mor Amora</h2>
            <p className={styles.cardDesc}>Explore a unidade da Amora.</p>
            <span className={styles.cardBtn}>
              Explorar
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className={styles.btnArrow}>
                <path d="M1 6.5h11M7 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

        </div>
      </main>

      {/* Bottom: minimal footer */}
      <footer className={styles.footer}>
        <span className={styles.footerCopy}>© {new Date().getFullYear()} Patrão Mor</span>
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
