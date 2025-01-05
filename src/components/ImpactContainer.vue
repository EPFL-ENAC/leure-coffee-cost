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
          {{ store.selectedImpact.impactValue.toFixed(4) }}
          {{ store.selectedImpact.unit }} =
          {{ store.selectedImpact?.costValue.toFixed(4) }} CHF
        </h2>
        <div class="progress-bar">
          <div
            class="progress-bar-fill"
            :style="{
              width:
                (store.selectedImpact?.costValue * 100) /
                  (store.selectedCoffee?.hiddenCost ?? 1) +
                '%',
            }"
          ></div>
        </div>
      </div>
      <div class="impact-details">
        <h4>Definition</h4>
        <p>{{ store.selectedImpact?.definition }}</p>
        <h4>Reference</h4>
        <p>{{ store.selectedImpact?.reference }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";

const store = useCoffeeStore();
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
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  margin-top: 1em;
  position: relative;
  overflow: hidden;
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
