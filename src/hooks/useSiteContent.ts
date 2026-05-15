import { useState, useEffect, useCallback } from 'react';
import type { SiteContent, Service } from '@/types';
import { defaultContent } from '@/data/default-content';
import { storage } from '@/utils/storage';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() =>
    storage.getContent(defaultContent)
  );

  useEffect(() => {
    storage.saveContent(content);
  }, [content]);

  const updateHero = useCallback((hero: SiteContent['hero']) => {
    setContent(prev => ({ ...prev, hero }));
  }, []);

  const updateAbout = useCallback((about: SiteContent['about']) => {
    setContent(prev => ({ ...prev, about }));
  }, []);

  const updateContacts = useCallback((contacts: SiteContent['contacts']) => {
    setContent(prev => ({ ...prev, contacts }));
  }, []);

  const updateCompanyName = useCallback((companyName: string) => {
    setContent(prev => ({ ...prev, companyName }));
  }, []);

  const updateLogo = useCallback((logo: string) => {
    setContent(prev => ({ ...prev, logo }));
  }, []);

  const updateSeo = useCallback((seo: SiteContent['seo']) => {
    setContent(prev => ({ ...prev, seo }));
  }, []);

  const addService = useCallback((service: Service) => {
    setContent(prev => ({
      ...prev,
      services: [...prev.services, service],
    }));
  }, []);

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map(s =>
        s.id === id ? { ...s, ...updates } : s
      ),
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id),
    }));
  }, []);

  const resetContent = useCallback(() => {
    setContent(structuredClone(defaultContent));
  }, []);

  return {
    content,
    updateHero,
    updateAbout,
    updateContacts,
    updateCompanyName,
    updateLogo,
    updateSeo,
    addService,
    updateService,
    deleteService,
    resetContent,
  };
}
