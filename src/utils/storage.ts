const STORAGE_KEY = 'renovation-site-content';
const AUTH_KEY = 'renovation-site-auth';

export const storage = {
  getContent<T>(defaultContent: T): T {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as T;
    } catch {}
    return defaultContent;
  },

  saveContent(content: unknown): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  },

  isAdmin(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  },

  login(password: string): boolean {
    if (password === 'admin123') {
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  },
};
