// TODO: Replace this mock client with real API client after backend is ready
// This is a placeholder for future API integration

const baseUrl = ""; // Will be set when backend is available

class BaseClient {
  // baseUrl will be used when real API is implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_baseUrl: string = "") {
    // Will be implemented when backend is ready
  }

  async get<T>(_path: string): Promise<T> {
    // Placeholder for GET request
    throw new Error("Not implemented - use mocks for now");
  }

  async post<T>(_path: string, _data: unknown): Promise<T> {
    // Placeholder for POST request
    throw new Error("Not implemented - use mocks for now");
  }

  async patch<T>(_path: string, _data: unknown): Promise<T> {
    // Placeholder for PATCH request
    throw new Error("Not implemented - use mocks for now");
  }

  async delete<T>(_path: string): Promise<T> {
    // Placeholder for DELETE request
    throw new Error("Not implemented - use mocks for now");
  }
}

export const apiClient = new BaseClient(baseUrl);
