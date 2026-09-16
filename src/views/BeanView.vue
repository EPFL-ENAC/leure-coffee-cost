<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Disclosure from "@/components/Disclosure.vue";
import DrinkIcon from "@/components/DrinkIcon.vue";
import LabelIcons from "@/components/LabelIcons.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { labelImages, labelNames } from "@/utils/coffeeData";
import { labelUrl } from "@/utils/assets";
import type { Bean } from "@/utils/cups";
import { toMilk, toSugar } from "@/utils/routes";
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

/** First cup of this drink here, for the blurb and the icon. */
const sample = computed(() => {
  const d = drink.value;
  if (!d) return null;
  return store.cupsAt(props.salePoint).find((c) => c.drink === d) ?? null;
});

type Row = {
  bean: Bean;
  here: boolean;
  note: string;
  offset: number;
  labels: string[];
};

const rows = computed<Row[]>(() => {
  const d = drink.value;
  if (!d) return [];
  return store.beansFor(props.salePoint, d).map((b) => {
    const cup =
      store.cups.find(
        (c) => c.drink === d && c.bean === b.bean && c.salePoint === props.salePoint
      ) ?? store.cups.find((c) => c.drink === d && c.bean === b.bean);
    return {
      bean: b.bean,
      here: b.here,
      note: b.here
        ? ui.t.beanHere(props.salePoint)
        : ui.t.beanElsewhere(b.elsewhere.join(", ")),
      offset: cup ? Math.abs(cup.offsetting) : 0,
      labels: cup ? cup.labels : [],
    };
  });
});

const keyRows = computed(() =>
  [...labelImages.keys()].map((id) => ({
    id,
    src: labelUrl(labelImages.get(id) as string),
    name: labelNames.get(id) ?? id,
    what: ui.t.labelWhat[id] ?? "",
  }))
);

function pick(row: Row) {
  if (!row.here || !drink.value) return;
  ui.resetImpacts();
  const milks = store.milksFor(props.salePoint, drink.value, row.bean);
  // One variant only, the milk step has nothing to ask.
  if (milks.length > 1) router.push(toMilk(props.salePoint, drink.value, row.bean));
  else router.push(toSugar(props.salePoint, drink.value, row.bean, milks[0] ?? null));
}
</script>

<template>
  <StepRail
    :sale-point="salePoint"
    :step="1"
    :drink="drink"
    :bean="null"
    :milk="null"
    :sugar="0"
    :has-bean="true"
    :has-milk="false"
  />

  <div class="screen">
    <div v-if="sample" class="drink-head">
      <div class="drink-text">
        <h1 class="section-title big">{{ sample.drink }}</h1>
        <p class="sub">{{ sample.blurb }}</p>
      </div>
      <DrinkIcon :cup="sample" :size="44" />
    </div>

    <div class="head">
      <h2 class="display">{{ ui.t.beanTitle }}</h2>
      <p class="sub">{{ ui.t.beanSub }}</p>
    </div>

    <template v-for="r in rows" :key="r.bean">
      <component
        :is="r.here ? 'button' : 'div'"
        class="row bean"
        :class="{ 'row--tap': r.here, off: !r.here }"
        :type="r.here ? 'button' : undefined"
        @click="pick(r)"
      >
        <div class="left">
          <span class="name" :class="{ dim: !r.here }">{{ r.bean }}</span>
          <div class="labels">
            <LabelIcons :labels="r.labels" :size="22" />
          </div>
        </div>
        <div class="right">
          <span class="val tnum" :class="{ dim: !r.here }">−{{ r.offset.toFixed(2) }} CHF</span>
          <span class="sub-val" :class="{ dim: !r.here }">{{ ui.t.givenBack }}</span>
        </div>
        <span v-if="r.here" class="chev">›</span>
      </component>
      <p class="note" :class="{ off: !r.here }">{{ r.note }}</p>
    </template>

    <div class="key-link">
      <Disclosure
        :open="ui.labelKey"
        :show-label="ui.t.labelKeyShow"
        :hide-label="ui.t.hide"
        @toggle="ui.labelKey = !ui.labelKey"
      />
    </div>
    <div v-if="ui.labelKey" class="key">
      <div v-for="k in keyRows" :key="k.id" class="key-row">
        <img class="key-icon" :src="k.src" :alt="k.name" />
        <p class="key-text"><span class="key-name">{{ k.name }}</span> ({{ k.what }})</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drink-head {
  padding: 24px var(--pad) 18px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  border-bottom: var(--hairline);
}
.drink-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.big {
  font-size: var(--fs-h2);
}
.head {
  padding: var(--pad-top) var(--pad) 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.bean {
  align-items: center;
  gap: 14px;
  padding: 14px var(--pad);
  min-height: 64px;
}
.bean.off {
  background: var(--surface-alt);
}
.left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.labels {
  display: flex;
  gap: 10px;
  align-items: center;
}
.name {
  font-size: var(--fs-body);
  color: var(--ink);
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  flex-shrink: 0;
}
.val {
  font-size: var(--fs-body-s);
  color: var(--accent);
  white-space: nowrap;
}
.sub-val {
  font-size: 11px;
  color: var(--mut);
  white-space: nowrap;
}
.dim {
  color: var(--dim);
}
.chev {
  font-size: 14px;
  color: var(--accent);
  flex-shrink: 0;
}
.note {
  padding: 0 var(--pad) 14px;
  font-size: var(--fs-xs);
  line-height: 1.5;
  color: var(--mut);
  text-wrap: pretty;
}
.note.off {
  background: var(--surface-alt);
}
.key-link {
  border-top: var(--hairline);
  padding: 14px var(--pad);
}
.key {
  background: var(--surface-alt);
  border-top: var(--hairline);
  padding: 14px var(--pad);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.key-row {
  display: flex;
  gap: 11px;
  align-items: flex-start;
}
.key-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  object-fit: contain;
}
.key-text {
  font-size: var(--fs-small);
  line-height: 1.5;
  color: var(--mut);
  text-wrap: pretty;
}
.key-name {
  color: var(--ink);
}
.screen {
  --screen-max: 900px;
}

@media (min-width: 900px) {
  .drink-head {
    padding-top: 32px;
  }
}
</style>
