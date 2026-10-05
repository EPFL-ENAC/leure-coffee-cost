<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Disclosure from "@/components/Disclosure.vue";
import DrinkIcon from "@/components/DrinkIcon.vue";
import LabelIcons from "@/components/LabelIcons.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { labelImages } from "@/utils/coffeeData";
import { labelUrl } from "@/utils/assets";
import { dataset } from "@/config/dataset";
import type { Bean } from "@/utils/cups";
import { toAfterBean } from "@/utils/routes";
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
  hidden: number;
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
      hidden: cup ? cup.hiddenCost : 0,
      labels: cup ? cup.labels : [],
    };
  });
});

/** With one sale point, "served here" under every row says nothing. */
const showNotes = dataset().salePoints.length > 1;

/** Only the labels this dataset uses. */
const keyRows = computed(() =>
  [...labelImages.keys()]
    .filter((id) => store.labelsInUse.has(id))
    .map((id) => ({
      id,
      src: labelUrl(labelImages.get(id) as string),
      name: ui.labelL(id),
      what: ui.t.labelWhat[id] ?? "",
    }))
);

function pick(row: Row) {
  if (!row.here || !drink.value) return;
  ui.resetImpacts();
  const milks = store.milksFor(props.salePoint, drink.value, row.bean);
  // One variant only, the milk step has nothing to ask.
  router.push(toAfterBean(props.salePoint, drink.value, row.bean, milks));
}

// A drink that comes one way only has no coffee step, go past it.
watch(
  drink,
  (d) => {
    if (!d || store.hasBeanChoice(props.salePoint, d)) return;
    const milks = store.milksFor(props.salePoint, d, null);
    router.replace(toAfterBean(props.salePoint, d, null, milks));
  },
  { immediate: true }
);
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
        <h1 class="section-title big">{{ ui.drinkL(sample.drink) }}</h1>
        <p class="sub">{{ ui.blurbL(sample) }}</p>
      </div>
      <DrinkIcon :cup="sample" :size="44" />
    </div>

    <div class="head">
      <h2 class="display">{{ ui.t.beanTitle }}</h2>
      <p class="sub">{{ ui.t.beanSub }}</p>
    </div>

    <div class="cards beans">
      <div v-for="r in rows" :key="r.bean" class="card" :class="{ off: !r.here }">
        <component
          :is="r.here ? 'button' : 'div'"
          class="row bean"
          :class="{ 'row--tap': r.here }"
          :type="r.here ? 'button' : undefined"
          @click="pick(r)"
        >
          <div class="left">
            <span class="name" :class="{ dim: !r.here }">{{ ui.beanL(r.bean) }}</span>
            <div class="labels">
              <LabelIcons :labels="r.labels" :size="22" />
            </div>
          </div>
          <div v-if="store.hasOffsetting" class="right">
            <span class="val tnum" :class="{ dim: !r.here }">−{{ r.offset.toFixed(2) }} CHF</span>
            <span class="sub-val" :class="{ dim: !r.here }">{{ ui.t.givenBack }}</span>
          </div>
          <!-- Nothing is given back in this dataset, the hidden cost is what differs. -->
          <div v-else class="right">
            <span class="val tnum" :class="{ dim: !r.here }">
              {{ r.hidden.toFixed(3) }} {{ ui.t.chfHiddenShort }}
            </span>
          </div>
          <span v-if="r.here" class="chev">›</span>
        </component>
        <p v-if="showNotes" class="note">{{ r.note }}</p>
      </div>
    </div>

    <div v-if="keyRows.length" class="key-link">
      <Disclosure
        :open="ui.labelKey"
        :show-label="ui.t.labelKeyShow"
        :hide-label="ui.t.hide"
        @toggle="ui.labelKey = !ui.labelKey"
      />
    </div>
    <div v-if="ui.labelKey && keyRows.length" class="key">
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
.card {
  display: flex;
  flex-direction: column;
}
.card.off {
  background: var(--surface-alt);
}
/* Name and label icons on one line, the icons go below only if it is too narrow. */
.left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
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
.beans {
  --card-min: 320px;
}
.key {
  --card-min: 300px;
}

/* Wide, the two coffees sit side by side as cards, each with its note. */
@media (min-width: 640px) {
  .drink-head {
    padding-top: 32px;
  }
  .head {
    padding-bottom: 20px;
    max-width: 720px;
  }
  .card .bean {
    flex: 1;
    border-top: 0;
  }
  .key-link {
    border-top: 0;
    padding: 20px calc(2 * var(--pad)) 14px;
  }
  .key {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-min)), 1fr));
    gap: 12px 28px;
    margin: 0 var(--pad) 32px;
    border: var(--hairline);
  }
}
</style>
