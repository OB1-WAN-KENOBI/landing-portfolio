import { useState, useEffect, useMemo } from "react";
import { skillsApi } from "../../api/http/skillsApi";
import { normalizeSkill } from "../api/normalize";
import type { Skill } from "../../api/domainTypes";
import { useToast } from "../../../app/providers/toast/ToastProvider";

interface UseSkillsOptions {
  limit?: number;
  core?: boolean;
}

export const useSkills = (options: UseSkillsOptions = {}) => {
  const { limit, core = false } = options;
  const { showToast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    skillsApi
      .getAll()
      .then((data) => {
        const normalized = data.map(normalizeSkill);
        setSkills(normalized);
      })
      .catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load skills");
        setError(error);
        showToast("error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [showToast]);

  const coreSkills = useMemo(() => {
    if (!core) return skills;
    const selected = skills.filter((skill) => skill.isCore);
    const listToUse =
      selected.length === 0 ? skills : selected; // fallback for legacy data
    return limit ? listToUse.slice(0, limit) : listToUse;
  }, [skills, core, limit]);

  return {
    skills: core ? coreSkills : skills,
    isLoading,
    error,
  };
};
