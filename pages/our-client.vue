<template>
  <div class="h-screen flex flex-col md:flex-row" v-if="!spinnerFlag">
    <!-- Sidebar Component -->
    <Sidebar class="md:w-1/4 bg-gray-100 text-white p-4 hidden md:block" />

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-8 bg-gray-100 overflow-auto">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl md:text-2xl font-bold">Our Clients</h1>
        <!-- Button to open modal -->
        <button
          @click="openModal"
          class="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Add New Client
        </button>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-200">
              <tr>
                <th
                  class="px-4 py-2 text-sm md:text-base cursor-pointer"
                  @click="sortTable('name')"
                >
                  Name
                </th>
                <th class="px-4 py-2 text-sm md:text-base cursor-pointer">
                  Logo
                </th>
              </tr>
            </thead>
          </table>
          <div class="table-body-wrapper h-64 overflow-y-auto">
            <table class="min-w-full">
              <tbody>
                <tr
                  class="text-center bg-white"
                  v-for="(item, index) in sortedData"
                  :key="index"
                >
                  <td class="px-4 py-2 text-sm md:text-base">{{ item.name }}</td>
                  <td class="px-4 py-2 flex justify-center">
                    <img
                      class="w-10 h-10 md:w-16 md:h-16 object-cover rounded-full"
                      :src="item.s3_url"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 md:p-8 rounded-lg w-full md:w-1/3">
        <h2 class="text-lg md:text-xl font-bold mb-4">Add New Client</h2>
        <form @submit.prevent="addClient">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Name</label>
            <input
              v-model="newClient.name"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Enter client name"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Image</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 mr-2 bg-gray-400 text-white rounded shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div v-else>
    <Spinner class="h-screen" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// State variables
const { $axios } = useNuxtApp();
const data = ref([]);
const spinnerFlag = ref(false);
const sortKey = ref("");
const sortOrder = ref("asc");
const modalOpen = ref(false);
const newClient = ref({
  name: "",
  image: null,
});

// Functions
const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  newClient.value = { name: "", image: null };
};

const handleFileUpload = (event) => {
  newClient.value.image = event.target.files[0];
};

const addClient = async () => {
  spinnerFlag.value = true;
  const formData = new FormData();
  formData.append("name", newClient.value.name);
  formData.append("image", newClient.value.image);

  try {
    const response = await $axios.post("/our_client/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      await getAllUsers()
      spinnerFlag.value = false;

      closeModal();
     
    }
  } catch (error) {
    spinnerFlag.value = false;
    console.error("Error adding client:", error);
  }
};

const getAllUsers = async () => {
  spinnerFlag.value = true;
  try {
    const response = await $axios.get("/our_clients");
    if (response.status === 200) {
      data.value = response.data?.data?.our_clients || [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    spinnerFlag.value = false;
  }
};

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

const sortedData = computed(() => {
  const sorted = [...data.value];
  if (sortKey.value) {
    sorted.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return sortOrder.value === "asc" ? -1 : 1;
      if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
});

onMounted(() => {
  getAllUsers();
});
</script>

<style scoped>
/* Mobile responsive styles */
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }

  th,
  td {
    padding: 0.5rem;
  }

  .modal {
    width: 90%;
  }
}
/* Scrollable table styles */
.max-h-80 {
  max-height: 20rem; /* Adjust height as needed */
}
.overflow-y-auto {
  overflow-y: auto;
}
.table-body-wrapper {
  max-height: 16rem; /* Adjust height as needed */
  overflow-y: auto;
}

thead th {
  position: sticky;
  top: 0;
 
  z-index: 10;
}
</style>
