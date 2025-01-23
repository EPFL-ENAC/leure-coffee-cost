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

  <SelectionCaffeine v-if="selectedCoffee && selectedCoffee.isDecaf" />
  <SelectionMilk v-if="selectedCoffee && selectedCoffee.hasMilk" />
  <SelectionSugar v-if="selectedCoffee" />
  <PriceDisplay v-if="store.isPriceVisible" />
  <EchartsSunburst v-if="store.isPriceVisible && store.selectedCoffeeImpacts" />
  <h3 v-if="store.isPriceVisible && !store.selectedCoffeeImpacts">
    No impacts available for the selected coffee and sale point.
  </h3>
  <ImpactContainer />
  <!-- Project information and disclaimer -->
  <div id="project-info" class="project-info">
    <p>
      This application is part of a bigger project called
      <a
        href="https://truecostoffood.ch/"
        target="_blank"
        rel="noopener noreferrer"
      >
        True Cost of Food </a
      >, aiming to raise awareness about the hidden costs of food production and
      consumption.
    </p>
  </div>
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
