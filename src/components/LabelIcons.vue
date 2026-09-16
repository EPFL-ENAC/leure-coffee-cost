<script setup lang="ts">
import { computed } from "vue";
import { labelImages, labelNames } from "@/utils/coffeeData";
import { labelUrl } from "@/utils/assets";

const props = withDefaults(defineProps<{ labels: string[]; size?: number }>(), { size: 24 });

const icons = computed(() =>
  props.labels
    .filter((l) => labelImages.has(l))
    .map((l) => ({ id: l, src: labelUrl(labelImages.get(l) as string), name: labelNames.get(l) ?? l }))
);
</script>

<template>
  <img
    v-for="l in icons"
    :key="l.id"
    class="label"
    :src="l.src"
    :alt="l.name"
    :title="l.name"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<style scoped>
.label {
  flex-shrink: 0;
  object-fit: contain;
}
</style>
