<template>
  <header>
    <BHeader />
  </header>

  <main>
    <router-view />
  </main>
</template>

<script setup>
import BHeader from './components/BHeader.vue';
</script>

<style scoped>
main {
  padding: 2rem;
}
</style>