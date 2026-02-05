import { en } from './en';
import { fr } from './fr';
import { sw } from './sw';

export type LocaleCode = 'en' | 'fr' | 'sw';

export const locales: Record<LocaleCode, typeof en> = {
  en,
  fr,
  sw,
};

export const localeNames: Record<LocaleCode, string> = {
  en: 'English',
  fr: 'Français',
  sw: 'Kiswahili',
};

export { en, fr, sw };

// Get nested value by dot path, e.g. 'nav.browseAuctions'
function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
}

export function t(localeCode: LocaleCode, key: string): string {
  const locale = locales[localeCode];
  if (!locale) return key;
  const value = getNested(locale as unknown as Record<string, unknown>, key);
  return value ?? key;
}
