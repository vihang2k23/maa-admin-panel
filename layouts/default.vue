<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-6 text-lg font-bold">
        <img src="/maaLogoText.png" alt="Logo" class="h-12 mb-4" />
        Mixedmotion Advertify
      </div>
      <nav class="flex-1">
        <ul>
          <li
            v-for="item in sidebarItems"
            :key="item.name"
            :class="[
              'p-4 cursor-pointer hover:bg-gray-700 transition',
              $route.path === item.route ? 'bg-gray-700' : ''
            ]"
          >
            <NuxtLink :to="item.route" class="flex items-center">
              <span>{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <button
        class="p-4 bg-red-500 hover:bg-red-700 transition"
        @click="handleLogout"
      >
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-100 overflow-auto">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Sidebar items (dynamic routes)
const sidebarItems = [
  { name: 'All Users', route: '/all-users' },
  { name: 'Analytics', route: '/analytics' },
  { name: 'Settings', route: '/settings' },
]

// Logout function
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated') // Clear auth state
  router.push('/login') // Redirect to login
}
</script>

<style>
body {
  @apply bg-gray-50;
}
</style>
