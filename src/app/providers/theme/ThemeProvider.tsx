import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { Theme } from "./types";
import { storage } from "../../../shared/lib/storage/localStorage";

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
    try {
      // Восстанавливаем тему из localStorage при инициализации
      const validator = (value: unknown): value is Theme => {
        return value === "dark" || value === "light";
      };
      return storage.get<Theme>(STORAGE_KEY, "dark", validator);
    } catch (error) {
      // В случае любой ошибки используем значение по умолчанию
      return "dark";
    }
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
      storage.set(STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    storage.set(STORAGE_KEY, theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
