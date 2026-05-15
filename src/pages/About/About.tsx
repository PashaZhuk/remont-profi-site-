import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import type { SiteContent } from '@/types';
import styles from './About.module.css';

interface Props {
  content: SiteContent;
}

const values = [
  { icon: '📋', title: 'Работа по договору', desc: 'Фиксируем сроки, стоимость и объём работ в договоре. Никаких скрытых платежей.' },
  { icon: '🛡️', title: 'Гарантия до 5 лет', desc: 'Даём письменную гарантию на все виды работ. В случае проблем исправляем бесплатно.' },
  { icon: '👷', title: 'Опытная команда', desc: 'Прорабы с профильным образованием и мастера с опытом от 5 лет. Регулярное повышение квалификации.' },
  { icon: '📦', title: 'Закупка материалов', desc: 'Снабжаем материалами со скидкой до 30% за счёт прямых поставок от производителей.' },
  { icon: '🧹', title: 'Чистота на объекте', desc: 'Ежедневная уборка после себя. После ремонта — генеральная уборка в подарок.' },
  { icon: '📱', title: 'Онлайн-отчёты', desc: 'Фото и видео процесса каждый день. Вы всегда видите, как идёт ремонт.' },
];

export function About({ content }: Props) {
  return (
    <>
      <Helmet>
        <title>О компании — {content.companyName}</title>
        <meta name="description" content={`Компания ${content.companyName} — профессиональный ремонт квартир и домов. Более 200 объектов, гарантия до 5 лет.`} />
      </Helmet>

      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>{content.about.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <div className={styles.textBlock}>
              {content.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <Link to="/quiz" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Рассчитать стоимость ремонта
              </Link>
            </div>

            <div className={styles.statsGrid}>
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

      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <h2 className="section-title">Наши ценности</h2>
          <p className="section-subtitle">Почему клиенты выбирают нас и возвращаются снова</p>
          <div className={styles.valuesGrid}>
            {values.map(v => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
