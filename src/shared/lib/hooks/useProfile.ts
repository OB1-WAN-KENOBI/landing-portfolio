import { useState, useEffect } from "react";
import { profileApi } from "../../api/http/profileApi";
import { normalizeProfile } from "../api/normalize";
import type { Language } from "../i18n/i18n";
import { useToast } from "../../../app/providers/toast/ToastProvider";

export type ProfilePreview = {
  name: string;
  role: string;
  description: string;
  photoUrl?: string;
};

interface UseProfileResult {
  profile: ProfilePreview | null;
  aboutTexts: string[];
  isLoading: boolean;
  error: Error | null;
}

export const useProfile = (language: Language = "ru"): UseProfileResult => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<ProfilePreview | null>(null);
  const [aboutTexts, setAboutTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    profileApi
      .get()
      .then((data) => {
        const normalized = normalizeProfile(data, language);
        setProfile({
          name: normalized.name,
          role: normalized.role,
          description: normalized.description,
          photoUrl: normalized.photoUrl,
        });
        setAboutTexts(normalized.aboutTexts);
      })
      .catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load profile");
        setError(error);
        showToast("error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [language, showToast]);

  return {
    profile,
    aboutTexts,
    isLoading,
    error,
  };
};
