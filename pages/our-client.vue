<template>
  <div class="flex h-screen">
    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-100 overflow-auto">
      <h2 class="text-2xl font-bold mb-6">All Usssssers</h2>
      <p>This is the All Users page content.</p>
    </main>
  </div>
</template>

<script setup>
// Import the Sidebar component
const { $axios } = useNuxtApp();
const data = ref(null);

onMounted(async () => {
 await getAllUsers()
});
const getAllUsers = async () =>{
  try {
    const response = await $axios.get('/subscriptions'); // Make a GET request to the API
    data.value = response.data;
    console.log(data.value);
    
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
/* Page-specific styles if needed */
</style>
