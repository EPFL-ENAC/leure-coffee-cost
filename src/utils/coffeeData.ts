// Define enums for better type safety
export enum MilkType {
  NONE = "none",
  COW = "cow",
  ALMOND = "almond",
  SOY = "soy",
  CLF = "clf",
  OAT = "oat",
  // Add more as needed
}

export const milkName: Map<MilkType, string> = new Map([
  [MilkType.NONE, "None"],
  [MilkType.COW, "Cow"],
  [MilkType.ALMOND, "Almond"],
  [MilkType.SOY, "Soy"],
  [MilkType.CLF, "Lactose-free cow"],
  [MilkType.OAT, "Oat"],
]);

export enum Recipe {
  RIS = "ris",
  ESP = "esp",
  CAF = "caf",
  CAP = "cap",
  REN = "ren",
  LAMA = "lama",
  RENV = "renv",
  MOC = "moc",
  CAPVA = "capva",
  LATMAC = "latmac",
  LATMACVA = "latmacva",
  ESPMOC = "espmoc",
  CAFMOC = "cafmoc",
  SUG = "sug",
}

export type CoffeeData = {
  serveId: string;
  recipeId: string;
  retailName: string;
  salePointId: string;
  coffeeDetails: string;
  unit: string;
  marketPrice: number;
  trueCost: number | null;
  truePrice: number | null;
  isDecaf: boolean;
  hasMilk: boolean;
  milkType: string | null;
  mainRecipe: Recipe;
};

export const recipeDetails: Map<string, { name: string; img: string }> =
  new Map([
    ["ris", { name: "Ristretto", img: "Ristretto.svg" }],
    ["esp", { name: "Espresso", img: "Espresso.svg" }],
    ["caf", { name: "Café", img: "Café.svg" }],
    ["cap", { name: "Cappuccino", img: "Cappuccino.svg" }],
    ["ren", { name: "Renversé", img: "Renversé.svg" }],
    ["lama", { name: "Latte Macchiato", img: "Latte_Macchiato.svg" }],
    ["renv", { name: "Renversé", img: "Renversé.svg" }],
    ["moc", { name: "Mocaccino", img: "Mocaccino.svg" }],
    ["capva", { name: "Cappuccino vanille", img: "Cappuccino_vanille.svg" }],
    ["latmac", { name: "Latte Macchiato", img: "Latte_Macchiato.svg" }],
    [
      "latmacva",
      {
        name: "Latte Macchiato vanille",
        img: "Latte_Macchiato_vanille.svg",
      },
    ],
    ["espmoc", { name: "Espresso Macchiato", img: "Espresso_Macchiato.svg" }],
    ["cafmoc", { name: "Café Macchiato", img: "Café_Macchiato.svg" }],
  ]);

export const salePointDetails = new Map<
  string,
  {
    country: string;
    organisation: string;
    provider: string;
    salePoint: string;
    type: string;
    name: string;
  }
>([
  [
    "ch-epfl-klee",
    {
      country: "Switzerland",
      organisation: "EPFL",
      provider: "Compass Group",
      salePoint: "Le Klee",
      type: "Cafeteria",
      name: "EPFL Compass Group Le Klee Cafeteria",
    },
  ],
  [
    "ch-epfl-vm#1",
    {
      country: "Switzerland",
      organisation: "EPFL",
      provider: "Compass Group",
      salePoint: "Rolex centre",
      type: "Vending-machine",
      name: "EPFL Compass Group Rolex centre Vending-machine 1",
    },
  ],
  [
    "ch-epfl-vm#2",
    {
      country: "Switzerland",
      organisation: "EPFL",
      provider: "Dallmayr",
      salePoint: "Rolex centre",
      type: "Vending-machine",
      name: "EPFL Dallmayr Rolex centre Vending-machine 2",
    },
  ],
  [
    "ch-epfl-vm#3",
    {
      country: "Switzerland",
      organisation: "EPFL",
      provider: "Dallmayr",
      salePoint: "Rolex centre",
      type: "Vending-machine",
      name: "EPFL Dallmayr Rolex centre Vending-machine 3",
    },
  ],
]);

export type ImpactDetail = {
  indicators: string;
  unit: string;
  impactValue: number;
  costValue: number;
  impactDefinition: string;
  reference: string;
};

export type Impact = {
  stage: string;
  impactCategory: string;
  impactValue: number;
  costValue: number;
  details: ImpactDetail[];
};

export type CoffeeImpactData = {
  serveId: string;
  salePointId: string;
  productId: string;
  productName: string;
  recipe: number;
  impacts: Impact[];
  stage: string;
  impactCategory: string;
  indicators: string;
  unit: string;
  impactValue: number;
  costValue: number;
  impactDefinition: string;
  coffeeDetails: string;
  reference: string;
};

export type Leaf = CoffeeImpactData & {
  name: string;
  value: number;
};

export type Layer = {
  name: string;
  value: number;
  children: Leaf[];
};

export type Root = {
  name: string;
  value: number;
  children: Layer[];
};

export type SunburstNode = Root | Layer | Leaf;
// Function to generate sunburstData split by stage from a CoffeeImpactData object
export function generateSunburstData(
  data: CoffeeImpactData
): Record<string, Root> {
  console.log("Generating sunburst data by stage for", data);

  // Object to store sunburst data for each stage
  const sunburstDataByStage: Record<string, Root> = {};

  // Validate impacts
  if (!data.impacts || !Array.isArray(data.impacts)) {
    console.warn("No impacts data available.");
    return sunburstDataByStage;
  }

  // Iterate through each impact in the CoffeeImpactData
  data.impacts
    .filter((d) => d.impactValue > 0)
    .forEach((impact) => {
      const { impactCategory, details, stage } = impact;

      // Ensure we have a valid stage and details
      if (!stage) {
        console.warn(
          `No stage available for impactCategory: ${impactCategory}`
        );
        return;
      }
      if (!details || !Array.isArray(details)) {
        console.warn(`No details available for category: ${impactCategory}`);
        return;
      }

      // If the stage doesn't exist yet in sunburstDataByStage, create a new Root for it
      if (!sunburstDataByStage[stage]) {
        sunburstDataByStage[stage] = {
          value: 0,
          name: stage,
          children: [],
        };
      }

      // Record to keep track of categories within this stage
      const categories: Record<string, Layer> = {};

      // Iterate through each detail within the impact
      details.forEach((detail) => {
        const impactVal = isNaN(detail.costValue) ? 0 : detail.costValue;

        // If the category doesn't exist for this stage, create it
        if (!categories[impactCategory]) {
          categories[impactCategory] = {
            name: impactCategory,
            value: 0,
            children: [],
          };
          sunburstDataByStage[stage].children.push(categories[impactCategory]);
        }

        const category = categories[impactCategory];

        // Check if the indicator already exists within the category
        const existingLeaf = category.children.find(
          (child: Leaf) => child.name === detail.indicators
        );

        if (existingLeaf) {
          // If it exists, update its value
          existingLeaf.value += impactVal;
          category.value += impactVal;
        } else {
          // If not, create a new Leaf
          const newLeaf: any = {
            name: detail.indicators,
            value: impactVal,
            indicators: detail.indicators,
            unit: detail.unit,
            impactValue: detail.impactValue,
            costValue: detail.costValue,
            impactDefinition: detail.impactDefinition,
            reference: detail.reference || "", // Default to empty string if reference is missing
          };
          category.children.push(newLeaf);
          category.value += impactVal;
        }
      });

      // Update the total value for this stage
      sunburstDataByStage[stage].value = sunburstDataByStage[
        stage
      ].children.reduce((sum, layer) => sum + layer.value, 0);
    });

  console.log("Generated sunburst data by stage", sunburstDataByStage);
  return sunburstDataByStage;
}
