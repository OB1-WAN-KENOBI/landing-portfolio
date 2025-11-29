import type { ApiProject, ApiSkill, ApiProfile } from "../../api/http/types";
import type { Project, Skill, HeroData } from "../../api/domainTypes";
import type { Language } from "../../lib/i18n/i18n";
import { API_BASE_URL } from "../../config/api";

// Type guards для проверки локализованных строк
function isLocalizedString(value: unknown): value is Record<Language, string> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return (
    "ru" in obj &&
    "en" in obj &&
    typeof obj.ru === "string" &&
    typeof obj.en === "string"
  );
}

function isLocalizedStringArray(
  value: unknown
): value is Record<Language, string[]> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(
      (v) => Array.isArray(v) && v.every((item) => typeof item === "string")
    )
  );
}

function getLocalizedValue(
  value: unknown,
  lang: Language,
  fallback: string = ""
): string {
  if (isLocalizedString(value)) {
    return value[lang] || fallback;
  }
  if (typeof value === "string") {
    return value;
  }
  return fallback;
}

function getLocalizedArray(
  value: unknown,
  lang: Language,
  fallback: string[] = []
): string[] {
  if (isLocalizedStringArray(value)) {
    return value[lang] || fallback;
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value;
  }
  return fallback;
}

export const normalizeProject = (
  apiProject: ApiProject,
  lang: Language = "ru"
): Project => {
  const title = getLocalizedValue(apiProject.title, lang);
  const description = getLocalizedValue(apiProject.description, lang);

  return {
    id: apiProject.id,
    title,
    description,
    techStack: Array.isArray(apiProject.techStack) ? apiProject.techStack : [],
    year: apiProject.year,
    status: apiProject.status,
    images: apiProject.images,
  };
};

export const normalizeSkill = (apiSkill: ApiSkill): Skill => {
  return {
    id: apiSkill.id,
    name: apiSkill.name,
    category: apiSkill.category,
    level: apiSkill.level,
    isCore: Boolean(apiSkill.isCore),
  };
};

export const normalizeProfile = (
  apiProfile: ApiProfile,
  lang: Language = "ru"
): HeroData & {
  aboutTexts: string[];
} => {
  const aboutTexts = getLocalizedArray(apiProfile.aboutTexts, lang);
  const role = getLocalizedValue(apiProfile.role, lang);
  const description = getLocalizedValue(apiProfile.description, lang);
  const resolvePhotoUrl = (url: unknown): string | undefined => {
    if (typeof url !== "string") return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    // Абсолютные ссылки без изменений
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    // Файлы, лежащие на фронте (public), можно отдавать как есть
    if (trimmed.startsWith("/") && !trimmed.startsWith("/uploads")) {
      return trimmed;
    }
    // Относительные ссылки для бэка (например /uploads/...)
    try {
      const base = new URL(API_BASE_URL);
      return `${base.origin}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
    } catch {
      return trimmed;
    }
  };
  const photoUrl = resolvePhotoUrl(apiProfile.photoUrl);

  return {
    name: apiProfile.name || "",
    role,
    description,
    aboutTexts,
    photoUrl,
  };
};
