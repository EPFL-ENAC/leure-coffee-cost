import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  CoffeeImpactData,
  CoffeeData,
  salePointDetails,
  MilkType,
  Recipe,
} from "@/utils/coffeeData";
import Papa from "papaparse";

export const useCoffeeStore = defineStore("coffee", () => {
  // State
  const listCoffee = ref<CoffeeData[] | null>(null);

  const loadListCoffee = async () => {
    if (listCoffee.value && listCoffee.value.length !== 0) return;

    try {
      const response = await fetch("/data/coffeeData.csv"); // Corrected the filename
      const csvText = await response.text();

      const parsedData = Papa.parse<CoffeeData>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true, // Skip empty lines
      });
      console.log("Loaded CSV data:", parsedData.data);

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
  const selectedCoffee = ref<CoffeeData | null>(null);
  const isDecaf = ref<boolean>(true);
  const milkType = ref<MilkType>(MilkType.NONE);
  const sugarLevel = ref<number>(0);
  const selectedImpact = ref<CoffeeImpactData | undefined>(undefined);

  const filterWithCurrentMilkType = (d: CoffeeData) =>
    milkType.value === MilkType.NONE || d.milkType === milkType.value;

  const filterWithCurrentRecipe = (d: CoffeeData) =>
    selectedRecipe.value === null || d.mainRecipe === selectedRecipe.value;

  const filterWithCurrentSalePoint = (d: CoffeeData) =>
    selectedSalePoint.value === null ||
    d.salePointId === selectedSalePoint.value;

  const filterWithCurrentDecaf = (d: CoffeeData) => d.isDecaf === isDecaf.value;

  const filterWithCurrentSelection = (d: CoffeeData) => {
    console.log("Filtering with current selection:", d);
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
    selectedCoffee.value = null;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    isDecaf.value = false;
  };

  const selectSalePoint = (salePoint: string) => {
    selectedSalePoint.value = salePoint;
    // Reset coffee selection
    selectedCoffee.value = null;
  };

  const selectCoffee = (coffee: CoffeeData) => {
    selectedCoffee.value = coffee;
    // Optionally, set recipe based on coffee selection
    selectedRecipe.value = coffee.mainRecipe as Recipe;
    // Set other selections based on coffee
    milkType.value = coffee.hasMilk
      ? (coffee.milkType as MilkType)
      : MilkType.NONE;
    isDecaf.value = coffee.isDecaf;
    // Sugar level and other customizations can be reset or set as needed
    sugarLevel.value = 0;
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
    selectedCoffee.value = null;
    isDecaf.value = true;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    selectedImpact.value = undefined;
  };

  // Computed properties for pricing
  const hiddenCostCaffeine = ref<number>(0.5);
  const hiddenCostSugar = ref<number>(0.1);

  const hiddenCostMilk = computed<number>(() => {
    switch (milkType.value) {
      case MilkType.COW:
        return 0.8;
      case MilkType.ALMOND:
        return 0.3;
      case MilkType.SOY:
        return 0.35;
      case MilkType.CLF:
        return 0.25;
      case MilkType.OAT:
        return 0.4;
      case MilkType.NONE:
      default:
        return 0;
    }
  });

  const hiddenCost = computed(() => {
    let totalHiddenCost = 0;
    if (!isDecaf.value) totalHiddenCost += hiddenCostCaffeine.value;
    totalHiddenCost += hiddenCostMilk.value;
    totalHiddenCost += sugarLevel.value * hiddenCostSugar.value;
    return totalHiddenCost;
  });

  const baseRetailPrice = ref<number>(2.0);
  const retailPrice = computed(() => baseRetailPrice.value);
  const truePrice = computed(() => retailPrice.value + hiddenCost.value);

  const isPriceVisible = computed(
    () => !!selectedCoffee.value && !!selectedSalePoint.value
  );

  return {
    // State
    selectedCoffee,
    isDecaf,
    milkType,
    sugarLevel,
    selectedImpact,
    listCoffee,

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
    selectCoffee,
    toggleCaffeine,
    setMilkType,
    setSugarLevel,
    selectImpact,
    clearSelection,

    // Pricing
    retailPrice,
    truePrice,
    hiddenCost,
  };
});
