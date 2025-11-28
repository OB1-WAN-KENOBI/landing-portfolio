import { API_BASE_URL } from "../../config/api";

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

    const config: RequestInit = {
      ...options,
      credentials: requireAuth ? options.credentials ?? "include" : options.credentials,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorBody = (await response.json()) as { error?: string };
          if (errorBody?.error) {
            errorMessage = errorBody.error;
          }
        } catch {
          // fallback на дефолтное сообщение
        }
      }
      throw new Error(errorMessage);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    // 204 / пустые ответы
    return {} as T;
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
