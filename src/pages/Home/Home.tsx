import { Link } from 'react-router-dom';
import type { SiteContent } from '@/types';
import { Quiz } from '@/components/Quiz/Quiz';
import styles from './Home.module.css';

interface Props {
  content: SiteContent;
}

export function Home({ content }: Props) {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Работаем по договору</span>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          <div className={styles.heroActions}>
            <Link to="/quiz" className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
              {content.hero.ctaText}
            </Link>
            <a href={`tel:${content.contacts.phone.replace(/\D/g, '')}`} className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '16px 36px', borderColor: 'white', color: 'white' }}>
              Позвонить
            </a>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>200+</span>
              <span className={styles.heroStatLabel}>Объектов сдано</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>8 лет</span>
              <span className={styles.heroStatLabel}>На рынке</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>5 лет</span>
              <span className={styles.heroStatLabel}>Гарантия</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <h2 className="section-title">Наши услуги</h2>
          <p className="section-subtitle">Выполняем ремонт любой сложности — от косметического до полного дизайн-проекта</p>
          <div className={styles.servicesGrid}>
            {content.services.map(service => (
              <div key={service.id} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
                <span className={styles.servicePrice}>{service.price}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/services" className="btn btn-primary">Все услуги →</Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <h2 className="section-title" style={{ textAlign: 'left' }}>{content.about.title}</h2>
              <p>{content.about.paragraphs[0]}</p>
              <p style={{ marginTop: '16px' }}>{content.about.paragraphs[1]}</p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '24px' }}>Подробнее о нас →</Link>
            </div>
            <div className={styles.aboutStats}>
              {content.about.stats.map(stat => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className={styles.quizSection}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>
            Рассчитайте стоимость ремонта за 2 минуты
          </h2>
          <p className={styles.quizSubtitle}>
            Ответьте на несколько вопросов — получите примерную смету сразу
          </p>
          <div className={styles.quizWrapper}>
            <Quiz />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Готовы начать ремонт?</h2>
          <p className="section-subtitle">Оставьте заявку — мы свяжемся с вами в ближайшее время</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href={`tel:${content.contacts.phone.replace(/\D/g, '')}`} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
              📞 {content.contacts.phone}
            </a>
            <Link to="/contacts" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
