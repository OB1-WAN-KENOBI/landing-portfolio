/**
 * Санитизация строки от потенциально опасных символов
 * @param input - входная строка
 * @returns санитизированная строка
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};
