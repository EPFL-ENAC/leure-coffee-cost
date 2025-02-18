<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";

const store = useCoffeeStore();

import SelectionType from "@/components/SelectionType.vue";
import SelectionCaffeine from "@/components/SelectionCaffeine.vue";
import SelectionMilk from "@/components/SelectionMilk.vue";
import SelectionSugar from "@/components/SelectionSugar.vue";
import PriceDisplay from "@/components/PriceDisplay.vue";
// import ResultPie from "@/components/ResultPie.vue";
import EchartsSunburst from "@/components/EchartsSunburst.vue";
import { computed, watch } from "vue";
import Disclaimer from "@/components/Disclaimer.vue";
import ImpactContainer from "@/components/ImpactContainer.vue";
// import TreemapChart from "@/components/TreemapChart.vue";

const selectedRetailName = computed(() => store.selectedRetailName);

const selectedCoffee = computed(() => store.selectedCoffee);
watch(selectedCoffee, () => console.log(selectedCoffee.value));

watch(
  () => store.selectedImpact,
  (impact) => console.log(impact)
);
</script>

<template>
  <h3 v-if="!store.isPriceVisible">
    Select a coffee and its sale point to visualize its hidden costs!
  </h3>
  <SelectionType />

  <SelectionCaffeine v-if="selectedRetailName && store.isDecafPossible" />
  <SelectionMilk v-if="selectedRetailName && store.isMilkPossible" />
  <SelectionSugar v-if="selectedRetailName" />
  <PriceDisplay v-if="store.isPriceVisible" />

  <EchartsSunburst
    v-if="store.isPriceVisible && store.selectedCoffeeImpacts"
    :sunburstData="store.sunburstNegativeData"
  >
    <h3>Analyse hidden cost:</h3>
    <div>
      Click on a node to navigate thourgh coffee impacts. Select a specific
      impact to get more details below.
    </div>
  </EchartsSunburst>

  <EchartsSunburst
    v-if="store.isPriceVisible && store.selectedCoffeeImpacts"
    :sunburstData="store.sunburstPositiveData"
  >
    <h3>Analyse offsetting impacts:</h3>
    <div>
      Click on a node to navigate thourgh coffee impacts. Select a specific
      impact to get more details below.
    </div>
  </EchartsSunburst>

  <h3 v-if="store.isPriceVisible && !store.selectedCoffeeImpacts">
    No impacts available for the selected coffee and sale point.
  </h3>
  <ImpactContainer />
  <!-- Project information and disclaimer -->

  <Disclaimer></Disclaimer>
</template>
<style scoped>
a {
  color: var(--color-primary);
  font-weight: bold;
}
h3 {
  text-align: center;
  margin-top: 2em;
  font-weight: bold;
}
</style>
