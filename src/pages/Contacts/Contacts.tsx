import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { SiteContent } from '@/types';
import styles from './Contacts.module.css';

interface Props {
  content: SiteContent;
}

export function Contacts({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Контакты — {content.companyName}</title>
        <meta name="description" content={`Контакты компании ${content.companyName}: телефон, email, адрес. Свяжитесь с нами для консультации по ремонту.`} />
      </Helmet>

      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Контакты</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h3 className={styles.infoTitle}>Телефон</h3>
                  <div className={styles.infoValue}>
                    <a href={`tel:${content.contacts.phone.replace(/\D/g, '')}`}>
                      {content.contacts.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>✉️</div>
                <div>
                  <h3 className={styles.infoTitle}>Email</h3>
                  <div className={styles.infoValue}>
                    <a href={`mailto:${content.contacts.email}`}>
                      {content.contacts.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h3 className={styles.infoTitle}>Адрес</h3>
                  <div className={styles.infoValue}>{content.contacts.address}</div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🕐</div>
                <div>
                  <h3 className={styles.infoTitle}>Режим работы</h3>
                  <div className={styles.infoValue}>{content.contacts.workHours}</div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className={styles.successMsg}>
                  <h3>✅ Спасибо за обращение!</h3>
                  <p>Мы свяжемся с вами в ближайшее время в рабочее время.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>Напишите нам</h2>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ваше имя *</label>
                    <input type="text" className={styles.formInput} required placeholder="Иван Иванов" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Телефон *</label>
                    <input type="tel" className={styles.formInput} required placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input type="email" className={styles.formInput} placeholder="example@email.ru" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Сообщение</label>
                    <textarea className={styles.formTextarea} placeholder="Опишите ваш проект..." />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className={styles.mapPlaceholder}>
            <span>🗺️</span>
            <p>Здесь будет карта — {content.contacts.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
