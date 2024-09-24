<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Computed property for sugar level from the store
const sugarLevel = computed(() => coffeeStore.sugarLevel);

// Function to set sugar level
const setSugarLevel = (level: number) => {
  coffeeStore.setSugarLevel(level);
};
</script>

<template>
  <div class="sugar-selection">
    <label>Sugar Level:</label>
    <div class="sugar-buttons">
      <button
        v-for="level in [0, 1, 2, 3]"
        :key="level"
        :class="{ selected: sugarLevel === level }"
        @click="setSugarLevel(level)"
      >
        {{ level }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.sugar-selection {
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: large;
}

.sugar-buttons {
  display: flex;
  gap: 0.3em;
}

.sugar-buttons button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: medium;
}

.sugar-buttons button.selected {
  background-color: var(--color-primary-dark);
}

.sugar-buttons button:hover {
  background-color: var(--color-primary-dark);
}
</style>
