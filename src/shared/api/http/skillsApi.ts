import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiSkill } from "./types";

// Сервер возвращает массив строк, преобразуем в ApiSkill[]
export const skillsApi = {
  getAll: async (): Promise<ApiSkill[]> => {
    const skills = await apiClient.get<string[]>(endpoints.skills);
    // Преобразуем массив строк в массив ApiSkill
    return skills.map((skill, index) => ({
      id: `skill-${index + 1}`,
      name: skill,
      category: "other" as const,
      level: "middle" as const,
    }));
  },

  getById: async (id: string): Promise<ApiSkill | undefined> => {
    const skills = await skillsApi.getAll();
    return skills.find((s) => s.id === id);
  },

  create: async (skill: Omit<ApiSkill, "id">): Promise<ApiSkill> => {
    return apiClient.post<ApiSkill>(endpoints.skills, skill);
  },

  update: async (id: string, skill: Partial<ApiSkill>): Promise<ApiSkill> => {
    return apiClient.patch<ApiSkill>(`${endpoints.skills}/${id}`, skill);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`${endpoints.skills}/${id}`);
  },
};
