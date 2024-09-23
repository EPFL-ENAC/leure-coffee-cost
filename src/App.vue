<script setup lang="ts">
import SelectionType from "./components/SelectionType.vue";
import SelectionCaffeine from "./components/SelectionCaffeine.vue";
import SelectionMilk from "./components/SelectionMilk.vue";
import SelectionSugar from "./components/SelectionSugar.vue";
import PriceDisplay from "./components/PriceDisplay.vue";
import ResultPie from "./components/ResultPie.vue";
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">True Cost of Coffee</h1>

    <SelectionType />
    <SelectionCaffeine />
    <SelectionMilk />
    <SelectionSugar />
    <PriceDisplay />
    <ResultPie />
  </div>
</template>

<style scoped>
.app-title {
  font-size: 2.3em;
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
  /* max-width: 600px; */
}
</style>
