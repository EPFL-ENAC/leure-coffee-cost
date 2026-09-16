import type { Strings } from "@/i18n/types";

const de: Strings = {
  code: "DE",
  wordmark: "WAHRE KOSTEN",
  loading: "Daten dieser Maschine werden geladen…",
  errPre: "Die Daten dieser Maschine konnten nicht geladen werden.",

  drinkTitle: "Was trinken Sie?",
  drinkFoot:
    "Die Preise sind die der Maschine. Die wahren Kosten rechnen die Schäden dazu, die diese Tasse verursacht, in Franken bewertet.",

  beanTitle: "Welcher Kaffee?",
  beanSub:
    "Gleiches Getränk, andere Bohnen. Die Labels bestimmen, was pro Tasse zurückgegeben wird.",
  givenBack: "zurückgegeben",
  labelKeyShow: "Was bedeuten diese Labels?",
  hide: "Ausblenden",
  beanHere: (sp) => "Wird bei " + sp + " ausgeschenkt.",
  beanElsewhere: (places) => "Hier nicht im Angebot. Erhältlich bei " + places + ".",
  labelWhat: {
    fairtrade:
      "ein Mindestpreis und eine Prämie für die Kooperative der Produzentinnen und Produzenten.",
    "eu-organic": "angebaut ohne synthetische Pestizide und Mineraldünger.",
    "via-verde": "Dallmayrs eigenes Programm: Wiederbewaldung in Äthiopien, pro Tasse finanziert.",
    "blue-planet": "das grössere Wiederbewaldungsprogramm, doppelt so viel pro Tasse zurückgegeben.",
    "rainforest-alliance": "Anbauregeln zu Wald, Boden und Arbeitsbedingungen.",
  },

  milkTitle: "Welche Milch?",
  milkIntro: (sp) =>
    "Die Bohnen sind immer dieselben. Zwischen der günstigsten und der teuersten Milch liegen " +
    sp +
    " CHF versteckte Kosten.",
  milkIntroOne: "Dieses Getränk wird nur auf eine Art serviert.",
  milkNote: (lowest, share, cat) =>
    (lowest ? "Die niedrigsten Kosten hier. " : "") +
    "Die Milch macht " +
    share +
    "% der versteckten Kosten dieser Tasse aus" +
    (cat ? ", vor allem im Bereich " + cat : "") +
    ".",
  noMilk: "Ohne Milch",
  milk: {
    Cow: "Kuhmilch",
    "Lactose-free cow": "Laktosefreie Kuhmilch",
    Oat: "Hafermilch",
    Almond: "Mandelmilch",
    Soy: "Sojamilch",
  },
  lowerNouns: false,

  sugarTitle: "Zucker?",
  sugarLabels: ["Ohne Zucker", "1 Beutel", "2 Beutel", "3 Beutel"],
  sugarIntro: (c) =>
    "Schweizer Rübenzucker, Beutel für Beutel. Jeder fügt " +
    c +
    " CHF versteckte Kosten hinzu: Rübenanbau, Zuckergewinnung und die Pestizidrückstände, die Sie mittrinken.",
  sugarNoteNone: "Die niedrigsten Kosten hier: die Tasse, wie die Maschine sie ausgibt.",
  sugarNote: (p) =>
    "Der Zucker würde " +
    p +
    "% der versteckten Kosten dieser Tasse ausmachen, vor allem durch Anbau und Zuckergewinnung.",
  nothingAdded: "nichts hinzugefügt",

  hiddenLabel: "VERSTECKTE KOSTEN DIESER TASSE",
  contextLine: (pct, paid) =>
    "Rund " +
    pct +
    "% zusätzlich zu den bezahlten " +
    paid +
    " CHF, Schäden, die der Preis nie erwähnt.",
  truePrice: "Wahrer Preis",
  pricePaid: "An der Maschine bezahlter Preis",
  hiddenLegend: "Versteckte Kosten dieser Tasse",
  givenBackLegend: "Durch die Labels zurückgegeben",
  whyLink: "Warum wird überhaupt etwas zurückgegeben?",
  givenBackHead: "WAS ZURÜCKGEGEBEN WIRD",
  offsetNote: (n) =>
    n +
    " finanziert Wiederbewaldung in Äthiopien, die Lebensräume wiederherstellt und Kohlenstoff bindet. Der gleiche Betrag wird jeder Tasse aus diesen Bohnen angerechnet, egal, was Sie bestellen.",
  offsetNone: "Für diese Tasse ist kein Kompensationsprogramm deklariert.",

  whereGoes: (v) => "Wohin die " + v + " CHF gehen",
  catsSub:
    "Jede Art von Schaden wird einzeln bewertet. Öffnen Sie eine, um die Indikatoren dahinter zu sehen.",
  allImpacts: "‹ Alle Auswirkungen",
  byWhat: "Nach Indikator",
  byWhere: "Nach Zutat",
  chfHidden: "CHF versteckte Kosten",
  chfHiddenShort: "CHF versteckt",
  whereFrom: "WOHER ES KOMMT",
  whatMeasures: "WAS ES MISST",
  howFrancs: "WIE DARAUS FRANKEN WERDEN",
  done: "Fertig",
  readMore: "Mehr lesen",
  showLess: "Weniger",
  mixedUnits: "gemischte Einheiten",
  noDefinition: "Für diesen Indikator ist im Datensatz keine Definition hinterlegt.",
  restInds: (n) => n + (n === 1 ? " kleinerer Indikator" : " kleinere Indikatoren"),
  restIngs: (n) => n + " weitere Zutat" + (n === 1 ? "" : "en"),
  origin: (share, ing, stage) =>
    (share === null ? "Vollständig aus " : share + "% aus ") +
    ing +
    (stage ? ", vor allem durch " + stage : ""),
  stageOnly: (stage) => "Vor allem durch " + stage,

  changeTitle: "Eine Sache ändern",
  changeSub: "Ein Wechsel, und was er mit den versteckten Kosten macht.",
  changeNone: "Keine Tasse an dieser Maschine kostet weniger als diese.",
  chipMilk: (m) => "Stattdessen " + m,
  chipLowest: (d) => "Stattdessen " + d + ", die Tasse mit den niedrigsten Kosten hier",
  seeAll: "Alle Tassen dieser Maschine ansehen ›",
  footNote:
    "Versteckte Kosten sind die Schäden dieser Tasse, nach der True-Price-Methode in Franken bewertet. Sie werden Ihrer Rechnung nicht hinzugefügt.",

  yourCup: "‹ Ihre Tasse",
  comparison: "VERGLEICH",
  yours: "IHRE",
  switchTo: "Zu dieser Tasse wechseln",
  cmpTitle: (c) => "Ihre Tasse im Vergleich zu " + c,
  cmpDelta: (s) => s + " CHF versteckt",
  cmpNote: (add, amt, cat) =>
    (add
      ? "Diese Änderung fügt " + amt + " CHF versteckte Kosten hinzu, vor allem im Bereich "
      : "Diese Änderung spart " + amt + " CHF versteckte Kosten, vor allem im Bereich ") +
    cat +
    ".",
  cmpSame: "Gleiche versteckte Kosten in beiden Fällen.",
  noChange: "keine Änderung",

  everyCupTitle: (sp) => "Alle Tassen: " + sp,
  rankSub: (n) => "NIEDRIGSTE VERSTECKTE KOSTEN ZUERST · " + n + " TASSEN",
  ordinal: (n) => n + ".",
  rankNote: (place, nearest, diff) =>
    "Ihre Tasse liegt auf Platz " +
    place +
    " Die nächstgünstigere Tasse ist " +
    nearest +
    ", mit " +
    diff +
    " CHF weniger versteckten Kosten. Tippen Sie auf eine Zeile, um sie mit Ihrer zu vergleichen.",
  rankNoteLowest: "Ihre Tasse hat schon die niedrigsten versteckten Kosten an dieser Maschine.",

  aboutTitle: "ÜBER DIE APP & HAFTUNGSAUSSCHLUSS",
  aboutParas: [
    [
      { t: "Bei Fragen oder Rückmeldungen " },
      { t: "schreiben Sie uns", href: "mailto:true-cost-of-food@epfl.ch" },
      { t: "." },
    ],
    [
      { t: "Diese Anwendung ist Teil eines grösseren Projekts namens " },
      { t: "True Cost of Food", href: "https://truecostoffood.ch/" },
      {
        t: ", das die versteckten Kosten der Lebensmittelproduktion und des Konsums sichtbar machen will.",
      },
    ],
    [
      { t: "Das LEUrE (Labor für Umwelt- und Stadtökonomie, EPFL)", b: true },
      { t: " hat diese Anwendung im Rahmen des Forschungsprojekts " },
      {
        t: "«From Farm to Fork and beyond: A Systemic Approach for Implementing True Cost Accounting for Food in Switzerland»",
        i: true,
      },
      { t: " entwickelt, finanziert vom " },
      { t: "Schweizerischen Nationalfonds (SNF)", b: true },
      { t: ", von 2024 bis 2027 (Projektnummer: 216652)." },
    ],
    [
      { t: "Sie entstand in Partnerschaft zwischen: " },
      { t: "LEUrE (EPFL)", b: true },
      { t: ", " },
      { t: "RESCO (Restaurants, Läden und Hotellerie der EPFL)", b: true },
      { t: ", " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: ", mit Beiträgen von " },
      { t: "Compass Group", b: true },
      { t: " und " },
      { t: "Dallmayr", b: true },
      { t: "." },
    ],
    [
      {
        t: "Die Ergebnisse dieser Anwendung beruhen auf den Daten, dem Umfang und den Grenzen, die in der Anwendung dargestellt und dokumentiert sind, und auf Quellen, die als verlässlich gelten. ",
      },
      { t: "Es wird keine Gewähr", b: true },
      {
        t: " für Richtigkeit, Genauigkeit oder Vollständigkeit übernommen, weder ausdrücklich noch stillschweigend, aufgrund der Art der Daten. Weder die Partner noch eine der Firmen haften für Verluste oder Schäden aus der Nutzung der Anwendung oder der darin gezeigten Informationen.",
      },
    ],
  ],

  indicator: {
    "agricultural land occupation": "Landwirtschaftliche Flächenbelegung",
    "cases of fatal occupational injury": "Tödliche Arbeitsunfälle",
    "cases of non-fatal occupational injury, insured":
      "Nicht tödliche Arbeitsunfälle, versicherte Arbeitskräfte",
    "cases of non-fatal occupational injury, uninsured":
      "Nicht tödliche Arbeitsunfälle, nicht versicherte Arbeitskräfte",
    "children in work by age and not attending school (5-14)":
      "Arbeitende Kinder ohne Schulbesuch (5-14 Jahre)",
    "eco-costs of land-use (brazil), deforestation-related":
      "Öko-Kosten der Landnutzung (Brasilien), durch Entwaldung",
    "eco-costs of land-use (brazil), practice-related":
      "Öko-Kosten der Landnutzung (Brasilien), durch Anbaupraktiken",
    "eco-costs of land-use (colombia), deforestation-related":
      "Öko-Kosten der Landnutzung (Kolumbien), durch Entwaldung",
    "eco-costs of land-use (colombia), practice-related":
      "Öko-Kosten der Landnutzung (Kolumbien), durch Anbaupraktiken",
    "eco-costs of land-use (ecuador), deforestation-related":
      "Öko-Kosten der Landnutzung (Ecuador), durch Entwaldung",
    "eco-costs of land-use (ecuador), practice-related":
      "Öko-Kosten der Landnutzung (Ecuador), durch Anbaupraktiken",
    "eco-costs of land-use (ethiopia), deforestation-related":
      "Öko-Kosten der Landnutzung (Äthiopien), durch Entwaldung",
    "eco-costs of land-use (ethiopia), practice-related":
      "Öko-Kosten der Landnutzung (Äthiopien), durch Anbaupraktiken",
    "eco-costs of land-use (france), deforestation-related":
      "Öko-Kosten der Landnutzung (Frankreich), durch Entwaldung",
    "eco-costs of land-use (france), practice-related":
      "Öko-Kosten der Landnutzung (Frankreich), durch Anbaupraktiken",
    "eco-costs of land-use (india), deforestation-related":
      "Öko-Kosten der Landnutzung (Indien), durch Entwaldung",
    "eco-costs of land-use (india), practice-related":
      "Öko-Kosten der Landnutzung (Indien), durch Anbaupraktiken",
    "eco-costs of land-use (indonesia), deforestation-related":
      "Öko-Kosten der Landnutzung (Indonesien), durch Entwaldung",
    "eco-costs of land-use (indonesia), practice-related":
      "Öko-Kosten der Landnutzung (Indonesien), durch Anbaupraktiken",
    "eco-costs of land-use (switzerland), deforestation-related":
      "Öko-Kosten der Landnutzung (Schweiz), durch Entwaldung",
    "eco-costs of land-use (switzerland), practice-related":
      "Öko-Kosten der Landnutzung (Schweiz), durch Anbaupraktiken",
    "eco-costs of land-use (united states of america), deforestation-related":
      "Öko-Kosten der Landnutzung (Vereinigte Staaten), durch Entwaldung",
    "eco-costs of land-use (united states of america), practice-related":
      "Öko-Kosten der Landnutzung (Vereinigte Staaten), durch Anbaupraktiken",
    "fine particulate matter formation": "Feinstaubbildung",
    "fossil resource scarcity": "Knappheit fossiler Ressourcen",
    "global warming": "Klimaerwärmung",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Informelle Beschäftigung von Landarbeitenden, ohne soziale Absicherung",
    "land use": "Landnutzung",
    "methyl bromide": "Methylbromid",
    "prevalence of excessive working time": "Überlange Arbeitszeiten",
    "prevalence of modern slavery (forced workers, most severe)":
      "Moderne Sklaverei (Zwangsarbeit, schwerste Fälle)",
    "terrestrial acidification": "Bodenversauerung",
    "wage gap from gender discrimination": "Lohnlücke durch Geschlechterdiskriminierung",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "Lohnlücke von Arbeitskräften über dem Mindestlohn, aber unter einem existenzsichernden Lohn",
    "wage gap of workers earning below minimum wage":
      "Lohnlücke von Arbeitskräften unter dem Mindestlohn",
    "water consumption": "Wasserverbrauch",
  },
  indicatorDef: {
    "agricultural land occupation":
      "Misst die Fläche, die während eines Jahres landwirtschaftlich belegt wird, und berücksichtigt dabei die Folgen für Biodiversität, Bodenqualität und Ökosystemleistungen.",
    "cases of fatal occupational injury":
      "Misst die Zahl der arbeitsbedingten Todesfälle pro Produktionseinheit und zeigt damit Lücken bei der Arbeitssicherheit und den Bedarf an besserem Schutz.",
    "cases of non-fatal occupational injury, insured":
      "Erfasst Arbeitsunfälle mit Verletzung bei versicherten Arbeitskräften und zeigt, welche Rolle der soziale Schutz bei finanziellen und gesundheitlichen Risiken spielt.",
    "cases of non-fatal occupational injury, uninsured":
      "Misst Arbeitsunfälle bei Arbeitskräften ohne Versicherung und zeigt damit Schwachstellen im Arbeitsschutz.",
    "fine particulate matter formation":
      "Die Feinstaubbildung [kg PM2.5 eq] beziffert die Luftverschmutzung durch Feinstaub (PM2.5), also Partikel mit weniger als 2,5 Mikrometer Durchmesser. Diese Partikel entstehen vor allem in industriellen Prozessen, bei der Verbrennung fossiler Energien und durch chemische Reaktionen in der Atmosphäre. PM2.5 ist ein Problem für Umwelt und Gesundheit: die Partikel dringen tief in die Lunge ein und führen zu Atemwegs- und Herz-Kreislauf-Erkrankungen, und sie verschlechtern die Luftqualität, etwa durch Smog.",
    "fossil resource scarcity":
      "Die Knappheit fossiler Ressourcen [kg oil-Eq] misst die Erschöpfung nicht erneuerbarer fossiler Rohstoffe wie Erdöl, Kohle und Erdgas über den ganzen Lebensweg eines Produkts. Die Kategorie wird in Kilogramm Öläquivalent (kg oil-Eq) ausgedrückt, also im Energiegehalt der verbrauchten Rohstoffe. Sie zählt in einer Umweltbewertung, weil der Überverbrauch dieser begrenzten Rohstoffe langfristig ein Nachhaltigkeitsproblem schafft.",
    "global warming":
      "Die Klimaerwärmung [kg CO2 eq] ist der langfristige Anstieg der mittleren Temperatur des Planeten. Die vom Menschen verursachte Erwärmung kommt von Tätigkeiten mit hohen Emissionen: dem Verbrennen fossiler Energien, der Tierhaltung und der Änderung der Landnutzung. Daraus entstehen sehr ernste Gefahren wie häufigere Extremwetter, steigende Meeresspiegel und gestörte Ökosysteme, mit schweren Folgen für unser Leben und unsere Lebensgrundlagen: Hunger, Massenmigration und Krieg. Das Ernährungs- und Landwirtschaftssystem verursacht ein Drittel der weltweiten Emissionen aus menschlicher Tätigkeit und ist der wichtigste Treiber der N2O- und CH4-Emissionen, mit 82 % beziehungsweise 44 %. Die Emissionen der Landwirtschaft stammen vor allem aus der Bodenbearbeitung (zum Beispiel Pflügen), dem Abbau von Bodenmaterial, den Betriebsmitteln (fossile Energien, Pestizide, Dünger) und dem Einsatz von Maschinen.",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Misst den Anteil der Landarbeitenden ohne festen Vertrag, ohne Sozialversicherung und ohne Arbeitsschutz und zeigt so die Verwundbarkeit des Arbeitsmarktes.",
    "land use":
      "Die Landnutzung [m2a crop eq] bewertet die Umweltfolgen der Belegung und Umwandlung von Land durch Landwirtschaft oder Industrie. Landnutzung ist ein zentraler Faktor, weil sie Biodiversität, Bodengesundheit, Wasserkreisläufe und Ökosystemleistungen beeinflusst.",
    "prevalence of excessive working time":
      "Diese Kennzahl beziffert den Anteil der Landarbeitenden, die über die gesetzlich erlaubte oder international empfohlene Arbeitszeit hinaus arbeiten, bezogen auf die Produktion. Überlange Arbeitszeiten gehen mit Müdigkeit, Arbeitsunfällen und geringerem Wohlbefinden einher.",
    "prevalence of modern slavery (forced workers, most severe)":
      "Erfasst extreme Fälle von Zwangsarbeit, in denen Arbeitskräfte Drohungen, Gewalt oder den vollständigen Verlust ihrer Selbstbestimmung erleben, und zeigt damit schwere Ausbeutung.",
    "terrestrial acidification":
      "Die Bodenversauerung entsteht, wenn der Säuregrad des Bodens schädlich vom optimalen Wert abweicht. Die Versauerung der Umwelt wird durch Schwefel- und Stickoxide aus menschlichen und natürlichen Quellen verursacht. Auf Ackerland sind die Hauptursachen Dünger auf Ammonium- und Harnstoffbasis, Schwefeldünger und der Anbau von Leguminosen. Versauerung schädigt Wälder und Oberflächengewässer, vor allem auf schwachen Böden. Sie wirkt auch auf das Pflanzenwachstum und damit auf die Erträge, weil der pH-Wert die Verfügbarkeit der Nährstoffe verändert.",
    "wage gap from gender discrimination":
      "Die Lohnlücke durch Geschlechterdiskriminierung [CHF/kg] beziffert den Einkommensunterschied zwischen Männern und Frauen, bezogen auf die Produktion. Die Kennzahl zeigt die wirtschaftlichen Unterschiede, die aus Diskriminierung am Arbeitsplatz entstehen, und damit strukturelle Ungleichheiten, die das Einkommen und die wirtschaftliche Sicherheit von Frauen treffen.",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "Die Lohnlücke von Arbeitskräften über dem Mindestlohn, aber unter einem existenzsichernden Lohn [CHF/kg] beziffert den Abstand zwischen ihrem Einkommen und einem existenzsichernden Lohn, bezogen auf die Produktion. Die Kennzahl zeigt die Lage von Menschen, die mehr als den gesetzlichen Mindestlohn verdienen, aber trotzdem nicht genug für die Grundbedürfnisse und ein würdiges Leben.",
    "wage gap of workers earning below minimum wage":
      "Die Lohnlücke von Arbeitskräften unter dem Mindestlohn [CHF/kg] beziffert den Abstand zwischen ihrem Einkommen und dem gesetzlichen Mindestlohn, bezogen auf die Produktion. Die Kennzahl zeigt das Ausmass wirtschaftlicher Ausbeutung und der Verletzung von Arbeitsrechten, also echte Probleme mit Einkommenssicherheit und unfairen Praktiken.",
    "water consumption":
      "Der Wasserverbrauch [m3] bezeichnet die Nutzung von Wasser auf eine Art, bei der es verdunstet, in Produkte eingebaut, in andere Einzugsgebiete geleitet oder ins Meer abgegeben wird. Es steht damit im Ursprungsgebiet weder Menschen noch Ökosystemen zur Verfügung. Die Wasserressourcen stehen durch Bevölkerungswachstum und steigende Nachfrage nach Nahrung immer stärker unter Druck, und die Landwirtschaft macht den grössten Teil des weltweiten Süsswasserverbrauchs aus. Wassermangel trifft Wasserlebewesen direkt, senkt die Erträge und kann zu Mangelernährung führen.",
  },
  indicatorMethod: {
    "agricultural land occupation":
      "Ein Ausgleichskostensatz, der die Opportunitätskosten der Flächenbelegung ausdrückt, gestützt auf den Wert der Ökosystemleistungen der wichtigsten Biome aus einer Metaanalyse von TEEB (de Groot et al., 2012). Länderspezifische Faktoren lassen sich aus der Biomabdeckung je Land ableiten.",
    "cases of fatal occupational injury":
      "Die Kosten setzen sich aus Ausgleich, Vermeidung und Sanktion zusammen. Der Ausgleich umfasst die medizinischen Kosten nicht versicherter Arbeitsunfälle, den Gesundheitsverlust (DALY) bei nicht tödlichen Fällen und den statistischen Wert eines Lebens (VSL) bei tödlichen Fällen. Die Vermeidung deckt die Kosten von Audits, die künftige Verstösse verhindern. Die Sanktion ist eine globale Strafe für Betriebe, die Vorschriften zu Gesundheit und Sicherheit verletzen.",
    "cases of non-fatal occupational injury, insured":
      "Die Kosten setzen sich aus Ausgleich, Vermeidung und Sanktion zusammen. Der Ausgleich umfasst die medizinischen Kosten nicht versicherter Arbeitsunfälle, den Gesundheitsverlust (DALY) bei nicht tödlichen Fällen und den statistischen Wert eines Lebens (VSL) bei tödlichen Fällen. Die Vermeidung deckt die Kosten von Audits, die künftige Verstösse verhindern. Die Sanktion ist eine globale Strafe für Betriebe, die Vorschriften zu Gesundheit und Sicherheit verletzen.",
    "cases of non-fatal occupational injury, uninsured":
      "Die Kosten setzen sich aus Ausgleich, Vermeidung und Sanktion zusammen. Der Ausgleich umfasst die medizinischen Kosten nicht versicherter Arbeitsunfälle, den Gesundheitsverlust (DALY) bei nicht tödlichen Fällen und den statistischen Wert eines Lebens (VSL) bei tödlichen Fällen. Die Vermeidung deckt die Kosten von Audits, die künftige Verstösse verhindern. Die Sanktion ist eine globale Strafe für Betriebe, die Vorschriften zu Gesundheit und Sicherheit verletzen.",
    "fine particulate matter formation":
      "Ein Ausgleichskostensatz, der die sozialen Kosten der Verschmutzung ausdrückt und den Verlust an wirtschaftlicher Wohlfahrt zeigt, wenn Schadstoffe in die Umwelt gelangen, mit Blick auf Schäden für die menschliche Gesundheit (Morbidität, also Krankheit, und vorzeitige Sterblichkeit). Die Endbewertung der menschlichen Gesundheit stützt sich auf den Wert eines DALY (behinderungsbereinigtes Lebensjahr), wie oben für die Humantoxizität beschrieben. Die Umrechnungsfaktoren von Midpoint zu Endpoint aus ReCiPe 2016 für die Feinstaubbildung dienen der Ableitung der Monetarisierungsfaktoren (Huijbregts et al., 2016). Auf Midpoint-Ebene hat der Indikator nur eine globale Monetarisierung. Länderspezifische Umrechnungsfaktoren lassen sich für einzelne Gase (NOx, SOx, NMVOC) mit der Methode aus (Galgani, Woltjer, et al., 2023) ableiten. (True Price 2023)",
    "fossil resource scarcity":
      "Ein Ausgleichskostensatz, der den künftigen Verlust an wirtschaftlicher Wohlfahrt durch höhere Förderkosten fossiler Energien ausdrückt (Huijbregts et al., 2016). (True Price 2023)",
    "global warming":
      "Ein Wiederherstellungskostensatz, der die Vermeidungskosten ausdrückt, um die Ziele zur Senkung der Treibhausgase aus dem Pariser Abkommen (Zwei-Grad-Ziel) zu erreichen, gestützt auf eine Metastudie mit 62 Schätzungen der Grenzvermeidungskosten (Kuik et al., 2009). (True Price 2023)",
    "informal employment rate of agricultural workers & uncovered by social protection floors/systems":
      "Eine Kombination aus Vermeidungs- und Sanktionskosten. Die Vermeidungskosten stehen für den Aufbau generischer Audits, um künftige Fälle zu verhindern. Die Sanktionskosten sind eine Strafe für Arbeitskräfte ohne Sozialversicherung.",
    "land use":
      "Ein Ausgleichskostensatz, der die Opportunitätskosten der Flächenbelegung ausdrückt, gestützt auf den Wert der Ökosystemleistungen der wichtigsten Biome aus einer Metaanalyse von TEEB (de Groot et al., 2012). Länderspezifische Faktoren lassen sich aus der Biomabdeckung je Land ableiten. (True Price 2023)",
    "prevalence of excessive working time":
      "Die Kosten umfassen Ausgleich, Vermeidung und Sanktion. Der Ausgleich deckt die Lohnlücke aus unterbezahlter Mehrarbeit, angepasst an die Teuerung. Die Vermeidung finanziert Audits, um künftige Fälle zu verhindern. Die Sanktion ist eine globale Strafe für überlange oder unterbezahlte Mehrarbeit.",
    "prevalence of modern slavery (forced workers, most severe)":
      "Die Kosten umfassen Wiederherstellung, Ausgleich, Vermeidung und Sanktion. Die Wiederherstellung deckt entgangenes Einkommen und die Kosten der Wiedereingliederung von Zwangsarbeitenden. Der Ausgleich bewertet die Gesundheitsfolgen für Opfer von Gewalt mit dem DALY. Die Vermeidung finanziert Audits, um künftige Fälle zu verhindern. Die Sanktion ist eine globale Strafe für Zwangsarbeit. Zusätzliche Kosten für Belästigung können dazukommen, wenn sie zutreffen.",
    "terrestrial acidification":
      "Ein Ausgleichskostensatz, der die sozialen Kosten der Verschmutzung ausdrückt und den Verlust an wirtschaftlicher Wohlfahrt zeigt, wenn Schadstoffe in die Umwelt gelangen, mit Blick auf Schäden an Ökosystemen. Diese Schäden werden über den Wert der verlorenen Ökosystemleistungen bewertet, wie oben für die Ökotoxizität beschrieben. Die Umrechnungsfaktoren von Midpoint zu Endpoint aus ReCiPe 2016 für die Versauerung dienen der Ableitung der Monetarisierungsfaktoren (Huijbregts et al., 2016). Auf Midpoint-Ebene hat der Indikator nur eine globale Monetarisierung. Länderspezifische Umrechnungsfaktoren lassen sich für einzelne Gase (NH3, SOx, NOx) mit der Methode aus (Galgani, Woltjer, et al., 2023) verwenden. (True Price 2023)",
    "wage gap from gender discrimination":
      "Eine Kombination aus Wiederherstellungs-, Vermeidungs- und Sanktionskosten. Die Wiederherstellungskosten stehen für die Rückerstattung des Lohns, der durch verweigerten Mutterschaftsurlaub, Geschlechterdiskriminierung und ungleiche Chancen verloren ging, angepasst an die Teuerung (jährliche Inflation) wegen des verspäteten Einkommens. Die Vermeidungskosten stehen für den Aufbau generischer Audits, um künftige Fälle von Diskriminierung zu verhindern. (True Price 2023)",
    "wage gap of workers earning above minimum wage but below decent living wage":
      "Eine Kombination aus Ausgleichs-, Vermeidungs- und Sanktionskosten. Die Ausgleichskosten drücken den Abstand zu einem existenzsichernden Lohn aus, angepasst an die Teuerung (jährliche Inflation) wegen des verspäteten Einkommens. Die Vermeidungskosten stehen für den Aufbau generischer Audits, um künftige Fälle zu verhindern. Die Sanktionskosten sind eine Strafe für den Teil der Lohnlücke, der unter dem gesetzlichen Mindestlohn liegt, berechnet aus dem gewichteten Mittel der Strafen mehrerer Länder, was eine globale Strafe ergibt. (True Price 2023)",
    "wage gap of workers earning below minimum wage":
      "Eine Kombination aus Ausgleichs-, Vermeidungs- und Sanktionskosten. Die Ausgleichskosten drücken den Abstand zu einem existenzsichernden Lohn aus, angepasst an die Teuerung (jährliche Inflation) wegen des verspäteten Einkommens. Die Vermeidungskosten stehen für den Aufbau generischer Audits, um künftige Fälle zu verhindern. Die Sanktionskosten sind eine Strafe für den Teil der Lohnlücke, der unter dem gesetzlichen Mindestlohn liegt, berechnet aus dem gewichteten Mittel der Strafen mehrerer Länder, was eine globale Strafe ergibt. (True Price 2023)",
    "water consumption":
      "Ein Wiederherstellungskostensatz, der die auf ein Jahr umgelegten Kosten der Entsalzung ausdrückt, inklusive Betrieb und Unterhalt, elektrischer und thermischer Energie sowie der Deckung und Rückzahlung der anfänglichen Investitions- und Betriebskosten der Entsalzung (World Bank, 2012). (True Price 2023)",
  },
  defFamily: {
    pesticide: (n, u) =>
      n +
      " [" +
      u +
      "] ist ein beim Anbau eingesetztes Pestizid, dessen Rückstände auf dem Produkt bleiben und von den Konsumierenden aufgenommen werden können, was negative Folgen für die Gesundheit hat.",
    landUse: () =>
      "Die Öko-Kosten der Landnutzung sind eine Kennzahl der Umweltwirkung, die den Preis der Landnutzung durch menschliche Tätigkeiten beziffert, vor allem in Landwirtschaft, Forstwirtschaft und Siedlungsbau. Sie bilden den Verlust an Biodiversität, die Bodendegradation und den Verlust von Ökosystemleistungen ab, die durch Belegung und Umwandlung von Land entstehen.",
  },
  methodFamily: {
    kidney:
      "Vermeidungskosten: die Kosten der Behandlung einer nierenkranken Person während eines Jahres (True Cost Accounting Agrifood Handbook).",
    palmOil:
      "Für die Öko-Kosten der Landnutzung in Tropenwäldern (Biodegradation) wurden die Vermeidungskosten für Biodiversität am Beispiel der Palmölproduktion in Indonesien berechnet (einer der schlimmsten Fälle von Biodiversitätsverlust). Die Vermeidungsmassnahme besteht darin, die Palmölproduktion zu stoppen und durch Öl aus landwirtschaftlichen Abfällen zu ersetzen (biobasiertes Öl durch Pyrolyse von Abfall). Diese Vermeidungskosten werden für 2024 auf 6,87 €/m2 geschätzt (2022 waren es 6 €/m2) und gelten für Land mit 4000 Gefässpflanzenarten pro 10 000 km2 (Fall Sumatra und ein grosser Teil Kalimantans). Der Verlust von 4000 Arten pro 10 000 km2 gilt als Norm für Palmölplantagen: Biodiversitätsfaktor = 1. Andere Länder werden über einen Biodiversitätsfaktor mit dieser Norm verglichen. (https://www.ecocostsvalue.com/ecocosts/eco-costs-land-use/)",
  },

  rail: ["1 GETRÄNK", "2 KAFFEE", "3 MILCH", "4 ZUCKER"],
  cats: {
    Environment: "Umwelt",
    Livelihoods: "Lebensgrundlagen",
    Health: "Gesundheit",
    Biodiversity: "Biodiversität",
  },
  catBlurb: {
    Environment:
      "Klima, Boden, Wasser und Luft, bewertet mit dem Betrag, der den Schaden verhindern würde.",
    Livelihoods:
      "Die Lücke zwischen dem Lohn der Menschen im Anbau und einem existenzsichernden Lohn.",
    Health: "Pestizidrückstände, die in der Tasse landen, und damit bei der Person, die sie trinkt.",
    Biodiversity: "Arten und Lebensräume, die durch die beanspruchte Fläche verloren gehen.",
  },
  ing: {
    "Coffee beans": "Kaffeebohnen",
    "Cow milk": "Kuhmilch",
    Oat: "Haferdrink",
    Almond: "Mandeldrink",
    Soybeans: "Sojabohnen",
    "Cocoa beans": "Kakaobohnen",
    Sugarbeet: "Zucker",
    Sugar: "Zucker",
  },
  stage: {
    "Processing, Roast and ground": "das Rösten und Mahlen",
    "Processing, Cocoa processing": "die Kakaoverarbeitung",
    Production: "den Anbau",
    Transport: "den Transport",
    "End of life, industrial-composting": "das Lebensende (industrielle Kompostierung)",
    "Production & Processing": "Anbau und Verarbeitung",
    Consumption: "den Konsum",
    "Processing, Almond beverage": "die Herstellung des Mandeldrinks",
    "Processing, Soybean beverage": "die Herstellung des Sojadrinks",
    "Processing, Sugar extraction": "die Zuckergewinnung",
    "Transport, Field to Storage": "den Transport vom Feld zum Lager",
    "Transport, Manufacture-to-Retail": "den Transport vom Werk zum Verkaufspunkt",
    "Transport, Retail-to-Waste": "den Transport vom Verkaufspunkt zum Abfall",
    "Transport, Storage-to-Port": "den Transport vom Lager zum Hafen",
    Cultivation: "den Anbau",
    "End-use": "die Nutzung",
    "Roasting & Ground": "das Rösten und Mahlen",
    Decaffeination: "die Entkoffeinierung",
    Manufacturing: "die Herstellung",
  },
};

export default de;
