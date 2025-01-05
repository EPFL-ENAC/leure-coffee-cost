<script setup lang="ts">
const props = defineProps<{
  click: () => void;
}>();
</script>

<template>
  <button class="return-button" @click="props.click">
    <vue-feather type="arrow-left"></vue-feather>
    <slot></slot>
  </button>
</template>

<style scoped>
.return-button {
  border: none;
  font-size: medium;
  cursor: pointer;
  align-self: flex-start;
  color: var(--color-secondary-dark);
  transition: color 0.2s;
  display: flex;
  gap: 0.5em;
  margin: 2em 0px;
  align-items: center;
  background-color: white;
}

.return-button:hover {
  filter: brightness(0.8);
}
</style>
