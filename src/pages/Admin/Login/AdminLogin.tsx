import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { defaultContent } from '@/data/default-content';
import styles from './AdminLogin.module.css';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (storage.login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          <div
            className={styles.loginLogoIcon}
            dangerouslySetInnerHTML={{ __html: defaultContent.logo }}
          />
          <h1 className={styles.loginTitle}>Вход в админку</h1>
          <p className={styles.loginSubtitle}>{defaultContent.companyName}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              autoFocus
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            Войти
          </button>
        </form>

        <p className={styles.hint}>Пароль по умолчанию: admin123</p>
      </div>
    </div>
  );
}
