import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  setLanguage as setI18nLanguage,
  type Language,
} from "../../../shared/lib/i18n";
import { storage } from "../../../shared/lib/storage/localStorage";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "portfolio_language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const validator = (value: unknown): value is Language => {
      return value === "ru" || value === "en";
    };
    return storage.get<Language>(STORAGE_KEY, "ru", validator);
  });

  useEffect(() => {
    setI18nLanguage(language);
    storage.set(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ru" ? "en" : "ru"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
