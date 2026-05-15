import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import type { SiteContent } from '@/types';
import styles from './Services.module.css';

interface Props {
  content: SiteContent;
}

export function Services({ content }: Props) {
  return (
    <>
      <Helmet>
        <title>Услуги по ремонту квартир — {content.companyName}</title>
        <meta name="description" content="Полный спектр услуг по ремонту квартир и домов: косметический, капитальный, дизайн-проект, электромонтаж, сантехника." />
      </Helmet>

      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Наши услуги</h1>
          <p className={styles.headerSubtitle}>Предлагаем полный комплекс работ по ремонту и отделке</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {content.services.map(service => (
              <div key={service.id} className={styles.card}>
                <div className={styles.icon}>{service.icon}</div>
                <h2 className={styles.title}>{service.title}</h2>
                <p className={styles.desc}>{service.description}</p>
                <span className={styles.price}>{service.price}</span>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Не нашли нужную услугу?</h2>
            <p className={styles.ctaText}>Свяжитесь с нами — мы выполним работы любой сложности</p>
            <Link to="/contacts" className="btn btn-primary">Связаться с нами</Link>
          </div>
        </div>
      </section>
    </>
  );
}
