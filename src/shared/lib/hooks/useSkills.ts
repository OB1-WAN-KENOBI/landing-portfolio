import { useState, useEffect, useMemo } from "react";
import { mockSkills } from "../../api/mocks/mockSkills";
import { normalizeSkill } from "../api/normalize";
import type { Skill } from "../../api/mockData";
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

    mockSkills
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
    return skills.slice(0, limit || 8);
  }, [skills, core, limit]);

  return {
    skills: core ? coreSkills : skills,
    isLoading,
    error,
  };
};
