<template>
  <UModal :model-value="show" @close="$emit('close')">
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Share Form</h2>
      </template>

      <div class="space-y-4">
        <div>
          <label for="user-search" class="block text-sm font-medium text-gray-700">Share with user</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <UInput id="user-search" v-model="email" placeholder="Enter email address" class="flex-1" />
            <USelect v-model="permission" :options="['view', 'edit']" class="ml-2" />
            <UButton @click="onShare" class="ml-2">Add</UButton>
          </div>
        </div>

        <div>
          <h3 class="text-md font-semibold">Shared with</h3>
          <ul class="mt-2 space-y-2">
            <li v-for="user in sharedUsers" :key="user.id" class="flex items-center justify-between">
              <div>
                <p class="font-medium">{{ user.name }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
              <div class="flex items-center">
                <USelect :model-value="user.pivot.permission" :options="['view', 'edit']" @change="onUpdatePermission(user, $event)" />
                <UButton icon="i-heroicons-trash" color="red" variant="ghost" @click="onRemoveUser(user)" class="ml-2" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFormShare } from '~/composables/useFormShare'
import { useUsers } from '~/composables/useUsers'

const props = defineProps({
  show: Boolean,
  form: Object,
})

const emit = defineEmits(['close'])

const email = ref('')
const permission = ref('view')

const { sharedUsers, shareForm, updatePermission, removeUser } = useFormShare(computed(() => props.form?.id))
const { findByEmail } = useUsers()

const onShare = async () => {
  if (!email.value) return

  const user = await findByEmail(email.value)
  if (!user) {
    // Handle user not found
    return
  }

  shareForm({
    user_id: user.id,
    permission: permission.value,
  })

  email.value = ''
}

const onUpdatePermission = (user, newPermission) => {
  updatePermission({
    userId: user.id,
    data: { permission: newPermission },
  })
}

const onRemoveUser = (user) => {
  removeUser(user.id)
}
</script>
