<template>
    <div class="about">
      <h1>About Our Library</h1>
      <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
      <!-- Logout Button -->
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  const router = useRouter();
  
  const isAuthenticated = ref(true); // Assume the user is logged in
  
  // Logout logic
  function logout() {
    isAuthenticated.value = false; // Update authentication status
    router.push('/login'); // Redirect to the login page
  }
  </script>
  
  <style scoped>
  .about {
    text-align: center;
    margin-top: 2rem;
  }
  
  .logout-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .logout-button:hover {
    background-color: #d32f2f;
  }
  </style>