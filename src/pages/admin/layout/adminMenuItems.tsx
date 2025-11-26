import {
  DashboardIcon,
  ProjectsIcon,
  SkillsIcon,
  ProfileIcon,
  StatusIcon,
} from "../../../shared/ui/icons/AdminIcons";

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
];

