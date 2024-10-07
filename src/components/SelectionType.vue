<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";
import {
  CoffeeData,
  recipeDetails,
  salePointDetails,
} from "@/utils/coffeeData";
import { computed, onMounted, ref, watch } from "vue";

const generateCoffeeImage = (imgName?: string) => {
  // const baseURL = import.meta.env.BASE_URL ?? "";
  return `./coffee/${imgName}`;
};
// Use the coffee store

const coffeeStore = useCoffeeStore();

const listCoffee = ref<CoffeeData[] | null>(null);

const listRecipes = computed(() => {
  if (!listCoffee.value) return {};
  return listCoffee.value
    .filter((d) => d.marketPrice && d.marketPrice > 0)
    .reduce((acc, coffee) => {
      const key = coffee.mainRecipe;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(coffee);
      return acc;
    }, {} as Record<string, CoffeeData[]>);
});

// Computed property for the selected coffee image
const selectedCoffeeImage = computed(() => {
  return selectedRecipe.value
    ? generateCoffeeImage(recipeDetails.get(selectedRecipe.value)?.img)
    : "";
});

const selectRecipe = (recipe: string) => {
  coffeeStore.selectRecipe(recipe);
};
const selectedRecipe = computed(() => coffeeStore.selectedRecipe);

const selectSalePoint = (salePoint: string) => {
  coffeeStore.selectSalePoint(salePoint);
};

// Function to return to selection view
const returnToSelection = () => {
  coffeeStore.clearSelection();
};

// Expose the selected coffee image to the template
const getSelectedCoffeeImage = selectedCoffeeImage;

const listSalesPoint = computed(() => {
  if (!listRecipes.value) return {};
  else if (selectedRecipe.value)
    return listRecipes.value[selectedRecipe.value].reduce((acc, coffee) => {
      const key = coffee.salePointId;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(coffee);
      return acc;
    }, {} as Record<string, CoffeeData[]>);
});

watch(listSalesPoint, (newValue) => {
  console.log("Selected sale point:", newValue);
});

onMounted(async () => {
  listCoffee.value = await coffeeStore.listCoffee;
});
</script>

<template>
  <div v-if="!selectedRecipe" class="selection-coffee-type">
    <div
      v-for="(_, name) in listRecipes"
      :key="name"
      class="coffee-card"
      @click="selectRecipe(name)"
    >
      <img
        :src="generateCoffeeImage(recipeDetails.get(name)?.img)"
        :alt="name"
        class="coffee-image"
      />
      <span class="coffee-name">{{ recipeDetails.get(name)?.name }}</span>
    </div>
  </div>

  <div v-else class="coffee-detail">
    <div class="coffee-infos">
      <div class="coffee-title">
        {{ recipeDetails.get(selectedRecipe)?.name }}
        <img
          :src="getSelectedCoffeeImage"
          :alt="recipeDetails.get(selectedRecipe)?.name"
          class="coffee-image"
        />
      </div>
      <p class="coffee-description">
        {{ recipeDetails.get(selectedRecipe)?.name }} is a popular coffee type
        known for its rich flavor and strong aroma. Enjoy the smooth and bold
        taste with every sip!
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
        v-for="(_, name) in listSalesPoint"
        :key="name"
        :class="`coffee-card sale-point ${
          coffeeStore.selectedSalePoint === name ? 'selected' : ''
        }`"
        @click="selectSalePoint(name)"
      >
        <img
          :src="getSelectedCoffeeImage"
          :alt="name"
          class="coffee-image selected-image"
        />
        <span class="coffee-name">{{
          salePointDetails.get(name)?.name.replace("EPFL", "")
        }}</span>
        <span class="coffee-name"> 10 CHF </span>
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
  border: var(--color-primary-dark) 5px solid;
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
.selection-coffee-sale-point > .coffee-card {
  height: 240px;
}
.selection-coffee-sale-point > .coffee-card > .coffee-name {
  font-size: medium;
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

  .selection-coffee-sale-point {
    gap: 1em;
    margin-bottom: 0.5em;
  }
  .selection-coffee-sale-point > .coffee-card {
    width: 65px;
    height: 140px;
    padding: 1em;
  }

  .selection-coffee-sale-point > .coffee-card > .coffee-name {
    font-size: small;
  }

  .selection-coffee-sale-point > .coffee-card > .coffee-image {
    width: 20px;
    height: 20px;
  }
}
</style>
