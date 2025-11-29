export type LocalizedString = {
  ru: string;
  en: string;
};

export interface ApiProject {
  id: string;
  title: LocalizedString | string;
  description: LocalizedString | string;
  techStack: string[];
  year: number;
  status: string;
  url?: string;
  images?: string[];
}

export type ApiSkillCategory = "frontend" | "backend" | "tooling" | "other";
export type ApiSkillLevel = "beginner" | "middle" | "advanced";

export interface ApiSkill {
  id: string;
  name: string;
  category: ApiSkillCategory;
  level: ApiSkillLevel;
  isCore?: boolean;
}

export interface ApiProfile {
  name: string;
  role: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  photoUrl?: string;
  aboutTexts: {
    ru: string[];
    en: string[];
  };
  socials?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}

export interface ApiStatus {
  status: "Available" | "Busy" | "Not taking projects";
  message?: {
    ru?: string;
    en?: string;
  };
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}
