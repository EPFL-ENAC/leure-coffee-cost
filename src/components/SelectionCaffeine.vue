<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Computed property for caffeine selection from the store
const isDecaf = computed(() => coffeeStore.isDecaf);

// Function to toggle caffeine selection
const toggleCaffeine = () => {
  coffeeStore.toggleCaffeine();
};
</script>

<template>
  <div class="caffeine-selection">
    <label class="switch">
      <input type="checkbox" v-model="isDecaf" @change="toggleCaffeine" />
      <span class="slider round"></span>
    </label>
    <span class="caffeine-label">
      {{ !isDecaf ? "Caffeinated" : "Decaf" }}
    </span>
  </div>
</template>

<style scoped>
.caffeine-selection {
  display: flex;
  align-items: center;
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

.caffeine-label {
  margin-left: 10px;
  font-size: 1.2em;
  min-width: 4em;
}

@media screen and (max-width: 600px) {
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 26px;
  }

  .slider:before {
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 3px;
  }
  input:checked + .slider:before {
    transform: translateX(30px);
  }
}
</style>
