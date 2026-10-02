import fr from '@/content/fr.json';
import en from '@/content/en.json';
export type Lang = 'fr' | 'en';
export const getLang = (l: string): Lang => (l === 'en' ? 'en' : 'fr');
export const getDict = (l: string) => (l === 'en' ? en : fr);
