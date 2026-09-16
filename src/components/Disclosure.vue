<script setup lang="ts">
defineProps<{ open: boolean; showLabel: string; hideLabel: string }>();
const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <button class="link" type="button" :aria-expanded="open" @click="emit('toggle')">
    {{ open ? hideLabel : showLabel }}
  </button>
  <slot v-if="open" />
</template>

<style scoped>
.link {
  font-size: var(--fs-small);
  color: var(--accent);
  cursor: pointer;
}
</style>
