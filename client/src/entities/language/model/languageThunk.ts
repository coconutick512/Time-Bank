import i18n from '@/shared/i18n';
import { setLanguage } from './languageSlice';

export const changeLanguage =
  (lang: string) =>
  (dispatch: (arg0: { payload: string; type: 'language/setLanguage' }) => void) => {
    void i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
  };
