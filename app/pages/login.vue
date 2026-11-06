<script setup lang="ts">
/* Page */
definePageMeta({
  layout: 'public'
})

const { user, isAdmin, login, logout, refresh } = useAuth()
const error = ref('')

const onLogin = async () => {
  error.value = ''
  try {
    await login()
  } catch (e) {
    error.value = (e as Error).message
  }
}
</script>

<template>
  <div class="py-10 space-y-4">
    <template v-if="user">
      <p>
        Signed in as {{ user.email }} —
        {{ isAdmin ? 'admin' : 'no admin access' }}
      </p>
      <div class="flex gap-2">
        <UButton variant="outline" label="Refresh access" @click="refresh" />
        <UButton color="neutral" variant="outline" label="Sign out" @click="logout" />
      </div>
    </template>
    <UButton v-else icon="i-simple-icons-google" label="Sign in with Google" @click="onLogin" />
    <p v-if="error" class="text-error">
      {{ error }}
    </p>
  </div>
</template>
