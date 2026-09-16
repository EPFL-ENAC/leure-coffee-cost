<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BarMeter from "@/components/BarMeter.vue";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { useUiStore } from "@/stores/uiStore";
import { pct } from "@/utils/format";
import type { Cup } from "@/utils/cups";
import { one, sugarFromQuery, toCompare, toResult } from "@/utils/routes";

const props = defineProps<{ salePoint: string }>();

const store = useCoffeeStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();

const mine = computed(() => {
  const id = one(route.query.c);
  return id ? store.cupById(id) : null;
});

const sugarIdx = computed(() => {
  const n = sugarFromQuery(route.query.s);
  return Math.min(n, Math.max(0, store.sugarLevels.length - 1));
});
const sugarCost = computed(() => store.sugarLevels[sugarIdx.value]?.cost ?? 0);

const metric = (c: Cup) => c.hiddenCost + sugarCost.value;

const ranked = computed(() =>
  [...store.cupsAt(props.salePoint)].sort((a, b) => metric(a) - metric(b))
);
const rankMax = computed(() =>
  ranked.value.length ? metric(ranked.value[ranked.value.length - 1]) : 1
);

const note = computed(() => {
  const m = mine.value;
  if (!m) return "";
  const place = ranked.value.findIndex((c) => c.id === m.id) + 1;
  const cheaper = ranked.value.filter((c) => metric(c) < metric(m));
  const nearest = cheaper.length ? cheaper[cheaper.length - 1] : null;
  if (!nearest) return ui.t.rankNoteLowest;
  return ui.t.rankNote(
    ui.t.ordinal(place),
    ui.cupL(nearest),
    (metric(m) - metric(nearest)).toFixed(2)
  );
});

function goResult() {
  if (mine.value) router.push(toResult(props.salePoint, mine.value.id, sugarIdx.value));
}

function open(c: Cup) {
  const m = mine.value;
  if (!m) {
    router.push(toResult(props.salePoint, c.id, sugarIdx.value));
    return;
  }
  if (c.id === m.id) goResult();
  else router.push(toCompare(props.salePoint, m.id, c.id, sugarIdx.value));
}
</script>

<template>
  <div class="screen">
    <button v-if="mine" type="button" class="back" @click="goResult">
      {{ ui.t.yourCup }}
    </button>

    <div class="head">
      <div class="eyebrow">{{ ui.t.rankSub(ranked.length) }}</div>
      <h1 class="display">{{ ui.t.everyCupTitle(salePoint) }}</h1>
    </div>

    <button
      v-for="(c, i) in ranked"
      :key="c.id"
      type="button"
      class="rank"
      :class="{ mine: mine && c.id === mine.id }"
      @click="open(c)"
    >
      <span class="idx tnum">{{ i + 1 }}</span>
      <span class="name">{{ ui.cupL(c) }}</span>
      <div class="bar">
        <BarMeter
          :width="pct(metric(c), rankMax)"
          :color="mine && c.id === mine.id ? 'var(--accent)' : 'var(--bean-light)'"
        />
      </div>
      <span class="val tnum">{{ metric(c).toFixed(2) }}</span>
    </button>

    <p v-if="note" class="note">{{ note }}</p>
  </div>
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
.rank {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 var(--pad);
  min-height: 46px;
  width: 100%;
  border-top: var(--hairline);
}
.rank:hover {
  background: var(--surface-alt);
}
.rank.mine {
  background: var(--surface-alt);
}
.idx {
  width: 18px;
  font-size: 11px;
  color: var(--mut);
  flex-shrink: 0;
}
.name {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-body-s);
  line-height: 1.3;
  color: var(--ink);
}
.rank.mine .name,
.rank.mine .val {
  color: var(--accent);
  font-weight: 500;
}
.bar {
  width: 76px;
  flex-shrink: 0;
}
.val {
  width: 34px;
  text-align: right;
  font-size: var(--fs-small);
  color: var(--ink);
  flex-shrink: 0;
}
.note {
  border-top: var(--hairline);
  padding: 18px var(--pad) 32px;
  font-size: var(--fs-small);
  line-height: 1.55;
  color: var(--mut);
  text-wrap: pretty;
}
.screen {
  --screen-max: 960px;
}
</style>
