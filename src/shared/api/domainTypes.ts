// Domain types for frontend (normalized types after API response)
// These are different from ApiProject/ApiSkill which come from the server

export interface HeroData {
  name: string;
  role: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  year: number;
  status: string;
  images?: string[];
}

export type SkillCategory = "frontend" | "backend" | "tooling" | "other";
export type SkillLevel = "beginner" | "middle" | "advanced";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

