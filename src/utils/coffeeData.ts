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

// export const milkName: Map<MilkType, string> = new Map([
//   [MilkType.NONE, "none"],
//   [MilkType.DAIRY, "Dairy"],
//   [MilkType.ALMOND, "Almond"],
//   [MilkType.SOY, "Soy"],
//   [MilkType.CLF, "Lactose-free cow"],
//   [MilkType.OAT, "Oat"],
// ]);

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
  definition: string;
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
  ingredient: string;
  ingredientId: string;
  details: ImpactDetail[];
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

export type LeafSunburst = CoffeeImpactData & {
  name: string;
  value: number;
};

export type LayerSunburst = {
  name: string;
  value: number;
  children: LeafSunburst[];
};

export type RootSunburst = {
  name: string;
  value: number;
  children: LayerSunburst[];
};

const recursiveSum = (node: any, depth: number) => {
  if (node.children) {
    // console.log("Node.children", node.children);

    if (!Array.isArray(node.children))
      node.children = Object.values(node.children);

    node.value = node.children.reduce(
      (sum: any, child: any) => sum + recursiveSum(child, depth - 1),
      0
    );

    if (depth <= 0) delete node.children;
  }

  return node.value || 0;
};

export type SunburstNode = RootSunburst | LayerSunburst | LeafSunburst;

// Function to generate sunburstData split by stage from a CoffeeImpactData object
export function generateSunburstData(
  impacts: CoffeeImpactData[],
  definitions: ImpactDefinition[],
  depth: number = 10
): RootSunburst {
  // Object to store sunburst data for each stage

  console.log("GenerateSunburstData", impacts, definitions, depth);
  const sunburstData: any = {
    value: 0,
    name: "Coffee",
    children: {},
  };

  // Validate impacts
  if (!impacts || !Array.isArray(impacts)) {
    console.warn("No impacts data available.");
    return sunburstData;
  }

  // Iterate through each impact in the CoffeeImpactData
  impacts
    .filter((d) => d.impactValue > 0)
    .forEach((impact) => {
      const { impactCategory, ingredient, details, stage } = impact;

      // Ensure we have valid data
      if (!stage) {
        console.warn(
          `No stage available for impactCategory: ${impactCategory}`
        );
        return;
      }
      if (!ingredient) {
        console.warn(
          `No ingredient available for impactCategory: ${impactCategory}`
        );
        return;
      }
      if (!details || !Array.isArray(details)) {
        console.warn(`No details available for category: ${impactCategory}`);
        return;
      }

      // If the ingredient doesn't exist yet in sunburstData, create a new RootSunburst for it
      if (!sunburstData.children[ingredient]) {
        sunburstData.children[ingredient] = {
          value: 0,
          name: ingredient,
          children: {},
        };
      }

      if (!sunburstData.children[ingredient].children[impactCategory]) {
        sunburstData.children[ingredient].children[impactCategory] = {
          value: 0,
          name: impactCategory,
          children: {},
        };
      }

      if (
        !sunburstData.children[ingredient].children[impactCategory].children[
          stage
        ]
      ) {
        sunburstData.children[ingredient].children[impactCategory].children[
          stage
        ] = {
          value: 0,
          name: stage,
          children: [],
        };
      }

      // Iterate through each detail within the impact
      details.forEach((detail) => {
        const value = isNaN(detail.costValue) ? 0 : detail.costValue;
        sunburstData.children[ingredient].children[impactCategory].children[
          stage
        ].children.push({
          ...detail,
          name: detail.indicators,
          definition:
            definitions.find((d) => d.indicator === detail.indicators)
              ?.indicatorDefinition ?? "",
          value,
        });
      });
    });

  recursiveSum(sunburstData, depth);

  return sunburstData;
}
