import { ref } from 'vue'
import { formShareApi } from '~/api/formShare'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

export function useFormShare(formId) {
  const queryClient = useQueryClient()

  const { data: sharedUsers, isLoading } = useQuery({
    queryKey: ['forms', formId, 'sharedUsers'],
    queryFn: () => formShareApi.list(formId),
    enabled: !!formId,
  })

  const shareMutation = useMutation({
    mutationFn: (data) => formShareApi.share(formId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['forms', formId, 'sharedUsers'])
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ userId, data }) => formShareApi.update(formId, userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['forms', formId, 'sharedUsers'])
    },
  })

  const removeMutation = useMutation({
    mutationFn: (userId) => formShareApi.destroy(formId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['forms', formId, 'sharedUsers'])
    },
  })

  return {
    sharedUsers,
    isLoading,
    shareForm: shareMutation.mutate,
    updatePermission: updateMutation.mutate,
    removeUser: removeMutation.mutate,
  }
}
