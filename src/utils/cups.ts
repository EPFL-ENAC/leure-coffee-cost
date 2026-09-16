// Turns the raw CSV rows and impact files into the "cup" shape the screens use.
//
// Two things the CSV does not carry as columns are recovered here: the sale
// point and the bean brand. Both are readable from serveId and retailName, but
// only with explicit tables, not regex guesses. Adding real columns in
// data_processing/ is the proper fix, this is the layer that lets us wait.

import {
  type CoffeeData,
  type Impact,
  OFFSET_STAGE,
} from "@/utils/coffeeData";
import { slug } from "@/utils/format";

/** Bean brands, as they appear at the end of the first serveId segment. */
export const BEAN_BRANDS = ["Blue Planet", "Via Verde"] as const;
export type Bean = (typeof BEAN_BRANDS)[number];

/** Milk keys used everywhere in the app and in the i18n tables. */
export type Milk = "Cow" | "Lactose-free cow" | "Oat" | "Almond" | "Soy";

/** Middle serveId segments, which is the only place the variant shows. */
const MILK_VARIANTS: Record<string, Milk> = {
  "lait d'amande": "Almond",
  "lait d'avoine": "Oat",
  "lait de soja": "Soy",
  "sans-lactose": "Lactose-free cow",
};

/** Fallback when there is no middle segment: the milkType column. */
const MILK_COLUMN: Record<string, Milk> = {
  "Cow milk": "Cow",
  "Almond milk": "Almond",
  "Oat milk": "Oat",
  "Soya milk": "Soy",
};

/** Milk options, in the order the i18n tables list them. */
export const MILKS: Milk[] = ["Cow", "Lactose-free cow", "Oat", "Almond", "Soy"];

export function beanFromSlug(s: string): Bean | null {
  return BEAN_BRANDS.find((b) => slug(b) === s) ?? null;
}

export function milkFromSlug(s: string): Milk | null {
  return MILKS.find((m) => slug(m) === s) ?? null;
}

/** Sale points, in the order the app offers them. */
export const SALE_POINTS = ["Le Klee", "Dallmayr", "Compass Machine"] as const;
export type SalePoint = (typeof SALE_POINTS)[number];
export const DEFAULT_SALE_POINT: SalePoint = "Le Klee";

export function salePointFromSlug(s: string): SalePoint | null {
  return SALE_POINTS.find((p) => slug(p) === s) ?? null;
}

/** The file name rule used by public/data/impacts/ and public/data/sugar/. */
export function fileSlug(serveId: string): string {
  return serveId.toLowerCase().replaceAll(" ", "_").replaceAll(",", "");
}

export type Cup = {
  /** URL slug of serveId, unique across the whole dataset. */
  id: string;
  serveId: string;
  salePoint: string;
  /** Drink name without the bean brand, e.g. "Cappuccino Vanille". */
  drink: string;
  recipeId: string;
  bean: Bean | null;
  milk: Milk | null;
  /** Base name of the SVG under public/coffee/. */
  icon: string;
  retailPrice: number;
  hiddenCost: number;
  offsetting: number;
  truePrice: number;
  labels: string[];
  blurb: string;
};

export type Ind = { n: string; u: string; p: number; c: number };
export type StageNode = { name: string; cost: number; inds: Ind[] };
export type CatNode = { name: string; cost: number; stages: StageNode[] };
export type IngNode = { name: string; cost: number; cats: CatNode[] };
export type OffsetRow = { n: string; u: string; p: number; c: number; ing: string };

export type FullCup = Cup & {
  byCat: Record<string, number>;
  tree: IngNode[];
  offsetDetail: OffsetRow[];
};

export type SugarLevel = {
  key: string;
  cost: number;
  cats: CatNode[];
};

/** Splits "Cappuccino Vanille Via Verde, lait d'avoine, Le Klee". */
export function parseServeId(serveId: string): {
  first: string;
  middles: string[];
  salePoint: string;
} {
  const segs = serveId.split(",").map((s) => s.trim());
  return {
    first: segs[0] ?? "",
    middles: segs.slice(1, -1),
    salePoint: segs.length > 1 ? (segs[segs.length - 1] ?? "") : "",
  };
}

/** Bean brand and drink name, from the first segment then from retailName. */
export function beanAndDrink(row: CoffeeData): { bean: Bean | null; drink: string } {
  const { first } = parseServeId(row.serveId);
  for (const b of BEAN_BRANDS) {
    if (first.endsWith(" " + b)) {
      return { bean: b, drink: first.slice(0, first.length - b.length - 1) };
    }
  }
  const fromName = BEAN_BRANDS.find((b) => (row.retailName || "").includes(b));
  return { bean: fromName ?? null, drink: first };
}

export function milkOf(row: CoffeeData): Milk | null {
  const { middles } = parseServeId(row.serveId);
  for (const m of middles) {
    const hit = MILK_VARIANTS[m];
    if (hit) return hit;
  }
  const col = row.milkType;
  if (!col || col === "none") return null;
  return MILK_COLUMN[col] ?? null;
}

/** One CSV row becomes a cup. The tree is loaded later, on demand. */
export function buildCup(row: CoffeeData): Cup {
  const { bean, drink } = beanAndDrink(row);
  const { salePoint } = parseServeId(row.serveId);
  return {
    id: slug(row.serveId),
    serveId: row.serveId,
    salePoint,
    drink,
    recipeId: row.recipeId,
    bean,
    milk: milkOf(row),
    icon: drink.replaceAll(" ", "_"),
    retailPrice: row.retailPrice,
    hiddenCost: row.hiddenCost,
    offsetting: row.offsetting,
    truePrice: row.truePrice,
    // The CSV repeats a label sometimes, keep one of each.
    labels: Array.isArray(row.labels) ? [...new Set(row.labels)] : [],
    blurb: row.coffeeDetails || "",
  };
}

function indsOf(rows: Impact["details"]): Ind[] {
  return rows
    .filter((d) => d.costValue !== 0)
    .map((d) => ({ n: d.indicators, u: d.unit, p: d.impactValue, c: d.costValue }))
    .sort((a, b) => b.c - a.c);
}

/**
 * ingredient -> impact category -> life-cycle stage -> indicators.
 * Offsetting rows are left out, they are given back, not spent.
 */
export function buildTree(impacts: Impact[]): IngNode[] {
  const ings = new Map<string, IngNode>();
  for (const row of impacts) {
    if (row.stage === OFFSET_STAGE) continue;
    let ing = ings.get(row.ingredient);
    if (!ing) {
      ing = { name: row.ingredient, cost: 0, cats: [] };
      ings.set(row.ingredient, ing);
    }
    let cat = ing.cats.find((c) => c.name === row.impactCategory);
    if (!cat) {
      cat = { name: row.impactCategory, cost: 0, stages: [] };
      ing.cats.push(cat);
    }
    const stage: StageNode = {
      name: row.stage,
      cost: row.costValue,
      inds: indsOf(row.details ?? []),
    };
    cat.stages.push(stage);
    cat.cost += stage.cost;
    ing.cost += stage.cost;
  }
  const tree = [...ings.values()];
  for (const ing of tree) {
    ing.cats.sort((a, b) => b.cost - a.cost);
    for (const cat of ing.cats) cat.stages.sort((a, b) => b.cost - a.cost);
  }
  return tree.sort((a, b) => b.cost - a.cost);
}

export function buildByCat(tree: IngNode[]): Record<string, number> {
  const byCat: Record<string, number> = {};
  for (const ing of tree) {
    for (const cat of ing.cats) {
      byCat[cat.name] = (byCat[cat.name] ?? 0) + cat.cost;
    }
  }
  return byCat;
}

/** The offsetting rows, flattened. Their cost is negative. */
export function buildOffsetDetail(impacts: Impact[]): OffsetRow[] {
  const rows: OffsetRow[] = [];
  for (const row of impacts) {
    if (row.stage !== OFFSET_STAGE) continue;
    for (const d of row.details ?? []) {
      if (d.costValue >= 0) continue;
      rows.push({
        n: d.indicators,
        u: d.unit,
        p: d.impactValue,
        c: d.costValue,
        ing: row.ingredient,
      });
    }
  }
  return rows.sort((a, b) => a.c - b.c);
}

export function buildFullCup(cup: Cup, impacts: Impact[]): FullCup {
  const tree = buildTree(impacts);
  return {
    ...cup,
    tree,
    byCat: buildByCat(tree),
    offsetDetail: buildOffsetDetail(impacts),
  };
}

/** The sugar files hold the same rows, under the ingredient "Sugarbeet". */
export function buildSugarLevel(key: string, impacts: Impact[]): SugarLevel {
  const tree = buildTree(impacts);
  const cats = new Map<string, CatNode>();
  for (const ing of tree) {
    for (const cat of ing.cats) {
      const hit = cats.get(cat.name);
      if (hit) {
        hit.cost += cat.cost;
        hit.stages.push(...cat.stages);
      } else {
        cats.set(cat.name, { name: cat.name, cost: cat.cost, stages: [...cat.stages] });
      }
    }
  }
  const list = [...cats.values()].sort((a, b) => b.cost - a.cost);
  return {
    key,
    cost: list.reduce((t, c) => t + c.cost, 0),
    cats: list,
  };
}
