import type { Strings } from "@/i18n/types";

const en: Strings = {
  code: "EN",
  wordmark: "TRUE COST",
  loading: "Loading this machine's data…",
  errPre: "Could not load the data for this machine.",

  drinkTitle: "What are you drinking?",
  drinkFoot:
    "Prices are what the machine charges. The true cost adds the damage the cup causes, priced in francs.",

  beanTitle: "Which coffee?",
  beanSub:
    "Same drink, different beans. The labels decide what is given back on every cup.",
  givenBack: "given back",
  labelKeyShow: "What do these labels mean?",
  hide: "Hide",
  beanHere: (sp) => "Poured at " + sp + ".",
  beanElsewhere: (places) => "Not poured here. Served at " + places + ".",
  labelWhat: {
    fairtrade: "a minimum price and a premium paid to the growers' cooperative.",
    "eu-organic": "grown without synthetic pesticides or mineral fertiliser.",
    "via-verde": "Dallmayr's own scheme: reforestation in Ethiopia funded per cup.",
    "blue-planet": "the larger reforestation scheme, twice as much given back per cup.",
    "rainforest-alliance": "farming rules on forests, soil and working conditions.",
  },

  milkTitle: "Which milk?",
  milkIntro: (sp) =>
    "The beans are the same every time. Between the lowest and highest milk there is " +
    sp +
    " CHF of hidden cost.",
  milkIntroOne: "This drink is served one way only.",
  milkNote: (lowest, share, cat) =>
    (lowest ? "Lowest here. " : "") +
    "The milk is " +
    share +
    "% of this cup's hidden cost" +
    (cat ? ", mostly " + cat.toLowerCase() : "") +
    ".",
  noMilk: "No milk",
  milk: {
    Cow: "Cow milk",
    "Lactose-free cow": "Lactose-free cow milk",
    Oat: "Oat milk",
    Almond: "Almond milk",
    Soy: "Soy milk",
  },
  lowerNouns: true,

  sugarTitle: "Sugar?",
  sugarLabels: ["No sugar", "1 sachet", "2 sachets", "3 sachets"],
  sugarIntro: (c) =>
    "Swiss beet sugar, one sachet at a time. Each one adds " +
    c +
    " CHF of hidden cost: beet farming, sugar extraction, and the pesticide residues you drink.",
  sugarNoteNone: "Lowest here, the cup as the machine pours it.",
  sugarNote: (p) =>
    "Sugar would be " +
    p +
    "% of this cup's hidden cost, mostly beet farming and sugar extraction.",
  nothingAdded: "nothing added",

  hiddenLabel: "HIDDEN COST OF THIS CUP",
  contextLine: (pct, paid) =>
    "About " + pct + "% on top of the " + paid + " CHF you paid, damage the price never mentions.",
  truePrice: "True price",
  pricePaid: "Price paid at the machine",
  hiddenLegend: "Hidden cost of this cup",
  givenBackLegend: "Given back by the labels",
  whyLink: "Why is anything given back?",
  givenBackHead: "WHAT IS GIVEN BACK",
  offsetNote: (n) =>
    n +
    " funds reforestation in Ethiopia, which restores habitat and stores carbon. The same amount is credited to every cup poured from these beans, whatever you order.",
  offsetNone: "No offsetting scheme is declared for this cup.",

  whereGoes: (v) => "Where the " + v + " CHF goes",
  catsSub:
    "Each kind of damage is priced on its own. Open one to see the indicators that carry it.",
  allImpacts: "‹ All impacts",
  byWhat: "By what",
  byWhere: "By where",
  chfHidden: "CHF hidden cost",
  chfHiddenShort: "CHF hidden",
  whereFrom: "WHERE IT COMES FROM",
  whatMeasures: "WHAT IT MEASURES",
  howFrancs: "HOW IT BECOMES FRANCS",
  done: "Done",
  readMore: "Read more",
  showLess: "Show less",
  mixedUnits: "mixed units",
  noDefinition: "No definition is recorded for this indicator in the dataset.",
  restInds: (n) => n + " smaller indicator" + (n === 1 ? "" : "s"),
  restIngs: (n) => n + " other ingredient" + (n === 1 ? "" : "s"),
  origin: (share, ing, stage) =>
    (share === null ? "All of it from " : share + "% from ") +
    ing.toLowerCase() +
    (stage ? ", mostly " + stage : ""),
  stageOnly: (stage) => "Mostly " + stage,

  changeTitle: "Change one thing",
  changeSub: "One swap, and what it does to the hidden cost.",
  changeNone: "Nothing on this machine costs less than this cup.",
  chipMilk: (m) => m + " instead",
  chipLowest: (d) => d + " instead, the lowest cup here",
  seeAll: "See every cup on this machine ›",
  footNote:
    "Hidden cost is the damage this cup causes, priced in francs by the True Price method. It is not added to your bill.",

  yourCup: "‹ Your cup",
  comparison: "COMPARISON",
  yours: "YOURS",
  switchTo: "Switch to this cup",
  cmpTitle: (c) => "Your cup against " + c,
  cmpDelta: (s) => s + " CHF hidden",
  cmpNote: (add, amt, cat) =>
    (add ? "That change adds " : "That change saves ") +
    amt +
    " CHF of hidden cost, mostly under " +
    cat.toLowerCase() +
    ".",
  cmpSame: "Same hidden cost either way.",
  noChange: "no change",

  everyCupTitle: (sp) => "Every cup at " + sp,
  rankSub: (n) => "LOWEST HIDDEN COST FIRST · " + n + " CUPS",
  ordinal: (n) => {
    const t = n % 100;
    if (t >= 11 && t <= 13) return n + "th";
    return n + (["th", "st", "nd", "rd"][n % 10] || "th");
  },
  rankNote: (place, nearest, diff) =>
    "Yours is the " +
    place +
    " lowest. The nearest cheaper cup is " +
    nearest +
    ", " +
    diff +
    " CHF less hidden cost. Tap any row to compare it with yours.",
  rankNoteLowest: "Yours already has the lowest hidden cost on this machine.",

  aboutTitle: "ABOUT & DISCLAIMER",
  aboutParas: [
    [
      { t: "For any questions or feedback, " },
      { t: "please write us", href: "mailto:true-cost-of-food@epfl.ch" },
      { t: "." },
    ],
    [
      { t: "This application is part of a bigger project called " },
      { t: "True Cost of Food", href: "https://truecostoffood.ch/" },
      {
        t: ", aiming to raise awareness about the hidden costs of food production and consumption.",
      },
    ],
    [
      { t: "LEUrE (Laboratory of Environmental and Urban Economics, EPFL)", b: true },
      { t: " developed this application as part of the research project " },
      {
        t: "\u2018From Farm to Fork and beyond: A Systemic Approach for Implementing True Cost Accounting for Food in Switzerland\u2019",
        i: true,
      },
      { t: ", funded by the " },
      { t: "Swiss National Science Foundation (SNSF)", b: true },
      { t: ", from 2024 to 2027 (project number: 216652)." },
    ],
    [
      { t: "It was developed as part of a partnership that consists of: " },
      { t: "LEUrE (EPFL)", b: true },
      { t: ", " },
      { t: "RESCO (EPFL restaurants, shops, hotels)", b: true },
      { t: ", " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: ", with contributions from the " },
      { t: "Compass Group", b: true },
      { t: " and " },
      { t: "Dallmayr", b: true },
      { t: "." },
    ],
    [
      {
        t: "The results of this application are based on the data, scope, and limitations as presented and documented in the application on sources considered reliable. ",
      },
      { t: "No warranty", b: true },
      {
        t: " is given as to the accuracy, precision, or completeness, whether express or implied, due to the nature of the data. Neither the partners nor any of the companies shall be liable for any loss or damage arising from the use of the application or the information presented therein.",
      },
    ],
  ],

  /* The data files are already in English, so nothing to override here. */
  indicator: {},
  indicatorDef: {},
  indicatorMethod: {},
  defFamily: {},
  methodFamily: {},

  rail: ["1 DRINK", "2 COFFEE", "3 MILK", "4 SUGAR"],
  cats: {
    Environment: "Environment",
    Livelihoods: "Livelihoods",
    Health: "Health",
    Biodiversity: "Biodiversity",
  },
  catBlurb: {
    Environment:
      "Climate, land, water and air, priced as what it would cost to prevent the damage.",
    Livelihoods:
      "The gap between what the people who grew this were paid and a decent living wage.",
    Health: "Pesticide residues that end up in the person drinking the cup.",
    Biodiversity: "Species and habitat lost to the land the crop occupies.",
  },
  ing: {
    "Coffee beans": "Coffee beans",
    "Cow milk": "Cow milk",
    Oat: "Oat drink",
    Almond: "Almond drink",
    Soybeans: "Soybeans",
    "Cocoa beans": "Cocoa beans",
    Sugarbeet: "Sugar",
    Sugar: "Sugar",
  },
  stage: {
    "Processing, Roast and ground": "processing, roast and ground",
    "Processing, Cocoa processing": "cocoa processing",
    Production: "production",
    Transport: "transport",
    "End of life, industrial-composting": "end of life, industrial-composting",
    "Production & Processing": "production & processing",
    Consumption: "consumption",
    "Processing, Almond beverage": "processing, almond beverage",
    "Processing, Soybean beverage": "processing, soybean beverage",
    "Processing, Sugar extraction": "processing, sugar extraction",
    "Transport, Field to Storage": "transport, field to storage",
    "Transport, Manufacture-to-Retail": "transport, manufacture-to-retail",
    "Transport, Retail-to-Waste": "transport, retail-to-waste",
    "Transport, Storage-to-Port": "transport, storage-to-port",
    Cultivation: "cultivation",
    "End-use": "end use",
    "Roasting & Ground": "roasting and grinding",
    Decaffeination: "decaffeination",
    Manufacturing: "manufacturing",
  },
};

export default en;
