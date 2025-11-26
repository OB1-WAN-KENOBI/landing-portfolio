import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageLoaderContextType {
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(
  undefined
);

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error("usePageLoader must be used within PageLoaderProvider");
  }
  return context;
};

interface PageLoaderProviderProps {
  children: ReactNode;
}

export const PageLoaderProvider = ({ children }: PageLoaderProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Перехватываем клики по Link компонентам из react-router-dom
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");

      if (link) {
        const href = link.getAttribute("href");
        // Проверяем, что это внутренняя ссылка и она отличается от текущего пути
        if (href && href.startsWith("/") && href !== location.pathname) {
          // Показываем прелоадер сразу, до начала навигации
          startLoading();
        }
      }
    };

    // Используем capture phase для перехвата до обработки react-router
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [location.pathname, startLoading]);

  // Fallback: показываем прелоадер при изменении пути (на случай если клик не перехватился)
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      if (!isLoading) {
        startLoading();
      }
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, isLoading, startLoading]);

  // Скрываем прелоадер после загрузки страницы
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        stopLoading();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading, stopLoading]);

  return (
    <PageLoaderContext.Provider
      value={{ startLoading, stopLoading, isLoading }}
    >
      {children}
    </PageLoaderContext.Provider>
  );
};
