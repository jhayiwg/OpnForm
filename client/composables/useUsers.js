import { usersApi } from '~/api/users'

export function useUsers() {
  const findByEmail = async (email) => {
    try {
      const response = await usersApi.findByEmail(email)
      return response.data
    } catch (error) {
      console.error('Error finding user by email:', error)
      return null
    }
  }

  return {
    findByEmail,
  }
}
