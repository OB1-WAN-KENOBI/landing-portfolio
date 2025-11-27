import { apiClient } from "./baseClient";
import { endpoints } from "./endpoints";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  status: string;
}

export const contactApi = {
  send: async (data: ContactFormData): Promise<ContactResponse> => {
    // Контактная форма не требует аутентификации
    return apiClient.post<ContactResponse>(endpoints.contact, data, false);
  },
};
