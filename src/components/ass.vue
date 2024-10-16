<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <h1 class="text-center">Registration</h1>
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username"
                       v-model="formData.username"
                       @blur="() => validateName(true)" 
                       @input="() => validateName(false)">
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email"
                       v-model="formData.email"
                       @blur="validateEmail">
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password"
                       v-model="formData.password"
                       @blur="() => validatePassword(true)" 
                       @input="() => validatePassword(false)">
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="confirm-password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm-password"
                       v-model="formData.confirmPassword"
                       @blur="() => validateConfirmPassword(true)">
                <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Submit</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
          <div class="text-center mt-3">
            <button class="btn btn-link" @click="goToLogin">已经有账号了？点击登录</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const formData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const errors = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  });
  
  const validateName = (blur) => {
    if (formData.value.username.length < 3) {
      errors.value.username = blur ? "Username must be at least 3 characters" : null;
    } else {
      errors.value.username = null;
    }
  };
  
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.value.email)) {
      errors.value.email = "Invalid email format";
    } else {
      errors.value.email = null;
    }
  };
  
  const validatePassword = (blur) => {
    const password = formData.value.password;
    if (password.length < 8) {
      errors.value.password = blur ? "Password must be at least 8 characters long." : null;
      return;
    }
    if (!/[A-Z]/.test(password)) {
      errors.value.password = blur ? "Password must contain at least one uppercase letter." : null;
      return;
    }
    if (!/[a-z]/.test(password)) {
      errors.value.password = blur ? "Password must contain at least one lowercase letter." : null;
      return;
    }
    if (!/\d/.test(password)) {
      errors.value.password = blur ? "Password must contain at least one number." : null;
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.value.password = blur ? "Password must contain at least one special character." : null;
      return;
    }
    errors.value.password = null;
  };
  
  const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
      errors.value.confirmPassword = blur ? 'Passwords do not match.' : null;
    } else {
      errors.value.confirmPassword = null;
    }
  };
  
  const submitForm = () => {
    validateName(true);
    validateEmail();
    validatePassword(true);
    validateConfirmPassword(true);
    if (!errors.value.username && !errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
      console.log('Form submitted successfully:', formData.value);
      clearForm(); // Optionally clear form after submit
    } else {
      console.log('Form validation failed');
    }
  };
  
  const clearForm = () => {
    formData.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    errors.value = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  };
  
  // Function to navigate to login page
  const goToLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .text-danger {
    color: #dc3545;
  }
  </style>