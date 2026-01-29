import { CommentsSection } from '@/components/comments';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg
            width="28"
            height="14"
            viewBox="0 0 28 14"
            fill="none"
          >
            <path
              d="M7 1C3.5 1 1 3.5 1 7s2.5 6 6 6c2.5 0 4.5-1.5 5.5-3.5L14 7l1.5 2.5C16.5 11.5 18.5 13 21 13c3.5 0 6-2.5 6-6s-2.5-6-6-6c-2.5 0-4.5 1.5-5.5 3.5L14 7l-1.5-2.5C11.5 2.5 9.5 1 7 1z"
              stroke="#00E5CC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
              width="20"
              height="10"
              viewBox="0 0 28 14"
              fill="none"
            >
              <path
                d="M7 1C3.5 1 1 3.5 1 7s2.5 6 6 6c2.5 0 4.5-1.5 5.5-3.5L14 7l1.5 2.5C16.5 11.5 18.5 13 21 13c3.5 0 6-2.5 6-6s-2.5-6-6-6c-2.5 0-4.5 1.5-5.5 3.5L14 7l-1.5-2.5C11.5 2.5 9.5 1 7 1z"
                stroke="#00E5CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cronoss
          </span>
          <span className={styles.footerText}>Plataforma Educativa</span>
        </div>
      </footer>
    </div>
  );
}
