<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import Disclaimer from "@/components/Disclaimer.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { DEFAULT_SALE_POINT, salePointFromSlug } from "@/utils/cups";
import { one } from "@/utils/routes";

const route = useRoute();
const store = useCoffeeStore();
const ui = useUiStore();

onMounted(() => {
  store.init();
});

const salePoint = computed(
  () => salePointFromSlug(one(route.params.sp) ?? "") ?? DEFAULT_SALE_POINT
);
</script>

<template>
  <div class="ground">
    <div class="column">
      <AppHeader :sale-point="salePoint" />

      <div v-if="store.loading" class="state">{{ ui.t.loading }}</div>
      <div v-else-if="store.error" class="state">{{ ui.t.errPre }} {{ store.error }}</div>
      <router-view v-else :sale-point="salePoint" />

      <Disclaimer />
    </div>
  </div>
</template>

<style scoped>
.ground {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.column {
  width: 100%;
  max-width: var(--col);
  min-height: 100vh;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 0 1px var(--line);
}
.column > :deep(*:last-child) {
  margin-top: auto;
}
.state {
  padding: 72px var(--pad);
  font-size: var(--fs-body-s);
  color: var(--mut);
}
</style>
