import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { dataset } from "@/config/dataset";
import { TABLES, type LangCode } from "@/i18n";
import olma from "@/i18n/olma";
import {
  DEF_FAMILIES,
  METHOD_FAMILIES,
  type DefFamily,
  type MethodFamily,
} from "@/i18n/families";
import { useCoffeeStore } from "@/stores/coffeeStore";
import { labelNames } from "@/utils/coffeeData";
import type { Bean, Cup, Milk } from "@/utils/cups";

/** Language, and the transient flags the screens toggle. */
export const useUiStore = defineStore(
  "ui",
  () => {
    const lang = ref<LangCode>("en");
    // OLMA changes a few texts, EPFL uses the tables as they are.
    const t = computed(() =>
      dataset().id === "olma" ? { ...TABLES[lang.value], ...olma[lang.value] } : TABLES[lang.value]
    );

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

    /** Label name in the current language, then the English one, then the id. */
    const labelL = (id: string) => t.value.labelName[id] ?? labelNames.get(id) ?? id;

    /** Short drink text. Falls back to the English text of the CSV. */
    const blurbL = (cup: Cup) => t.value.drinkBlurb[cup.recipeId] ?? cup.blurb;

    /** "Fairtrade, Brazil" becomes "Fairtrade, Brésil", word by word. */
    const beanL = (bean: Bean) =>
      bean
        .split(", ")
        .map((word) => t.value.beanWord?.[word] ?? word)
        .join(", ");

    const milkL = (m: Milk | null) => (m ? (t.value.milk[m] ?? m) : t.value.noMilk);

    /**
     * "Cappuccino, oat milk". The milk keeps its case in German. The bean is
     * named only when the drink comes with several beans at that sale point,
     * "Café Blue Planet" or "Café Fairtrade, Brazil".
     */
    function cupL(cup: Cup): string {
      const coffee = useCoffeeStore();
      const name =
        cup.bean && coffee.hasBeanChoice(cup.salePoint, cup.drink, 2)
          ? cup.drink + " " + beanL(cup.bean)
          : cup.drink;
      if (!cup.milk) return name;
      const m = milkL(cup.milk);
      return name + ", " + (t.value.lowerNouns ? m.toLowerCase() : m);
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
      beanL,
      cupL,
      labelL,
      blurbL,
    };
  },
  { persist: { key: "tc-lang", paths: ["lang"] } }
);
