import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { CoffeeImpactData, CoffeeData } from "@/utils/coffeeData";
import Papa from "papaparse";

// import { useRoute, useRouter } from "vue-router";

export const useCoffeeStore = defineStore("coffee", () => {
  const listCoffeeFetched = ref<CoffeeData[] | null>(null);

  const loadListCoffee = async () => {
    if (listCoffeeFetched.value && listCoffeeFetched.value?.length !== 0)
      return; // Prevent re-fetching

    try {
      // Fetch the CSV file (assuming it's in your public folder)
      const response = await fetch("/data/coffe_data.csv");
      const csvText = await response.text();

      // Parse the CSV using PapaParse
      const parsedData = Papa.parse<CoffeeData>(csvText, {
        header: true, // Set to true if the CSV has headers
        dynamicTyping: true, // Automatically typecast values
      });

      // Populate the store
      listCoffeeFetched.value = parsedData.data;
    } catch (error) {
      console.error("Failed to load CSV:", error);
    }
  };

  const listCoffee = computed(async () => {
    if (!listCoffeeFetched.value) await loadListCoffee();
    return listCoffeeFetched.value as CoffeeData[];
  });

  const selectedRecipe = ref<string | null>(null);

  const selectRecipe = (recipe: string) => {
    selectedRecipe.value = recipe;
  };

  const selectedCoffee = ref<CoffeeData | null>(null);

  const selectCoffee = (coffee: CoffeeData) => {
    selectedCoffee.value = coffee;
  };

  const selectedSalePoint = ref<string | null>(null);

  // // State for selected sale point
  // const selectedSalePoint = computed<string | null>({
  //   get() {
  //     return route.params?.selectedSalePoint as string | null;
  //   },
  //   set(salePoint: string | null) {
  //     console.log("Setting selected salePoint to", salePoint);
  //     if (route.params.selectedSalePoint !== salePoint)
  //       router.push(`/${route.params.selectedCoffee}/${salePoint || ""}`);
  //   },
  // });

  const selectSalePoint = (salePoint: string) => {
    selectedSalePoint.value = salePoint;
  };

  // State for caffeine selection
  const hasCaffeine = ref<boolean>(true);

  // **Updated State for Milk Selection**
  // Possible values: 'none', 'cow', 'almond', 'soy', etc.
  const milkType = ref<string>("none");

  // State for sugar selection
  const sugarLevel = ref<number>(0);

  // Base retail price of the coffee (assuming a base price of $2.00)
  const baseRetailPrice = ref<number>(2.0);

  // Define hidden costs (example values)
  const hiddenCostCaffeine = ref<number>(0.5); // Extra cost for caffeine
  // **Updated Hidden Cost for Milk Based on `milkType`**
  const hiddenCostMilk = computed<number>(() => {
    switch (milkType.value) {
      case "cow":
        return 0.8;
      case "almond":
        return 0.3;
      case "soy":
        return 0.35;
      // Add more milk types and their costs as needed
      case "none":
      default:
        return 0;
    }
  });
  const hiddenCostSugar = ref<number>(0.1); // Extra cost per sugar unit

  const selectedImpact = ref<CoffeeImpactData | undefined>(undefined);

  // Computed property for the hidden cost based on selections
  const hiddenCost = computed(() => {
    let totalHiddenCost = 0;
    if (hasCaffeine.value) totalHiddenCost += hiddenCostCaffeine.value;
    totalHiddenCost += hiddenCostMilk.value;
    totalHiddenCost += sugarLevel.value * hiddenCostSugar.value;
    return totalHiddenCost * ((Number(selectedSalePoint.value) ?? 0) + 1);
  });
  // Computed property for the retail price (base price)
  const retailPrice = computed(() => baseRetailPrice.value);

  // Computed property for the true price (retail + hidden costs)
  const truePrice = computed(() => retailPrice.value + hiddenCost.value);

  const isPriceVisible = computed(
    () => selectedCoffee.value && selectedSalePoint.value
  );

  // **New Function to Set Milk Type**
  const setMilkType = (type: string) => {
    milkType.value = type;
  };

  const selectImpact = (impactData?: CoffeeImpactData) => {
    selectedImpact.value = impactData;
  };

  // Function to clear the selected coffee
  const clearSelection = () => {
    selectedRecipe.value = null;
    selectedSalePoint.value = null;
    selectedCoffee.value = null;
    hasCaffeine.value = true; // Reset caffeine selection on clear
    milkType.value = "none"; // Reset milk selection on clear
    sugarLevel.value = 0; // Reset sugar level on clear
  };

  // **Remove Toggle Functions for Milk**
  // These are no longer needed as we have multiple milk types
  // const toggleMilk = () => {
  //   milkType.value = milkType.value === "none" ? "cow" : "none";
  // };

  // Function to toggle caffeine selection
  const toggleCaffeine = () => {
    hasCaffeine.value = !hasCaffeine.value;
  };

  // Function to set sugar level
  const setSugarLevel = (level: number) => {
    sugarLevel.value = level;
  };

  return {
    selectedCoffee,
    hasCaffeine,
    milkType, // Exposed to components
    sugarLevel,
    selectedImpact,
    listCoffee,
    selectedSalePoint,
    isPriceVisible,
    selectedRecipe,
    selectRecipe,
    selectSalePoint,
    selectCoffee,
    selectImpact,
    setMilkType, // Exposed to components
    clearSelection,
    toggleCaffeine,
    setSugarLevel,
    retailPrice,
    truePrice,
    hiddenCost,
  };
});
