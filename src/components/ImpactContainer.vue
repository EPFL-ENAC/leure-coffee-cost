<template>
  <div class="impact-container">
    <div v-if="store.selectedImpact" class="impact-card">
      <div class="impact-header">
        <span class="impact-category">
          <i class="impact-icon" />
          {{ store.selectedImpact?.indicators.toLocaleUpperCase() }}
        </span>
      </div>
      <div class="impact-value">
        <h2>
          {{ store.selectedImpact.impactValue.toExponential(2) }}
          <span class="unit">
            {{ store.selectedImpact.unit }}
          </span>
        </h2>
        <h2>:</h2>

        <h2>
          {{ store.selectedImpact?.costValue.toFixed(4) }}
          <span class="unit">CHF</span>
        </h2>
      </div>
      <div class="impact-details">
        <h4>Definition</h4>
        <p>{{ capitalizeFirstLetter(store.selectedImpact?.definition) }}</p>
        <h4>Reference</h4>
        <p>{{ store.selectedImpact?.reference }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";
import { computed } from "vue";

const store = useCoffeeStore();
function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const percentageOfCost = computed(() => {
  if (store.selectedImpact)
    return (
      (store.selectedImpact?.costValue * 100) /
      (store.selectedCoffee?.hiddenCost ?? 1)
    ).toPrecision(2);
  else return 0;
});
</script>

<style scoped>
.impact-container {
  margin-top: 3em;
  display: flex;
  justify-content: center;
}

.impact-card {
  width: 90%;
  max-width: 600px;
  padding: 1.5em;
  border-radius: 1.5em;
  background: var(--color-primary-light);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: var(--color-secondary-dark);
  text-align: left;
}

.impact-header {
  display: flex;
  justify-content: end;
  margin-bottom: 1em;
}

.impact-category {
  display: flex;
  align-items: right;
  font-size: 1.2em;
  font-weight: bold;
}

.impact-icon {
  background: url("/icons/impact-icon.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  margin-right: 0.5em;
}

.impact-value {
  text-align: center;
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 5px;
  margin-top: 1em;
  position: relative;
  overflow: hidden;
  color: var(--color-secondary-dark);
  font-size: 0.8rem;
  font-weight: bold;
}

.unit {
  font-size: small;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-secondary-dark);
  border-radius: 5px;
  transition: width 0.4s ease-in-out;
}

.impact-details h4 {
  margin: 0.5em 0;
  font-weight: bold;
}

.impact-details p {
  margin: 0;
  font-size: 1em;
  line-height: 1.4em;
}
</style>
