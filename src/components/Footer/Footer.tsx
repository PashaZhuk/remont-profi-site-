import { Link } from 'react-router-dom';
import type { SiteContent } from '@/types';
import styles from './Footer.module.css';

interface Props {
  content: SiteContent;
}

export function Footer({ content }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <div className={styles.brand}>
            <span className={styles.logoIcon} dangerouslySetInnerHTML={{ __html: content.logo }} />
            {content.companyName}
          </div>
          <p className={styles.description}>
            Профессиональный ремонт квартир и домов под ключ. Работаем по договору с гарантией до 5 лет.
          </p>
          <div className={styles.socialLinks}>
            {content.footer.socialLinks.map(link => (
              <a
                key={link.label}
                href={link.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className={styles.columnTitle}>Навигация</h4>
          <div className={styles.links}>
            <Link to="/">Главная</Link>
            <Link to="/services">Услуги</Link>
            <Link to="/about">О нас</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/quiz">Калькулятор</Link>
          </div>
        </div>

        <div>
          <h4 className={styles.columnTitle}>Контакты</h4>
          <div className={styles.contactItem}>
            <span>📞</span>
            <a href={`tel:${content.contacts.phone.replace(/\D/g, '')}`}>
              {content.contacts.phone}
            </a>
          </div>
          <div className={styles.contactItem}>
            <span>✉️</span>
            <a href={`mailto:${content.contacts.email}`}>{content.contacts.email}</a>
          </div>
          <div className={styles.contactItem}>
            <span>📍</span>
            <span>{content.contacts.address}</span>
          </div>
          <div className={styles.contactItem}>
            <span>🕐</span>
            <span>{content.contacts.workHours}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        {content.footer.copyright}
      </div>
    </footer>
  );
}
