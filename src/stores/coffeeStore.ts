import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  CoffeeImpactData,
  CoffeeData,
  salePointDetails,
  MilkType,
  Recipe,
  generateSunburstData,
  ImpactDetail,
} from "@/utils/coffeeData";
import Papa from "papaparse";

export const useCoffeeStore = defineStore("coffee", () => {
  // State
  const listCoffee = ref<CoffeeData[] | null>(null);

  const loadListCoffee = async () => {
    if (listCoffee.value && listCoffee.value.length !== 0) return;

    try {
      const response = await fetch("./data/coffeeData.csv"); // Corrected the filename
      const csvText = await response.text();

      const parsedData = Papa.parse<CoffeeData>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true, // Skip empty lines
      });

      // Validate and filter parsed data
      listCoffee.value = parsedData.data.filter(
        (coffee) => coffee.serveId && coffee.recipeId
      );
    } catch (error) {
      console.error("Failed to load CSV:", error);
    }
  };

  // Load data immediately when the store is initialized
  loadListCoffee();

  // Selections
  const selectedRecipe = ref<Recipe | null>(null);
  const selectedSalePoint = ref<string | null>(null);
  const isDecaf = ref<boolean>(true);
  const milkType = ref<MilkType>(MilkType.NONE);
  const sugarLevel = ref<number>(0);
  const selectedImpact = ref<ImpactDetail | undefined>(undefined);

  const filterWithCurrentMilkType = (d: CoffeeData) =>
    milkType.value === MilkType.NONE || d.milkType === milkType.value;

  const filterWithCurrentRecipe = (d: CoffeeData) =>
    selectedRecipe.value === null || d.mainRecipe === selectedRecipe.value;

  const filterWithCurrentSalePoint = (d: CoffeeData) =>
    selectedSalePoint.value === null ||
    d.salePointId === selectedSalePoint.value;

  const filterWithCurrentDecaf = (d: CoffeeData) => d.isDecaf === isDecaf.value;

  const filterWithCurrentSelection = (d: CoffeeData) => {
    return (
      filterWithCurrentDecaf(d) &&
      filterWithCurrentMilkType(d) &&
      filterWithCurrentRecipe(d) &&
      filterWithCurrentSalePoint(d)
    );
  };

  // Computed property for available recipes (if needed)
  const availableRecipes = computed(() => {
    if (!listCoffee.value) return [];

    const recipes = new Set<Recipe>();
    listCoffee.value.forEach((coffee) => {
      recipes.add(coffee.mainRecipe as Recipe);
    });

    return Array.from(recipes);
  });

  // Computed property for available sales points based on selected recipe
  const availableSalePoints = computed(() => {
    if (!listCoffee.value || !selectedRecipe.value) return [];

    const salePoints = new Set<string>();
    listCoffee.value.forEach((coffee) => {
      if (coffee.mainRecipe === selectedRecipe.value) {
        salePoints.add(coffee.salePointId);
      }
    });

    return Array.from(salePoints)
      .map((id) => ({
        id,
        details: salePointDetails.get(id),
      }))
      .filter((item) => item.details !== undefined);
  });

  // Derived state: Available milk types based on selected recipe
  const availableMilkTypes = computed<MilkType[]>(() => {
    if (!selectedRecipe.value) return [MilkType.NONE];
    const list = listCoffee.value
      ?.filter(filterWithCurrentRecipe)
      .filter(filterWithCurrentSalePoint)
      .filter(filterWithCurrentDecaf)
      .map((d) => d.milkType);
    if (!list) return [MilkType.NONE];
    else return [...new Set(list)].map((d) => (d ?? MilkType.NONE) as MilkType);
  });

  watch(availableMilkTypes, (newList) => {
    if (!newList.includes(milkType.value)) milkType.value = newList[0];
  });

  // Computed property for coffees based on selected recipe and sale point
  const availableCoffees = computed(() => {
    if (!listCoffee.value || !selectedRecipe.value || !selectedSalePoint.value)
      return [];

    return listCoffee.value.filter(
      (coffee) =>
        coffee.mainRecipe === selectedRecipe.value &&
        coffee.salePointId === selectedSalePoint.value
    );
  });

  // Actions
  const selectRecipe = (recipe: Recipe) => {
    selectedRecipe.value = recipe;
    // Reset dependent selections
    selectedSalePoint.value = null;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    isDecaf.value = false;
  };

  const selectSalePoint = (salePoint: string) => {
    selectedSalePoint.value = salePoint;
  };

  const toggleCaffeine = () => {
    isDecaf.value = !isDecaf.value;
  };

  const setMilkType = (type: MilkType) => {
    if (availableMilkTypes.value.includes(type)) {
      milkType.value = type;
    } else {
      console.warn(
        `Milk type ${type} is not available for the selected recipe.`
      );
    }
  };

  const setSugarLevel = (level: number) => {
    sugarLevel.value = level;
  };

  const selectImpact = (impactData?: CoffeeImpactData) => {
    selectedImpact.value = impactData;
  };

  const clearSelection = () => {
    selectedRecipe.value = null;
    selectedSalePoint.value = null;
    isDecaf.value = true;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    selectedImpact.value = undefined;
  };

  const selectedCoffee = computed<CoffeeData | null>(() => {
    if (!listCoffee.value) return null;
    return listCoffee.value.find(filterWithCurrentSelection) ?? null;
  });

  const selectedCoffeeServeId = computed<string | null>(() => {
    if (!listCoffee.value) return null;
    return listCoffee.value.find(filterWithCurrentSelection)?.serveId ?? null;
  });

  const isPriceVisible = computed(() => {
    return selectedRecipe.value !== null && selectedSalePoint.value !== null;
  });

  const selectedCoffeeImpacts = ref<CoffeeImpactData | null>(null);

  const loadImpacts = async (serveId: string) => {
    try {
      const response = await fetch(
        `./data/impacts/${serveId.replace("#", "-")}.json`
      ); // Corrected the filename
      const json = await response.json();
      selectedCoffeeImpacts.value = json;
    } catch (error) {
      console.error("Failed to load JSON:", error);
      selectedCoffeeImpacts.value = null;
    }
  };

  watch(selectedCoffeeServeId, (newCoffeeServeId) => {
    if (newCoffeeServeId) {
      loadImpacts(newCoffeeServeId);
    }
  });

  const sunburstData = computed(() =>
    selectedCoffeeImpacts.value
      ? generateSunburstData(selectedCoffeeImpacts.value)
      : null
  );

  return {
    // State
    selectedCoffee,
    isDecaf,
    milkType,
    sugarLevel,
    selectedImpact,
    listCoffee,

    sunburstData,

    selectedCoffeeImpacts,

    selectedSalePoint,
    isPriceVisible,
    selectedRecipe,

    // Derived state
    availableMilkTypes,
    availableSalePoints,
    availableRecipes,
    availableCoffees,

    filterWithCurrentSelection,
    filterWithCurrentMilkType,
    filterWithCurrentRecipe,
    filterWithCurrentSalePoint,
    filterWithCurrentDecaf,

    // Actions
    selectRecipe,
    selectSalePoint,
    toggleCaffeine,
    setMilkType,
    setSugarLevel,
    selectImpact,
    clearSelection,
  };
});
