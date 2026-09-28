<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { coffeeUrl } from "@/utils/assets";
import type { Cup } from "@/utils/cups";

const props = withDefaults(defineProps<{ cup: Cup; size?: number }>(), { size: 24 });

// Some drinks have no SVG of their own ("Frappé Vanille"), the recipe one
// stands in for them.
const src = ref(coffeeUrl(props.cup.icon));
watch(
  () => props.cup.icon,
  (icon) => (src.value = coffeeUrl(icon))
);

const fallback = computed(() => coffeeUrl(props.cup.recipeId.replaceAll(" ", "_")));

function onError() {
  if (src.value !== fallback.value) src.value = fallback.value;
}
</script>

<template>
  <img
    class="icon"
    :src="src"
    :alt="cup.drink"
    :style="{ width: size + 'px', height: size + 'px' }"
    @error="onError"
  />
</template>

<style scoped>
.icon {
  flex-shrink: 0;
  object-fit: contain;
}
</style>
