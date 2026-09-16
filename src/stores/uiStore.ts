import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TABLES, type LangCode } from "@/i18n";
import {
  DEF_FAMILIES,
  METHOD_FAMILIES,
  type DefFamily,
  type MethodFamily,
} from "@/i18n/families";
import type { Cup, Milk } from "@/utils/cups";

/** Language, and the transient flags the screens toggle. */
export const useUiStore = defineStore(
  "ui",
  () => {
    const lang = ref<LangCode>("en");
    const t = computed(() => TABLES[lang.value]);

    function setLang(code: LangCode) {
      lang.value = code;
    }

    /* Impact drill-down, reset whenever the cup changes. */
    const level = ref<"cats" | "cat" | "ind">("cats");
    const cat = ref<string | null>(null);
    const ind = ref<string | null>(null);
    const view = ref<"what" | "where">("what");
    const indMore = ref(false);

    /* Disclosures. */
    const why = ref(false);
    const labelKey = ref(false);

    function resetImpacts() {
      level.value = "cats";
      cat.value = null;
      ind.value = null;
      indMore.value = false;
    }

    function openCat(name: string) {
      level.value = "cat";
      cat.value = name;
      ind.value = null;
    }

    function openInd(name: string) {
      level.value = "ind";
      ind.value = name;
      indMore.value = false;
    }

    function backToCats() {
      level.value = "cats";
      cat.value = null;
      ind.value = null;
    }

    function backToCat() {
      level.value = "cat";
      ind.value = null;
      indMore.value = false;
    }

    /* Translation of the data's own vocabulary. */
    const catL = (name: string) => t.value.cats[name] ?? name;
    const ingL = (name: string) => t.value.ing[name] ?? name;
    const stageL = (name: string) => t.value.stage[name] ?? name;

    /**
     * Indicator names and texts come from the data files, in English only.
     * A missing translation keeps the English text, so a new indicator shows
     * up untranslated instead of breaking the screen.
     */
    const indL = (name: string) => t.value.indicator[name.toLowerCase()] ?? name;

    /** `english` is the definition read from impacts_definitions.csv. */
    function indDefL(name: string, unit: string, english: string): string {
      const own = t.value.indicatorDef[name.toLowerCase()];
      if (own) return own;
      for (const key of Object.keys(DEF_FAMILIES) as DefFamily[]) {
        const make = t.value.defFamily[key];
        if (make && DEF_FAMILIES[key].test(english)) return make(indL(name), unit);
      }
      return english;
    }

    /** Same thing for the "how this becomes francs" text. */
    function indMethodL(name: string, english: string): string {
      const own = t.value.indicatorMethod[name.toLowerCase()];
      if (own) return own;
      for (const key of Object.keys(METHOD_FAMILIES) as MethodFamily[]) {
        const text = t.value.methodFamily[key];
        if (text && METHOD_FAMILIES[key].test(english)) return text;
      }
      return english;
    }

    const milkL = (m: Milk | null) => (m ? (t.value.milk[m] ?? m) : t.value.noMilk);

    /** "Cappuccino, oat milk". The milk keeps its case in German. */
    function cupL(cup: Cup): string {
      if (!cup.milk) return cup.drink;
      const m = milkL(cup.milk);
      return cup.drink + ", " + (t.value.lowerNouns ? m.toLowerCase() : m);
    }

    return {
      lang,
      t,
      setLang,
      level,
      cat,
      ind,
      view,
      indMore,
      why,
      labelKey,
      resetImpacts,
      openCat,
      openInd,
      backToCats,
      backToCat,
      catL,
      ingL,
      stageL,
      indL,
      indDefL,
      indMethodL,
      milkL,
      cupL,
    };
  },
  { persist: { key: "tc-lang", paths: ["lang"] } }
);
