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
// import TreemapChart from "@/components/TreemapChart.vue";
</script>

<template>
  <SelectionType />
  <SelectionCaffeine />
  <SelectionMilk />
  <SelectionSugar />
  <PriceDisplay v-if="store.isPriceVisible" />
  <EchartsSunburst v-if="store.isPriceVisible && store.selectedCoffeeImpacts" />
  <h3 v-if="store.isPriceVisible && !store.selectedCoffeeImpacts">
    No impacts available for the selected coffee and sale point.
  </h3>
  <h3 v-if="!store.isPriceVisible">
    Select a coffee and its sale point to visualize its true cost!
  </h3>
</template>

<style scoped>
h3 {
  text-align: center;
  margin-top: 2em;
}
</style>
