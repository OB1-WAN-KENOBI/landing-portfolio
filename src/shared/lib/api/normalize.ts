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

const resolveImageUrl = (url: unknown): string | undefined => {
  if (typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  // Data URL (base64 изображения из БД) - используем как есть
  if (trimmed.startsWith("data:image/")) return trimmed;
  // Абсолютные ссылки без изменений
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Относительные ссылки для бэка (например /uploads/...)
  if (trimmed.startsWith("/uploads")) {
    try {
      const base = new URL(API_BASE_URL);
      return `${base.origin}${trimmed}`;
    } catch {
      return trimmed;
    }
  }
  // Файлы, лежащие на фронте (public), можно отдавать как есть
  if (trimmed.startsWith("/")) {
    return trimmed;
  }
  // Если относительный путь без /, добавляем базовый URL
  try {
    const base = new URL(API_BASE_URL);
    return `${base.origin}/${trimmed}`;
  } catch {
    return trimmed;
  }
};

export const normalizeProject = (
  apiProject: ApiProject,
  lang: Language = "ru"
): Project => {
  const title = getLocalizedValue(apiProject.title, lang);
  const description = getLocalizedValue(apiProject.description, lang);

  const images = apiProject.images
    ? apiProject.images
        .map((img) => {
          const resolved = resolveImageUrl(img);
          // Отладка (включаем и для production для диагностики)
          if (!resolved && img) {
            console.warn("Failed to resolve image URL:", {
              original: img?.substring(0, 100),
              type: typeof img,
              length: img?.length,
            });
          }
          if (resolved && resolved.startsWith("data:image/")) {
            console.log("Resolved data URL image, length:", resolved.length);
          }
          return resolved;
        })
        .filter((url): url is string => Boolean(url))
    : undefined;

  // Отладка: проверяем, что images есть после нормализации
  if (apiProject.images && apiProject.images.length > 0) {
    console.log("Project images:", {
      originalCount: apiProject.images.length,
      resolvedCount: images?.length || 0,
      firstImageType: apiProject.images[0]?.substring(0, 30),
    });
  }

  return {
    id: apiProject.id,
    title,
    description,
    techStack: Array.isArray(apiProject.techStack) ? apiProject.techStack : [],
    year: apiProject.year,
    status: apiProject.status,
    images,
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
  const photoUrl = resolveImageUrl(apiProfile.photoUrl);

  return {
    name: apiProfile.name || "",
    role,
    description,
    aboutTexts,
    photoUrl,
  };
};
