// ===== Site Content Types =====

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workHours: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  stats: { label: string; value: string }[];
  image: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
}

export interface SiteContent {
  companyName: string;
  logo: string; // SVG data URL or text
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  contacts: ContactInfo;
  seo: SeoMeta;
  footer: {
    copyright: string;
    socialLinks: { label: string; url: string }[];
  };
}

// ===== Quiz Types =====

export type RoomType = 'комната' | 'квартира' | 'дом';
export type WorkType = 'косметический' | 'капитальный' | 'дизайн + ремонт';

export interface QuizStep {
  id: number;
  title: string;
  question: string;
  type: 'single' | 'multi' | 'input' | 'contact';
  options?: { label: string; value: string; price?: number }[];
  placeholder?: string;
}

export interface QuizAnswers {
  roomType: string;
  area: string;
  workType: string;
  additionalWork: string[];
  name: string;
  phone: string;
}

// ===== Admin Types =====

export interface AdminState {
  isAuthenticated: boolean;
  user: string | null;
}
