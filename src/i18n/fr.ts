import type { Strings } from "@/i18n/types";

/**
 * "de" plus the article of an ingredient: du lait, des grains, de la boisson.
 * Keyed by the lower-case French ingredient name from `ing` below. Anything
 * else falls back to a plain "de".
 */
const DU: Record<string, string> = {
  "grains de café": "des grains de café",
  "lait de vache": "du lait de vache",
  "boisson d’avoine": "de la boisson d’avoine",
  "boisson d’amande": "de la boisson d’amande",
  "fèves de soja": "des fèves de soja",
  "fèves de cacao": "des fèves de cacao",
  sucre: "du sucre",
};
const du = (ing: string) => DU[ing.toLowerCase()] ?? "de " + ing.toLowerCase();

const fr: Strings = {
  code: "FR",
  wordmark: "COÛT RÉEL",
  loading: "Chargement des données de cette machine…",
  errPre: "Impossible de charger les données de cette machine.",

  drinkTitle: "Que buvez-vous ?",
  drinkFoot:
    "Les prix sont ceux de la machine. Le coût réel y ajoute les dommages causés par la tasse, chiffrés en francs.",

  beanTitle: "Quel café ?",
  beanSub:
    "Même boisson, autres grains. Les labels déterminent ce qui est restitué sur chaque tasse.",
  givenBack: "restitué",
  labelKeyShow: "Que signifient ces labels ?",
  hide: "Masquer",
  beanHere: (sp) => "Servi ici : " + sp + ".",
  beanElsewhere: (places) => "Pas servi ici. Servi ailleurs : " + places + ".",
  labelWhat: {
    fairtrade: "un prix minimum et une prime versés à la coopérative de producteurs.",
    "eu-organic": "cultivé sans pesticides de synthèse ni engrais minéral.",
    "via-verde":
      "le programme propre à Dallmayr : un reboisement en Éthiopie financé par tasse.",
    "blue-planet": "le programme de reboisement élargi, deux fois plus restitué par tasse.",
    "rainforest-alliance":
      "des règles agricoles sur les forêts, les sols et les conditions de travail.",
  },

  milkTitle: "Quel lait ?",
  milkIntro: (sp) =>
    "Les grains ne changent pas. D’un lait à l’autre, le coût caché varie de " +
    sp +
    " CHF.",
  milkIntroOne: "Cette boisson n’est servie que d’une seule manière.",
  milkNote: (lowest, share, cat) =>
    (lowest ? "Le coût le plus bas ici. " : "") +
    "Le lait représente " +
    share +
    "% du coût caché de cette tasse" +
    (cat ? ", surtout côté " + cat.toLowerCase() : "") +
    ".",
  noMilk: "Sans lait",
  milk: {
    Cow: "Lait de vache",
    "Lactose-free cow": "Lait de vache sans lactose",
    Oat: "Lait d’avoine",
    Almond: "Lait d’amande",
    Soy: "Lait de soja",
  },
  lowerNouns: true,

  sugarTitle: "Du sucre ?",
  sugarLabels: ["Sans sucre", "1 sachet", "2 sachets", "3 sachets"],
  sugarIntro: (c) =>
    "Sucre de betterave suisse, un sachet à la fois. Chacun ajoute " +
    c +
    " CHF de coût caché : culture de la betterave, extraction du sucre et résidus de pesticides que vous buvez.",
  sugarNoteNone: "Le coût le plus bas ici : la tasse telle que la machine la sert.",
  sugarNote: (p) =>
    "Le sucre pèserait " +
    p +
    "% du coût caché de cette tasse, surtout la culture et l’extraction.",
  nothingAdded: "rien d’ajouté",

  hiddenLabel: "COÛT CACHÉ DE CETTE TASSE",
  contextLine: (pct, paid) =>
    "Environ " +
    pct +
    "% en plus des " +
    paid +
    " CHF payés : des dommages dont le prix ne dit rien.",
  truePrice: "Prix réel",
  pricePaid: "Prix payé à la machine",
  hiddenLegend: "Coût caché de cette tasse",
  givenBackLegend: "Restitué par les labels",
  whyLink: "Pourquoi une part est-elle restituée ?",
  givenBackHead: "CE QUI EST RESTITUÉ",
  offsetNote: (n) =>
    n +
    " finance un reboisement en Éthiopie, qui restaure des habitats et stocke du carbone. Le même montant est crédité à chaque tasse issue de ces grains, quelle que soit votre commande.",
  offsetNone: "Aucun programme de compensation n’est déclaré pour cette tasse.",

  whereGoes: (v) => "Où vont ces " + v + " CHF",
  catsSub:
    "Chaque type de dommage est chiffré à part. Ouvrez-en un pour voir les indicateurs qui le composent.",
  allImpacts: "‹ Tous les impacts",
  byWhat: "Par indicateur",
  byWhere: "Par ingrédient",
  chfHidden: "CHF de coût caché",
  chfHiddenShort: "CHF cachés",
  whereFrom: "D’OÙ CELA VIENT",
  whatMeasures: "CE QUE CELA MESURE",
  howFrancs: "COMMENT CELA DEVIENT DES FRANCS",
  done: "Terminé",
  readMore: "Lire la suite",
  showLess: "Réduire",
  mixedUnits: "unités mixtes",
  noDefinition: "Aucune définition n’est enregistrée pour cet indicateur dans les données.",
  restInds: (n) => n + " indicateur" + (n === 1 ? "" : "s") + " plus faible" + (n === 1 ? "" : "s"),
  restIngs: (n) => n + " autre" + (n === 1 ? "" : "s") + " ingrédient" + (n === 1 ? "" : "s"),
  origin: (share, ing, stage) =>
    (share === null ? "Tout vient " : share + "% viennent ") +
    du(ing) +
    (stage ? ", surtout pendant " + stage : ""),
  stageOnly: (stage) => "Surtout pendant " + stage,

  changeTitle: "Changer une chose",
  changeSub: "Un seul changement, et son effet sur le coût caché.",
  changeNone: "Aucune tasse de cette machine ne coûte moins que celle-ci.",
  chipMilk: (m) => m + " à la place",
  chipLowest: (d) => d + " à la place, le coût caché le plus bas ici",
  seeAll: "Voir toutes les tasses de cette machine ›",
  footNote:
    "Le coût caché correspond aux dommages causés par cette tasse, chiffrés en francs selon la méthode True Price. Il n’est pas ajouté à votre note.",

  yourCup: "‹ Votre tasse",
  comparison: "COMPARAISON",
  yours: "LA VÔTRE",
  switchTo: "Passer à cette tasse",
  cmpTitle: (c) => "Votre tasse comparée à " + c,
  cmpDelta: (s) => s + " CHF cachés",
  cmpNote: (add, amt, cat) =>
    (add ? "Ce changement ajoute " : "Ce changement économise ") +
    amt +
    " CHF de coût caché, surtout côté " +
    cat.toLowerCase() +
    ".",
  cmpSame: "Même coût caché dans les deux cas.",
  noChange: "sans changement",

  everyCupTitle: (sp) => "Toutes les tasses : " + sp,
  rankSub: (n) => "COÛT CACHÉ CROISSANT · " + n + " TASSES",
  ordinal: (n) => (n === 1 ? "1re" : n + "e"),
  rankNote: (place, nearest, diff) =>
    "La vôtre arrive " +
    place +
    " en coût caché. Juste avant, " +
    nearest +
    " a " +
    diff +
    " CHF de coût caché en moins. Touchez une ligne pour la comparer à la vôtre.",
  rankNoteLowest: "La vôtre a déjà le coût caché le plus bas de cette machine.",

  aboutTitle: "À PROPOS & AVERTISSEMENT",
  aboutParas: [
    [
      { t: "Pour toute question ou remarque, " },
      { t: "écrivez-nous", href: "mailto:true-cost-of-food@epfl.ch" },
      { t: "." },
    ],
    [
      { t: "Cette application fait partie d’un projet plus large appelé " },
      { t: "True Cost of Food", href: "https://truecostoffood.ch/" },
      {
        t: ", qui veut rendre visibles les coûts cachés de la production et de la consommation alimentaires.",
      },
    ],
    [
      {
        t: "Le LEUrE (Laboratoire d’économie urbaine et environnementale, EPFL)",
        b: true,
      },
      { t: " a développé cette application dans le cadre du projet de recherche " },
      {
        t: "« From Farm to Fork and beyond: A Systemic Approach for Implementing True Cost Accounting for Food in Switzerland »",
        i: true,
      },
      { t: ", financé par le " },
      { t: "Fonds national suisse (FNS)", b: true },
      { t: ", de 2024 à 2027 (numéro de projet : 216652)." },
    ],
    [
      { t: "Elle a été développée dans le cadre d’un partenariat entre : " },
      { t: "LEUrE (EPFL)", b: true },
      { t: ", " },
      { t: "RESCO (restaurants, commerces et hôtellerie de l’EPFL)", b: true },
      { t: ", " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: ", avec la contribution de " },
      { t: "Compass Group", b: true },
      { t: " et " },
      { t: "Dallmayr", b: true },
      { t: "." },
    ],
    [
      {
        t: "Les résultats de cette application reposent sur les données, le périmètre et les limites présentés et documentés dans l’application, à partir de sources considérées comme fiables. ",
      },
      { t: "Aucune garantie", b: true },
      {
        t: " n’est donnée quant à l’exactitude, la précision ou l’exhaustivité, expresse ou implicite, compte tenu de la nature des données. Ni les partenaires ni aucune des entreprises ne peuvent être tenus responsables d’une perte ou d’un dommage lié à l’usage de l’application ou des informations qu’elle présente.",
      },
    ],
  ],

  indicator: {
    "agricultural land occupation": "Occupation de terres agricoles",
    "cases of fatal occupational injury": "Accidents du travail mortels",
    "cases of non-fatal occupational injury, insured":
      "Accidents du travail non mortels, personnes assurées",
    "cases of non-fatal occupational injury, uninsured":
      "Accidents du travail non mortels, personnes non assurées",
    "children in work by age and not attending school (5-14)":
      "Enfants au travail et non scolarisés (5-14 ans)",
    "eco-costs of land-use (brazil), deforestation-related":
      "Éco-coûts de l’usage des terres (Brésil), liés à la déforestation",
    "eco-costs of land-use (brazil), practice-related":
      "Éco-coûts de l’usage des terres (Brésil), liés aux pratiques agricoles",
    "eco-costs of land-use (colombia), deforestation-related":
      "Éco-coûts de l’usage des terres (Colombie), liés à la déforestation",
    "eco-costs of land-use (colombia), practice-related":
      "Éco-coûts de l’usage des terres (Colombie), liés aux pratiques agricoles",
    "eco-costs of land-use (ecuador), deforestation-related":
      "Éco-coûts de l’usage des terres (Équateur), liés à la déforestation",
    "eco-costs of land-use (ecuador), practice-related":
      "Éco-coûts de l’usage des terres (Équateur), liés aux pratiques agricoles",
    "eco-costs of land-use (ethiopia), deforestation-related":
      "Éco-coûts de l’usage des terres (Éthiopie), liés à la déforestation",
    "eco-costs of land-use (ethiopia), practice-related":
      "Éco-coûts de l’usage des terres (Éthiopie), liés aux pratiques agricoles",
    "eco-costs of land-use (france), deforestation-related":
      "Éco-coûts de l’usage des terres (France), liés à la déforestation",
    "eco-costs of land-use (france), practice-related":
      "Éco-coûts de l’usage des terres (France), liés aux pratiques agricoles",
    "eco-costs of land-use (india), deforestation-related":
      "Éco-coûts de l’usage des terres (Inde), liés à la déforestation",
    "eco-costs of land-use (india), practice-related":
      "Éco-coûts de l’usage des terres (Inde), liés aux pratiques agricoles",
    "eco-costs of land-use (indonesia), deforestation-related":
      "Éco-coûts de l’usage des terres (Indonésie), liés à la déforestation",
    "eco-costs of land-use (indonesia), practice-related":
      "Éco-coûts de l’usage des terres (Indonésie), liés aux pratiques agricoles",
    "eco-costs of land-use (switzerland), deforestation-related":
      "Éco-coûts de l’usage des terres (Suisse), liés à la déforestation",
    "eco-costs of land-use (switzerland), practice-related":
      "Éco-coûts de l’usage des terres (Suisse), liés aux pratiques agricoles",
    "eco-costs of land-use (united states of america), deforestation-related":
      "Éco-coûts de l’usage des terres (États-Unis), liés à la déforestation",
    "eco-costs of land-use (united states of america), practice-related":
      "Éco-coûts de l’usage des terres (États-Unis), liés aux pratiques agricoles",
    "fine particulate matter formation": "Formation de particules fines",
    "fossil resource scarcity": "Raréfaction des ressources fossiles",
    "global warming": "Réchauffement climatique",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Emploi informel des travailleurs agricoles, sans protection sociale",
    "land use": "Usage des terres",
    "methyl bromide": "Bromure de méthyle",
    "prevalence of excessive working time": "Temps de travail excessif",
    "prevalence of modern slavery (forced workers, most severe)":
      "Esclavage moderne (travail forcé, cas les plus graves)",
    "terrestrial acidification": "Acidification des sols",
    "wage gap from gender discrimination":
      "Écart de salaire lié à la discrimination de genre",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "Écart de salaire des personnes payées au-dessus du minimum légal mais sous un salaire vital décent",
    "wage gap of workers earning below minimum wage":
      "Écart de salaire des personnes payées sous le salaire minimum",
    "water consumption": "Consommation d’eau",
  },
  indicatorDef: {
    "agricultural land occupation":
      "Mesure la surface de terres occupée par l’agriculture sur une année, en tenant compte des effets sur la biodiversité, la qualité des sols et les services écosystémiques.",
    "cases of fatal occupational injury":
      "Mesure le nombre de décès liés au travail par unité produite, ce qui met en lumière les manques de sécurité au travail et le besoin de meilleures protections.",
    "cases of non-fatal occupational injury, insured":
      "Suit les accidents du travail avec blessure chez les personnes assurées, ce qui montre le rôle de la protection sociale face aux risques financiers et sanitaires.",
    "cases of non-fatal occupational injury, uninsured":
      "Mesure les accidents du travail qui touchent des personnes sans assurance, ce qui met en lumière les failles des systèmes de protection du travail.",
    "fine particulate matter formation":
      "La formation de particules fines [kg PM2.5 eq] chiffre la pollution de l’air due aux particules fines (PM2.5), c’est-à-dire des particules de moins de 2,5 micromètres de diamètre. Ces particules viennent surtout des procédés industriels, de la combustion d’énergies fossiles et de réactions chimiques dans l’atmosphère. Les PM2.5 posent un problème pour l’environnement comme pour la santé humaine : elles pénètrent profondément dans les poumons et provoquent des maladies respiratoires et cardiovasculaires, et elles dégradent l’environnement, par exemple par le smog et la baisse de la qualité de l’air.",
    "fossil resource scarcity":
      "La raréfaction des ressources fossiles [kg oil-Eq] mesure l’épuisement des ressources fossiles non renouvelables, comme le pétrole, le charbon et le gaz naturel, utilisées tout au long du cycle de vie d’un produit. Cette catégorie s’exprime en kilogrammes d’équivalent pétrole (kg oil-Eq), qui représentent le contenu énergétique des ressources épuisées. Elle compte dans une évaluation environnementale, car la sur-extraction de ces ressources limitées pose un problème de durabilité à long terme.",
    "global warming":
      "Le réchauffement climatique [kg CO2 eq] est la hausse à long terme de la température moyenne de la planète. Le réchauffement d’origine humaine vient d’activités très émettrices : la combustion d’énergies fossiles, l’élevage et le changement d’usage des sols. Il crée des menaces très sérieuses, comme des événements météorologiques extrêmes plus fréquents, la montée du niveau des mers et la perturbation des écosystèmes, avec de lourdes conséquences pour nos vies et nos moyens de subsistance : famine, migrations de masse et guerres. Le système alimentaire et agricole est responsable d’un tiers des émissions humaines mondiales, et il est le premier moteur des émissions de N2O et de CH4, à hauteur de 82 % et 44 %. Les émissions liées à l’agriculture viennent surtout du travail du sol (le labour par exemple), de la décomposition des sols, des intrants (énergies fossiles, pesticides, engrais) et de l’usage des machines.",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Mesure la part des travailleurs agricoles sans contrat formel, sans sécurité sociale et sans protection du travail, pour évaluer la fragilité du marché du travail.",
    "land use":
      "L’usage des terres [m2a crop eq] évalue les conséquences environnementales de l’occupation et de la transformation des terres par des activités agricoles ou industrielles. C’est un facteur clé, car il agit sur la biodiversité, la santé des sols, les cycles de l’eau et les services écosystémiques.",
    "prevalence of excessive working time":
      "Cet indicateur chiffre la part des travailleurs agricoles qui travaillent au-delà des heures permises par la loi ou recommandées au niveau international, rapportée à la production. Le temps de travail excessif va de pair avec un risque de fatigue, d’accidents du travail et de baisse du bien-être.",
    "prevalence of modern slavery (forced workers, most severe)":
      "Suit les cas extrêmes de travail forcé, où les personnes subissent des menaces, des violences ou une perte totale d’autonomie, ce qui met en lumière une exploitation grave.",
    "terrestrial acidification":
      "L’acidification des sols apparaît quand l’acidité du sol s’écarte de son niveau optimal, au détriment du milieu. L’acidification de l’environnement vient des oxydes de soufre et d’azote émis par des sources humaines et naturelles. Sur les terres agricoles, les causes principales sont les engrais à base d’ammonium et d’urée, les engrais soufrés et la culture de légumineuses. L’acidification dégrade les forêts et les eaux de surface, surtout là où les sols sont pauvres. Elle agit aussi sur la croissance des cultures, et donc sur les rendements, car le pH du sol change la disponibilité des nutriments pour les plantes.",
    "wage gap from gender discrimination":
      "L’écart de salaire lié à la discrimination de genre [CHF/kg] chiffre la différence de revenu entre travailleurs et travailleuses, rapportée à la production. Cet indicateur compte, car il montre les écarts économiques qui viennent de la discrimination de genre au travail et reflète des inégalités de système qui pèsent sur les revenus des femmes et sur leur stabilité économique.",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "L’écart de salaire des personnes payées au-dessus du minimum légal mais sous un salaire vital décent [CHF/kg] chiffre la différence entre leur revenu et le seuil d’un salaire vital décent, rapportée à la production. Cet indicateur aide à comprendre les difficultés économiques de personnes qui gagnent plus que le minimum légal, mais pas assez pour couvrir leurs besoins de base et vivre décemment.",
    "wage gap of workers earning below minimum wage":
      "L’écart de salaire des personnes payées sous le salaire minimum [CHF/kg] chiffre la différence entre leur revenu et le salaire minimum légal, rapportée à la production. Cet indicateur montre l’ampleur de l’exploitation économique et des atteintes au droit du travail, et reflète de vrais problèmes d’insécurité de revenu et de pratiques injustes.",
    "water consumption":
      "La consommation d’eau [m3] est l’usage de l’eau d’une façon qui la fait s’évaporer, l’incorpore à des produits, la transfère vers d’autres bassins versants ou la rejette à la mer. Elle n’est donc plus disponible dans son bassin d’origine, ni pour les humains ni pour les écosystèmes. Les ressources en eau subissent une pression croissante, à cause de la croissance de la population et de la demande alimentaire, et la production agricole représente la plus grande part de la consommation mondiale d’eau douce. Le manque d’eau touche directement les organismes aquatiques, réduit les rendements et peut conduire à la malnutrition.",
  },
  indicatorMethod: {
    "agricultural land occupation":
      "Un coût de compensation qui exprime le coût d’opportunité de l’occupation des terres, à partir de la valeur des services écosystémiques des principaux biomes, selon une méta-analyse du TEEB (de Groot et al., 2012). Des facteurs par pays peuvent être dérivés de la couverture des biomes dans chaque pays.",
    "cases of fatal occupational injury":
      "Le coût se calcule à partir de la compensation, de la prévention et de la sanction. La compensation couvre les frais médicaux des accidents du travail non assurés, la perte de santé (DALY) pour les cas non mortels et la valeur statistique de la vie (VSL) pour les cas mortels. La prévention couvre le coût des audits qui évitent de futures infractions. La sanction est une pénalité globale pour les lieux de travail qui ne respectent pas les règles de santé et de sécurité.",
    "cases of non-fatal occupational injury, insured":
      "Le coût se calcule à partir de la compensation, de la prévention et de la sanction. La compensation couvre les frais médicaux des accidents du travail non assurés, la perte de santé (DALY) pour les cas non mortels et la valeur statistique de la vie (VSL) pour les cas mortels. La prévention couvre le coût des audits qui évitent de futures infractions. La sanction est une pénalité globale pour les lieux de travail qui ne respectent pas les règles de santé et de sécurité.",
    "cases of non-fatal occupational injury, uninsured":
      "Le coût se calcule à partir de la compensation, de la prévention et de la sanction. La compensation couvre les frais médicaux des accidents du travail non assurés, la perte de santé (DALY) pour les cas non mortels et la valeur statistique de la vie (VSL) pour les cas mortels. La prévention couvre le coût des audits qui évitent de futures infractions. La sanction est une pénalité globale pour les lieux de travail qui ne respectent pas les règles de santé et de sécurité.",
    "fine particulate matter formation":
      "Un coût de compensation qui exprime le coût social de la pollution et indique la perte de bien-être économique quand des polluants sont émis dans l’environnement, du point de vue des dommages à la santé humaine (morbidité, c’est-à-dire la maladie, et mortalité prématurée). L’évaluation finale de la santé humaine repose sur la valeur d’un DALY (année de vie ajustée sur l’incapacité), comme décrit plus haut pour la toxicité humaine. Les facteurs de conversion midpoint vers endpoint de ReCiPe 2016 pour la formation de particules servent à dériver les facteurs de monétisation (Huijbregts et al., 2016). Au niveau midpoint, l’indicateur n’a qu’une monétisation globale. Des facteurs de conversion par pays peuvent être dérivés pour chaque gaz (NOx, SOx, NMVOC), avec la méthode décrite dans (Galgani, Woltjer, et al., 2023). (True Price 2023)",
    "fossil resource scarcity":
      "Un coût de compensation qui exprime la perte future de bien-être économique due à la hausse des coûts d’extraction des énergies fossiles (Huijbregts et al., 2016). (True Price 2023)",
    "global warming":
      "Un coût de restauration qui exprime le coût de réduction nécessaire pour atteindre les objectifs de baisse des gaz à effet de serre fixés par l’Accord de Paris (cible des 2 degrés), à partir d’une méta-étude de 62 estimations de coûts marginaux de réduction (Kuik et al., 2009). (True Price 2023)",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Une combinaison de coûts de prévention et de sanction. Le coût de prévention exprime le coût de la mise en place d’audits génériques, pour éviter de futurs cas. Le coût de sanction représente une pénalité pour les personnes sans sécurité sociale.",
    "land use":
      "Un coût de compensation qui exprime le coût d’opportunité de l’occupation des terres, à partir de la valeur des services écosystémiques des principaux biomes, selon une méta-analyse du TEEB (de Groot et al., 2012). Des facteurs par pays peuvent être dérivés de la couverture des biomes dans chaque pays. (True Price 2023)",
    "prevalence of excessive working time":
      "Le coût comprend la compensation, la prévention et la sanction. La compensation couvre l’écart de salaire des heures supplémentaires sous-payées, corrigé de l’inflation. La prévention finance des audits pour éviter de futurs cas. La sanction applique une pénalité globale pour les heures supplémentaires excessives ou sous-payées.",
    "prevalence of modern slavery (forced workers, most severe)":
      "Le coût comprend la restauration, la compensation, la prévention et la sanction. La restauration couvre les revenus perdus et les frais de réinsertion des personnes en travail forcé. La compensation chiffre les effets sur la santé avec le DALY pour les victimes de violences. La prévention finance des audits pour éviter de futurs cas. La sanction applique une pénalité globale pour le travail forcé. Des coûts supplémentaires pour le harcèlement peuvent s’ajouter si nécessaire.",
    "terrestrial acidification":
      "Un coût de compensation qui exprime le coût social de la pollution et indique la perte de bien-être économique quand des polluants sont émis dans l’environnement, du point de vue des dommages aux écosystèmes. Ces dommages sont évalués par la valeur des services écosystémiques perdus, comme décrit plus haut pour l’écotoxicité. Les facteurs de conversion midpoint vers endpoint de ReCiPe 2016 pour l’acidification servent à dériver les facteurs de monétisation (Huijbregts et al., 2016). Au niveau midpoint, l’indicateur n’a qu’une monétisation globale. Des facteurs de conversion par pays peuvent être utilisés pour chaque gaz (NH3, SOx, NOx), avec la méthode décrite dans (Galgani, Woltjer, et al., 2023). (True Price 2023)",
    "wage gap from gender discrimination":
      "Une combinaison de coûts de restauration, de prévention et de sanction. Le coût de restauration représente la restitution du salaire perdu à cause d’un congé maternité refusé, de la discrimination de genre et d’un accès inégal aux opportunités, corrigé de la hausse des prix à la consommation (inflation annuelle) liée au retard de revenu. Le coût de prévention exprime le coût de la mise en place d’audits génériques, pour éviter de futurs cas de discrimination. (True Price 2023)",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "Une combinaison de coûts de compensation, de prévention et de sanction. Le coût de compensation exprime l’écart à un salaire vital décent, corrigé de la hausse des prix à la consommation (inflation annuelle) liée au retard de revenu. Le coût de prévention exprime le coût de la mise en place d’audits génériques, pour éviter de futurs cas. Le coût de sanction représente une pénalité sur la part de l’écart de salaire qui passe sous le salaire minimum légal, calculée sur la moyenne pondérée des pénalités de plusieurs pays, ce qui donne une pénalité globale. (True Price 2023)",
    "wage gap of workers earning below minimum wage":
      "Une combinaison de coûts de compensation, de prévention et de sanction. Le coût de compensation exprime l’écart à un salaire vital décent, corrigé de la hausse des prix à la consommation (inflation annuelle) liée au retard de revenu. Le coût de prévention exprime le coût de la mise en place d’audits génériques, pour éviter de futurs cas. Le coût de sanction représente une pénalité sur la part de l’écart de salaire qui passe sous le salaire minimum légal, calculée sur la moyenne pondérée des pénalités de plusieurs pays, ce qui donne une pénalité globale. (True Price 2023)",
    "water consumption":
      "Un coût de restauration qui exprime le coût annualisé du dessalement, y compris l’exploitation et l’entretien, l’énergie électrique et thermique, ainsi que le coût de couverture et de remboursement des investissements initiaux et des charges d’exploitation du dessalement (World Bank, 2012). (True Price 2023)",
  },
  defFamily: {
    pesticide: (n, u) =>
      n +
      " [" +
      u +
      "] est un pesticide utilisé pendant la culture, dont des résidus peuvent rester sur le produit et être ingérés par le consommateur, ce qui cause des effets négatifs sur la santé.",
    landUse: () =>
      "L’éco-coût de l’usage des terres est un indicateur d’impact environnemental qui chiffre le coût de l’usage des terres par les activités humaines, surtout l’agriculture, la sylviculture et l’urbanisation. Il reflète la perte de biodiversité, la dégradation des sols et celle des services écosystémiques causées par l’occupation et la transformation des terres.",
  },
  methodFamily: {
    kidney:
      "Coûts de prévention : le coût du traitement d’un patient rénal pendant un an (True Cost Accounting Agrifood Handbook).",
    palmOil:
      "Pour les éco-coûts de l’usage des terres en forêt tropicale (biodégradation), les coûts de prévention de la biodiversité ont été calculés à partir de la production d’huile de palme en Indonésie (une des pires situations de dégradation de la biodiversité). La mesure de prévention consiste à arrêter cette production et à la remplacer par de l’huile issue de déchets agricoles (huile biosourcée par pyrolyse de déchets). Ces coûts de prévention sont estimés à 6,87 €/m2 en 2024 (6 €/m2 en 2022), appliqués à des terres comptant 4000 espèces vasculaires pour 10 000 km2 (cas de Sumatra et d’une grande partie du Kalimantan). La dégradation de 4000 espèces pour 10 000 km2 sert de norme pour les plantations de palmiers à huile : facteur de biodiversité = 1. Les autres pays sont comparés à cette norme par un facteur de biodiversité. (https://www.ecocostsvalue.com/ecocosts/eco-costs-land-use/)",
  },

  rail: ["1 BOISSON", "2 CAFÉ", "3 LAIT", "4 SUCRE"],
  cats: {
    Environment: "Environnement",
    Livelihoods: "Conditions de vie",
    Health: "Santé",
    Biodiversity: "Biodiversité",
  },
  catBlurb: {
    Environment:
      "Climat, sols, eau et air, chiffrés au coût qu’il faudrait engager pour éviter le dommage.",
    Livelihoods:
      "L’écart entre ce que touchent celles et ceux qui cultivent ce café et un salaire vital décent.",
    Health: "Les résidus de pesticides qui finissent dans la tasse, et chez la personne qui la boit.",
    Biodiversity: "Les espèces et les habitats perdus à cause des terres occupées par la culture.",
  },
  ing: {
    "Coffee beans": "Grains de café",
    "Cow milk": "Lait de vache",
    Oat: "Boisson d’avoine",
    Almond: "Boisson d’amande",
    Soybeans: "Fèves de soja",
    "Cocoa beans": "Fèves de cacao",
    Sugarbeet: "Sucre",
    Sugar: "Sucre",
  },
  stage: {
    "Processing, Roast and ground": "la torréfaction et la mouture",
    "Processing, Cocoa processing": "la transformation du cacao",
    Production: "la production agricole",
    Transport: "le transport",
    "End of life, industrial-composting": "la fin de vie (compostage industriel)",
    "Production & Processing": "la production et la transformation",
    Consumption: "la consommation",
    "Processing, Almond beverage": "la fabrication de la boisson d’amande",
    "Processing, Soybean beverage": "la fabrication de la boisson de soja",
    "Processing, Sugar extraction": "l’extraction du sucre",
    "Transport, Field to Storage": "le transport du champ au stockage",
    "Transport, Manufacture-to-Retail": "le transport de l’usine au point de vente",
    "Transport, Retail-to-Waste": "le transport du point de vente aux déchets",
    "Transport, Storage-to-Port": "le transport du stockage au port",
    Cultivation: "la culture",
    "End-use": "l’utilisation",
    "Roasting & Ground": "la torréfaction et la mouture",
    Decaffeination: "la décaféination",
    Manufacturing: "la fabrication",
  },
};

export default fr;
