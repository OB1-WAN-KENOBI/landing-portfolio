import { useLanguage } from "../../../app/providers/language/useLanguage";
import { getTranslation } from "./i18n";

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return { t, language };
};
