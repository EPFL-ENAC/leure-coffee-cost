<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Computed property for milk selection from the store
const hasMilk = computed(() => coffeeStore.hasMilk);

// Function to toggle milk selection
const toggleMilk = () => {
  coffeeStore.toggleMilk();
};
</script>

<template>
  <div class="milk-selection">
    <label class="switch">
      <input type="checkbox" v-model="hasMilk" @change="toggleMilk" />
      <span class="slider round"></span>
    </label>
    <span class="milk-label"> Milk </span>
  </div>
</template>

<style scoped>
.milk-selection {
  display: flex;
  align-items: center;
  margin-top: 1em;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-primary-dark);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.milk-label {
  margin-left: 10px;
  font-size: 1.2em;
}
</style>
