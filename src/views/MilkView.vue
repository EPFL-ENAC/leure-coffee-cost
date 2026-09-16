<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BarMeter from "@/components/BarMeter.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { beanFromSlug, type Cup, type Milk } from "@/utils/cups";
import { one, toSugar } from "@/utils/routes";
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

const bean = computed(() => beanFromSlug(one(route.query.b) ?? ""));

/** Cheapest hidden cost first, like the prototype. */
const variants = computed<Cup[]>(() => {
  const d = drink.value;
  if (!d) return [];
  return [...store.variantsFor(props.salePoint, d, bean.value)].sort(
    (a, b) => a.hiddenCost - b.hiddenCost
  );
});

// The note needs the impact tree, so the files load as soon as the list is known.
watch(
  variants,
  (list) => {
    if (list.length) store.loadCups(list);
  },
  { immediate: true }
);

const maxHidden = computed(() =>
  variants.value.reduce((m, c) => Math.max(m, c.hiddenCost), 0)
);

const intro = computed(() => {
  const list = variants.value;
  if (list.length < 2) return ui.t.milkIntroOne;
  const spread = maxHidden.value - list[0].hiddenCost;
  return spread > 0.005 ? ui.t.milkIntro(spread.toFixed(2)) : ui.t.milkIntroOne;
});

const BEANS_NODE = "Coffee beans";

function noteFor(cup: Cup, index: number): string {
  const f = store.fullCup(cup.id);
  if (!f) return "";
  const beansNode = f.tree.find((n) => n.name === BEANS_NODE);
  const milkNode = f.tree.find((n) => n.name !== BEANS_NODE);
  if (!milkNode) return "";
  const top = milkNode.cats.length ? ui.catL(milkNode.cats[0].name) : "";
  const share = beansNode
    ? Math.round((milkNode.cost / (milkNode.cost + beansNode.cost)) * 100)
    : 100;
  return ui.t.milkNote(index === 0, share, top);
}

function pick(cup: Cup) {
  if (!drink.value) return;
  ui.resetImpacts();
  router.push(toSugar(props.salePoint, drink.value, bean.value, cup.milk as Milk | null));
}
</script>

<template>
  <StepRail
    :sale-point="salePoint"
    :step="2"
    :drink="drink"
    :bean="bean"
    :milk="null"
    :sugar="0"
    :has-bean="true"
    :has-milk="true"
  />

  <div class="screen">
    <div class="head">
      <h1 class="display">{{ ui.t.milkTitle }}</h1>
      <p class="sub">{{ intro }}</p>
    </div>

    <div class="opts">
      <button
        v-for="(v, i) in variants"
        :key="v.id"
        type="button"
        class="opt"
        @click="pick(v)"
      >
        <div class="line">
          <span class="name">{{ ui.milkL(v.milk) }}</span>
          <span class="val tnum">
            {{ v.hiddenCost.toFixed(3) }} {{ ui.t.chfHiddenShort }}
          </span>
        </div>
        <BarMeter
          :value="v.hiddenCost"
          :max="maxHidden"
          :color="i === 0 ? 'var(--accent)' : 'var(--bean)'"
        />
        <p class="note" :class="{ best: i === 0 }">{{ noteFor(v, i) }}</p>
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
}
.note {
  font-size: var(--fs-xs);
  line-height: 1.45;
  color: var(--mut);
  text-wrap: pretty;
}
.note.best {
  color: var(--accent);
}
.screen {
  --screen-max: 1000px;
}
.opts {
  display: flex;
  flex-direction: column;
}

/* Wide, the options sit two by two as cards, not as a stack of rows. */
@media (min-width: 900px) {
  .head {
    padding-bottom: 20px;
    max-width: 720px;
  }
  .opts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding-bottom: 48px;
  }
  .opt {
    border: var(--hairline);
    padding: 14px 16px;
  }
}
</style>
