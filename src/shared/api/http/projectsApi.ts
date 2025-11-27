import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiProject } from "./types";

export const projectsApi = {
  getAll: async (): Promise<ApiProject[]> => {
    return apiClient.get<ApiProject[]>(endpoints.projects);
  },

  getById: async (id: string): Promise<ApiProject | undefined> => {
    const projects = await projectsApi.getAll();
    return projects.find((p) => p.id === id);
  },

  create: async (project: Omit<ApiProject, "id">): Promise<ApiProject> => {
    return apiClient.post<ApiProject>(endpoints.projects, project);
  },

  update: async (
    id: string,
    project: Partial<ApiProject>
  ): Promise<ApiProject> => {
    return apiClient.patch<ApiProject>(`${endpoints.projects}/${id}`, project);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`${endpoints.projects}/${id}`);
  },
};
