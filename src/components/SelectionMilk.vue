<!-- src/components/SelectionMilk.vue -->
<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";
import { milkName, MilkType } from "@/utils/coffeeData";
import { computed, watch } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

const disabled = computed(() => coffeeStore.availableMilkTypes.length <= 1);
// Computed property for current milk selection
const selectedMilk = computed({
  get: () => coffeeStore.milkType,
  set: (value: MilkType) => {
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
  <div :class="`milk-selection ${disabled ? 'disabled' : ''}`">
    <label for="milk-select" class="milk-label">Choose Milk Type:</label>
    <select id="milk-select" v-model="selectedMilk" class="milk-dropdown">
      <option
        v-for="option in coffeeStore.availableMilkTypes"
        :key="option"
        :value="option"
      >
        {{ milkName.get(option) }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.milk-selection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.milk-selection.disabled {
  opacity: 0.5;
}

.milk-label {
  font-size: large;
}

.milk-dropdown {
  padding: 0.5em 2em;
  font-size: medium;
  border-radius: 4px;
}
</style>
