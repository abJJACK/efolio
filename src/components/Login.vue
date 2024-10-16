<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

const hardcodedUsername = 'user';
const hardcodedPassword = 'password';

const handleLogin = () => {
  if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about'); // 认证成功，跳转到 About 页面
  } else {
    localStorage.setItem('isAuthenticated', 'false');
    router.push('/access-denied'); // 认证失败，直接跳转到 AccessDenied 页面
  }
};
</script>

<style scoped>
/* 你可以在这里添加自定义样式 */
</style>