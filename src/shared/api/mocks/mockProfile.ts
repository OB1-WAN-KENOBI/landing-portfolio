import type { ApiProfile } from "../http/types";
import { defaultProfile } from "../mockData";
import { storage } from "../../lib/storage/localStorage";
import { API_DELAYS } from "../../lib/constants/api";

const STORAGE_KEY = "portfolio_profile";

const getStoredProfile = (): ApiProfile => {
  return storage.get(STORAGE_KEY, defaultProfile);
};

const saveProfile = (profile: ApiProfile): void => {
  storage.set(STORAGE_KEY, profile);
};

export const mockProfile = {
  get: (): Promise<ApiProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = getStoredProfile();
        resolve(profile);
      }, API_DELAYS.FAST);
    });
  },

  update: (profile: Partial<ApiProfile>): Promise<ApiProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const current = getStoredProfile();
          const updated: ApiProfile = {
            ...current,
            ...profile,
            // Сохраняем aboutTexts, если они не переданы
            aboutTexts: profile.aboutTexts || current.aboutTexts,
          };
          saveProfile(updated);
          resolve(updated);
        } catch (error) {
          reject(new Error("Failed to update profile"));
        }
      }, API_DELAYS.NORMAL);
    });
  },
};
