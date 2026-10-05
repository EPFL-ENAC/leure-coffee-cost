<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import { LANGS, TABLES } from "@/i18n";
import { dataset, salePointLabel } from "@/config/dataset";
import { toDrinks } from "@/utils/routes";

defineProps<{ salePoint: string }>();

const ui = useUiStore();
const router = useRouter();
const picking = ref(false);

const { salePoints, place } = dataset();
/** With one sale point there is nothing to pick. */
const canPick = salePoints.length > 1;

/** "Le Klee · EPFL", or the label of the sale point when it has one. */
function name(sp: string): string {
  return place ? salePointLabel(sp) + " · " + place : salePointLabel(sp);
}

function pick(sp: string) {
  picking.value = false;
  router.push(toDrinks(sp));
}
</script>

<template>
  <header class="bar">
    <button
      v-if="canPick"
      class="who"
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="picking"
      :title="ui.t.changePlace"
      @click="picking = !picking"
    >
      <span class="sp">
        {{ name(salePoint) }}
        <span class="chev" :class="{ open: picking }" aria-hidden="true">▾</span>
      </span>
      <span class="mark">{{ ui.t.wordmark }}</span>
    </button>
    <div v-else class="who">
      <span class="sp">{{ name(salePoint) }}</span>
      <span class="mark">{{ ui.t.wordmark }}</span>
    </div>
    <div class="langs">
      <button
        v-for="code in LANGS"
        :key="code"
        type="button"
        class="lang"
        :class="{ on: code === ui.lang }"
        @click="ui.setLang(code)"
      >
        {{ TABLES[code].code }}
      </button>
    </div>
  </header>
  <div v-if="canPick && picking" class="picker" role="listbox">
    <div class="picker-title">{{ ui.t.changePlace }}</div>
    <button
      v-for="sp in salePoints"
      :key="sp"
      type="button"
      class="row row--tap"
      role="option"
      :aria-selected="sp === salePoint"
      :class="{ on: sp === salePoint }"
      @click="pick(sp)"
    >
      <span class="name">{{ salePointLabel(sp) }}</span>
      <span v-if="sp === salePoint" class="tick">·</span>
    </button>
  </div>
</template>

<style scoped>
.bar {
  padding: 13px var(--pad-shell);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: var(--surface-alt);
  border-bottom: var(--hairline);
  flex-shrink: 0;
}
.who {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.sp {
  font-size: var(--fs-body-s);
  font-weight: 500;
  color: var(--ink);
}
.chev {
  display: inline-block;
  margin-left: 4px;
  font-size: 11px;
  color: var(--accent);
  transition: transform 0.15s ease;
}
.chev.open {
  transform: rotate(180deg);
}
button.who:hover .sp {
  color: var(--accent);
}
.mark {
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--mut);
  white-space: nowrap;
}
.langs {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.lang {
  padding: 5px 8px;
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: var(--mut);
  background: transparent;
  border: 1px solid var(--line);
}
.lang.on {
  color: var(--epfl-white);
  background: var(--accent);
  border-color: var(--accent);
}
.picker {
  background: var(--surface-alt);
  border-bottom: var(--hairline);
}
.picker-title {
  padding: 10px var(--pad-shell) 6px;
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mut);
  border-bottom: var(--hairline);
}
.picker .row {
  padding: 0 var(--pad-shell);
  min-height: 44px;
  font-size: var(--fs-body-s);
  border-top: 0;
  border-bottom: var(--hairline);
}
.picker .row.on .name {
  color: var(--accent);
}
.name {
  flex: 1;
  min-width: 0;
}
.tick {
  color: var(--accent);
}
</style>
