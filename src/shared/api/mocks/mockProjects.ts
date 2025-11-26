import type { ApiProject } from "../http/types";
import { defaultProjects } from "../mockData";
import { storage } from "../../lib/storage/localStorage";
import { API_DELAYS } from "../../lib/constants/api";

const STORAGE_KEY = "portfolio_projects";

// Базовая валидация структуры проекта
const isValidProject = (value: unknown): value is ApiProject => {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    (typeof obj.title === "string" ||
      (typeof obj.title === "object" &&
        obj.title !== null &&
        typeof (obj.title as Record<string, unknown>).ru === "string" &&
        typeof (obj.title as Record<string, unknown>).en === "string")) &&
    Array.isArray(obj.techStack) &&
    typeof obj.year === "number" &&
    typeof obj.status === "string"
  );
};

const isValidProjectsArray = (value: unknown): value is ApiProject[] => {
  return Array.isArray(value) && value.every(isValidProject);
};

const getStoredProjects = (): ApiProject[] => {
  return storage.get(
    STORAGE_KEY,
    defaultProjects as ApiProject[],
    isValidProjectsArray
  );
};

const saveProjects = (projects: ApiProject[]): void => {
  storage.set(STORAGE_KEY, projects);
};

export const mockProjects = {
  getAll: (): Promise<ApiProject[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allProjects = getStoredProjects();
        resolve(allProjects);
      }, API_DELAYS.FAST);
    });
  },

  getById: (id: string): Promise<ApiProject | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allProjects = getStoredProjects();
        const project = allProjects.find((p) => p.id === id);
        resolve(project);
      }, API_DELAYS.FAST);
    });
  },

  create: (project: Omit<ApiProject, "id">): Promise<ApiProject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allProjects = getStoredProjects();
          const newProject: ApiProject = {
            ...project,
            id: Date.now().toString(),
          };
          const updated = [...allProjects, newProject];
          saveProjects(updated);
          resolve(newProject);
        } catch (error) {
          reject(new Error("Failed to create project"));
        }
      }, API_DELAYS.NORMAL);
    });
  },

  update: (id: string, project: Partial<ApiProject>): Promise<ApiProject> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allProjects = getStoredProjects();
          const index = allProjects.findIndex((p) => p.id === id);
          if (index === -1) {
            reject(new Error("Project not found"));
            return;
          }
          const updated: ApiProject = {
            ...allProjects[index],
            ...project,
            id: id,
          };
          const newProjects = [...allProjects];
          newProjects[index] = updated;
          saveProjects(newProjects);
          resolve(updated);
        } catch (error) {
          reject(new Error("Failed to update project"));
        }
      }, API_DELAYS.NORMAL);
    });
  },

  delete: (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const allProjects = getStoredProjects();
          const filtered = allProjects.filter((p) => p.id !== id);
          if (filtered.length === allProjects.length) {
            reject(new Error("Project not found"));
            return;
          }
          saveProjects(filtered);
          resolve();
        } catch (error) {
          reject(new Error("Failed to delete project"));
        }
      }, API_DELAYS.FAST);
    });
  },
};
