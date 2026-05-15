import { Link, useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import styles from './Dashboard.module.css';

const cards = [
  { to: '/admin/content', icon: '📝', title: 'Основной контент', desc: 'Редактировать название компании, логотип, SEO, главный экран и текст "О нас"' },
  { to: '/admin/services', icon: '🔧', title: 'Услуги', desc: 'Добавлять, редактировать и удалять услуги с ценами и описанием' },
  { to: '/admin/contacts', icon: '📞', title: 'Контакты', desc: 'Изменить телефон, email, адрес и режим работы' },
  { to: '/', icon: '👁️', title: 'Просмотр сайта', desc: 'Посмотреть, как сайт выглядит со стороны посетителя' },
];

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.logout();
    navigate('/admin');
  };

  return (
    <div className={styles.dashboard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className={styles.title}>Панель управления</h1>
          <p className={styles.subtitle}>Управляйте содержимым сайта</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
          Выйти
        </button>
      </div>

      <div className={styles.grid}>
        {cards.map(card => (
          <Link key={card.to} to={card.to} className={styles.card}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <div>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
