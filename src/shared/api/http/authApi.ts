import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";

export const authApi = {
  login: async (email: string, password: string): Promise<void> => {
    await apiClient.post(endpoints.adminLogin, { email, password }, false, {
      credentials: "include",
    });
  },
  logout: async (): Promise<void> => {
    await apiClient.post(endpoints.adminLogout, {}, false, {
      credentials: "include",
    });
  },
  ping: async (): Promise<void> => {
    await apiClient.get(endpoints.adminPing, { credentials: "include" });
  },
};
