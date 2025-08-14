import { apiService } from './base'

const FORM_SHARE_BASE_PATH = '/forms'

export const formShareApi = {
  share: (formId, data) => apiService.post(`${FORM_SHARE_BASE_PATH}/${formId}/share`, data),
  update: (formId, userId, data) => apiService.put(`${FORM_SHARE_BASE_PATH}/${formId}/share/${userId}`, data),
  destroy: (formId, userId) => apiService.delete(`${FORM_SHARE_BASE_PATH}/${formId}/share/${userId}`),
  list: (formId) => apiService.get(`${FORM_SHARE_BASE_PATH}/${formId}/share`), // This endpoint doesn't exist yet
}
