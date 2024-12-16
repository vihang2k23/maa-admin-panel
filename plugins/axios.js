import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    baseURL: 'http://3.110.168.116:8000', // Replace with your API base URL
  });

  // Add Axios instance to the app context
  nuxtApp.provide('axios', axiosInstance);
});
