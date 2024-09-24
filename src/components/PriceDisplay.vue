<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Computed properties to get prices from the store
const retailPrice = computed(() => coffeeStore.retailPrice);
const hiddenCost = computed(() => coffeeStore.hiddenCost);
const truePrice = computed(() => coffeeStore.truePrice);
</script>

<template>
  <div class="price-display">
    <div class="price-item">
      <span>Retail Price:</span>
      <span>{{ retailPrice.toFixed(2) }} $</span>
    </div>
    <div class="price-item">
      <span>Hidden Cost:</span>
      <span>{{ hiddenCost.toFixed(2) }} $</span>
    </div>
    <div class="price-item total">
      <span>True Price:</span>
      <span>{{ truePrice.toFixed(2) }} $</span>
    </div>
  </div>
</template>

<style scoped>
.price-display {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2em;
  font-size: 1.2em;
  background-color: var(--color-primary-light);
  /* border: white 1px solid; */
  color: var(--color-secondary-dark);
  padding: 1em;
  border-radius: 10px;
  font-weight: bold;
}

.price-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5em;
}

.price-item span {
  margin-right: 10px;
}

.price-item.total {
  font-size: 1.5em;
  color: var(--color-secondary-dark);
}

.price-item.total span {
  margin-right: 5px;
}
</style>
