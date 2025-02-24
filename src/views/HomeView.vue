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
import { computed, useTemplateRef, watch } from "vue";
import Disclaimer from "@/components/Disclaimer.vue";
import ImpactContainer from "@/components/ImpactContainer.vue";
// import TreemapChart from "@/components/TreemapChart.vue";

const selectedRetailName = computed(() => store.selectedRetailName);

const selectedCoffee = computed(() => store.selectedCoffee);

const sunburstRef = useTemplateRef<any>("sunburst");

watch(selectedCoffee, (newCoffee) => {
  if (newCoffee && sunburstRef.value && sunburstRef.value.$el)
    sunburstRef.value.$el.scrollIntoView({
      behavior: "smooth",
    });
});

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
    :class="{ hidden: !(selectedRetailName && store.isDecafPossible) }"
  />
  <SelectionMilk
    :class="{ hidden: !(selectedRetailName && store.isMilkPossible) }"
  />
  <SelectionSugar :class="{ hidden: !selectedRetailName }" />
  <PriceDisplay ref="priceDisplay" :class="{ hidden: !store.isPriceVisible }" />

  <EchartsSunburst
    ref="sunburst"
    :sunburstData="store.sunburstNegativeData"
    :class="{ hidden: !(store.isPriceVisible && store.selectedCoffeeImpacts) }"
  >
    <h3>Analyse hidden cost:</h3>
    <div>
      Click on a node to navigate thourgh coffee impacts. Select a specific
      impact to get more details below.
    </div>
  </EchartsSunburst>

  <EchartsSunburst
    :sunburstData="store.sunburstPositiveData"
    :class="{ hidden: !(store.isPriceVisible && store.selectedCoffeeImpacts) }"
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
.hidden {
  visibility: hidden;
}
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
