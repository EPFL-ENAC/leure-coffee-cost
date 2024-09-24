<script setup lang="ts"></script>

<template>
  <h1 class="app-title">True Cost of Coffee</h1>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
.app-title {
  font-size: 2.3em;
  color: white;
  /* color: var(--color-primary-dark); */
  /* position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); */
  text-align: center;
  padding: 1em 1em;
  margin: 0px 0px;
  margin-bottom: 1em;
  color: var(--color-secondary-dark);
  background: var(--color-primary-light);
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 2em;
  padding: 1.5em;
  max-width: 800px;
  margin: auto;
}

@media screen and (max-width: 600px) {
  .app-container {
    gap: 0.8em;
    padding: 1em;
  }
}
</style>
