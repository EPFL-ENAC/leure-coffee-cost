import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Papa from "papaparse";
import { dataUrl } from "@/utils/assets";
import {
  type CoffeeData,
  type Impact,
  type ImpactDefinition,
} from "@/utils/coffeeData";
import {
  buildCup,
  buildFullCup,
  buildSugarLevel,
  fileSlug,
  type Bean,
  type Cup,
  type FullCup,
  type Milk,
  type SugarLevel,
} from "@/utils/cups";
import { slug, unescapeCp1252 } from "@/utils/format";

const SUGAR_IDS = [
  "swiss_sugar_default",
  "swiss_sugar_low",
  "swiss_sugar_moderate",
  "swiss_sugar_high",
];

function camelize(str: string) {
  return str
    .replaceAll(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replaceAll(/\s+/g, "");
}

export const useCoffeeStore = defineStore("coffee", () => {
  const rows = ref<CoffeeData[]>([]);
  const sugarLevels = ref<SugarLevel[]>([]);
  const defs = ref<Map<string, ImpactDefinition>>(new Map());
  const loading = ref(true);
  const error = ref<string | null>(null);

  /** Built cups, cheap: no impact file needed. */
  const cups = computed<Cup[]>(() => rows.value.map(buildCup));

  /** Cups with their impact tree, filled in as the files arrive. */
  const full = ref<Record<string, FullCup>>({});
  const pending = new Map<string, Promise<void>>();

  const loadListCoffee = async () => {
    if (rows.value.length) return;
    try {
      const response = await fetch(dataUrl("coffee_data.csv"));
      const csvText = await response.text();
      const parsed = Papa.parse<CoffeeData>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform(value, field) {
          if (field === "labels") {
            if (value === "") return [];
            return value.split("|").filter((d) => d !== "none") ?? [];
          }
          if (
            ["retailPrice", "hiddenCost", "offsetting", "truePrice"].includes(field as string)
          ) {
            return parseFloat(value);
          }
          if (field === "isDecaf" || field === "hasMilk") {
            return value == "True" || value == "true";
          }
          return value;
        },
      });
      rows.value = parsed.data.filter((c) => c.serveId && c.recipeId);
    } catch (e) {
      error.value = String((e as Error)?.message ?? e);
    }
  };

  const loadListSugar = async () => {
    if (sugarLevels.value.length === SUGAR_IDS.length) return;
    const levels = await Promise.all(
      SUGAR_IDS.map(async (id) => {
        const response = await fetch(dataUrl(`sugar/${fileSlug(id)}.json`));
        const json = (await response.json()) as Impact[];
        return buildSugarLevel(id.replace("swiss_sugar_", ""), json);
      })
    );
    sugarLevels.value = levels;
  };

  const loadListImpactDefinitions = async () => {
    if (defs.value.size) return;
    const response = await fetch(dataUrl("impacts_definitions.csv"));
    const csvText = await response.text();
    const parsed = Papa.parse<ImpactDefinition>(csvText, {
      header: true,
      transformHeader: camelize,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform(value, field) {
        if (field === "indicator") return value.toLowerCase();
        return unescapeCp1252(value);
      },
    });
    const map = new Map<string, ImpactDefinition>();
    for (const d of parsed.data) {
      if (d.indicator) map.set(d.indicator, d);
    }
    defs.value = map;
  };

  /** Everything the first screen needs. The impact files come later. */
  const init = async () => {
    loading.value = true;
    try {
      await Promise.all([loadListCoffee(), loadListSugar(), loadListImpactDefinitions()]);
    } catch (e) {
      error.value = String((e as Error)?.message ?? e);
    } finally {
      loading.value = false;
    }
  };

  /** Loads one cup's impact file, once. Safe to call on every render. */
  function loadCup(cup: Cup): Promise<void> {
    if (full.value[cup.id]) return Promise.resolve();
    const running = pending.get(cup.id);
    if (running) return running;
    const p = (async () => {
      try {
        const response = await fetch(dataUrl(`impacts/${fileSlug(cup.serveId)}.json`));
        if (!response.ok) throw new Error("HTTP " + response.status);
        const json = (await response.json()) as Impact[];
        full.value = { ...full.value, [cup.id]: buildFullCup(cup, json) };
      } catch (e) {
        console.error("Failed to load impacts for", cup.serveId, e);
      } finally {
        pending.delete(cup.id);
      }
    })();
    pending.set(cup.id, p);
    return p;
  }

  function loadCups(list: Cup[]): Promise<void[]> {
    return Promise.all(list.map(loadCup));
  }

  const fullCup = (id: string): FullCup | null => full.value[id] ?? null;

  /* ---- selectors ---- */

  const cupById = (id: string): Cup | null => cups.value.find((c) => c.id === id) ?? null;

  /** Drink name behind a URL slug. */
  const drinkFromSlug = (salePoint: string, wanted: string): string | null =>
    cupsAt(salePoint).find((c) => slug(c.drink) === wanted)?.drink ?? null;

  const cupsAt = (salePoint: string): Cup[] =>
    cups.value.filter((c) => c.salePoint === salePoint);

  /** One entry per drink, cheapest first, like the prototype's drink list. */
  const drinksAt = (salePoint: string): Cup[] => {
    const seen = new Set<string>();
    const out: Cup[] = [];
    for (const c of cupsAt(salePoint)) {
      if (seen.has(c.drink)) continue;
      seen.add(c.drink);
      out.push(c);
    }
    return out.sort(
      (a, b) => a.retailPrice - b.retailPrice || a.drink.localeCompare(b.drink)
    );
  };

  /** Beans for a drink: the ones poured here, then the ones served elsewhere. */
  const beansFor = (
    salePoint: string,
    drink: string
  ): { bean: Bean; here: boolean; elsewhere: string[] }[] => {
    const all = cups.value.filter((c) => c.drink === drink && c.bean);
    const byBean = new Map<Bean, Set<string>>();
    for (const c of all) {
      const set = byBean.get(c.bean as Bean) ?? new Set<string>();
      set.add(c.salePoint);
      byBean.set(c.bean as Bean, set);
    }
    return [...byBean.entries()]
      .map(([bean, places]) => ({
        bean,
        here: places.has(salePoint),
        elsewhere: [...places].filter((p) => p !== salePoint).sort(),
      }))
      .sort((a, b) => Number(b.here) - Number(a.here) || a.bean.localeCompare(b.bean));
  };

  /** Every cup of one drink and bean at one sale point, one per milk. */
  const variantsFor = (salePoint: string, drink: string, bean: Bean | null): Cup[] =>
    cupsAt(salePoint).filter((c) => c.drink === drink && c.bean === bean);

  const milksFor = (salePoint: string, drink: string, bean: Bean | null): Milk[] =>
    variantsFor(salePoint, drink, bean)
      .map((c) => c.milk)
      .filter((m): m is Milk => m !== null);

  const defOf = (indicator: string): ImpactDefinition | null =>
    defs.value.get(indicator.toLowerCase()) ?? null;

  return {
    rows,
    cups,
    full,
    sugarLevels,
    defs,
    loading,
    error,

    init,
    loadCup,
    loadCups,
    fullCup,

    cupById,
    cupsAt,
    drinkFromSlug,
    drinksAt,
    beansFor,
    variantsFor,
    milksFor,
    defOf,
  };
});
