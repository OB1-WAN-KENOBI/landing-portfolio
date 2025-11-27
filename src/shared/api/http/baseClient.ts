import { API_BASE_URL } from "../../config/api";

// Получить токен из localStorage или переменной окружения
const getAuthToken = (): string | null => {
  return (
    localStorage.getItem("admin_token") ||
    import.meta.env.VITE_ADMIN_TOKEN ||
    null
  );
};

class BaseClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
    requireAuth: boolean = false
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Добавляем токен для админских операций
    if (requireAuth) {
      const token = getAuthToken();
      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
    });
  }

  async post<T>(
    path: string,
    data: unknown,
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      requireAuth
    );
  }

  async patch<T>(
    path: string,
    data: unknown,
    requireAuth: boolean = true
  ): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      requireAuth
    );
  }

  async delete<T>(path: string, requireAuth: boolean = true): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "DELETE",
      },
      requireAuth
    );
  }
}

export const apiClient = new BaseClient();
