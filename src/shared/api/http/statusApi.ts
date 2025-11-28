import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiStatus } from "./types";

export const statusApi = {
  get: async (): Promise<ApiStatus> => {
    return apiClient.get<ApiStatus>(endpoints.status);
  },

  update: async (status: Partial<ApiStatus>): Promise<ApiStatus> => {
    return apiClient.patch<ApiStatus>(endpoints.status, status);
  },
};
