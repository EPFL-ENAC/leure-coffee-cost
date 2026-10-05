// One deployment shows one dataset. The same build serves every dataset, only
// public/data/<id>/ and a few texts change. The dataset name comes from
// config.json: public/config.json for the dev server and GitHub Pages, and
// nginx writes it from the DATASET env variable in the container.

import type { CoffeeData } from "@/utils/coffeeData";
import { readEpflRow, readOlmaRow, type RowParts } from "@/utils/cups";
import { slug } from "@/utils/format";

export type DatasetId = "epfl" | "olma";

export type Dataset = {
  id: DatasetId;
  /** Sale points, in the order the app offers them. The first is the default. */
  salePoints: string[];
  /** Shown after the sale point in the header, "Le Klee · EPFL". */
  place: string | null;
  /** Shown in the header instead of the sale point id. The id stays in the URL. */
  labels?: Record<string, string>;
  /** Reads sale point, drink, bean and milk out of one CSV row. */
  readRow: (row: CoffeeData) => RowParts;
};

const DATASETS: Record<DatasetId, Dataset> = {
  epfl: {
    id: "epfl",
    salePoints: ["Le Klee", "Dallmayr", "Compass Machine"],
    place: "EPFL",
    readRow: readEpflRow,
  },
  olma: {
    id: "olma",
    salePoints: ["OLMA"],
    place: null,
    labels: { OLMA: 'OLMA 2026 - "True Cost of Food" Project' },
    readRow: readOlmaRow,
  },
};

const DEFAULT_DATASET: DatasetId = "epfl";

function isKnown(value: unknown): value is DatasetId {
  return typeof value === "string" && value in DATASETS;
}

let current: Dataset = DATASETS[DEFAULT_DATASET];

/** The dataset of this deployment. Set once by loadDataset, before the app mounts. */
export const dataset = (): Dataset => current;

export const defaultSalePoint = (): string => current.salePoints[0];

export function salePointFromSlug(s: string): string | null {
  return current.salePoints.find((p) => slug(p) === s) ?? null;
}

export const salePointLabel = (sp: string): string => current.labels?.[sp] ?? sp;

/**
 * Reads config.json. main.ts waits for it before mounting, so every data URL
 * and the "/" redirect already know the dataset.
 */
export async function loadDataset(): Promise<Dataset> {
  // Handy in dev to look at the other dataset: ?dataset=olma. The first
  // redirect drops the query, so the tab keeps it until it is closed.
  if (import.meta.env.DEV) {
    const asked =
      new URLSearchParams(window.location.search).get("dataset") ??
      sessionStorage.getItem("dataset");
    if (isKnown(asked)) {
      sessionStorage.setItem("dataset", asked);
      current = DATASETS[asked];
      return current;
    }
  }

  try {
    const base = import.meta.env.BASE_URL || "/";
    const response = await fetch(base + "config.json", { cache: "no-store" });
    const config: { dataset?: unknown } = await response.json();
    const id = config?.dataset;
    if (isKnown(id)) current = DATASETS[id];
    else console.warn("Unknown dataset in config.json:", id);
  } catch (error) {
    console.error("Failed to load config.json:", error);
  }
  return current;
}
