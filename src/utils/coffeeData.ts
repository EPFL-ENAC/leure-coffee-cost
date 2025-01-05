// Define enums for better type safety
export enum MilkType {
  NONE = "none",
  DAIRY = "dairy",
  ALMOND = "almond",
  SOY = "soy",
  CLF = "clf",
  OAT = "oat",
  // Add more as needed
}

export const milkName: Map<MilkType, string> = new Map([
  [MilkType.NONE, "none"],
  [MilkType.DAIRY, "Dairy"],
  [MilkType.ALMOND, "Almond"],
  [MilkType.SOY, "Soy"],
  [MilkType.CLF, "Lactose-free cow"],
  [MilkType.OAT, "Oat"],
]);

export enum Recipe {
  RIS = "Ristretto",
  ESP = "Espresso",
  CAF = "Café",
  CAP = "Cappuccino",
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
  retailPrice: number;
  hiddenCost: number;
  truePrice: number;
  labels: string[];
  isDecaf: boolean;
  hasMilk: boolean;
  milkType: string | null;
  coffeeDetails: string;
};

export const labelImages: Map<string, string> = new Map([
  ["Organic", "organic.jpg"],
  ["Fair Trade", "fairtrade.svg"],
  ["Rainforest Alliance", "rainforest.png"],
  ["Blue Planet", "blueplanet.png"],
]);

export type ImpactDefinition = {
  indicator: string;
  unit: string;
  indicatorDefinition: string;
  monetisationMethod: string;
};

export type ImpactDetail = {
  indicators: string;
  unit: string;
  impactValue: number;
  costValue: number;
  reference: string;
};

export type Impact = {
  stage: string;
  ingredient: string;
  ingredientID: string;
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
  data: CoffeeImpactData,
  definitions: ImpactDefinition[]
): Record<string, Root> {
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
            impactDefinition: definitions.find(
              (d) => d.indicator == detail.indicators
            ),
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

  return sunburstDataByStage;
}
