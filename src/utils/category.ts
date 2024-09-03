import { data } from "./coffeeData";
import { CoffeeImpactData } from "../utils/coffeeData";
export function groupByCategory(data: CoffeeImpactData[]) {
  const categories: { [key: string]: CoffeeImpactData[] } = {};

  data.forEach((d) => {
    if (!categories[d.impactCategory]) {
      categories[d.impactCategory] = [];
    }
    categories[d.impactCategory].push(d);
  });

  return Object.keys(categories).map((category) => {
    return {
      category,
      impacts: categories[category],
      totalImpact: categories[category].reduce(
        (sum, d) => sum + d.impactValue,
        0
      ),
    };
  });
}

export function getImpactsForCategory(
  category: string,
  data: CoffeeImpactData[]
) {
  return data
    .filter((d) => d.impactCategory === category)
    .map((d) => ({
      indicator: d.indicators,
      value: d.impactValue,
    }));
}
