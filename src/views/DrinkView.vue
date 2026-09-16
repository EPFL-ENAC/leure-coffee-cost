<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import DrinkIcon from "@/components/DrinkIcon.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { toBean } from "@/utils/routes";

const props = defineProps<{ salePoint: string }>();

const store = useCoffeeStore();
const ui = useUiStore();
const router = useRouter();

const drinks = computed(() => store.drinksAt(props.salePoint));

function pick(drink: string) {
  ui.resetImpacts();
  router.push(toBean(props.salePoint, drink));
}
</script>

<template>
  <StepRail
    :sale-point="salePoint"
    :step="0"
    :drink="null"
    :bean="null"
    :milk="null"
    :sugar="0"
    :has-bean="false"
    :has-milk="false"
  />

  <div class="screen">
    <div class="head">
      <h1 class="display">{{ ui.t.drinkTitle }}</h1>
    </div>

    <div class="list">
      <button
        v-for="d in drinks"
        :key="d.drink"
        type="button"
        class="row row--tap drink"
        @click="pick(d.drink)"
      >
        <DrinkIcon :cup="d" />
        <span class="name">{{ d.drink }}</span>
        <span class="price tnum">{{ d.retailPrice.toFixed(2) }} CHF</span>
        <span class="chev">›</span>
      </button>
    </div>

    <p class="foot">{{ ui.t.drinkFoot }}</p>
  </div>
</template>

<style scoped>
.screen {
  --screen-max: 1120px;
}
.head {
  padding: var(--pad-top) var(--pad) 18px;
}
.list {
  display: flex;
  flex-direction: column;
}
.drink {
  width: 100%;
  gap: 14px;
  min-height: 60px;
  text-align: left;
}
.name {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-body);
  color: var(--ink);
}
.price {
  font-size: var(--fs-body-s);
  color: var(--mut);
}
.chev {
  font-size: 14px;
  color: var(--accent);
}
.foot {
  margin: 0;
  border-top: var(--hairline);
  padding: 18px var(--pad);
  font-size: var(--fs-small);
  line-height: 1.55;
  color: var(--mut);
  text-wrap: pretty;
}

/* Wide, the drinks read better as a grid of cards than as one long list. */
@media (min-width: 900px) {
  .head {
    padding-bottom: 22px;
  }
  .display {
    font-size: 36px;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .drink {
    border: var(--hairline);
    padding: 0 16px;
    min-height: 72px;
  }
  .foot {
    border-top: 0;
    padding: 26px var(--pad) 48px;
    max-width: 640px;
  }
}
</style>
