import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { HeadData, OpenGraphData } from "./types";

interface HeadContextType {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setOpenGraph: (og: OpenGraphData) => void;
  headData: HeadData;
}

const HeadContext = createContext<HeadContextType | undefined>(undefined);

export const useHead = () => {
  const context = useContext(HeadContext);
  if (!context) {
    throw new Error("useHead must be used within HeadManagerProvider");
  }
  return context;
};

interface HeadManagerProviderProps {
  children: ReactNode;
  defaultTitle?: string;
  defaultDescription?: string;
}

export const HeadManagerProvider = ({
  children,
  defaultTitle = "Portfolio",
  defaultDescription = "Portfolio website",
}: HeadManagerProviderProps) => {
  const [headData, setHeadData] = useState<HeadData>({
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {},
  });

  const setTitle = useCallback((title: string) => {
    setHeadData((prev) => ({ ...prev, title }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setHeadData((prev) => ({ ...prev, description }));
  }, []);

  const setOpenGraph = useCallback((og: OpenGraphData) => {
    setHeadData((prev) => ({
      ...prev,
      openGraph: { ...prev.openGraph, ...og },
    }));
  }, []);

  return (
    <HeadContext.Provider
      value={{ setTitle, setDescription, setOpenGraph, headData }}
    >
      {children}
    </HeadContext.Provider>
  );
};
