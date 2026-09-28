<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ paid: number; hidden: number }>();

const total = computed(() => props.paid + props.hidden || 1);
const paidW = computed(() => ((props.paid / total.value) * 100).toFixed(1) + "%");
const hidW = computed(() => ((props.hidden / total.value) * 100).toFixed(1) + "%");
</script>

<template>
  <div class="split">
    <div class="paid" :style="{ width: paidW }"></div>
    <div class="hidden" :style="{ width: hidW }"></div>
  </div>
</template>

<style scoped>
.split {
  display: flex;
  height: 10px;
  width: 100%;
}
.paid {
  height: 10px;
  background: var(--bean);
}
.hidden {
  height: 10px;
  background: var(--accent);
}
</style>
