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
  mainRecipe: string;
};

// export enum Recipe {
//   ris = "ris",
//   esp = "esp",
//   caf = "caf",
//   cap = "cap",
//   ren = "ren",
//   lama = "lama",
//   renv = "renv",
//   moc = "moc",
//   capva = "capva",
//   latmac = "latmac",
//   latmacva = "latmacva",
//   espmoc = "espmoc",
//   cafmoc = "cafmoc",
//   sug = "sug",
// }

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

export type CoffeeImpactData = {
  retailName: string;
  productId: string;
  productName: string;
  stage: string;
  impactCategory: string;
  indicators: string;
  unit: string;
  recipe: string;
  impactValue: number;
  costValue: number;
  impactDefinition: string;
  coffeeDetails: string;
  reference: string;
};

export const data: CoffeeImpactData[] = [
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Fine particulate matter formation",
    unit: "kg PM2.5 eq",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0032,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Fossil resource scarcity",
    unit: "kg oil eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0037,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Freshwater ecotoxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0016,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Freshwater eutrophication",
    unit: "kg P eq",
    recipe: "2,00",
    impactValue: 0.0000492,
    costValue: 0.0,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Global warming",
    unit: "kg CO2 eq",
    recipe: "2,00",
    impactValue: 0.000492,
    costValue: 0.0163,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Human carcinogenic toxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0009,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Human non-carcinogenic toxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0334,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Ionizing radiation",
    unit: "kBq Co-60 eq",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0004,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Land use",
    unit: "m2a crop eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.016,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Marine ecotoxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0012,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Marine eutrophication",
    unit: "kg N eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Mineral resource scarcity",
    unit: "kg Cu eq",
    recipe: "2,00",
    impactValue: 0.0000492,
    costValue: 0.0001,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Ozone formation, Human health",
    unit: "kg NOx eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0001,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Ozone formation, Terrestrial ecosystems",
    unit: "kg NOx eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0001,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Stratospheric ozone depletion",
    unit: "kg CFC11 eq",
    recipe: "2,00",
    impactValue: 0.0000492,
    costValue: 0.0,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Terrestrial acidification",
    unit: "kg SO2 eq",
    recipe: "2,00",
    impactValue: 0.000369,
    costValue: 0.0002,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Terrestrial ecotoxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0649,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Water consumption",
    unit: "m3",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0023,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Fine particulate matter formation",
    unit: "kg PM2.5 eq",
    recipe: "2,00",
    impactValue: 0.00246,
    costValue: 0.0,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Fossil resource scarcity",
    unit: "kg oil eq",
    recipe: "2,00",
    impactValue: 0.000246,
    costValue: 0.0034,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Freshwater ecotoxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0015,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Freshwater eutrophication",
    unit: "kg P eq",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Global warming",
    unit: "kg CO2 eq",
    recipe: "2,00",
    impactValue: 0.00123,
    costValue: 0.018,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Human carcinogenic toxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.0000738,
    costValue: 0.0008,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Human non-carcinogenic toxicity",
    unit: "kg 1,4-DCB",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.031,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Health",
    indicators: "Ionizing radiation",
    unit: "kBq Co-60 eq",
    recipe: "2,00",
    impactValue: 0.000492,
    costValue: 0.0005,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
  {
    retailName: "Ristretto",
    productId: "cof-braz-ara-conv",
    productName: "Coffee, Brazil, Arabica, none",
    stage: "Cultivation",
    impactCategory: "Environment",
    indicators: "Land use",
    unit: "m2a crop eq",
    recipe: "2,00",
    impactValue: 0.000123,
    costValue: 0.0185,
    impactDefinition: "Impact short definition",
    coffeeDetails: "Name definition",
    reference: "International Coffee Council, MRL",
  },
];

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

// Function to generate sunburstData from the flat data array
export function generateSunburstData(data: CoffeeImpactData[]) {
  const sunburstData: Root = {
    value: 0,
    name: "root",
    children: [],
  };

  const categories: Record<string, Layer> = {};

  data.forEach((item) => {
    const { impactCategory, indicators, impactValue } = item;

    // Check if the category exists, if not, create it
    if (!categories[impactCategory]) {
      categories[impactCategory] = {
        name: impactCategory,
        value: 0,
        children: [],
      };
      sunburstData.children.push(categories[impactCategory]);
    }

    // Find or create the indicator under the current category
    const category = categories[impactCategory];
    const indicator = category.children.find(
      (child: any) => child.name === indicators
    );

    if (indicator) {
      // If the indicator exists, add to its value
      indicator.value += impactValue;
    } else {
      // Otherwise, create a new indicator entry
      category.children.push({
        name: indicators,
        value: impactValue,
        ...item,
      });
    }
  });

  return sunburstData;
}

export const sunburstData = generateSunburstData(data);
