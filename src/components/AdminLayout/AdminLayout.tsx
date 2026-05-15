import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { defaultContent } from '@/data/default-content';
import styles from './AdminLayout.module.css';

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.logout();
    navigate('/admin');
  };

  const navLinks = [
    { to: '/admin/dashboard', label: '📊 Дашборд' },
    { to: '/admin/content', label: '📝 Контент' },
    { to: '/admin/services', label: '🔧 Услуги' },
    { to: '/admin/contacts', label: '📞 Контакты' },
    { to: '/', label: '👁️ На сайт' },
  ];

  const sidebarContent = (
    <>
      <NavLink to="/admin/dashboard" className={styles.sidebarLogo}>
        <span className={styles.sidebarLogoIcon} dangerouslySetInnerHTML={{ __html: defaultContent.logo }} />
        {defaultContent.companyName}
      </NavLink>

      <nav className={styles.sidebarNav}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin/dashboard'}
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className={`${styles.sidebarLink} ${styles.sidebarLinkLogout}`}
        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        🚪 Выйти
      </button>
    </>
  );

  return (
    <div className={styles.layout}>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar}>
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileDrawerHeader}>
            <span style={{ color: 'white', fontWeight: 700 }}>Админка</span>
            <button className={styles.mobileDrawerClose} onClick={() => setMobileOpen(false)}>
              ✕
            </button>
          </div>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={styles.mobileDrawerLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => { handleLogout(); setMobileOpen(false); }}
            className={styles.mobileDrawerLink}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#fca5a5' }}
          >
            🚪 Выйти
          </button>
        </div>
      )}

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.mobileTop}>
          <span className={styles.mobileTitle}>Админ-панель</span>
          <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(true)}>
            ☰
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
