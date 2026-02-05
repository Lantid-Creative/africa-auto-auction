import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { locales, t, type LocaleCode } from '@/locales';

const STORAGE_KEY = 'afriauto_lang';

interface LanguageContextType {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
      if (stored && locales[stored]) return stored;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const translate = useCallback(
    (key: string) => t(locale, key),
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
