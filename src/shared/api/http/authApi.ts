import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";
import type { ApiUser } from "./types";

type AuthResponse = {
  status: string;
  user: ApiUser;
};

export const authApi = {
  login: async (email: string, password: string): Promise<ApiUser> => {
    const result = await apiClient.post<AuthResponse>(
      endpoints.adminLogin,
      { email, password },
      false,
      {
        credentials: "include",
      }
    );
    return result.user;
  },
  logout: async (): Promise<void> => {
    await apiClient.post(endpoints.adminLogout, {}, false, {
      credentials: "include",
    });
  },
  ping: async (): Promise<ApiUser> => {
    const result = await apiClient.get<AuthResponse>(endpoints.adminPing, {
      credentials: "include",
    });
    return result.user;
  },
};
