<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed, watch } from "vue";

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
  margin-top: 1em;
  font-size: medium;
  gap: 10px;
  background-color: var(--color-primary-light);
  /* border: white 1px solid; */
  color: var(--color-secondary-dark);
  padding: 1em 4em;
  border-radius: 10px;
  min-width: min(50vw, 300px);
  font-weight: bold;
}

.price-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.price-item span {
  margin-right: 10px;
}

.price-item.total {
  font-size: larger;
  color: var(--color-secondary-dark);
}

.price-item.total span {
  margin-right: 5px;
}

@media screen and (max-width: 600px) {
  /* .price-display {
    width: 100%;
    border-radius: 0px;
    justify-content: center;
    align-items: center;
  }

  .price-item {
    max-width: 60vw;
  } */
}
</style>
