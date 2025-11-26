import { useEffect, useRef, useState } from "react";

export const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Проверяем, виден ли элемент сразу при монтировании
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight + 100 &&
        rect.bottom > -100 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      return visible;
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Проверяем сразу при монтировании
    if (checkVisibility()) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }

    // Если не виден, используем IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "100px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
};
