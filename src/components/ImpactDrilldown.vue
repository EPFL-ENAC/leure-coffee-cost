<script setup lang="ts">
import { computed } from "vue";
import BarMeter from "@/components/BarMeter.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { firstSentence, money, pct, restSentences, sig, tidy } from "@/utils/format";
import type { FullCup } from "@/utils/cups";
import {
  mergedIndicators,
  originOf,
  productRows,
  visibleCats,
} from "@/utils/impactTree";

const props = defineProps<{ cup: FullCup }>();

const store = useCoffeeStore();
const ui = useUiStore();

const cats = computed(() => visibleCats(props.cup));
const catMax = computed(() => (cats.value.length ? cats.value[0].cost : 1));

/** Falls back to the biggest category, like the prototype does. */
const catName = computed(
  () => ui.cat ?? (cats.value.length ? cats.value[0].name : "")
);
const catTotal = computed(() => props.cup.byCat[catName.value] ?? 0);

const merged = computed(() =>
  catName.value ? mergedIndicators(props.cup, catName.value) : []
);

type CatRow = {
  key: string;
  name: string;
  costStr: string;
  w: string;
  origin: string;
  tap: boolean;
};

const rows = computed<CatRow[]>(() => {
  if (ui.view === "what") {
    const top = merged.value.slice(0, 3);
    const mx = top.length ? top[0].cost : 1;
    return top.map((e) => {
      const o = originOf(e);
      return {
        key: e.name,
        name: ui.indL(e.name),
        costStr: money(e.cost, 3),
        w: pct(e.cost, mx),
        origin: o ? ui.t.origin(o.share, ui.ingL(o.ing), ui.stageL(o.stage)) : "",
        tap: true,
      };
    });
  }
  const prods = productRows(props.cup, catName.value);
  const top = prods.slice(0, 3);
  const mx = top.length ? top[0].cost : 1;
  return top.map((p) => ({
    key: p.name,
    name: ui.ingL(p.name),
    costStr: money(p.cost, 3),
    w: pct(p.cost, mx),
    origin: p.topStage ? ui.t.stageOnly(ui.stageL(p.topStage)) : "",
    tap: false,
  }));
});

const rest = computed(() => {
  const list =
    ui.view === "what"
      ? merged.value.slice(3).map((e) => e.cost)
      : productRows(props.cup, catName.value)
          .slice(3)
          .map((p) => p.cost);
  const sum = list.reduce((a, c) => a + c, 0);
  return {
    show: list.length > 0 && sum >= 0.0005,
    label: ui.view === "what" ? ui.t.restInds(list.length) : ui.t.restIngs(list.length),
    str: money(sum, 3),
  };
});

/* ---- one indicator ---- */

const ind = computed(() =>
  ui.ind ? (merged.value.find((e) => e.name === ui.ind) ?? null) : null
);

const def = computed(() => (ind.value ? store.defOf(ind.value.name) : null));

/** The CSV text, swapped for the translated one when we have it. */
const defText = computed(() => {
  const e = ind.value;
  const d = def.value;
  if (!e || !d?.indicatorDefinition) return ui.t.noDefinition;
  return ui.indDefL(e.name, d.unit || e.unit, d.indicatorDefinition);
});
const defRest = computed(() => restSentences(defText.value));
const method = computed(() => {
  const e = ind.value;
  const d = def.value;
  if (!e || !d?.monetisationMethod) return "";
  return tidy(ui.indMethodL(e.name, d.monetisationMethod));
});

const split = computed(() => {
  const e = ind.value;
  if (!e) return [];
  const ps = Object.entries(e.byProduct).sort((a, b) => b[1] - a[1]);
  const mx = ps.length ? ps[0][1] : 1;
  return ps.map(([name, v]) => ({
    name: ui.ingL(name),
    w: pct(v, mx),
    pctStr: Math.round((v / e.cost) * 100) + "%",
  }));
});
</script>

<template>
  <!-- every category -->
  <template v-if="ui.level === 'cats'">
    <div class="head">
      <h2 class="section-title">{{ ui.t.whereGoes(money(cup.hiddenCost)) }}</h2>
      <p class="sub">{{ ui.t.catsSub }}</p>
    </div>
    <button
      v-for="c in cats"
      :key="c.name"
      type="button"
      class="row row--tap"
      @click="ui.openCat(c.name)"
    >
      <span class="cat-name">{{ ui.catL(c.name) }}</span>
      <div class="cat-bar"><BarMeter :value="c.cost" :max="catMax" /></div>
      <span class="cat-cost tnum">{{ money(c.cost) }}</span>
      <span class="chev">›</span>
    </button>
  </template>

  <!-- one category -->
  <template v-else-if="ui.level === 'cat'">
    <button type="button" class="back" @click="ui.backToCats()">
      {{ ui.t.allImpacts }}
    </button>
    <div class="cat-head">
      <div class="cat-line">
        <span class="cat-title">{{ ui.catL(catName) }}</span>
        <span class="cat-total tnum">{{ money(catTotal) }} CHF</span>
      </div>
      <p class="sub">{{ ui.t.catBlurb[catName] ?? "" }}</p>
    </div>
    <div class="tabs">
      <button
        type="button"
        class="tab"
        :class="{ on: ui.view === 'what' }"
        @click="ui.view = 'what'; ui.ind = null"
      >
        {{ ui.t.byWhat }}
      </button>
      <button
        type="button"
        class="tab"
        :class="{ on: ui.view === 'where' }"
        @click="ui.view = 'where'; ui.ind = null"
      >
        {{ ui.t.byWhere }}
      </button>
    </div>
    <component
      :is="r.tap ? 'button' : 'div'"
      v-for="r in rows"
      :key="r.key"
      class="ind-row"
      :class="{ tap: r.tap }"
      :type="r.tap ? 'button' : undefined"
      @click="r.tap && ui.openInd(r.key)"
    >
      <div class="ind-line">
        <span class="ind-name">{{ r.name }}</span>
        <span class="ind-cost tnum">{{ r.costStr }}</span>
        <span v-if="r.tap" class="chev">›</span>
      </div>
      <BarMeter :width="r.w" />
      <p class="origin">{{ r.origin }}</p>
    </component>
    <div v-if="rest.show" class="rest">
      <span>{{ rest.label }}</span>
      <span class="tnum">{{ rest.str }}</span>
    </div>
  </template>

  <!-- one indicator -->
  <template v-else-if="ui.level === 'ind' && ind">
    <button type="button" class="back" @click="ui.backToCat()">
      ‹ {{ ui.catL(catName) }}
    </button>
    <div class="detail">
      <h2 class="detail-title">{{ ui.indL(ind.name) }}</h2>
      <div class="figures">
        <div>
          <div class="figure">{{ ind.mixed ? "—" : sig(ind.phys) }}</div>
          <div class="figure-unit">{{ ind.mixed ? ui.t.mixedUnits : ind.unit }}</div>
        </div>
        <div>
          <div class="figure accent">{{ money(ind.cost, 3) }}</div>
          <div class="figure-unit">{{ ui.t.chfHidden }}</div>
        </div>
      </div>

      <div class="block">
        <div class="eyebrow">{{ ui.t.whereFrom }}</div>
        <div v-for="p in split" :key="p.name" class="split-row">
          <span class="split-name">{{ p.name }}</span>
          <div class="split-bar"><BarMeter :width="p.w" /></div>
          <span class="split-pct tnum">{{ p.pctStr }}</span>
        </div>
      </div>

      <div class="block topline">
        <div class="eyebrow">{{ ui.t.whatMeasures }}</div>
        <p class="def">{{ firstSentence(defText) }}</p>
        <template v-if="ui.indMore">
          <p v-if="defRest" class="def muted">{{ defRest }}</p>
          <div v-if="method" class="block topline">
            <div class="eyebrow">{{ ui.t.howFrancs }}</div>
            <p class="def muted">{{ method }}</p>
          </div>
        </template>
        <button
          v-if="defRest || method"
          type="button"
          class="link"
          @click="ui.indMore = !ui.indMore"
        >
          {{ ui.indMore ? ui.t.showLess : ui.t.readMore }}
        </button>
      </div>

      <button type="button" class="link" @click="ui.backToCat()">{{ ui.t.done }}</button>
    </div>
  </template>
</template>

<style scoped>
.head {
  padding: 22px var(--pad) 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cat-name {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-body);
  color: var(--ink);
}
.cat-bar {
  width: 78px;
  flex-shrink: 0;
}
.cat-cost {
  width: 38px;
  text-align: right;
  font-size: var(--fs-body-s);
  color: var(--ink);
  flex-shrink: 0;
}
.chev {
  font-size: var(--fs-body-s);
  color: var(--accent);
  flex-shrink: 0;
}
.back {
  display: block;
  width: 100%;
  border-top: var(--hairline);
  padding: 12px var(--pad);
  font-size: var(--fs-body-s);
  color: var(--accent);
}
.cat-head {
  padding: 8px var(--pad) 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: var(--hairline);
}
.cat-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.cat-title {
  font-size: var(--fs-h2);
  line-height: 1.1;
  font-weight: 300;
  color: var(--ink);
}
.cat-total {
  font-size: var(--fs-body);
  color: var(--ink);
}
.tabs {
  padding: 0 var(--pad) 14px;
  display: flex;
}
.tab {
  padding: 7px 13px;
  font-size: var(--fs-small);
  color: var(--mut);
  border: 1px solid var(--line);
}
.tab.on {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}
.ind-row {
  width: 100%;
  padding: 13px var(--pad);
  border-top: var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ind-row.tap {
  cursor: pointer;
}
.ind-row.tap:hover {
  background: var(--surface-alt);
}
.ind-line {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.ind-name {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  line-height: 1.3;
  color: var(--ink);
}
.ind-cost {
  font-size: var(--fs-body-s);
  color: var(--ink);
  flex-shrink: 0;
}
.origin {
  font-size: 11px;
  line-height: 1.45;
  color: var(--mut);
  text-wrap: pretty;
}
.rest {
  border-top: var(--hairline);
  padding: 13px var(--pad);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: var(--fs-small);
  color: var(--mut);
}
.detail {
  border-top: var(--hairline);
  padding: var(--pad);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.detail-title {
  font-size: var(--fs-h3);
  line-height: 1.2;
  font-weight: 400;
  color: var(--ink);
  text-wrap: pretty;
}
.figures {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.figure {
  font-size: 26px;
  line-height: 1;
  font-weight: 300;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.figure.accent {
  color: var(--accent);
}
.figure-unit {
  font-size: 11px;
  color: var(--mut);
  margin-top: 5px;
}
.block {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.block.topline {
  border-top: var(--hairline);
  padding-top: 14px;
}
.split-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.split-name {
  width: 96px;
  flex-shrink: 0;
  font-size: var(--fs-small);
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.split-bar {
  flex: 1;
}
.split-pct {
  font-size: var(--fs-xs);
  color: var(--mut);
  flex-shrink: 0;
}
.def {
  font-size: var(--fs-body-s);
  line-height: 1.6;
  color: var(--ink);
  text-wrap: pretty;
}
.def.muted {
  color: var(--mut);
}
.link {
  align-self: flex-start;
}

/* Wide, there is room for the whole ingredient name. On a phone it stays cut. */
@media (min-width: 900px) {
  .split-name {
    width: 150px;
  }
}
</style>
