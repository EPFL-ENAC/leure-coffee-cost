<script setup lang="ts"></script>

<template>
  <div class="app-container">
    <h1 class="app-title">True Cost of Coffee</h1>
    <RouterView />
  </div>
</template>

<style scoped>
.app-title {
  font-size: 2.3em;
  color: white;
  margin-bottom: 0.5em;
  /* color: var(--color-primary-dark); */
  /* position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); */
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 2em;
  max-width: 800px;
  margin: auto;
}
</style>
