import { API_BASE_URL } from "../../config/api";

// Читаем токен только из sessionStorage, чтобы не класть секрет в бандл
const getAuthToken = (): string | null => {
  try {
    return sessionStorage.getItem("admin_token");
  } catch {
    // Доступ к storage может быть недоступен (например, SSR или блокировка)
    return null;
  }
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
      credentials: requireAuth ? options.credentials ?? "include" : options.credentials,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Не бросаем для ожидаемых 401/403 на ping, чтобы не засорять консоль гостям
        if (
          !requireAuth &&
          options.credentials === "include" &&
          (response.status === 401 || response.status === 403)
        ) {
          return {} as T;
        }
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

  async get<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "GET",
        ...options,
      },
      Boolean(options.credentials === "include")
    );
  }

  async post<T>(
    path: string,
    data: unknown,
    requireAuth: boolean = true,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
      },
      requireAuth
    );
  }

  async patch<T>(
    path: string,
    data: unknown,
    requireAuth: boolean = true,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        ...options,
      },
      requireAuth
    );
  }

  async delete<T>(
    path: string,
    requireAuth: boolean = true,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(
      path,
      {
        method: "DELETE",
        ...options,
      },
      requireAuth
    );
  }
}

export const apiClient = new BaseClient();
