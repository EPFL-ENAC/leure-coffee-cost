<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useUiStore } from "@/stores/uiStore";
import type { Bean, Milk } from "@/utils/cups";
import { toBean, toDrinks, toMilk, toSugar } from "@/utils/routes";

const props = defineProps<{
  salePoint: string;
  /** 0 drink, 1 coffee, 2 milk, 3 sugar, 4 result. */
  step: number;
  drink: string | null;
  bean: Bean | null;
  milk: Milk | null;
  sugar: number;
  hasBean: boolean;
  hasMilk: boolean;
}>();

const ui = useUiStore();

type Step = { label: string; value: string; to: RouteLocationRaw | null; muted: boolean };

const steps = computed<Step[]>(() => {
  const t = ui.t;
  const d = props.drink;
  const dash = "—";
  return [
    {
      label: t.rail[0],
      value: d ?? dash,
      to: toDrinks(props.salePoint),
      muted: false,
    },
    {
      label: t.rail[1],
      value: props.step >= 1 ? (props.bean ?? dash) : dash,
      to: d ? toBean(props.salePoint, d) : null,
      muted: !props.hasBean,
    },
    {
      label: t.rail[2],
      // Before the milk step there is nothing to show, not even "no milk".
      value:
        props.step < 2
          ? dash
          : props.milk
            ? ui.milkL(props.milk)
            : props.hasMilk && props.step === 2
              ? dash
              : t.noMilk,
      to: d ? toMilk(props.salePoint, d, props.bean) : null,
      muted: !props.hasMilk,
    },
    {
      label: t.rail[3],
      value: props.step >= 3 ? (t.sugarLabels[props.sugar] ?? dash) : dash,
      to: d ? toSugar(props.salePoint, d, props.bean, props.milk) : null,
      muted: false,
    },
  ];
});

function barColor(i: number): string {
  if (i < props.step) return "var(--ink)";
  if (i === props.step) return "var(--accent)";
  return "var(--epfl-gray-100)";
}
</script>

<template>
  <nav class="rail">
    <component
      :is="i < step && s.to ? 'router-link' : 'div'"
      v-for="(s, i) in steps"
      :key="s.label"
      class="step"
      :class="{ tap: i < step && s.to }"
      :to="i < step && s.to ? s.to : undefined"
    >
      <div class="bar" :style="{ background: barColor(i) }"></div>
      <div class="label" :style="{ color: i === step ? 'var(--accent)' : 'var(--mut)' }">
        {{ s.label }}
      </div>
      <div
        class="value"
        :style="{
          color: s.muted ? 'var(--faint)' : i <= step ? 'var(--ink)' : 'var(--mut)',
        }"
      >
        {{ s.value }}
      </div>
    </component>
  </nav>
</template>

<style scoped>
.rail {
  display: flex;
  gap: 12px;
  padding: 14px var(--pad-shell) 16px;
  border-bottom: var(--hairline);
}
@media (min-width: 900px) {
  .rail {
    gap: 56px;
    padding-top: 16px;
    padding-bottom: 18px;
  }
}
.step {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: inherit;
}
.step.tap {
  cursor: pointer;
}
.bar {
  height: 2px;
}
.label {
  font-size: 9.5px;
  letter-spacing: 0.12em;
}
.value {
  font-size: var(--fs-xs);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
