import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiSkill } from "./types";

// Сервер возвращает массив ApiSkill
export const skillsApi = {
  getAll: async (): Promise<ApiSkill[]> => {
    return apiClient.get<ApiSkill[]>(endpoints.skills);
  },

  getById: async (id: string): Promise<ApiSkill | undefined> => {
    return apiClient.get<ApiSkill>(`${endpoints.skills}/${id}`);
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
