import { CommentsSection } from '@/components/comments';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Cronoss</span>
        </div>
        <nav className={styles.nav}>
          {/* <span className={styles.navItem}>Programas</span> */}
          {/* <span className={styles.navItem}>Mi Progreso</span> */}
        </nav>
      </header>
      <main className={styles.main}>
        <CommentsSection />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerLogo}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Cronoss
          </span>
          <span className={styles.footerText}>Plataforma Educativa</span>
        </div>
      </footer>
    </div>
  );
}
