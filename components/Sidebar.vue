<template>
  <aside class="w-64 bg-white text-white h-full flex flex-col">
    <!-- Sidebar Header -->
    <div class="p-6 text-lg flex justify-center font-bold">
      <img src="/logo.png" alt="Logo" class="h-12 mb-4" />
      
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1">
      <ul>
        <li
          v-for="item in sidebarItems"
          :key="item.name"
          class="p-4 cursor-pointer text-primary  hover:bg-dark transition"
        >
          <NuxtLink :to="item.route" class="block">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <button
      class="p-4 bg-red-500 hover:bg-red-700 transition"
      @click="handleLogout"
    >
      Logout
    </button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const sidebarItems = [
  { name: 'All Users', route: '/all-users' },
  { name: 'Pricing Plan', route: '/pricing-plan' },
  { name: 'Our Client', route: '/our-client' },
  { name: 'Contact Us', route: '/contact-us' },
  { name: 'Feedback', route: '/feedback' },
]



// Logout function
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated') // Clear auth state
  router.push('/login') // Redirect to login
}
</script>

<style scoped>
/* No need for custom styles as TailwindCSS handles the colors now */
</style>
