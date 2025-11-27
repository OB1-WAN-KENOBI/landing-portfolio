import { useState, useEffect, useMemo } from "react";
import { projectsApi } from "../../api/http/projectsApi";
import { normalizeProject } from "../api/normalize";
import type { Project } from "../../api/domainTypes";
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

    projectsApi
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
  }, [language, showToast, limit, featured]);

  const featuredProjects = useMemo(() => {
    if (!featured) return projects;
    return projects.slice(0, limit || 3);
  }, [projects, featured, limit]);

  return {
    projects: featuredProjects,
    isLoading,
    error,
  };
};
