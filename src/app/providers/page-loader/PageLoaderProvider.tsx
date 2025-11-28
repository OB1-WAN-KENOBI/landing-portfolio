import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
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
  const MIN_VISIBLE_TIME = 400;

  const [, setLoadingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);
  const navigationStartedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const startLoading = useCallback(() => {
    setLoadingCount((prev) => {
      if (prev === 0) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        startedAtRef.current = performance.now();
        setIsLoading(true);
      }

      return prev + 1;
    });
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((prev) => {
      const nextCount = Math.max(0, prev - 1);

      if (nextCount === 0) {
        const elapsed = startedAtRef.current
          ? performance.now() - startedAtRef.current
          : 0;

        const delay = Math.max(0, MIN_VISIBLE_TIME - elapsed);

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = window.setTimeout(() => {
          startedAtRef.current = null;
          hideTimeoutRef.current = null;
          setIsLoading(false);
        }, delay);
      }

      return nextCount;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Перехватываем клики по Link компонентам из react-router-dom
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }

      if (e.button && e.button !== 0) {
        return;
      }

      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");

      if (link) {
        const href = link.getAttribute("href");
        const targetAttr = link.getAttribute("target");

        if (targetAttr && targetAttr !== "_self") {
          return;
        }

        // Проверяем, что это внутренняя ссылка и она отличается от текущего пути
        if (href && href.startsWith("/") && href !== location.pathname) {
          // Показываем прелоадер сразу, до начала навигации
          startLoading();
          navigationStartedRef.current = true;

          if (navigationTimeoutRef.current) {
            clearTimeout(navigationTimeoutRef.current);
          }

          navigationTimeoutRef.current = window.setTimeout(() => {
            navigationStartedRef.current = false;
            stopLoading();
          }, 4000);
        }
      }
    };

    // Используем capture phase для перехвата до обработки react-router
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [location.pathname, startLoading, stopLoading]);

  // Fallback: показываем прелоадер при изменении пути (на случай если клик не перехватился)
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }

      if (!navigationStartedRef.current) {
        startLoading();
      }
      navigationStartedRef.current = false;
      prevPathnameRef.current = location.pathname;

      const rafId = requestAnimationFrame(() => {
        stopLoading();
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [location.pathname, startLoading, stopLoading]);

  return (
    <PageLoaderContext.Provider
      value={{ startLoading, stopLoading, isLoading }}
    >
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoaderEffect = (isLoading: boolean) => {
  const { startLoading, stopLoading } = usePageLoader();
  const startedRef = useRef(false);

  useEffect(() => {
    if (isLoading) {
      startedRef.current = true;
      startLoading();
    } else if (startedRef.current) {
      startedRef.current = false;
      stopLoading();
    }

    return () => {
      if (startedRef.current) {
        startedRef.current = false;
        stopLoading();
      }
    };
  }, [isLoading, startLoading, stopLoading]);
};
