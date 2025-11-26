/**
 * Валидация email адреса
 * @param email - email для валидации
 * @returns true если email валиден
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
