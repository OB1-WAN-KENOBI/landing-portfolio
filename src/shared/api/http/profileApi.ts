import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiProfile } from "./types";

export const profileApi = {
  get: async (): Promise<ApiProfile> => {
    return apiClient.get<ApiProfile>(endpoints.profile);
  },

  update: async (profile: Partial<ApiProfile>): Promise<ApiProfile> => {
    return apiClient.patch<ApiProfile>(endpoints.profile, profile);
  },
};
