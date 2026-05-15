import { Helmet } from 'react-helmet-async';
import { Quiz } from '@/components/Quiz/Quiz';
import styles from './QuizPage.module.css';

export function QuizPage() {
  return (
    <>
      <Helmet>
        <title>Калькулятор стоимости ремонта — РемонтПрофи</title>
        <meta name="description" content="Рассчитайте примерную стоимость ремонта вашей квартиры или дома за 2 минуты. Бесплатный онлайн-калькулятор." />
      </Helmet>

      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Калькулятор ремонта</h1>
          <p className={styles.headerSubtitle}>
            Ответьте на 5 вопросов и получите примерную стоимость работ
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⏱️</div>
              <div className={styles.featureLabel}>2 минуты</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <div className={styles.featureLabel}>Точная смета</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <div className={styles.featureLabel}>Без спама</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Quiz />
        </div>
      </section>
    </>
  );
}
