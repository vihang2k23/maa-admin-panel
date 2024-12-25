<template>
  <div class="h-screen flex" v-if="!spinnerFlag">
    <!-- Sidebar Component -->
    <Sidebar class="md:w-1/4 bg-gray-100 text-white p-4" />

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-100 overflow-auto">
      <!-- Table Container -->
      <div class="overflow-x-auto w-full  items-center">
        <h1 class="text-center text-2xl mb-16">Pricing Plan Details</h1>
        <div class="overflow-x-auto">
          <!-- Table Wrapper -->
          <div class="table-wrapper bg-white shadow-md rounded-lg">
            <!-- Table Header -->
            <table class="min-w-full">
              <thead class="bg-gray-200">
                <tr>
                  <th class="px-4 py-2 cursor-pointer" @click="sortTable('amount')">Amount</th>
                  <th class="px-4 py-2 cursor-pointer" @click="sortTable('offer_price')">Offer Price</th>
                  <th class="px-4 py-2 cursor-pointer" @click="sortTable('month')">Month</th>
                  <th class="px-4 py-2 cursor-pointer" @click="sortTable('month_type')">Month Type</th>
                  <th class="px-4 py-2 cursor-pointer" @click="sortTable('sub_id')">Sub ID</th>
                </tr>
              </thead>
            </table>
        
            <!-- Scrollable Body -->
            <div class="table-body-wrapper h-64 overflow-y-auto">
              <table class="min-w-full">
                <tbody>
                  <tr class="text-center" v-for="(item, index) in sortedData" :key="index">
                    <td class="px-4 py-2">{{ item.amount }}</td>
                    <td class="px-4 py-2">{{ item.offer_price }}</td>
                    <td class="px-4 py-2">{{ item.month }}</td>
                    <td class="px-4 py-2">{{ item.month_type }}</td>
                    <td class="px-4 py-2">{{ item.sub_id }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  </div>
  <div v-else >
    
    <Spinner class="h-screen"/>
  </div>
</template>

<script setup>
// Import the Sidebar component
const { $axios } = useNuxtApp();
const data = ref([]);
const sortKey = ref('');
const spinnerFlag = ref(false)
const sortOrder = ref('asc'); // 'asc' for ascending, 'desc' for descending
definePageMeta({
  middleware: ["auth"],
});
onMounted(async () => {
  await getAllUsers();
});

const getAllUsers = async () => {
  try {
    spinnerFlag.value = true;
    const response = await $axios.get('/subscriptions'); // Make a GET request to the API
    if(response.statusCode == 200) {
      spinnerFlag.value = false;
    }
    data.value = response.data;
  } catch (error) {
    spinnerFlag.value = false;
    console.error(error);
  }finally {
    spinnerFlag.value = false; // Ensure spinnerFlag is false in all cases
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
.table-body-wrapper {
  max-height: 16rem; /* Adjust the height for the scrollable body */
  overflow-y: auto; /* Enable vertical scrolling */
}

thead th {
  position: sticky;
  top: 0; /* Keep the header fixed at the top */
  background-color: #e5e7eb; /* Match the header background color */
  z-index: 10; /* Ensure header stays above the content */
  white-space: nowrap; /* Prevent header text from wrapping */
}

tbody td {
  white-space: nowrap; /* Prevent content from wrapping in table cells */
}

</style>
