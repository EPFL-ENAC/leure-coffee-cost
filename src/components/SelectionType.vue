<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Define the coffee types
const coffeeTypes = [
  "Espresso",
  "Ristretto",
  "Doppio",
  "Flat White",
  "Americano",
  "Cappuccino",
];

// Computed property for the selected coffee from the store
const selectedCoffee = computed(() => coffeeStore.selectedCoffee);

// Function to handle selection
const selectCoffee = (coffee: string) => {
  coffeeStore.selectCoffee(coffee);
};

// Function to return to selection view
const returnToSelection = () => {
  coffeeStore.clearSelection();
};
</script>

<template>
  <div v-if="selectedCoffee === null" class="selection-coffee-type">
    <div
      v-for="coffee in coffeeTypes"
      :key="coffee"
      class="coffee-card"
      @click="selectCoffee(coffee)"
    >
      {{ coffee }}
    </div>
  </div>

  <div v-else class="coffee-detail">
    <button class="return-button" @click="returnToSelection">← Return</button>
    <div class="coffee-card selected">
      {{ selectedCoffee }}
    </div>
    <p class="coffee-description">
      {{ selectedCoffee }} is a popular coffee type known for its rich flavor
      and strong aroma. Enjoy the smooth and bold taste with every sip!
    </p>
  </div>
</template>

<style scoped>
.selection-coffee-type {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.coffee-card {
  border-radius: 8px;
  padding: 1em;
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.coffee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.coffee-card:active {
  transform: translateY(0);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.coffee-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.return-button {
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin-bottom: 1em;
  align-self: flex-start;
}

.return-button:hover {
  color: #007bff;
}

.selected {
  width: 200px;
  height: 120px;
  font-size: 1.5em;
}

.coffee-description {
  margin-top: 1em;
  font-size: 1em;
  text-align: center;
  max-width: 300px;
}
</style>
