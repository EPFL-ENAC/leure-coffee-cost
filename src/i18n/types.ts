import type { DefFamily, MethodFamily } from "@/i18n/families";
import type { Milk } from "@/utils/cups";

/**
 * One piece of a disclaimer paragraph. The text lives in the language table,
 * the markup stays in the component, so no HTML string is ever injected.
 */
export type Seg = {
  /** The text itself, spaces around it included. */
  t: string;
  /** Bold. */
  b?: boolean;
  /** Italic. */
  i?: boolean;
  /** Makes the piece a link. */
  href?: string;
};

/**
 * The string table of one language. Several entries are functions, because
 * the sentences fold numbers and names in the middle. That is why this is a
 * plain TS module and not vue-i18n.
 */
export type Strings = {
  code: string;
  wordmark: string;
  loading: string;
  errPre: string;

  /* screen 1: drink */
  drinkTitle: string;
  drinkFoot: string;

  /* screen 2: beans */
  beanTitle: string;
  beanSub: string;
  givenBack: string;
  labelKeyShow: string;
  hide: string;
  beanHere: (salePoint: string) => string;
  beanElsewhere: (places: string) => string;
  labelWhat: Record<string, string>;

  /* screen 3: milk */
  milkTitle: string;
  milkIntro: (spread: string) => string;
  milkIntroOne: string;
  milkNote: (lowest: boolean, share: number, cat: string) => string;
  noMilk: string;
  milk: Record<Milk, string>;
  /** French and English lower-case a milk name mid-sentence, German does not. */
  lowerNouns: boolean;

  /* screen 4: sugar */
  sugarTitle: string;
  sugarLabels: string[];
  sugarIntro: (cost: string) => string;
  sugarNoteNone: string;
  sugarNote: (share: string) => string;
  nothingAdded: string;

  /* result */
  hiddenLabel: string;
  contextLine: (pct: number, paid: string) => string;
  truePrice: string;
  pricePaid: string;
  hiddenLegend: string;
  givenBackLegend: string;
  whyLink: string;
  givenBackHead: string;
  offsetNote: (bean: string) => string;
  offsetNone: string;

  /* impact drill-down */
  whereGoes: (value: string) => string;
  catsSub: string;
  allImpacts: string;
  byWhat: string;
  byWhere: string;
  chfHidden: string;
  chfHiddenShort: string;
  whereFrom: string;
  whatMeasures: string;
  howFrancs: string;
  done: string;
  readMore: string;
  showLess: string;
  mixedUnits: string;
  noDefinition: string;
  restInds: (n: number) => string;
  restIngs: (n: number) => string;
  origin: (share: number | null, ing: string, stage: string) => string;
  stageOnly: (stage: string) => string;

  /* change one thing */
  changeTitle: string;
  changeSub: string;
  changeNone: string;
  chipMilk: (milk: string) => string;
  chipLowest: (drink: string) => string;
  seeAll: string;
  footNote: string;

  /* compare */
  yourCup: string;
  comparison: string;
  yours: string;
  switchTo: string;
  cmpTitle: (cup: string) => string;
  cmpDelta: (amount: string) => string;
  cmpNote: (adds: boolean, amount: string, cat: string) => string;
  cmpSame: string;
  noChange: string;

  /* ranking */
  everyCupTitle: (salePoint: string) => string;
  rankSub: (n: number) => string;
  ordinal: (n: number) => string;
  rankNote: (place: string, nearest: string, diff: string) => string;
  rankNoteLowest: string;

  /* about & disclaimer */
  aboutTitle: string;
  aboutParas: Seg[][];

  /* impacts.
     The indicator names and their texts come from the data files, in English.
     These three maps are keyed by the lower-case English indicator name, the
     same key as coffeeStore.defOf. Anything missing keeps the English text,
     so a new indicator shows up untranslated instead of breaking. */
  indicator: Record<string, string>;
  indicatorDef: Record<string, string>;
  indicatorMethod: Record<string, string>;
  /** Texts shared by a family of indicators, see i18n/families.ts. */
  defFamily: Partial<Record<DefFamily, (name: string, unit: string) => string>>;
  methodFamily: Partial<Record<MethodFamily, string>>;

  /* shared vocabulary */
  rail: [string, string, string, string];
  cats: Record<string, string>;
  catBlurb: Record<string, string>;
  ing: Record<string, string>;
  stage: Record<string, string>;
};

export type LangCode = "en" | "fr" | "de";
