import type { ApiUser } from "../http/types";
import { API_DELAYS } from "../../lib/constants/api";

// Mock admin user
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const adminUser: ApiUser & { password: string } = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  password: ADMIN_PASSWORD,
  role: "admin",
};

export const mockAuth = {
  login: (email: string, password: string): Promise<ApiUser> => {
    return new Promise((resolve, reject) => {
      const delay = API_DELAYS.NORMAL + Math.random() * 200; // 400-600ms
      setTimeout(() => {
        if (email === adminUser.email && password === adminUser.password) {
          const { password: _, ...userWithoutPassword } = adminUser;
          resolve(userWithoutPassword);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, delay);
    });
  },

  logout: (): Promise<null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, API_DELAYS.FAST);
    });
  },
};
