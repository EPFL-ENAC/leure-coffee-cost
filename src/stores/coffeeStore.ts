import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCoffeeStore = defineStore(
  "coffee",
  () => {
    // State for selected coffee
    const selectedCoffee = ref<string | null>(null);

    // State for caffeine selection
    const hasCaffeine = ref<boolean>(true);

    // State for milk selection
    const hasMilk = ref<boolean>(false);

    // State for sugar selection
    const sugarLevel = ref<number>(0);

    // Base retail price of the coffee (assuming a base price of $2.00)
    const baseRetailPrice = ref<number>(2.0);

    // Define hidden costs (example values)
    const hiddenCostCaffeine = ref<number>(0.5); // Extra cost for caffeine
    const hiddenCostMilk = ref<number>(0.3); // Extra cost for milk
    const hiddenCostSugar = ref<number>(0.1); // Extra cost per sugar unit

    // Computed property for the hidden cost based on selections
    const hiddenCost = computed(() => {
      let totalHiddenCost = 0;
      if (hasCaffeine.value) totalHiddenCost += hiddenCostCaffeine.value;
      if (hasMilk.value) totalHiddenCost += hiddenCostMilk.value;
      totalHiddenCost += sugarLevel.value * hiddenCostSugar.value;
      return totalHiddenCost;
    });

    // Computed property for the retail price (base price)
    const retailPrice = computed(() => baseRetailPrice.value);

    // Computed property for the true price (retail + hidden costs)
    const truePrice = computed(() => retailPrice.value + hiddenCost.value);

    // Function to set the selected coffee
    const selectCoffee = (coffee: string) => {
      selectedCoffee.value = coffee;
    };

    // Function to clear the selected coffee
    const clearSelection = () => {
      selectedCoffee.value = null;
      hasCaffeine.value = true; // Reset caffeine selection on clear
      hasMilk.value = false; // Reset milk selection on clear
      sugarLevel.value = 0; // Reset sugar level on clear
    };

    // Function to toggle caffeine selection
    const toggleCaffeine = () => {
      hasCaffeine.value = !hasCaffeine.value;
    };

    // Function to toggle milk selection
    const toggleMilk = () => {
      hasMilk.value = !hasMilk.value;
    };

    // Function to set sugar level
    const setSugarLevel = (level: number) => {
      sugarLevel.value = level;
    };

    return {
      selectedCoffee,
      hasCaffeine,
      hasMilk,
      sugarLevel,
      selectCoffee,
      clearSelection,
      toggleCaffeine,
      toggleMilk,
      setSugarLevel,
      retailPrice,
      truePrice,
      hiddenCost,
    };
  },
  { persist: true }
);
