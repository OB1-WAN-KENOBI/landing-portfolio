import { useState, useEffect } from "react";
import HeroUi from "../../shared/ui/hero/HeroUi";
import { profileApi } from "../../shared/api/http/profileApi";
import { statusApi } from "../../shared/api/http/statusApi";
import { normalizeProfile } from "../../shared/lib/api/normalize";
import { useLanguage } from "../../app/providers/language/useLanguage";
import { useToast } from "../../app/providers/toast/ToastProvider";

const HeroWidget = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<{
    name: string;
    role: string;
    description: string;
    photoUrl?: string;
  } | null>(null);
  const [status, setStatus] = useState<{
    status: "Available" | "Busy" | "Not taking projects";
    message?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      profileApi.get().catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load profile");
        showToast("error", error.message);
        return null;
      }),
      statusApi.get().catch((err) => {
        const error =
          err instanceof Error ? err : new Error("Failed to load status");
        showToast("error", error.message);
        return null;
      }),
    ]).then(([profileData, statusData]) => {
      if (profileData) {
        const normalized = normalizeProfile(profileData, language);
        setProfile({
          name: normalized.name,
          role: normalized.role,
          description: normalized.description,
          photoUrl: normalized.photoUrl,
        });
      }
      if (statusData) {
        const statusMessage =
          typeof statusData.message === "object"
            ? statusData.message?.ru || statusData.message?.en
            : statusData.message;
        setStatus({
          status: statusData.status,
          message: statusMessage,
        });
      }
      setIsLoading(false);
    });
  }, [language, showToast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <HeroUi
      name={profile.name}
      role={profile.role}
      description={profile.description}
      status={status || undefined}
    />
  );
};

export default HeroWidget;
