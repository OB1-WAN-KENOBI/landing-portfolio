/**
 * Утилита для работы с localStorage
 */
export const storage = {
  /**
   * Получить значение из localStorage
   * @param validator - опциональная функция валидации данных
   */
  get: <T>(
    key: string,
    defaultValue: T,
    validator?: (value: unknown) => value is T
  ): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      const parsed = JSON.parse(item);

      // Если есть валидатор, проверяем данные
      if (validator && !validator(parsed)) {
        console.warn(
          `Invalid data in localStorage "${key}", using default value`
        );
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsed as T;
    } catch (e) {
      console.error(`Failed to parse localStorage item "${key}":`, e);
      localStorage.removeItem(key);
      return defaultValue;
    }
  },

  /**
   * Сохранить значение в localStorage
   */
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded");
        // Можно показать toast пользователю
      } else {
        console.error(`Failed to save to localStorage "${key}":`, e);
      }
    }
  },

  /**
   * Удалить значение из localStorage
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Failed to remove localStorage item "${key}":`, e);
    }
  },
};
