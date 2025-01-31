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

  <SelectionCaffeine
    v-if="false && selectedCoffee && selectedCoffee?.isDecaf"
  />
  <SelectionMilk v-if="false && selectedCoffee && selectedCoffee?.hasMilk" />
  <SelectionSugar v-if="selectedCoffee" />
  <PriceDisplay v-if="store.isPriceVisible" />
  <EchartsSunburst v-if="store.isPriceVisible && store.selectedCoffeeImpacts" />
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
