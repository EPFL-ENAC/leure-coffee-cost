<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BarMeter from "@/components/BarMeter.vue";
import Disclosure from "@/components/Disclosure.vue";
import DrinkIcon from "@/components/DrinkIcon.vue";
import ImpactDrilldown from "@/components/ImpactDrilldown.vue";
import LabelIcons from "@/components/LabelIcons.vue";
import SplitBar from "@/components/SplitBar.vue";
import StepRail from "@/components/StepRail.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { money, pct, sig } from "@/utils/format";
import type { Cup } from "@/utils/cups";
import { sugarFromQuery, toAll, toCompare } from "@/utils/routes";
import { useKnown } from "@/utils/guard";
import { withSugar } from "@/utils/impactTree";

const props = defineProps<{ salePoint: string }>();

const store = useCoffeeStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();

const baseCup = computed(() => store.cupById(String(route.params.cup)));
const sugarIdx = computed(() => {
  const n = sugarFromQuery(route.query.s);
  return Math.min(n, Math.max(0, store.sugarLevels.length - 1));
});
const sugarLevel = computed(() => store.sugarLevels[sugarIdx.value] ?? null);
const sugarCost = computed(() => sugarLevel.value?.cost ?? 0);

/** Cheapest cup of the same drink, and the cheapest cup on the whole list. */
const siblings = computed(() => {
  const c = baseCup.value;
  if (!c) return [];
  return [...store.variantsFor(props.salePoint, c.drink, c.bean)].sort(
    (a, b) => a.hiddenCost - b.hiddenCost
  );
});
const lowest = computed(
  () => [...store.cupsAt(props.salePoint)].sort((a, b) => a.hiddenCost - b.hiddenCost)[0] ?? null
);

useKnown(
  () => baseCup.value,
  () => props.salePoint
);

watch(
  baseCup,
  (c) => {
    if (c) store.loadCup(c);
    ui.resetImpacts();
  },
  { immediate: true }
);

const full = computed(() => (baseCup.value ? store.fullCup(baseCup.value.id) : null));
const cup = computed(() => (full.value ? withSugar(full.value, sugarLevel.value) : null));

const paid = computed(() => baseCup.value?.retailPrice ?? 0);
const hidden = computed(() => (baseCup.value?.hiddenCost ?? 0) + sugarCost.value);
const offset = computed(() => Math.abs(baseCup.value?.offsetting ?? 0));
const truePrice = computed(() => (baseCup.value?.truePrice ?? 0) + sugarCost.value);

const legend = computed(() => [
  { fill: "var(--bean)", label: ui.t.pricePaid, val: paid.value.toFixed(2), accent: false },
  { fill: "var(--accent)", label: ui.t.hiddenLegend, val: "+" + money(hidden.value), accent: false },
  {
    fill: "transparent",
    label: ui.t.givenBackLegend,
    val: "−" + money(offset.value),
    accent: true,
  },
]);

const offsetRows = computed(() => {
  const rows = (cup.value?.offsetDetail ?? []).filter((x) => x.c < 0);
  rows.sort((a, b) => a.c - b.c);
  const max = rows.length ? Math.abs(rows[0].c) : 1;
  return rows.map((x) => ({
    key: x.n + x.ing,
    name: x.n,
    costStr: "−" + Math.abs(x.c).toFixed(3) + " CHF",
    w: pct(x.c, max),
    physStr: sig(x.p) + " " + x.u + (x.ing ? " · " + ui.ingL(x.ing) : ""),
  }));
});

type Chip = { key: string; label: string; deltaStr: string; up: boolean; other: Cup };

const chips = computed<Chip[]>(() => {
  const mine = baseCup.value;
  if (!mine) return [];
  const out: Chip[] = [];
  const push = (c: Cup | null, label: string) => {
    if (!c || c.id === mine.id || out.some((x) => x.other.id === c.id)) return;
    const delta = c.hiddenCost - mine.hiddenCost;
    out.push({
      key: c.id,
      label,
      deltaStr: (delta > 0 ? "+" : "−") + Math.abs(delta).toFixed(2),
      up: delta > 0,
      other: c,
    });
  };
  if (mine.milk && siblings.value.length) {
    push(siblings.value[0], ui.t.chipMilk(ui.milkL(siblings.value[0].milk)));
  }
  if (lowest.value) push(lowest.value, ui.t.chipLowest(lowest.value.drink));
  return out.slice(0, 2);
});

function openCompare(other: Cup) {
  if (!baseCup.value) return;
  router.push(toCompare(props.salePoint, baseCup.value.id, other.id, sugarIdx.value));
}

function goAll() {
  if (!baseCup.value) return;
  router.push(toAll(props.salePoint, baseCup.value.id, sugarIdx.value));
}
</script>

<template>
  <template v-if="baseCup">
    <StepRail
      :sale-point="salePoint"
      :step="4"
      :drink="baseCup.drink"
      :bean="baseCup.bean"
      :milk="baseCup.milk"
      :sugar="sugarIdx"
      :has-bean="true"
      :has-milk="baseCup.milk !== null"
    />

    <div class="result">
      <div class="side">
      <div class="hero">
        <div class="hero-text">
          <div class="eyebrow">{{ ui.t.hiddenLabel }}</div>
          <div class="figure-line">
            <span class="figure tnum">{{ money(hidden) }}</span>
            <span class="figure-unit">CHF</span>
          </div>
          <p class="context">
            {{ ui.t.contextLine(Math.round((hidden / (paid || 1)) * 100), paid.toFixed(2)) }}
          </p>
        </div>
        <DrinkIcon :cup="baseCup" :size="54" />
      </div>

      <div class="money">
        <SplitBar :paid="paid" :hidden="hidden" />
        <div class="legend">
          <div v-for="g in legend" :key="g.label" class="legend-row">
            <span
              class="swatch"
              :style="{
                background: g.fill,
                border: '1px solid ' + (g.accent ? 'var(--accent)' : g.fill),
              }"
            ></span>
            <span class="legend-label">{{ g.label }}</span>
            <span class="legend-val tnum" :class="{ accent: g.accent }">{{ g.val }}</span>
          </div>
          <div class="legend-row total">
            <span class="legend-label strong">{{ ui.t.truePrice }}</span>
            <span class="legend-val tnum strong">{{ truePrice.toFixed(2) }} CHF</span>
          </div>
        </div>

        <div class="labels">
          <LabelIcons :labels="baseCup.labels" :size="24" />
          <Disclosure
            :open="ui.why"
            :show-label="ui.t.whyLink"
            :hide-label="ui.t.hide"
            @toggle="ui.why = !ui.why"
          />
        </div>

        <div v-if="ui.why" class="why">
          <p class="why-note">
            {{ offsetRows.length ? ui.t.offsetNote(baseCup.bean ?? "") : ui.t.offsetNone }}
          </p>
          <div v-if="offsetRows.length" class="why-rows">
            <div class="eyebrow">{{ ui.t.givenBackHead }}</div>
            <div v-for="o in offsetRows" :key="o.key" class="why-row">
              <div class="why-line">
                <span class="why-name">{{ o.name }}</span>
                <span class="why-cost tnum">{{ o.costStr }}</span>
              </div>
              <BarMeter :width="o.w" color="var(--accent)" />
              <div class="why-phys tnum">{{ o.physStr }}</div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div class="main">
      <div class="gap gap--edge"></div>

      <ImpactDrilldown v-if="cup" :cup="cup" />
      <p v-else class="waiting">{{ ui.t.loading }}</p>

      <div class="gap"></div>

      <div class="head">
        <h2 class="section-title">{{ ui.t.changeTitle }}</h2>
        <p class="sub">{{ chips.length ? ui.t.changeSub : ui.t.changeNone }}</p>
      </div>
      <button
        v-for="ch in chips"
        :key="ch.key"
        type="button"
        class="row row--tap chip"
        @click="openCompare(ch.other)"
      >
        <span class="chip-label">{{ ch.label }}</span>
        <span class="chip-delta tnum" :class="{ down: !ch.up }">{{ ch.deltaStr }}</span>
        <span class="chev">›</span>
      </button>

      <div class="gap gap--edge"></div>
      <button type="button" class="row row--tap all" @click="goAll">{{ ui.t.seeAll }}</button>
      <p class="foot">{{ ui.t.footNote }}</p>
      </div>
    </div>
  </template>
</template>

<style scoped>
.hero {
  padding: 28px var(--pad) 18px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.hero-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.figure-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.figure {
  font-size: var(--fs-figure);
  line-height: 0.92;
  font-weight: 300;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.figure-unit {
  font-size: var(--fs-body);
  color: var(--mut);
}
.context {
  font-size: var(--fs-body-s);
  line-height: 1.5;
  color: var(--mut);
  margin-top: 4px;
  text-wrap: pretty;
}
.money {
  padding: 0 var(--pad) 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.legend {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.legend-row {
  display: flex;
  align-items: center;
  gap: 9px;
}
.legend-row.total {
  border-top: var(--hairline);
  padding-top: 8px;
}
.swatch {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}
.legend-label {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-small);
  color: var(--mut);
}
.legend-val {
  font-size: var(--fs-small);
  color: var(--ink);
  white-space: nowrap;
  flex-shrink: 0;
}
.legend-val.accent {
  color: var(--accent);
}
.strong {
  color: var(--ink);
}
.labels {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.why {
  background: var(--surface-alt);
  border: var(--hairline);
  padding: 13px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.why-note {
  font-size: var(--fs-small);
  line-height: 1.55;
  color: var(--mut);
  text-wrap: pretty;
}
.why-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: var(--hairline);
  padding-top: 12px;
}
.why-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.why-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.why-name {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-small);
  line-height: 1.35;
  color: var(--ink);
  text-wrap: pretty;
}
.why-cost {
  font-size: var(--fs-small);
  color: var(--accent);
  white-space: nowrap;
  flex-shrink: 0;
}
.why-phys {
  font-size: 11px;
  color: var(--mut);
}
.waiting {
  padding: 24px var(--pad);
  font-size: var(--fs-body-s);
  color: var(--mut);
}
.head {
  padding: 22px var(--pad) 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.chip {
  min-height: 52px;
}
.chip-label {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  color: var(--ink);
}
.chip-delta {
  font-size: 14px;
  color: var(--ink);
  flex-shrink: 0;
}
.chip-delta.down {
  color: var(--accent);
}
.chev {
  font-size: var(--fs-small);
  color: var(--accent);
  flex-shrink: 0;
}
.all {
  min-height: 52px;
  font-size: 14px;
  color: var(--accent);
  border-top: 0;
}
.foot {
  border-top: var(--hairline);
  background: var(--surface-alt);
  padding: 18px var(--pad) 32px;
  font-size: var(--fs-small);
  line-height: 1.55;
  color: var(--mut);
  text-wrap: pretty;
}
.result,
.side,
.main {
  display: flex;
  flex-direction: column;
}

/* Wide: what the cup costs stays on the left while the detail scrolls on the
   right. The grey strips between blocks are not needed any more, the hairlines
   and the column rule do the job. */
@media (min-width: 900px) {
  .result {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
    align-items: start;
  }
  .side {
    position: sticky;
    top: 0;
    padding: 0 var(--pad) 32px;
  }
  .main {
    border-left: var(--hairline);
  }
  .main > .gap--edge {
    display: none;
  }
  .all {
    border-top: var(--hairline);
  }
}
</style>
