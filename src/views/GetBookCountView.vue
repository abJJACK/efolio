<template>
    <div>
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
  
      <div v-if="count !== null">
        <p>Total number of books: {{ count }}</p>
      </div>
      <div v-else-if="error">
        <p>Error: {{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,       
        error: false,     
        errorMessage: ''  
      };
    },
    methods: {
      async getBookCount() { 
        try {
          const response = await axios.get('https://countbooks-c7zqqngkdq-uc.a.run.app'); 
          this.count = response.data.count; 
          this.error = false; 
        } catch (error) {  
          this.errorMessage = 'Failed to fetch book count';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>