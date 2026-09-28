import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  CoffeeData,
  MilkType,
  generateSunburstData,
  CoffeeImpactData,
  ImpactDefinition,
  Recipe,
  ImpactDetail,
} from "@/utils/coffeeData";
import { type RootSunburst } from "@/utils/coffeeData";
import { dataUrl } from "@/config/dataset";
import Papa from "papaparse";

export const useCoffeeStore = defineStore("coffee", () => {
  // State

  const listCoffee = ref<CoffeeData[] | null>(null);

  const loadListCoffee = async () => {
    if (listCoffee.value && listCoffee.value.length !== 0) return;

    try {
      const response = await fetch(await dataUrl("coffee_data.csv"));
      const csvText = await response.text();
      const parsedData = Papa.parse<CoffeeData>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform(value, field) {
          if (field === "labels") {
            if (value === "") return [];
            return value.split("|").filter((d) => d !== "none") ?? []; // Parse `labels` back into an array
          }
          if (
            ["retailPrice", "hiddenCost", "offsetting", "truePrice"].includes(
              field as string
            )
          ) {
            return parseFloat(value); // Ensure numeric fields are parsed as numbers
          }
          if (field === "isDecaf" || field === "hasMilk")
            return value == "True" || value == "true"; // Parse boolean fields
          return value;
        },
      });
      console.log("Parsed data:", parsedData);

      // Filter and validate data
      listCoffee.value = parsedData.data.filter(
        (coffee) => coffee.serveId && coffee.recipeId
      );
    } catch (error) {
      console.error("Failed to load CSV:", error);
    }
  };

  // Load data immediately when the store is initialized
  loadListCoffee();

  const sugarIDs = [
    "swiss_sugar_default",
    "swiss_sugar_low",
    "swiss_sugar_moderate",
    "swiss_sugar_high",
  ];
  const listSugar = ref<CoffeeImpactData[]>([]);

  const loadListSugar = async () => {
    if (listSugar.value.length == sugarIDs.length) return;

    sugarIDs.forEach(async (sugarID, index) => {
      try {
        const fileName = await dataUrl(
          `sugar/${sugarID
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll(",", "")}.json`
        );
        const response = await fetch(fileName);
        const json = await response.json();
        console.log("Fetch impacts ", fileName, json);
        listSugar.value[index] = json;
      } catch (error) {
        console.error("Failed to load JSON:", error);
      }
    });
  };

  loadListSugar();

  const listImpactDefinitions = ref<ImpactDefinition[]>([]);
  function camelize(str: string) {
    return str
      .replaceAll(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replaceAll(/\s+/g, "");
  }

  const loadListImpactDefinitions = async () => {
    if (listImpactDefinitions.value && listImpactDefinitions.value.length !== 0)
      return;

    try {
      const response = await fetch(await dataUrl("impacts_definitions.csv"));
      const csvText = await response.text();
      const parsedData = Papa.parse<ImpactDefinition>(csvText, {
        header: true,
        transformHeader: camelize,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform(value, field) {
          if (field === "indicator") {
            return value.toLowerCase();
          } else return value;
        },
      });
      console.log("Parsed data:", parsedData);
      listImpactDefinitions.value = parsedData.data;
    } catch (error) {
      console.error("Failed to load CSV:", error);
    }
  };

  // Load data immediately when the store is initialized
  loadListImpactDefinitions();

  // Selections
  const selectedRecipe = ref<Recipe | null>(null);
  const selectedServeId = ref<string | null>(null);
  const selectedRetailName = ref<string | null>(null);

  const selectedRecipeDescription = computed(
    () =>
      listCoffee.value?.find((d) => d.recipeId === selectedRecipe.value)
        ?.coffeeDetails
  );
  const isDecaf = ref<boolean>(false);
  const milkType = ref<MilkType>(MilkType.NONE);
  const sugarLevel = ref<number>(0);

  // Filtering
  // const filterWithCurrentMilkType = (d: CoffeeData) =>
  //   milkType.value === MilkType.NONE || d.milkType === milkType.value;

  const filterWithCurrentRecipe = (d: CoffeeData) =>
    selectedRecipe.value === null || d.recipeId === selectedRecipe.value;

  const filterWithCurrentDecaf = (d: CoffeeData) => d.isDecaf === isDecaf.value;

  // const filterWithCurrentSelection = (d: CoffeeData) => {
  //   return (
  //     filterWithCurrentDecaf(d) &&
  //     filterWithCurrentMilkType(d) &&
  //     filterWithCurrentRecipe(d)
  //   );
  // };

  const availableCoffeesAfterRetailName = computed(() => {
    if (!listCoffee.value) return [];
    const retailName = selectedRetailName.value;
    return listCoffee.value.filter((d) => d.retailName === retailName);
  });

  const milkTypesOf = (coffees: CoffeeData[]) => [
    ...new Set(coffees.map((d) => (d.milkType ?? MilkType.NONE) as MilkType)),
  ];

  // Derived state: Available milk types
  const availableMilkTypes = computed<MilkType[]>(() => {
    if (!selectedRecipe.value) return [MilkType.NONE];
    // Once a drink is picked, only the milks sold under that name are possible.
    // Some sale points sell one name with several milks, others sell one name
    // per milk.
    if (selectedRetailName.value)
      return milkTypesOf(availableCoffeesAfterRetailName.value);

    const list = listCoffee.value
      ?.filter(filterWithCurrentRecipe)
      .filter(filterWithCurrentDecaf);
    if (!list) return [MilkType.NONE];
    else return milkTypesOf(list);
  });

  watch(availableMilkTypes, (newList) => {
    if (!newList.includes(milkType.value)) milkType.value = newList[0];
  });

  // Computed property for coffees based on selection
  const availableCoffees = computed(() => {
    if (!listCoffee.value) return [];
    return listCoffee.value.filter((d) => d.recipeId === selectedRecipe.value);
  });

  const selectRetailName = (retailName: string) => {
    selectedRetailName.value = retailName;
    const milks = milkTypesOf(
      listCoffee.value?.filter((d) => d.retailName === retailName) ?? []
    );
    if (!milks.includes(milkType.value))
      milkType.value = milks[0] ?? MilkType.NONE;
  };

  // Actions
  const selectRecipe = (recipe: Recipe) => {
    selectedRecipe.value = recipe;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    isDecaf.value = false;
  };

  const selectServeId = (serveId: string) => {
    selectedServeId.value = serveId;
  };

  watch(
    () => [selectedRetailName.value, isDecaf.value, milkType.value],
    () => {
      if (selectedRetailName.value) {
        const coffees = listCoffee.value?.filter(
          (d) =>
            d.retailName === selectedRetailName.value &&
            d.milkType === milkType.value
        );
        console.log("Coffees", coffees);
        if (!coffees) return;
        const possibleDecafStates = [...new Set(coffees.map((d) => d.isDecaf))];
        if (possibleDecafStates.length == 1) isDecaf.value = coffees[0].isDecaf;

        const coffee = coffees.find((d) => d.isDecaf === isDecaf.value);

        if (coffee) {
          selectedServeId.value = coffee.serveId;
        }
      }
    }
  );

  const isDecafPossible = computed(() => {
    return (
      availableCoffeesAfterRetailName.value.some((d) => d.isDecaf) &&
      availableCoffeesAfterRetailName.value.some((d) => !d.isDecaf)
    );
  });

  // Some datasets have no offsetting at all, then we hide what shows it
  const hasOffsetting = computed(() =>
    (listCoffee.value ?? []).some((d) => d.offsetting !== 0)
  );

  const isMilkPossible = computed(() => {
    return (
      availableCoffeesAfterRetailName.value.filter((d) => d.hasMilk).length > 0
    );
  });

  const toggleCaffeine = () => {
    isDecaf.value = !isDecaf.value;
  };

  const setMilkType = (type: MilkType) => {
    if (availableMilkTypes.value.includes(type)) {
      milkType.value = type;
      console.log("Set milk type to", type);
    } else {
      console.warn(
        `Milk type ${type} is not available for the selected recipe.`
      );
    }
  };

  const setSugarLevel = (level: number) => {
    sugarLevel.value = level;
  };

  // Selected coffee
  const selectedCoffee = computed<CoffeeData | null>(() => {
    if (!listCoffee.value) return null;

    return (
      listCoffee.value.find((d) => d.serveId == selectedServeId.value) ?? null
    );
  });

  const isPriceVisible = computed(() => !!selectedCoffee.value);

  // Load impacts
  const selectedCoffeeImpacts = ref<CoffeeImpactData[] | null>(null);
  const sunburstNegativeData = ref<RootSunburst | undefined>(undefined);
  const sunburstPositiveData = ref<RootSunburst | undefined>(undefined);

  const loadImpacts = async (serveId: string) => {
    sunburstPositiveData.value = undefined;
    sunburstNegativeData.value = undefined;
    try {
      const fileName = await dataUrl(
        `impacts/${serveId
          .toLowerCase()
          .replaceAll(" ", "_")
          .replaceAll(",", "")}.json`
      );
      const response = await fetch(fileName);
      const json = await response.json();
      console.log("Fetch impacts ", fileName, json);
      selectedCoffeeImpacts.value = json;
    } catch (error) {
      console.error("Failed to load JSON:", error);
      selectedCoffeeImpacts.value = null;
    }
  };

  watch(
    () => [selectedCoffeeImpacts.value, sugarLevel.value],
    () => {
      const coffeeImpacts = selectedCoffeeImpacts.value ?? [];
      const sugarImpact = listSugar.value[sugarLevel.value];
      const negativeImpacts = coffeeImpacts.filter((d) => d.costValue > 0);
      const positiveImpacts = coffeeImpacts
        .filter((d) => d.costValue < 0)
        .map((d) => ({
          ...d,
          costValue: -d.costValue,
          details: d.details.map((d) => ({
            ...d,
            costValue: -d.costValue,
          })),
        }));

      console.log({ negativeImpacts, positiveImpacts });
      selectedImpact.value = undefined;
      sunburstNegativeData.value = generateSunburstData(
        negativeImpacts.concat(sugarImpact),
        listImpactDefinitions.value
      );
      sunburstPositiveData.value = generateSunburstData(
        positiveImpacts,
        listImpactDefinitions.value
      );
    }
  );

  watch(selectedServeId, (newServeId) => {
    if (newServeId) {
      console.log("Loading impacts for serveId:", newServeId);
      loadImpacts(newServeId);
    }
  });

  const clearSelection = () => {
    selectedRecipe.value = null;
    selectedServeId.value = null;
    selectedRetailName.value = null;
    selectImpact(undefined);
    isDecaf.value = false;
    milkType.value = MilkType.NONE;
    sugarLevel.value = 0;
    sunburstPositiveData.value = undefined;
    sunburstNegativeData.value = undefined;
  };

  const selectedImpact = ref<ImpactDetail | undefined>(undefined);

  const selectImpact = (impact?: ImpactDetail) => {
    selectedImpact.value = impact;
  };

  return {
    // State
    selectedRecipe,
    selectedServeId,
    selectedRetailName,
    selectedRecipeDescription,
    selectedCoffee,
    selectedImpact,
    isDecaf,
    milkType,
    sugarLevel,
    listCoffee,
    selectedCoffeeImpacts,

    sunburstNegativeData,
    sunburstPositiveData,

    // Derived state
    availableMilkTypes,
    availableCoffees,
    isPriceVisible,
    hasOffsetting,
    availableCoffeesAfterRetailName,
    isDecafPossible,
    isMilkPossible,

    // Actions
    selectRecipe,
    selectRetailName,
    selectImpact,
    selectServeId,
    toggleCaffeine,
    setMilkType,
    setSugarLevel,

    clearSelection,
  };
});
