<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Static Credentials
const EMAIL = 'partha@gmail.com'
const PASSWORD = 'Admin@123'

// State
const email = ref('')
const password = ref('')
const error = ref('')

// Watch to clear error message when input changes
watch([email, password], () => {
  error.value = ''
})

// Login Function
const handleLogin = () => {
  if (email.value === EMAIL && password.value === PASSWORD) {
    // Store Auth State in LocalStorage
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/all-users') // Redirect after login
  } else {
    error.value = 'Invalid email or password!'
  }
}

</script>

<template>
  <div
    class="flex h-screen items-center justify-center bg-cover bg-center"
    style="background-image: url('https://source.unsplash.com/1920x1080/?city')"
  >
    <div class="bg-white shadow-lg rounded-lg p-8 w-96 bg-opacity-95">
      <div class="flex justify-center mb-6">
        <img src="/logo.png" alt="Logo" class="h-20" />
      </div>

      <h2 class="text-2xl font-bold text-primary text-center mb-6">Welcome</h2>
      <p v-if="error" class="text-red-500 text-sm text-center mb-4">{{ error }}</p>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-lg hover:bg-dark transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gray-50;
}
</style>
