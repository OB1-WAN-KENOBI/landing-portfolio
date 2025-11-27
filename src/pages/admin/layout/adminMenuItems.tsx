import {
  DashboardIcon,
  ProjectsIcon,
  SkillsIcon,
  ProfileIcon,
  StatusIcon,
} from "../../../shared/ui/icons/AdminIcons";

// Простая иконка настроек
const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
  </svg>
);

export const adminMenuItems = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/admin/projects",
    label: "Projects",
    icon: <ProjectsIcon />,
  },
  {
    path: "/admin/skills",
    label: "Skills",
    icon: <SkillsIcon />,
  },
  {
    path: "/admin/profile",
    label: "Profile",
    icon: <ProfileIcon />,
  },
  {
    path: "/admin/status",
    label: "Status",
    icon: <StatusIcon />,
  },
  {
    path: "/admin/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
];
