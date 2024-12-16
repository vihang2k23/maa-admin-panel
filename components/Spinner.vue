<template>
    <div class="spinner">
      <img src="/spinner.gif" alt="Loading..." class="spinner-image" />
    </div>
  </template>
  
  <script setup>
  // No additional logic needed for a simple spinner
  </script>
  
  <style scoped>
  .spinner {
    position: fixed; /* Center the spinner relative to the viewport */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensures it stays on top */
  }
  
  .spinner-image {
    width: 500px; /* Set size for the spinner */
    height: auto;
  }
  </style>
  