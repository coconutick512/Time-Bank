import React, { useEffect } from 'react';
import { useAppSelector } from '@/shared/hooks/hooks';
import { useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { changeLanguage } from '@/entities/language/model/languageThunk';

export const LanguageInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const currentLanguage = useAppSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    const match = /(?:^|; )lang=([^;]*)/.exec(document.cookie);
    const langFromCookie = match ? match[1] : 'ru';
    if (langFromCookie !== currentLanguage) {
      dispatch(changeLanguage(langFromCookie));
    }
  }, [dispatch, currentLanguage]);

  return <>{children}</>;
};
