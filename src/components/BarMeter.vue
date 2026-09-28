<script setup lang="ts">
import { computed } from "vue";
import { pct } from "@/utils/format";

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    color?: string;
    height?: number;
    /** Set the width yourself when the share is already worked out. */
    width?: string;
  }>(),
  { value: 0, max: 1, color: "var(--bean)", height: 6, width: undefined }
);

const w = computed(() => props.width ?? pct(props.value, props.max));
</script>

<template>
  <div class="track" :style="{ height: height + 'px' }">
    <div class="fill" :style="{ width: w, height: height + 'px', background: color }"></div>
  </div>
</template>

<style scoped>
.track {
  width: 100%;
  background: var(--foam);
}
.fill {
  min-width: 0;
}
</style>
