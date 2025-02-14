<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";
import { CoffeeData, Recipe, labelImages } from "@/utils/coffeeData";
import { computed, watch } from "vue";
import ReturnButton from "@/components/ReturnButton.vue";

const generateCoffeeImage = (imgName?: string) => {
  // const baseURL = import.meta.env.BASE_URL ?? "";
  console.log(imgName);
  return `./coffee/${imgName?.replaceAll(" ", "_")}.svg`;
};
// Use the coffee store

const coffeeStore = useCoffeeStore();

const listCoffee = computed(() => coffeeStore.listCoffee);

const listRecipes = computed<Record<Recipe, CoffeeData[]>>(() => {
  if (!listCoffee.value) return {} as Record<Recipe, CoffeeData[]>;
  return listCoffee.value.reduce((acc, coffee) => {
    const key = coffee.recipeId as Recipe;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(coffee);
    return acc;
  }, {} as Record<Recipe, CoffeeData[]>);
});

// Computed property for the selected coffee image
const selectedCoffeeImage = computed(() => {
  console.log(selectedRecipe.value);
  return selectedRecipe.value ? generateCoffeeImage(selectedRecipe.value) : "";
});

const selectRecipe = (recipe: Recipe) => {
  coffeeStore.selectRecipe(recipe);
};
const selectedRecipe = computed(() => coffeeStore.selectedRecipe);

const selectedRecipeDescription = computed(
  () => coffeeStore.selectedRecipeDescription
);

const selectRetailName = (retailName: string) => {
  coffeeStore.selectRetailName(retailName);
};

// Function to return to selection view
const returnToSelection = () => {
  coffeeStore.clearSelection();
};

// Expose the selected coffee image to the template
const getSelectedCoffeeImage = selectedCoffeeImage;

const availableBeverages = computed(() => coffeeStore.availableCoffees);

const availableBeveragesByRetailName = computed(() => {
  const map = new Map<string, string[]>();

  availableBeverages.value.forEach((coffee) => {
    if (!map.has(coffee.retailName)) {
      map.set(coffee.retailName, coffee.labels);
    }
    // If needed to merge labels if duplicate retailName:
    // else {
    //   const existingLabels = map.get(coffee.retailName)!;
    //   coffee.labels.forEach(label => {
    //     if (!existingLabels.includes(label)) {
    //       existingLabels.push(label);
    //     }
    //   });
    // }
  });

  return Array.from(map.entries()).map(([retailName, labels]) => ({
    retailName,
    labels,
  }));
});

watch(
  () => coffeeStore.selectedRecipe,
  () => {
    console.log(availableBeveragesByRetailName.value);
  }
);
</script>

<template>
  <div v-if="!selectedRecipe" class="selection-coffee-type">
    <div
      v-for="(_, name) in listRecipes"
      :key="name"
      class="coffee-card"
      @click="selectRecipe(name)"
    >
      <img :src="generateCoffeeImage(name)" :alt="name" class="coffee-image" />
      <span class="coffee-name">{{ name }}</span>
    </div>
  </div>

  <div v-else class="coffee-detail">
    <div class="coffee-infos">
      <div class="coffee-title">
        {{ selectedRecipe }}
        <img
          :src="getSelectedCoffeeImage"
          :alt="selectedRecipe"
          class="coffee-image"
        />
      </div>
      <p class="coffee-description">
        {{ selectedRecipeDescription }}
      </p>
      <div></div>
    </div>
    <ReturnButton :click="returnToSelection"> Coffee choice </ReturnButton>
    <h2>Select labels & sale point :</h2>
    <div class="selection-coffee-sale-point">
      <div
        v-for="coffee in availableBeveragesByRetailName"
        :key="coffee.retailName"
        :class="`coffee-card sale-point ${
          coffeeStore.selectedRetailName === coffee.retailName ? 'selected' : ''
        }`"
        @click="selectRetailName(coffee.retailName)"
      >
        <img
          :src="getSelectedCoffeeImage"
          :alt="coffee.retailName"
          class="coffee-image selected-image"
        />

        <span class="coffee-name">{{ coffee.retailName }}</span>
        <div v-if="coffee.labels.length > 0" class="labels">
          <img
            v-for="label in coffee.labels"
            :src="'./labels/' + labelImages.get(label)"
            :alt="label"
            class="label-image"
          />
        </div>
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

.labels {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  /* padding-top: 1em; */
}

.label-image {
  height: 30px;
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

.coffee-card.icon {
  border-radius: 100px;
  width: 120px;
  height: 120px;
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
  width: 60px;
  height: 60px;
  margin-bottom: 0.5em;
}

.coffee-description {
  margin-top: 1em;
  font-size: 1em;
  /* max-width: 300px; */
}
.selection-coffee-sale-point > .coffee-card {
  height: 200px;
  gap: 1rem;
  justify-content: space-around;
}
/* .selection-coffee-sale-point > .coffee-card > .coffee-name {
  font-size: medium;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
} */
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
    font-size: small;
    text-align: center;
  }
  .selection-coffee-sale-point > .coffee-card {
    width: 100px;
    height: 180px;
    min-height: fit-content;
  }
  /* .selection-coffee-sale-point {
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
  } */
}
</style>
