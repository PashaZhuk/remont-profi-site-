import { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import styles from './ContentEditor.module.css';

interface Props {
  content: SiteContent;
  onUpdateHero: (hero: SiteContent['hero']) => void;
  onUpdateAbout: (about: SiteContent['about']) => void;
  onUpdateCompanyName: (name: string) => void;
  onUpdateLogo: (logo: string) => void;
  onUpdateSeo: (seo: SiteContent['seo']) => void;
  onReset: () => void;
}

export function ContentEditor({ content, onUpdateHero, onUpdateAbout, onUpdateCompanyName, onUpdateLogo, onUpdateSeo, onReset }: Props) {
  const [toast, setToast] = useState('');

  const [companyName, setCompanyName] = useState(content.companyName);
  const [logoSvg, setLogoSvg] = useState(content.logo);
  const [heroTitle, setHeroTitle] = useState(content.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(content.hero.subtitle);
  const [heroCta, setHeroCta] = useState(content.hero.ctaText);
  const [aboutTitle, setAboutTitle] = useState(content.about.title);
  const [aboutP1, setAboutP1] = useState(content.about.paragraphs[0] || '');
  const [aboutP2, setAboutP2] = useState(content.about.paragraphs[1] || '');
  const [aboutP3, setAboutP3] = useState(content.about.paragraphs[2] || '');
  const [seoTitle, setSeoTitle] = useState(content.seo.title);
  const [seoDesc, setSeoDesc] = useState(content.seo.description);
  const [seoKeywords, setSeoKeywords] = useState(content.seo.keywords);

  useEffect(() => {
    setCompanyName(content.companyName);
    setLogoSvg(content.logo);
    setHeroTitle(content.hero.title);
    setHeroSubtitle(content.hero.subtitle);
    setHeroCta(content.hero.ctaText);
    setAboutTitle(content.about.title);
    setAboutP1(content.about.paragraphs[0] || '');
    setAboutP2(content.about.paragraphs[1] || '');
    setAboutP3(content.about.paragraphs[2] || '');
    setSeoTitle(content.seo.title);
    setSeoDesc(content.seo.description);
    setSeoKeywords(content.seo.keywords);
  }, [content]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSaveBasic = () => {
    onUpdateCompanyName(companyName);
    onUpdateLogo(logoSvg);
    showToast('Сохранено!');
  };

  const handleSaveHero = () => {
    onUpdateHero({ title: heroTitle, subtitle: heroSubtitle, ctaText: heroCta, backgroundImage: '' });
    showToast('Сохранено!');
  };

  const handleSaveAbout = () => {
    onUpdateAbout({
      title: aboutTitle,
      paragraphs: [aboutP1, aboutP2, aboutP3],
      stats: content.about.stats,
      image: '',
    });
    showToast('Сохранено!');
  };

  const handleSaveSeo = () => {
    onUpdateSeo({ title: seoTitle, description: seoDesc, keywords: seoKeywords });
    showToast('Сохранено!');
  };

  const handleReset = () => {
    if (window.confirm('Сбросить весь контент к заводским настройкам?')) {
      onReset();
      showToast('Контент сброшен!');
    }
  };

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <div className={styles.header}>
        <h1 className={styles.title}>Редактор контента</h1>
      </div>

      {/* Basic Info */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Основная информация</h2>
        <div className={styles.field}>
          <label className={styles.label}>Название компании</label>
          <input
            className={styles.input}
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Логотип (SVG-код)</label>
          <div className={styles.logoPreview} dangerouslySetInnerHTML={{ __html: logoSvg }} />
          <textarea
            className={styles.textarea}
            value={logoSvg}
            onChange={e => setLogoSvg(e.target.value)}
            rows={6}
            placeholder='<svg xmlns="...">...</svg>'
          />
        </div>
        <button className={styles.saveBtn} onClick={handleSaveBasic}>Сохранить</button>
      </div>

      {/* Hero */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Главный экран (Hero)</h2>
        <div className={styles.field}>
          <label className={styles.label}>Заголовок</label>
          <input className={styles.input} value={heroTitle} onChange={e => setHeroTitle(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Подзаголовок</label>
          <textarea className={styles.textarea} value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} rows={3} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Текст кнопки CTA</label>
          <input className={styles.input} value={heroCta} onChange={e => setHeroCta(e.target.value)} />
        </div>
        <button className={styles.saveBtn} onClick={handleSaveHero}>Сохранить</button>
      </div>

      {/* About */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>О компании</h2>
        <div className={styles.field}>
          <label className={styles.label}>Заголовок</label>
          <input className={styles.input} value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Параграф 1</label>
          <textarea className={styles.textarea} value={aboutP1} onChange={e => setAboutP1(e.target.value)} rows={3} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Параграф 2</label>
          <textarea className={styles.textarea} value={aboutP2} onChange={e => setAboutP2(e.target.value)} rows={3} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Параграф 3</label>
          <textarea className={styles.textarea} value={aboutP3} onChange={e => setAboutP3(e.target.value)} rows={3} />
        </div>
        <button className={styles.saveBtn} onClick={handleSaveAbout}>Сохранить</button>
      </div>

      {/* SEO */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>SEO</h2>
        <div className={styles.field}>
          <label className={styles.label}>Title (заголовок страницы)</label>
          <input className={styles.input} value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description (описание)</label>
          <textarea className={styles.textarea} value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={3} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Keywords (ключевые слова)</label>
          <input className={styles.input} value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} />
        </div>
        <button className={styles.saveBtn} onClick={handleSaveSeo}>Сохранить</button>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Сбросить всё к настройкам по умолчанию
        </button>
      </div>
    </div>
  );
}
