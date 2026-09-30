// One place that knows what the URLs look like.
//
// A result URL carries the serveId slug, which already encodes drink, milk and
// sale point, so it can be shared or put behind a QR code.

import type { RouteLocationRaw } from "vue-router";
import type { Bean, Milk } from "@/utils/cups";
import { slug } from "@/utils/format";

export const toDrinks = (sp: string): RouteLocationRaw => ({
  name: "drinks",
  params: { sp: slug(sp) },
});

export const toBean = (sp: string, drink: string): RouteLocationRaw => ({
  name: "bean",
  params: { sp: slug(sp), drink: slug(drink) },
});

export const toMilk = (sp: string, drink: string, bean: Bean | null): RouteLocationRaw => ({
  name: "milk",
  params: { sp: slug(sp), drink: slug(drink) },
  query: bean ? { b: slug(bean) } : {},
});

export const toSugar = (
  sp: string,
  drink: string,
  bean: Bean | null,
  milk: Milk | null
): RouteLocationRaw => ({
  name: "sugar",
  params: { sp: slug(sp), drink: slug(drink) },
  query: {
    ...(bean ? { b: slug(bean) } : {}),
    ...(milk ? { m: slug(milk) } : {}),
  },
});

export const toResult = (sp: string, cupId: string, sugar: number): RouteLocationRaw => ({
  name: "result",
  params: { sp: slug(sp), cup: cupId },
  query: sugar ? { s: String(sugar) } : {},
});

export const toCompare = (
  sp: string,
  cupId: string,
  otherId: string,
  sugar: number
): RouteLocationRaw => ({
  name: "compare",
  params: { sp: slug(sp), cup: cupId, other: otherId },
  query: sugar ? { s: String(sugar) } : {},
});

export const toAll = (sp: string, cupId: string, sugar: number): RouteLocationRaw => ({
  name: "all",
  params: { sp: slug(sp) },
  query: { c: cupId, ...(sugar ? { s: String(sugar) } : {}) },
});

/** Past the coffee step: the milk step, or straight to sugar with one milk or none. */
export const toAfterBean = (
  sp: string,
  drink: string,
  bean: Bean | null,
  milks: Milk[]
): RouteLocationRaw =>
  milks.length > 1 ? toMilk(sp, drink, bean) : toSugar(sp, drink, bean, milks[0] ?? null);

/** Reads a query value that may arrive as an array. */
export function one(v: unknown): string | null {
  if (Array.isArray(v)) return typeof v[0] === "string" ? v[0] : null;
  return typeof v === "string" ? v : null;
}

/** Sugar level index from ?s=, clamped by the caller. */
export function sugarFromQuery(v: unknown): number {
  const s = one(v);
  const n = s ? parseInt(s, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}
