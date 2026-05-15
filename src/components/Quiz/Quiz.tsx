import { useState, useCallback, useMemo } from 'react';
import styles from './Quiz.module.css';

interface QuizAnswer {
  roomType: string;
  area: string;
  workType: string;
  additionalWork: string[];
  name: string;
  phone: string;
}

interface QuizOption {
  label: string;
  value: string;
  price?: number;
  icon?: string;
}

const steps = [
  {
    id: 1,
    title: 'Тип помещения',
    question: 'Какое помещение нужно отремонтировать?',
    type: 'single' as const,
    options: [
      { label: 'Комната', value: 'room', icon: '🛏️', price: 0 },
      { label: 'Квартира', value: 'apartment', icon: '🏢', price: 0 },
      { label: 'Дом / Коттедж', value: 'house', icon: '🏠', price: 0 },
    ],
  },
  {
    id: 2,
    title: 'Площадь',
    question: 'Примерная площадь помещения?',
    type: 'single' as const,
    options: [
      { label: 'До 30 м²', value: 'small', icon: '📐', price: 0 },
      { label: '30-60 м²', value: 'medium', icon: '📏', price: 0 },
      { label: '60-100 м²', value: 'large', icon: '📐', price: 0 },
      { label: 'Более 100 м²', value: 'xlarge', icon: '🏗️', price: 0 },
    ],
  },
  {
    id: 3,
    title: 'Тип ремонта',
    question: 'Какой тип ремонта вас интересует?',
    type: 'single' as const,
    options: [
      { label: 'Косметический', value: 'cosmetic', icon: '🔄', price: 2500 },
      { label: 'Капитальный', value: 'capital', icon: '🏗️', price: 6000 },
      { label: 'Дизайн + Ремонт', value: 'design', icon: '🎨', price: 9000 },
    ],
  },
  {
    id: 4,
    title: 'Дополнительные работы',
    question: 'Выберите дополнительные работы (можно несколько)',
    type: 'multi' as const,
    options: [
      { label: 'Электромонтаж', value: 'electrical', icon: '⚡', price: 30000 },
      { label: 'Сантехника', value: 'plumbing', icon: '🔧', price: 40000 },
      { label: 'Замена окон', value: 'windows', icon: '🪟', price: 25000 },
      { label: 'Монтаж дверей', value: 'doors', icon: '🚪', price: 15000 },
      { label: 'Кондиционирование', value: 'ac', icon: '❄️', price: 35000 },
      { label: 'Тёплый пол', value: 'floor', icon: '🔥', price: 20000 },
    ],
  },
  {
    id: 5,
    title: 'Контакты',
    question: 'Оставьте контакты — мы рассчитаем точную стоимость',
    type: 'contact' as const,
  },
];

const areaMultiplier: Record<string, number> = {
  small: 1,
  medium: 1.5,
  large: 2.2,
  xlarge: 3.5,
};

const roomTypeMultiplier: Record<string, number> = {
  room: 1,
  apartment: 1.2,
  house: 1.4,
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({
    roomType: '',
    area: '',
    workType: '',
    additionalWork: [],
    name: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentStep = steps[step];

  const handleSelect = useCallback((value: string) => {
    setAnswers(prev => {
      if (step === 0) return { ...prev, roomType: value };
      if (step === 1) return { ...prev, area: value };
      if (step === 2) return { ...prev, workType: value };
      return prev;
    });
  }, [step]);

  const handleMultiSelect = useCallback((value: string) => {
    setAnswers(prev => ({
      ...prev,
      additionalWork: prev.additionalWork.includes(value)
        ? prev.additionalWork.filter(v => v !== value)
        : [...prev.additionalWork, value],
    }));
  }, []);

  const handleInputChange = useCallback((field: 'name' | 'phone', value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  const canProceed = useMemo(() => {
    if (step === 0) return !!answers.roomType;
    if (step === 1) return !!answers.area;
    if (step === 2) return !!answers.workType;
    if (step === 3) return true;
    if (step === 4) return answers.name.trim().length > 0 && answers.phone.trim().length > 5;
    return false;
  }, [step, answers]);

  const handleNext = useCallback(() => {
    if (!canProceed) return;
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      setSubmitted(true);
    }
  }, [canProceed, step, totalSteps]);

  const handleBack = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
  }, [step]);

  const estimatedPrice = useMemo(() => {
    const workPrice = answers.workType
      ? steps[2].options?.find(o => o.value === answers.workType)?.price || 0
      : 0;
    const areaMult = areaMultiplier[answers.area] || 1;
    const roomMult = roomTypeMultiplier[answers.roomType] || 1;
    const additional = answers.additionalWork.reduce((sum, v) => {
      const opt = steps[3].options?.find(o => o.value === v);
      return sum + (opt?.price || 0);
    }, 0);
    return Math.round(workPrice * areaMult * roomMult + additional);
  }, [answers]);

  const defaultMultiplier = areaMultiplier[answers.area] || 1;

  const getPriceText = (basePrice?: number) => {
    if (!basePrice) return '';
    return `+ ~${(basePrice * defaultMultiplier * (roomTypeMultiplier[answers.roomType] || 1)).toLocaleString()} ₽`;
  };

  if (submitted) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.content}>
          <div className={styles.result}>
            <div className={styles.resultIcon}>✅</div>
            <div className={styles.resultTitle}>Спасибо за заявку!</div>
            <div className={styles.resultText}>
              Мы получили ваши данные. Ожидайте звонка в ближайшее время.
            </div>
            <div className={styles.resultPrice}>
              Примерная стоимость: от {estimatedPrice.toLocaleString()} ₽
            </div>
            <div className={styles.successMessage}>
              <strong>{answers.name}</strong>, мы перезвоним вам по номеру <strong>{answers.phone}</strong> в течение 15 минут в рабочее время.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.stepIndicator}>
        Шаг {step + 1} из {totalSteps} — {currentStep.title}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{currentStep.question}</h3>

        {currentStep.type === 'single' && currentStep.options && (
          <div className={styles.optionGrid}>
            {currentStep.options.map(opt => {
              const selected = step === 0 ? answers.roomType === opt.value
                : step === 1 ? answers.area === opt.value
                : answers.workType === opt.value;
              return (
                <button
                  key={opt.value}
                  className={`${styles.optionCard} ${selected ? styles.selected : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.icon && <span className={styles.optionIcon}>{opt.icon}</span>}
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {opt.price && step === 2 && (
                    <span className={styles.optionPrice}>от {opt.price.toLocaleString()} ₽/м²</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {currentStep.type === 'multi' && currentStep.options && (
          <div className={styles.checkboxGrid}>
            {currentStep.options.map(opt => {
              const selected = answers.additionalWork.includes(opt.value);
              const priceText = answers.area ? getPriceText(opt.price) : '';
              return (
                <label
                  key={opt.value}
                  className={`${styles.checkboxItem} ${selected ? styles.selected : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleMultiSelect(opt.value)}
                  />
                  <span>{opt.icon} {opt.label}</span>
                  {opt.price && (
                    <span className={styles.optionPrice}>+{opt.price.toLocaleString()} ₽</span>
                  )}
                </label>
              );
            })}
          </div>
        )}

        {currentStep.type === 'contact' && (
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Ваше имя *"
              className={styles.input}
              value={answers.name}
              onChange={e => handleInputChange('name', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Номер телефона *"
              className={styles.input}
              value={answers.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.backBtn}
            onClick={handleBack}
            disabled={step === 0}
          >
            ← Назад
          </button>
          <button
            className={styles.nextBtn}
            onClick={handleNext}
            disabled={!canProceed}
          >
            {step < totalSteps - 1 ? 'Далее →' : 'Получить расчёт'}
          </button>
        </div>
      </div>
    </div>
  );
}
