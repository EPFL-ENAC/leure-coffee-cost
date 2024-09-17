<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Define the coffee types with their corresponding SVG images
const coffeeTypes = [
  { name: "Espresso", img: "./coffee/Espresso.svg" },
  { name: "Ristretto", img: "./coffee/Espresso.svg" },
  { name: "Doppio", img: "./coffee/FlatWhite.svg" },
  { name: "Flat White", img: "./coffee/FlatWhite.svg" },
  { name: "Americano", img: "./coffee/Americano.svg" },
  { name: "Cappuccino", img: "./coffee/Cappuccino.svg" },
];

// Computed property for the selected coffee from the store
const selectedCoffee = computed(() => coffeeStore.selectedCoffee);

// Computed property for the selected coffee image
const selectedCoffeeImage = computed(() => {
  const coffee = coffeeTypes.find((c) => c.name === selectedCoffee.value);
  return coffee ? coffee.img : "";
});

// Function to handle selection
const selectCoffee = (coffeeName: string) => {
  coffeeStore.selectCoffee(coffeeName);
};

// Function to return to selection view
const returnToSelection = () => {
  coffeeStore.clearSelection();
};

// Expose the selected coffee image to the template
const getSelectedCoffeeImage = selectedCoffeeImage;
</script>

<template>
  <div v-if="!selectedCoffee" class="selection-coffee-type">
    <div
      v-for="coffee in coffeeTypes"
      :key="coffee.name"
      class="coffee-card"
      @click="selectCoffee(coffee.name)"
    >
      <img :src="coffee.img" :alt="coffee.name" class="coffee-image" />
      <span class="coffee-name">{{ coffee.name }}</span>
    </div>
  </div>

  <div v-else class="coffee-detail">
    <button class="return-button" @click="returnToSelection">← Return</button>
    <div class="coffee-card selected">
      <img
        :src="getSelectedCoffeeImage"
        :alt="selectedCoffee"
        class="coffee-image selected-image"
      />
      <span class="coffee-name">{{ selectedCoffee }}</span>
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
  width: 140px;
  height: 180px; /* Increased height to accommodate image and text */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: var(--color-primary) 2px solid;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.coffee-card:not(.selected):hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px); /* Optional: Add a hover effect */
}

.coffee-card:not(.selected):active {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.coffee-image {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5em;
}

.coffee-name {
  font-size: 1.2em;
  text-align: center;
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
  color: var(--color-secondary);
  transition: color 0.2s;
}

.return-button:hover {
  filter: brightness(0.8);
}

.selected {
  width: 220px;
  height: 220px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1em;
  cursor: default;
}

.selected-image {
  width: 120px;
  height: 120px;
  margin-bottom: 0.5em;
}

.coffee-description {
  margin-top: 1em;
  font-size: 1em;
  text-align: center;
  max-width: 300px;
  color: #555;
}
</style>
