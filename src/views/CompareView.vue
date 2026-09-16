<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BarMeter from "@/components/BarMeter.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { money, pct } from "@/utils/format";
import { sugarFromQuery, toResult } from "@/utils/routes";
import { useKnown } from "@/utils/guard";

const props = defineProps<{ salePoint: string }>();

const store = useCoffeeStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();

const mine = computed(() => store.cupById(String(route.params.cup)));
const other = computed(() => store.cupById(String(route.params.other)));

const sugarIdx = computed(() => {
  const n = sugarFromQuery(route.query.s);
  return Math.min(n, Math.max(0, store.sugarLevels.length - 1));
});
const sugarLevel = computed(() => store.sugarLevels[sugarIdx.value] ?? null);
const sugarCost = computed(() => sugarLevel.value?.cost ?? 0);

watch(
  [mine, other],
  ([a, b]) => {
    if (a) store.loadCup(a);
    if (b) store.loadCup(b);
  },
  { immediate: true }
);

useKnown(
  () => mine.value && other.value,
  () => props.salePoint
);

const hidA = computed(() => (mine.value?.hiddenCost ?? 0) + sugarCost.value);
const hidB = computed(() => (other.value?.hiddenCost ?? 0) + sugarCost.value);
const delta = computed(() => hidB.value - hidA.value);

const otherLabel = computed(() => {
  const c = other.value;
  if (!c) return "";
  return (c.milk ? ui.milkL(c.milk) : c.drink).toUpperCase();
});

/** The sugar cost of one category, added to both cups the same way. */
function sugarOf(cat: string): number {
  if (!sugarLevel.value) return 0;
  return sugarLevel.value.cats
    .filter((c) => c.name === cat)
    .reduce((t, c) => t + c.cost, 0);
}

type Row = { name: string; a: number; b: number };

const rows = computed<Row[]>(() => {
  const fa = mine.value ? store.fullCup(mine.value.id) : null;
  const fb = other.value ? store.fullCup(other.value.id) : null;
  if (!fa || !fb) return [];
  const names = new Set([...Object.keys(fa.byCat), ...Object.keys(fb.byCat)]);
  return [...names]
    .map((name) => ({
      name,
      a: (fa.byCat[name] ?? 0) + sugarOf(name),
      b: (fb.byCat[name] ?? 0) + sugarOf(name),
    }))
    .filter((r) => r.a >= 0.004 || r.b >= 0.004)
    .sort((x, y) => Math.max(y.a, y.b) - Math.max(x.a, x.b));
});

const rowMax = computed(() =>
  rows.value.reduce((m, r) => Math.max(m, r.a, r.b), 0.01)
);

function deltaStr(d: number): string {
  if (Math.abs(d) < 0.005) return ui.t.noChange;
  return (d > 0 ? "+" : "−") + Math.abs(d).toFixed(2);
}

const note = computed(() => {
  if (!rows.value.length) return ui.t.cmpSame;
  const biggest = [...rows.value].sort(
    (x, y) => Math.abs(y.b - y.a) - Math.abs(x.b - x.a)
  )[0];
  return ui.t.cmpNote(
    delta.value > 0,
    Math.abs(delta.value).toFixed(2),
    ui.catL(biggest.name)
  );
});

function goResult() {
  if (!mine.value) return;
  router.push(toResult(props.salePoint, mine.value.id, sugarIdx.value));
}

function switchToOther() {
  if (!other.value) return;
  ui.resetImpacts();
  router.push(toResult(props.salePoint, other.value.id, sugarIdx.value));
}
</script>

<template>
  <template v-if="mine && other">
    <div class="screen">
      <button type="button" class="back" @click="goResult">{{ ui.t.yourCup }}</button>

      <div class="head">
        <div class="eyebrow">{{ ui.t.comparison }}</div>
        <h1 class="title">{{ ui.t.cmpTitle(ui.cupL(other)) }}</h1>
      </div>

      <div class="figures">
        <div class="fig">
          <div class="fig-label">{{ ui.t.yours }}</div>
          <div class="fig-val tnum">{{ money(hidA) }}</div>
        </div>
        <div class="fig">
          <div class="fig-label accent">{{ otherLabel }}</div>
          <div class="fig-val accent tnum">{{ money(hidB) }}</div>
          <div class="fig-delta">
            {{ ui.t.cmpDelta((delta > 0 ? "+" : "−") + Math.abs(delta).toFixed(2)) }}
          </div>
        </div>
      </div>

      <div v-for="r in rows" :key="r.name" class="cmp-row">
        <div class="cmp-line">
          <span class="cmp-name">{{ ui.catL(r.name) }}</span>
          <span
            class="cmp-delta tnum"
            :class="{
              same: Math.abs(r.b - r.a) < 0.005,
              down: r.b - r.a < -0.005,
            }"
            >{{ deltaStr(r.b - r.a) }}</span
          >
        </div>
        <div class="pair">
          <div class="pair-bar">
            <BarMeter :width="pct(r.a, rowMax)" :height="7" />
          </div>
          <span class="pair-tag">{{ ui.t.yours }}</span>
        </div>
        <div class="pair">
          <div class="pair-bar">
            <BarMeter :width="pct(r.b, rowMax)" :height="7" color="var(--accent)" />
          </div>
          <span class="pair-tag accent">{{ otherLabel }}</span>
        </div>
      </div>

      <p class="note">{{ note }}</p>

      <div class="cta">
        <button type="button" class="switch" @click="switchToOther">
          {{ ui.t.switchTo }}
        </button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.back {
  display: block;
  width: 100%;
  padding: 12px var(--pad);
  border-bottom: var(--hairline);
  font-size: var(--fs-body-s);
  color: var(--accent);
}
.head {
  padding: var(--pad-top) var(--pad) 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.title {
  font-size: 26px;
  line-height: 1.12;
  font-weight: 300;
  color: var(--ink);
  text-wrap: pretty;
}
.figures {
  padding: 0 var(--pad) 20px;
  display: flex;
  gap: 28px;
}
.fig {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fig-label {
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.1em;
  color: var(--mut);
}
.fig-val {
  font-size: 34px;
  line-height: 1;
  font-weight: 300;
  color: var(--ink);
}
.accent {
  color: var(--accent);
}
.fig-delta {
  font-size: var(--fs-small);
  color: var(--mut);
}
.cmp-row {
  padding: 12px var(--pad);
  border-top: var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cmp-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.cmp-name {
  font-size: 14px;
  color: var(--ink);
}
.cmp-delta {
  font-size: var(--fs-small);
  color: var(--ink);
}
.cmp-delta.same {
  color: var(--mut);
}
.cmp-delta.down {
  color: var(--accent);
}
.pair {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pair-bar {
  flex: 1;
}
.pair-tag {
  width: 52px;
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.08em;
  color: var(--mut);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.note {
  border-top: var(--hairline);
  padding: 16px var(--pad);
  font-size: var(--fs-body-s);
  line-height: 1.55;
  color: var(--mut);
  text-wrap: pretty;
}
.cta {
  padding: 0 var(--pad) 28px;
}
.switch {
  width: 100%;
  padding: 14px;
  text-align: center;
  font-size: 14px;
  background: var(--accent);
  color: #fff;
}
.switch:hover {
  background: var(--accent-dark);
}
.screen {
  --screen-max: 900px;
}
</style>
