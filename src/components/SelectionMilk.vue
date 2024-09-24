<!-- src/components/SelectionMilk.vue -->
<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";
import { computed, watch } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Define available milk types
const milkOptions = [
  { value: "none", label: "No Milk" },
  { value: "cow", label: "Cow Milk" },
  { value: "almond", label: "Almond Milk" },
  { value: "soy", label: "Soy Milk" },
  // Add more milk types as needed
];

// Computed property for current milk selection
const selectedMilk = computed({
  get: () => coffeeStore.milkType,
  set: (value: string) => {
    coffeeStore.setMilkType(value);
  },
});

watch(
  selectedMilk,
  (newValue) => {
    console.log("Selected milk type:", newValue);
  },
  { immediate: true }
);
</script>

<template>
  <div class="milk-selection">
    <label for="milk-select" class="milk-label">Choose Milk Type:</label>
    <select id="milk-select" v-model="selectedMilk" class="milk-dropdown">
      <option
        v-for="option in milkOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.milk-selection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1em;
}

.milk-label {
  margin-bottom: 0.5em;
  font-size: 1.2em;
}

.milk-dropdown {
  padding: 0.5em 2em;
  font-size: 1em;

  border-radius: 4px;
}
</style>
