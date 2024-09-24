<script setup lang="ts">
import { useCoffeeStore } from "../stores/coffeeStore";
import { computed } from "vue";

// Use the coffee store
const coffeeStore = useCoffeeStore();

// Define the coffee types with their corresponding SVG images
const coffeeTypes = [
  { name: "Americano", img: "/coffee/Americano.svg" },
  { name: "Café", img: "/coffee/Café.svg" },
  { name: "Café Macchiato", img: "/coffee/Café_Macchiato.svg" },
  { name: "Cappuccino", img: "/coffee/Cappuccino.svg" },
  { name: "Cappuccino Vanille", img: "/coffee/Cappuccino_vanille.svg" },
  { name: "Espresso", img: "/coffee/Espresso.svg" },
  { name: "Espresso Macchiato", img: "/coffee/Espresso_Macchiato.svg" },
  { name: "Flat White", img: "/coffee/FlatWhite.svg" },
  { name: "Latte Macchiato", img: "/coffee/Latte_Macchiato.svg" },
  {
    name: "Latte Macchiato Vanille",
    img: "/coffee/Latte_Macchiato_vanille.svg",
  },
  { name: "Mocaccino", img: "/coffee/Mocaccino.svg" },
  { name: "Renversé", img: "/coffee/Renversé.svg" },
  { name: "Ristretto", img: "/coffee/Ristretto.svg" },
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

const selectSalePoint = (salePoint: string) => {
  coffeeStore.selectSalePoint(salePoint);
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
    <div class="coffee-infos">
      <div class="coffee-title">
        {{ selectedCoffee }}
        <img
          :src="getSelectedCoffeeImage"
          :alt="selectedCoffee"
          class="coffee-image"
        />
      </div>
      <p class="coffee-description">
        {{ selectedCoffee }} is a popular coffee type known for its rich flavor
        and strong aroma. Enjoy the smooth and bold taste with every sip!
      </p>
      <div></div>
    </div>
    <button class="return-button" @click="returnToSelection">
      <vue-feather type="arrow-left"></vue-feather>
      Choix du café
    </button>
    <h2>Comparez les fournisseurs</h2>
    <div class="selection-coffee-sale-point">
      <div
        v-for="(coffee, i) in coffeeTypes.filter((_c, i) => i < 3)"
        :key="coffee.name"
        :class="`coffee-card ${
          coffeeStore.selectedSalePoint === i.toString() ? 'selected' : ''
        }`"
        @click="selectSalePoint(i.toString())"
      >
        <img
          :src="getSelectedCoffeeImage"
          :alt="selectedCoffee"
          class="coffee-image selected-image"
        />
        <span class="coffee-name">Fournisseur {{ i + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selection-coffee-type {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.selection-coffee-sale-point {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
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
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: white;
  color: var(--color-secondary-dark);
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
.coffee-title {
  font-size: xx-large;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  gap: 0.5em;

  /* text-decoration: underline;
  text-underline-offset: 0.1em; */
  /* margin-bottom: 1em; */
  align-items: center;
}

.coffee-title img {
  width: 50px;
  height: 50px;
  border: var(--color-primary-dark) 3px solid;
  background-color: white;
  border-radius: 50px;
  padding: 10px;
}
.coffee-name {
  font-size: medium;
  font-weight: bold;
  text-align: center;
}

.coffee-detail {
  font-size: medium;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.return-button {
  border: none;
  font-size: medium;
  cursor: pointer;
  align-self: flex-start;
  color: var(--color-secondary-dark);
  transition: color 0.2s;
  display: flex;
  gap: 0.5em;
  margin: 2em 0px;
  align-items: center;
  background-color: white;
}

.coffee-card.icon {
  border-radius: 100px;
  width: 120px;
  height: 120px;
}
.return-button:hover {
  filter: brightness(0.8);
}

.coffee-card:hover {
  background-color: var(--color-primary-light);
}

.selected {
  /* width: 220px;
  height: 220px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1em;
  cursor: default; */
  background-color: var(--color-primary-dark);
  /* outline: var(--color-primary-dark) 6px solid; */
}

.selected-image {
  width: 120px;
  height: 120px;
  margin-bottom: 0.5em;
}

.coffee-description {
  margin-top: 1em;
  font-size: 1em;
  max-width: 300px;
}

@media screen and (max-width: 600px) {
  .coffee-card {
    width: 80px;
    height: 110px;
  }
  .coffee-image {
    width: 50px;
    height: 50px;
    margin-bottom: 0.5em;
  }

  .coffee-name {
    font-size: medium;
    text-align: center;
  }
}
</style>
