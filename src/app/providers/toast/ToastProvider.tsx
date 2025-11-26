import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Toast, ToastType } from "./types";

interface ToastContextType {
  toasts: Toast[];
  showToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

const AUTO_HIDE_DURATION = 3500; // 3.5 seconds

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto-hide after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, AUTO_HIDE_DURATION);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
