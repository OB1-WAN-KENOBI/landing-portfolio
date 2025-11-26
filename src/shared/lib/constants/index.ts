// Константы для количества элементов
export const FEATURED_PROJECTS_COUNT = 3;
export const CORE_SKILLS_COUNT = 8;

// Константы для URL
export const getPageUrl = (pathname: string): string => {
  return `${window.location.origin}${pathname}`;
};

// Re-export API constants
export { API_DELAYS } from "./api";
