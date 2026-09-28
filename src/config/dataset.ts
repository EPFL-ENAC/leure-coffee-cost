import { computed, ref } from "vue";

// One deployment shows one dataset. The dataset name comes from ./config.json,
// which nginx serves from the DATASET env variable in the container.
export type DatasetId = "epfl" | "olma";

export type DatasetTexts = {
  intro: string;
  choiceTitle: string;
  partners: string[];
  contributors: string[];
};

const DEFAULT_DATASET: DatasetId = "epfl";

const texts: Record<DatasetId, DatasetTexts> = {
  epfl: {
    intro: "Select a coffee and its sale point to visualize its hidden costs!",
    choiceTitle: "Select labels & sale point :",
    partners: [
      "LEUrE (EPFL)",
      "RESCO (EPFL restaurants, shops, hotels)",
      "ENAC-IT-4-Research (EPFL)",
    ],
    contributors: ["Compass Group", "Dallmayr"],
  },
  olma: {
    intro: "Select a coffee and its origin to visualize its hidden costs!",
    choiceTitle: "Select labels & origin :",
    // TODO: confirm the partner list for OLMA with LEUrE
    partners: ["LEUrE (EPFL)", "ENAC-IT-4-Research (EPFL)"],
    contributors: [],
  },
};

const dataset = ref<DatasetId>(DEFAULT_DATASET);

export const datasetTexts = computed<DatasetTexts>(() => texts[dataset.value]);

const isKnown = (value: unknown): value is DatasetId =>
  typeof value === "string" && value in texts;

let loading: Promise<DatasetId> | null = null;

// Resolves once, then every caller gets the same dataset name
export const loadDataset = (): Promise<DatasetId> => {
  if (loading) return loading;

  loading = (async () => {
    // Handy in dev to look at the other dataset: ?dataset=olma
    if (import.meta.env.DEV) {
      const asked = new URLSearchParams(window.location.search).get("dataset");
      if (isKnown(asked)) {
        dataset.value = asked;
        return asked;
      }
    }

    try {
      const response = await fetch("./config.json");
      const config = await response.json();
      if (isKnown(config?.dataset)) dataset.value = config.dataset;
      else console.warn("Unknown dataset in config.json:", config?.dataset);
    } catch (error) {
      console.error("Failed to load config.json:", error);
    }
    return dataset.value;
  })();

  return loading;
};

export const dataUrl = async (path: string) =>
  `./data/${await loadDataset()}/${path}`;
