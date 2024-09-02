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
  font-weight: bold;
  font-size: 1.5em;
  color: #007bff;
}

.price-item.total span {
  margin-right: 5px;
}
</style>
