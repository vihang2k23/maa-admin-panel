<template>
  <div>
    <!-- Toggle Button (Visible on smaller screens) -->
    <button
      class="p-4 bg-primary text-white fixed top-4 left-4 z-50 md:hidden"
      @click="toggleSidebar"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <aside
      :class="[ 
        'w-64 bg-white text-white h-full flex flex-col fixed top-0 left-0 z-40 transition-transform duration-300',
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0' // Always open on larger screens (md and up)
      ]"
    >
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
            @click="redirectPage(item)"
            class="p-4 cursor-pointer text-primary hover:bg-dark transition"
          >
            <button class="block" @click="closeSidebar(item)">
              {{ item.name }}
            </button>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Sidebar items
const sidebarItems = [
  { name: 'All Users', route: '/all-users' },
  { name: 'Pricing Plan', route: '/pricing-plan' },
  { name: 'Our Client', route: '/our-client' },
  { name: 'Contact Us', route: '/contact-us' },
  { name: 'Feedback', route: '/feedback' },
]

// Sidebar visibility state
const isSidebarVisible = ref(false)

// Function to toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}


// Function to close the sidebar when a link is clicked
const closeSidebar = (item) => {


  if (window.innerWidth < 768) {
    isSidebarVisible.value = false // Close only for smaller screens
  }
}

const redirectPage = (item) => {
  console.log('item: ', item);
  router.push(item.route)
}
// Logout function
const router = useRouter()
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated') // Clear auth state
  router.push('/') // Redirect to login
}

// Ensure responsiveness on window resize
onMounted(() => {
  if (typeof window !== 'undefined') {
    isSidebarVisible.value = window.innerWidth >= 768 // Open on larger screens
    window.addEventListener('resize', handleResize)
  }
})

const handleResize = () => {
  if (typeof window !== 'undefined') {
    isSidebarVisible.value = window.innerWidth >= 768 // Open on larger screens
  }
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
/* Responsive design handled by Tailwind classes */
</style>
