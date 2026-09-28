<script setup lang="ts">
import { ref } from "vue";
import { useUiStore } from "@/stores/uiStore";

const ui = useUiStore();
const open = ref(false);
</script>

<template>
  <footer class="foot">
    <button class="head" type="button" :aria-expanded="open" @click="open = !open">
      <span class="eyebrow">{{ ui.t.aboutTitle }}</span>
      <span class="chev">{{ open ? "−" : "+" }}</span>
    </button>

    <div v-if="open" class="body">
      <!-- Each paragraph is a list of pieces, so the text stays in the i18n
           tables and the markup stays here. No HTML string is injected. -->
      <p v-for="(para, pi) in ui.t.aboutParas" :key="pi">
        <template v-for="(seg, si) in para" :key="si"
          ><a
            v-if="seg.href"
            :href="seg.href"
            :target="seg.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener noreferrer"
            >{{ seg.t }}</a
          ><strong v-else-if="seg.b">{{ seg.t }}</strong
          ><em v-else-if="seg.i">{{ seg.t }}</em
          ><template v-else>{{ seg.t }}</template></template
        >
      </p>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: var(--hairline);
  background: var(--surface-alt);
}
.head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px var(--pad-shell);
}
.chev {
  font-size: var(--fs-body-s);
  color: var(--accent);
}
.body {
  padding: 0 var(--pad-shell) 28px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: var(--fs-xs);
  line-height: 1.6;
  color: var(--mut);
  text-wrap: pretty;
}
.body strong {
  font-weight: 500;
  color: var(--ink);
}
</style>
