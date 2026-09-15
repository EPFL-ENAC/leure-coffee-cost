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
import { computed, ref, useTemplateRef, watch } from "vue";
import Disclaimer from "@/components/Disclaimer.vue";
import ImpactContainer from "@/components/ImpactContainer.vue";
// import TreemapChart from "@/components/TreemapChart.vue";

const selectedRetailName = computed(() => store.selectedRetailName);

const selectedCoffee = computed(() => store.selectedCoffee);

const sunburstRef = useTemplateRef<any>("sunburst");
const impactDetailRef = useTemplateRef<any>("impactDetail");

const showPositive = ref(true);

watch(selectedCoffee, (newCoffee) => {
  if (newCoffee && sunburstRef.value && sunburstRef.value.$el)
    sunburstRef.value.$el.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
});

watch(
  () => store.selectedImpact,
  (impact) => {
    if (impact && impactDetailRef.value && impactDetailRef.value.$el)
      impactDetailRef.value.$el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }
);

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

  <!-- Switch Button -->
  <div class="data-switch">
    <label class="switch-label">
      <input type="checkbox" v-model="showPositive" />
      <span class="switch-text">
        {{
          showPositive ? "Showing Offsetting Measures" : "Showing Hidden Costs"
        }}
      </span>
    </label>
  </div>
  <!-- Single EchartsSunburst that switches based on the toggle -->
  <EchartsSunburst
    ref="sunburst"
    :sunburstData="
      showPositive ? store.sunburstPositiveData : store.sunburstNegativeData
    "
    :class="{ hidden: !(store.isPriceVisible && store.selectedCoffeeImpacts) }"
  >
    <h3 v-if="showPositive">Analyse offsetting measures:</h3>
    <h3 v-else>Analyse hidden cost:</h3>
    <div v-if="showPositive">
      Click on a pie chart to navigate through the offsetting measure. The more
      you click, the more detail you get.
    </div>
    <div v-else>
      Click on the pie chart to navigate through the impacts of coffee. The more
      you click, the more detail you get.
    </div>
  </EchartsSunburst>

  <h3 v-if="store.isPriceVisible && !store.selectedCoffeeImpacts">
    No impacts available for the selected coffee and sale point.
  </h3>
  <ImpactContainer
    ref="impactDetail"
    :class="{ hidden: !store.selectedImpact }"
  />
  <!-- Project information and disclaimer -->

  <Disclaimer></Disclaimer>
</template>
<style scoped>
.hidden {
  visibility: hidden;
}

.data-switch {
  margin: 1em 0;
  text-align: center;
}
.switch-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.switch-label input {
  margin-right: 0.5em;
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
