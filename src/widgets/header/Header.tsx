import { useLocation } from "react-router-dom";
import HeaderUi from "../../shared/ui/header/HeaderUi";
import ThemeToggleUi from "../../shared/ui/theme-toggle/ThemeToggleUi";
import LanguageToggle from "./LanguageToggle";
import { useTheme } from "../../app/providers/theme/ThemeProvider";

const Header = () => {
  const location = useLocation();
  const { currentTheme, toggleTheme } = useTheme();
  const activePath = location.pathname;

  // Определяем активный путь для проектов (включая /projects/:id)
  const isProjectsActive =
    activePath === "/projects" || activePath.startsWith("/projects/");

  return (
    <HeaderUi
      activePath={
        isProjectsActive
          ? "/projects"
          : activePath === "/skills" || activePath === "/about"
          ? activePath
          : undefined
      }
      themeToggle={
        <ThemeToggleUi currentTheme={currentTheme} onToggle={toggleTheme} />
      }
      languageToggle={<LanguageToggle />}
    />
  );
};

export default Header;
