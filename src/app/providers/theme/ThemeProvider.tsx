import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { Theme } from "./types";

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "portfolio_theme";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Восстанавливаем тему из localStorage при инициализации
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    // По умолчанию dark
    return "dark";
  });

  // Устанавливаем класс на <html> при изменении темы и при монтировании
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-light");
    html.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
