// Reading helpers over a cup's impact tree. Ported from the prototype.

import type { CatNode, FullCup, IngNode, SugarLevel } from "@/utils/cups";

/** The tree node name the sugar cats are folded under. */
export const SUGAR_NODE = "Sugar";

/** Adds the chosen sugar level on top of a cup, without touching the original. */
export function withSugar(cup: FullCup, level: SugarLevel | null): FullCup {
  if (!level || !(level.cost > 0)) return cup;
  const byCat = { ...cup.byCat };
  for (const c of level.cats) {
    byCat[c.name] = (byCat[c.name] ?? 0) + c.cost;
  }
  const sugarNode: IngNode = {
    name: SUGAR_NODE,
    cost: level.cost,
    cats: level.cats as CatNode[],
  };
  return {
    ...cup,
    byCat,
    tree: [...cup.tree, sugarNode],
    hiddenCost: cup.hiddenCost + level.cost,
    truePrice: cup.truePrice + level.cost,
  };
}

export type MergedIndicator = {
  name: string;
  cost: number;
  phys: number;
  unit: string;
  /** Same indicator reported in two units, so the physical sum means nothing. */
  mixed: boolean;
  byProduct: Record<string, number>;
  byStage: Record<string, number>;
};

/** Every indicator inside one impact category, summed across ingredients. */
export function mergedIndicators(cup: FullCup, catName: string): MergedIndicator[] {
  const byName = new Map<string, MergedIndicator>();
  for (const ing of cup.tree) {
    const node = ing.cats.find((c) => c.name === catName);
    if (!node) continue;
    for (const st of node.stages) {
      for (const x of st.inds) {
        let e = byName.get(x.n);
        if (!e) {
          e = {
            name: x.n,
            cost: 0,
            phys: 0,
            unit: x.u,
            mixed: false,
            byProduct: {},
            byStage: {},
          };
          byName.set(x.n, e);
        }
        e.cost += x.c;
        e.phys += x.p;
        if (e.unit !== x.u) e.mixed = true;
        e.byProduct[ing.name] = (e.byProduct[ing.name] ?? 0) + x.c;
        e.byStage[st.name] = (e.byStage[st.name] ?? 0) + x.c;
      }
    }
  }
  return [...byName.values()].sort((a, b) => b.cost - a.cost);
}

export type ProductRow = { name: string; cost: number; topStage: string };

/** The same category, split by ingredient instead of by indicator. */
export function productRows(cup: FullCup, catName: string): ProductRow[] {
  const rows: ProductRow[] = [];
  for (const ing of cup.tree) {
    const node = ing.cats.find((c) => c.name === catName);
    if (!node) continue;
    const stages = [...node.stages].sort((a, b) => b.cost - a.cost);
    rows.push({
      name: ing.name,
      cost: node.cost,
      topStage: stages.length ? stages[0].name : "",
    });
  }
  return rows.sort((a, b) => b.cost - a.cost);
}

export type Origin = { share: number | null; ing: string; stage: string };

/** Where an indicator's cost mostly comes from. null share means all of it. */
export function originOf(e: MergedIndicator): Origin | null {
  const ps = Object.entries(e.byProduct).sort((a, b) => b[1] - a[1]);
  const ss = Object.entries(e.byStage).sort((a, b) => b[1] - a[1]);
  if (!ps.length) return null;
  const share = Math.round((ps[0][1] / e.cost) * 100);
  return {
    share: share >= 99 ? null : share,
    ing: ps[0][0],
    stage: ss.length ? ss[0][0] : "",
  };
}

/** Categories worth showing, biggest first. Below 0.004 CHF is noise. */
export function visibleCats(cup: FullCup): { name: string; cost: number }[] {
  return Object.entries(cup.byCat)
    .map(([name, cost]) => ({ name, cost }))
    .filter((c) => c.cost >= 0.004)
    .sort((a, b) => b.cost - a.cost);
}
