// Raw shapes of the files under public/data/.

/** milkType as the CSV spells it. */
export enum MilkType {
  NONE = "none",
  DAIRY = "Cow milk",
  ALMOND = "Almond milk",
  SOY = "Soya milk",
  OAT = "Oat milk",
}

/** One row of public/data/coffee_data.csv. */
export type CoffeeData = {
  serveId: string;
  recipeId: string;
  retailName: string;
  retailPrice: number;
  hiddenCost: number;
  offsetting: number;
  truePrice: number;
  priceWithoutTax: number;
  valueAddedTax: number;
  smartValueAddedTax: number;
  smartPricingRounded: number;
  labels: string[];
  isDecaf: boolean;
  hasMilk: boolean;
  milkType: string | null;
  coffeeDetails: string;
};

/** One row of public/data/impacts_definitions.csv, headers camelised. */
export type ImpactDefinition = {
  indicator: string;
  unit: string;
  indicatorDefinition: string;
  monetisationMethod: string;
};

/** One indicator inside an impact row. */
export type ImpactDetail = {
  indicators: string;
  unit: string;
  impactValue: number;
  costValue: number;
  reference: string;
};

/** One row of public/data/impacts/<slug>.json, and of the sugar files. */
export type Impact = {
  stage: string;
  ingredient: string;
  impactCategory: string;
  impactValue: number;
  costValue: number;
  details: ImpactDetail[];
};

export const labelImages: Map<string, string> = new Map([
  ["eu-organic", "organic.jpg"],
  ["via-verde", "viaverde.png"],
  ["fairtrade", "fairtrade.svg"],
  ["rainforest-alliance", "rainforest.png"],
  ["blue-planet", "blueplanet.png"],
]);

export const labelNames: Map<string, string> = new Map([
  ["fairtrade", "Fairtrade"],
  ["eu-organic", "EU Organic"],
  ["via-verde", "Via Verde"],
  ["blue-planet", "Blue Planet"],
  ["rainforest-alliance", "Rainforest Alliance"],
]);

/** The stage that carries the offsetting rows. Their cost is negative. */
export const OFFSET_STAGE = "Offsetting schemes";
