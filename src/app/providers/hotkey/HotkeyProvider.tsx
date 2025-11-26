import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface HotkeyProviderProps {
  children: ReactNode;
}

export const HotkeyProvider = ({ children }: HotkeyProviderProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === "a") {
        event.preventDefault();
        navigate("/admin/login");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return <>{children}</>;
};
