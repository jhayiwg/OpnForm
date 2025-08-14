import { apiService } from './base'

export const usersApi = {
  findByEmail: (email) => apiService.get(`/users/find-by-email`, { params: { email } }),
}
