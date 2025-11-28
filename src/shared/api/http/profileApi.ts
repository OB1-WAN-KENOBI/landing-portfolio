import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiProfile } from "./types";

type ProfileUpdatePayload = Partial<ApiProfile> & {
  photoData?: string | null;
};

export const profileApi = {
  get: async (): Promise<ApiProfile> => {
    return apiClient.get<ApiProfile>(endpoints.profile);
  },

  update: async (profile: ProfileUpdatePayload): Promise<ApiProfile> => {
    return apiClient.patch<ApiProfile>(endpoints.profile, profile);
  },
};
