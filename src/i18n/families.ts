/**
 * Some texts in impacts_definitions.csv are the same sentence repeated for a
 * whole family of indicators: every pesticide shares one definition, every
 * eco-cost of land use shares one method. Translating them one by one would
 * mean a dozen copies of the same paragraph per language.
 *
 * So a family is matched on its English text and translated once. The key is
 * the family name, the value the pattern that recognises it.
 */
export const DEF_FAMILIES = {
  pesticide: /is a pesticide used during cultivation/i,
  landUse: /^The eco-cost of land use is an environmental impact/i,
} as const;

export const METHOD_FAMILIES = {
  kidney: /cost of treating a kidney patient/i,
  palmOil: /prevention costs of biodiversity have been calculated/i,
} as const;

export type DefFamily = keyof typeof DEF_FAMILIES;
export type MethodFamily = keyof typeof METHOD_FAMILIES;
