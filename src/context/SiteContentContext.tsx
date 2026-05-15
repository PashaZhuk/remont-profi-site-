import { createContext, useContext, ReactNode } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';
import type { SiteContent, Service } from '@/types';

interface SiteContentContextValue {
  content: SiteContent;
  updateHero: (hero: SiteContent['hero']) => void;
  updateAbout: (about: SiteContent['about']) => void;
  updateContacts: (contacts: SiteContent['contacts']) => void;
  updateCompanyName: (name: string) => void;
  updateLogo: (logo: string) => void;
  updateSeo: (seo: SiteContent['seo']) => void;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const value = useSiteContent();
  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContentContext() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContentContext must be used within SiteContentProvider');
  return ctx;
}
