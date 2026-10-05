<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BarMeter from "@/components/BarMeter.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { milkFromSlug } from "@/utils/cups";
import { one, toResult } from "@/utils/routes";
import { useKnown } from "@/utils/guard";

const props = defineProps<{ salePoint: string }>();

const store = useCoffeeStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();

const drink = computed(
  () => store.drinkFromSlug(props.salePoint, String(route.params.drink)) ?? null
);

useKnown(
  () => drink.value,
  () => props.salePoint
);

const bean = computed(() => store.beanFromSlug(one(route.query.b) ?? ""));
const milk = computed(() => milkFromSlug(one(route.query.m) ?? ""));

const cup = computed(() => {
  const d = drink.value;
  if (!d) return null;
  const list = store.variantsFor(props.salePoint, d, bean.value);
  return list.find((c) => c.milk === milk.value) ?? list[0] ?? null;
});

const levels = computed(() => store.sugarLevels);
const maxCost = computed(() =>
  levels.value.reduce((m, l) => Math.max(m, l.cost), 0)
);

const intro = computed(() =>
  ui.t.sugarIntro(levels.value[1] ? levels.value[1].cost.toFixed(4) : "0")
);

function noteFor(i: number): string {
  const lv = levels.value[i];
  const c = cup.value;
  if (i === 0 || !lv || !c) return ui.t.sugarNoteNone;
  const share = ((lv.cost / (c.hiddenCost + lv.cost)) * 100).toFixed(1);
  return ui.t.sugarNote(share);
}

function pick(i: number) {
  if (!cup.value) return;
  ui.resetImpacts();
  router.push(toResult(props.salePoint, cup.value.id, i));
}
</script>

<template>
  <StepRail
    :sale-point="salePoint"
    :step="3"
    :drink="drink"
    :bean="bean"
    :milk="milk"
    :sugar="0"
    :has-bean="!!drink && store.hasBeanChoice(salePoint, drink)"
    :has-milk="milk !== null"
  />

  <div class="screen">
    <div class="head">
      <h1 class="display">{{ ui.t.sugarTitle }}</h1>
      <p class="sub">{{ intro }}</p>
    </div>

    <div class="cards opts">
      <button
        v-for="(lv, i) in levels"
        :key="lv.key"
        type="button"
        class="card opt"
        @click="pick(i)"
      >
        <div class="line">
          <span class="name">{{ ui.t.sugarLabels[i] ?? lv.key }}</span>
          <span class="val tnum">
            {{ i === 0 ? ui.t.nothingAdded : "+" + lv.cost.toFixed(4) + " " + ui.t.chfHiddenShort }}
          </span>
        </div>
        <BarMeter
          :value="lv.cost"
          :max="maxCost"
          :width="i === 0 ? '0%' : undefined"
          :color="i === 0 ? 'var(--accent)' : 'var(--bean)'"
        />
        <p class="note">{{ noteFor(i) }}</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.head {
  padding: var(--pad-top) var(--pad) 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.opt {
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
  padding: 14px var(--pad);
  border-top: var(--hairline);
}
.opt:hover {
  background: var(--surface-alt);
}
.line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.name {
  font-size: var(--fs-body);
  color: var(--ink);
}
.val {
  font-size: var(--fs-body-s);
  color: var(--mut);
  white-space: nowrap;
  flex-shrink: 0;
}
.note {
  font-size: var(--fs-xs);
  line-height: 1.45;
  color: var(--mut);
  text-wrap: pretty;
}
.screen {
  --screen-max: 1000px;
}

/* Wide, the options sit side by side as cards, not as a stack of rows. */
@media (min-width: 640px) {
  .head {
    padding-bottom: 20px;
    max-width: 720px;
  }
  .opts {
    padding-bottom: 48px;
  }
  .opt {
    padding: 16px var(--pad);
  }
}
</style>
