import type { ApiStatus } from "../http/types";
import { storage } from "../../lib/storage/localStorage";
import { API_DELAYS } from "../../lib/constants/api";

const STORAGE_KEY = "portfolio_status";

const getStoredStatus = (): ApiStatus => {
  return storage.get(STORAGE_KEY, {
    status: "Available",
    message: "",
  } as ApiStatus);
};

const saveStatus = (status: ApiStatus): void => {
  storage.set(STORAGE_KEY, status);
};

export const mockStatus = {
  get: (): Promise<ApiStatus> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const status = getStoredStatus();
        resolve(status);
      }, API_DELAYS.FAST);
    });
  },

  update: (status: Partial<ApiStatus>): Promise<ApiStatus> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const current = getStoredStatus();
          const updated: ApiStatus = {
            ...current,
            ...status,
          };
          saveStatus(updated);
          resolve(updated);
        } catch (error) {
          reject(new Error("Failed to update status"));
        }
      }, API_DELAYS.NORMAL);
    });
  },
};
