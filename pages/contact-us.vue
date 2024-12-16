<template>
  <div class="h-screen flex">
    <!-- Sidebar Component -->
    <Sidebar class="md:w-1/4 bg-gray-100 text-white p-4" />

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-100 overflow-auto">
      <!-- Table Container -->
      <div class="overflow-x-auto w-full  items-center">
        <h1 class="text-center text-2xl mb-16">Contact-Us</h1>
        <table class="min-w-full bg-white  shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2 cursor-pointer" @click="sortTable('name')">Name</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable('email')">Email</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable('message')">Message</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable('status')">Status</th>
              <th class="px-4 py-2 cursor-pointer" @click="sortTable('id')">ID</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="(item, index) in sortedData" :key="index">
              <td class="px-4 py-2">{{ item.name }}</td>
              <td class="px-4 py-2">{{ item.email }}</td>
              <td class="px-4 py-2">{{ item.message }}</td>
              <td class="px-4 py-2">{{ item.status }}</td>
              <td class="px-4 py-2">{{ item.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
// Import the Sidebar component
const { $axios } = useNuxtApp();
const data = ref([]);
const sortKey = ref('');
const sortOrder = ref('asc'); // 'asc' for ascending, 'desc' for descending

onMounted(async () => {
  await getAllUsers();
});

const getAllUsers = async () => {
  try {
    const response = await $axios.get('/contact_messages'); // Make a GET request to the API
    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// Sorting logic
const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'; // Toggle order if the same column is clicked
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc'; // Default to ascending if a new column is clicked
  }
};

const sortedData = computed(() => {
  const sorted = [...data.value];
  if (sortKey.value) {
    sorted.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return sortOrder.value === 'asc' ? -1 : 1;
      if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return sorted;
});
</script>

<style scoped>
/* Page-specific styles */
@media (max-width: 768px) {
  /* Mobile layout: remove columns */
  .flex {
    flex-direction: column;
  }

  main {
    padding: 8px; /* Adjust padding for small screens */
  }

  /* Table adjustments for mobile screens */
  table {
    font-size: 0.875rem; /* Make text a bit smaller for small screens */
  }

  th, td {
    padding: 1rem; /* Adjust padding for smaller screens */
  }

  /* Ensure table fits within available space and doesn't get overridden */
  .overflow-x-auto {
    overflow-x: auto;
    padding-left: 0; /* Remove extra padding */
    padding-right: 0; /* Remove extra padding */
  }
}

@media (min-width: 768px) {
  /* For larger screens, set table width dynamically */
  table {
    width: 100%;
  }
}
</style>
