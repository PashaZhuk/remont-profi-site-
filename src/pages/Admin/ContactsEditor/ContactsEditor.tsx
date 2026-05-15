import { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import styles from './ContactsEditor.module.css';

interface Props {
  content: SiteContent;
  onUpdateContacts: (contacts: SiteContent['contacts']) => void;
}

export function ContactsEditor({ content, onUpdateContacts }: Props) {
  const [toast, setToast] = useState('');
  const [phone, setPhone] = useState(content.contacts.phone);
  const [email, setEmail] = useState(content.contacts.email);
  const [address, setAddress] = useState(content.contacts.address);
  const [workHours, setWorkHours] = useState(content.contacts.workHours);

  useEffect(() => {
    setPhone(content.contacts.phone);
    setEmail(content.contacts.email);
    setAddress(content.contacts.address);
    setWorkHours(content.contacts.workHours);
  }, [content.contacts]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSave = () => {
    onUpdateContacts({ phone, email, address, workHours });
    showToast('Контакты сохранены!');
  };

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}
      <h1 className={styles.title}>Редактировать контакты</h1>

      <div className={styles.section}>
        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input
            className={styles.input}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="info@example.ru"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Адрес</label>
          <input
            className={styles.input}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="г. Москва, ул. Строителей, д. 10"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Режим работы</label>
          <input
            className={styles.input}
            value={workHours}
            onChange={e => setWorkHours(e.target.value)}
            placeholder="Пн-Пт: 9:00-18:00"
          />
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          Сохранить контакты
        </button>
      </div>
    </div>
  );
}
