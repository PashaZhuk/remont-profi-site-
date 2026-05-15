import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { SiteContent } from '@/types';
import styles from './Header.module.css';

interface Props {
  content: SiteContent;
}

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О нас' },
  { to: '/contacts', label: 'Контакты' },
  { to: '/quiz', label: 'Калькулятор' },
];

export function Header({ content }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span
              className={styles.logoIcon}
              dangerouslySetInnerHTML={{ __html: content.logo }}
            />
            <span>{content.companyName}</span>
          </Link>

          <nav className={styles.nav}>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href={`tel:${content.contacts.phone.replace(/\D/g, '')}`} className={styles.phoneLink}>
              {content.contacts.phone}
            </a>
          </nav>

          <button
            className={styles.burger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a
          href={`tel:${content.contacts.phone.replace(/\D/g, '')}`}
          className={styles.phoneLink}
          style={{ padding: '12px 0', display: 'block' }}
        >
          {content.contacts.phone}
        </a>
      </div>
    </>
  );
}
