<script setup lang="ts">
import { useCoffeeStore } from "@/stores/coffeeStore";

const store = useCoffeeStore();

import SelectionType from "@/components/SelectionType.vue";
import SelectionCaffeine from "@/components/SelectionCaffeine.vue";
import SelectionMilk from "@/components/SelectionMilk.vue";
import SelectionSugar from "@/components/SelectionSugar.vue";
import PriceDisplay from "@/components/PriceDisplay.vue";
import ResultPie from "@/components/ResultPie.vue";
</script>

<template>
  <SelectionType />
  <SelectionCaffeine />
  <SelectionMilk />
  <SelectionSugar />
  <PriceDisplay v-if="store.isPriceVisible" />
  <ResultPie v-if="store.isPriceVisible" />
</template>
