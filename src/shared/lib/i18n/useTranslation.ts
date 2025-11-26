import { useCallback } from "react";
import { useLanguage } from "../../../app/providers/language/useLanguage";
import { getTranslation } from "./i18n";

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string): string => {
      return getTranslation(key, language);
    },
    [language]
  );

  return { t, language };
};
