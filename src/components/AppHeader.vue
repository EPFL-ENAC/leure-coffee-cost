<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import { LANGS, TABLES } from "@/i18n";
import { SALE_POINTS } from "@/utils/cups";
import { toDrinks } from "@/utils/routes";

defineProps<{ salePoint: string }>();

const ui = useUiStore();
const router = useRouter();
const picking = ref(false);

function pick(sp: string) {
  picking.value = false;
  router.push(toDrinks(sp));
}
</script>

<template>
  <header class="bar">
    <button class="who" type="button" @click="picking = !picking">
      <span class="sp">{{ salePoint }} · EPFL</span>
      <span class="mark">{{ ui.t.wordmark }}</span>
    </button>
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
  <div v-if="picking" class="picker">
    <button
      v-for="sp in SALE_POINTS"
      :key="sp"
      type="button"
      class="row row--tap"
      :class="{ on: sp === salePoint }"
      @click="pick(sp)"
    >
      <span class="name">{{ sp }}</span>
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
