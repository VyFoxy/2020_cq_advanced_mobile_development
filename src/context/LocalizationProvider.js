import { useEffect, createContext, useState, useMemo } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
// import { useTranslation } from "react-i18next";
import { en, vi } from '../language/localizations';
const LocalizationContext = createContext({});

export function LocalizationProvider({ children }) {
  let [locale, setLocale] = useState(Localization.locale);
  i18n.fallbacks = true;
  i18n.translations = { en, vi };
  i18n.locale = locale;
  //   const [auth, setAuth] = useState();
  const value = useMemo(
    () => ({ i18n, locale, setLocale }),
    [i18n, locale, setLocale]
  );
  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export default LocalizationContext;
