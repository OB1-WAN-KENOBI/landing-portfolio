import { useState, useEffect } from "react";
import FooterUi from "../../shared/ui/footer/FooterUi";
import { profileApi } from "../../shared/api/http/profileApi";
import { normalizeProfile } from "../../shared/lib/api/normalize";
import { useLanguage } from "../../app/providers/language/useLanguage";

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TelegramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15.056-.212.06-.075.14-.093.212-.056.06.02 3.076 1.923 4.97 3.176.69.49 1.313.91 1.463 1.073.33.36.258.66.19.95-.06.29-.258.6-.54.83-.532.44-1.18.88-1.846 1.31-.66.42-1.344.82-2.1 1.12-.88.35-1.685.57-2.41.7-.8.14-1.56.12-2.18-.08-.82-.22-1.43-.55-1.78-.9-.43-.43-.33-.66.25-1.07.18-.12.7-.42 1.2-.68 1.92-1.01 3.35-1.75 3.8-2.14.18-.15.28-.24.23-.38-.03-.09-.24-.19-.66-.28z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const [profile, setProfile] = useState<{
    name: string;
    role: string;
    socials?: {
      github?: string;
      linkedin?: string;
      telegram?: string;
    };
  } | null>(null);

  useEffect(() => {
    profileApi.get().then((data) => {
      const normalized = normalizeProfile(data, language);
      setProfile({
        name: data.name,
        role: normalized.role,
        socials: data.socials,
      });
    });
  }, [language]);

  if (!profile) {
    return null;
  }

  const socialLinks = [
    profile.socials?.github && {
      name: "GitHub",
      url: profile.socials.github,
      icon: <GitHubIcon />,
    },
    profile.socials?.linkedin && {
      name: "LinkedIn",
      url: profile.socials.linkedin,
      icon: <LinkedInIcon />,
    },
    profile.socials?.telegram && {
      name: "Telegram",
      url: profile.socials.telegram.startsWith("@")
        ? `https://t.me/${profile.socials.telegram.slice(1)}`
        : profile.socials.telegram,
      icon: <TelegramIcon />,
    },
  ].filter(Boolean) as Array<{
    name: string;
    url: string;
    icon: React.ReactNode;
  }>;

  return (
    <FooterUi
      name={profile.name}
      role={profile.role}
      socialLinks={socialLinks}
      copyrightYear={currentYear}
    />
  );
};

export default Footer;
