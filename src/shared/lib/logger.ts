/**
 * Централизованная система логирования
 * Логирует только в development режиме
 */
const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Логирование ошибок
   */
  error: (...args: unknown[]): void => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  },

  /**
   * Логирование предупреждений
   */
  warn: (...args: unknown[]): void => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  },

  /**
   * Информационное логирование
   */
  info: (...args: unknown[]): void => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.info(...args);
    }
  },

  /**
   * Отладочное логирование
   */
  debug: (...args: unknown[]): void => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug(...args);
    }
  },
};
