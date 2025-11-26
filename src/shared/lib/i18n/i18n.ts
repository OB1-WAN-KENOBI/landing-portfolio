import ruDictionary from "./dictionary/ru.json";
import enDictionary from "./dictionary/en.json";

export type Language = "ru" | "en";

type Dictionary = Record<string, string>;

const dictionaries: Record<Language, Dictionary> = {
  ru: ruDictionary,
  en: enDictionary,
};

let currentLanguage: Language = "ru";

export const getLanguage = (): Language => {
  return currentLanguage;
};

export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
};

export const getTranslation = (key: string, lang?: Language): string => {
  const language = lang || currentLanguage;
  const dictionary = dictionaries[language];
  return dictionary[key] || key;
};
