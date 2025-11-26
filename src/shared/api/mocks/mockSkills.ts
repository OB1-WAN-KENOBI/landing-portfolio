import type { ApiSkill } from "../http/types";
import { skills as defaultSkills } from "../mockData";
import { storage } from "../../lib/storage/localStorage";
import { API_DELAYS } from "../../lib/constants/api";

const STORAGE_KEY = "portfolio_skills";

const getStoredSkills = (): ApiSkill[] => {
  return storage.get(STORAGE_KEY, defaultSkills as ApiSkill[]);
};

const saveSkills = (skills: ApiSkill[]): void => {
  storage.set(STORAGE_KEY, skills);
};

export const mockSkills = {
  getAll: (): Promise<ApiSkill[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allSkills = getStoredSkills();
        resolve(allSkills);
      }, API_DELAYS.FAST);
    });
  },

  getById: (id: string): Promise<ApiSkill | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allSkills = getStoredSkills();
        const skill = allSkills.find((s) => s.id === id);
        resolve(skill);
      }, API_DELAYS.FAST);
    });
  },

  create: (skill: Omit<ApiSkill, "id">): Promise<ApiSkill> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allSkills = getStoredSkills();
          const newSkill: ApiSkill = {
            ...skill,
            id: Date.now().toString(),
          };
          const updated = [...allSkills, newSkill];
          saveSkills(updated);
          resolve(newSkill);
        } catch (error) {
          reject(new Error("Failed to create skill"));
        }
      }, API_DELAYS.NORMAL);
    });
  },

  update: (id: string, skill: Partial<ApiSkill>): Promise<ApiSkill> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allSkills = getStoredSkills();
          const index = allSkills.findIndex((s) => s.id === id);
          if (index === -1) {
            reject(new Error("Skill not found"));
            return;
          }
          const updated: ApiSkill = {
            ...allSkills[index],
            ...skill,
            id: id,
          };
          const newSkills = [...allSkills];
          newSkills[index] = updated;
          saveSkills(newSkills);
          resolve(updated);
        } catch (error) {
          reject(new Error("Failed to update skill"));
        }
      }, API_DELAYS.NORMAL);
    });
  },

  delete: (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allSkills = getStoredSkills();
          const filtered = allSkills.filter((s) => s.id !== id);
          if (filtered.length === allSkills.length) {
            reject(new Error("Skill not found"));
            return;
          }
          saveSkills(filtered);
          resolve();
        } catch (error) {
          reject(new Error("Failed to delete skill"));
        }
      }, API_DELAYS.FAST);
    });
  },
};
