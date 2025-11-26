import { useState, useEffect } from "react";
import { mockProjects } from "../../api/mocks/mockProjects";
import { normalizeProject } from "../api/normalize";
import type { Project } from "../../api/mockData";
import type { Language } from "../i18n/i18n";
import { useToast } from "../../../app/providers/toast/ToastProvider";

interface UseProjectsOptions {
  language?: Language;
  limit?: number;
  featured?: boolean;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const { language = "ru", limit, featured = false } = options;
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    mockProjects
      .getAll()
      .then((data) => {
        const normalized = data.map((p) => normalizeProject(p, language));
        setProjects(normalized);
      })
      .catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load projects");
        setError(error);
        showToast("error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [language, showToast]);

  const featuredProjects = featured ? projects.slice(0, limit || 3) : projects;

  return {
    projects: featuredProjects,
    isLoading,
    error,
  };
};
