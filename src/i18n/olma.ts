// Texts that change for the OLMA dataset. Everything else comes from the
// language tables. The EPFL texts talk about a coffee machine, offsetting and
// the EPFL partners, OLMA has none of these.

import type { LangCode, Seg, Strings } from "@/i18n/types";
import en from "@/i18n/en";
import fr from "@/i18n/fr";
import de from "@/i18n/de";

/** Same about text, only the partner paragraph changes. */
function withPartners(base: Seg[][], partners: Seg[]): Seg[][] {
  return base.map((para) => (para.some((seg) => seg.t.startsWith("RESCO")) ? partners : para));
}

// TODO: confirm the partner list for OLMA with LEUrE
const olma: Record<LangCode, Partial<Strings>> = {
  en: {
    loading: "Loading the data…",
    errPre: "Could not load the data.",
    drinkFoot:
      "Prices shown are the average prices of a coffee and a cappuccino in Switzerland. Hidden costs are the cost to prevent or repair the damage these drinks cause along their whole value chain.",
    beanSub:
      "Same drink, different beans. The label and the country the beans come from change the hidden cost.",
    pricePaid: "Price paid",
    sugarNoteNone: "Lowest here, the drink as it is served.",
    changeNone: "No drink here has a lower hidden cost.",
    seeAll: "See every drink ›",
    rankNoteLowest: "Yours already has the lowest hidden cost here.",
    beanWord: { Conventionnel: "Conventional" },
    aboutParas: withPartners(en.aboutParas, [
      { t: "It was developed as part of a partnership between: " },
      { t: "LEUrE (EPFL)", b: true },
      { t: " and " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: "." },
    ]),
  },
  fr: {
    loading: "Chargement des données…",
    errPre: "Impossible de charger les données.",
    drinkFoot:
      "Les prix affichés correspondent aux prix moyens du café et du cappuccino en Suisse. Les coûts cachés représentent les coûts liés à la prévention ou à la réparation des dommages générés par ces boissons tout au long de leur chaîne de valeur.",
    beanSub:
      "Même boisson, autres grains. Le label et le pays d’origine des grains changent le coût caché.",
    pricePaid: "Prix payé",
    sugarNoteNone: "Le coût le plus bas ici : la boisson telle qu’elle est servie.",
    changeNone: "Aucune boisson ici n’a un coût caché plus bas.",
    seeAll: "Voir toutes les boissons ›",
    everyCupTitle: () => "Toutes les boissons à l’OLMA",
    rankNoteLowest: "La vôtre a déjà le coût caché le plus bas ici.",
    beanWord: {
      Brazil: "Brésil",
      Colombia: "Colombie",
      India: "Inde",
      Indonesia: "Indonésie",
    },
    aboutParas: withPartners(fr.aboutParas, [
      { t: "Elle a été développée dans le cadre d’un partenariat entre : " },
      { t: "LEUrE (EPFL)", b: true },
      { t: " et " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: "." },
    ]),
  },
  de: {
    loading: "Daten werden geladen…",
    errPre: "Die Daten konnten nicht geladen werden.",
    drinkFoot:
      "Die angegebenen Preise entsprechen den durchschnittlichen Preisen für Kaffee und Cappuccino in der Schweiz. Die versteckten Kosten entstehen durch die Schäden, die diese Getränke entlang der gesamten Wertschöpfungskette verursachen.",
    beanSub:
      "Gleiches Getränk, andere Bohnen. Das Label und das Herkunftsland der Bohnen verändern die versteckten Kosten.",
    pricePaid: "Bezahlter Preis",
    sugarNoteNone: "Die niedrigsten versteckten Kosten: das Getränk, wie es serviert wird.",
    changeNone: "Kein Getränk hier hat niedrigere versteckte Kosten.",
    seeAll: "Alle Getränke ansehen ›",
    everyCupTitle: () => "Alle Getränke an der OLMA",
    rankNoteLowest: "Ihr Getränk hat schon die niedrigsten versteckten Kosten hier.",
    beanWord: {
      Conventionnel: "Konventionell",
      Brazil: "Brasilien",
      Colombia: "Kolumbien",
      India: "Indien",
      Indonesia: "Indonesien",
    },
    aboutParas: withPartners(de.aboutParas, [
      { t: "Sie entstand in einer Partnerschaft von: " },
      { t: "LEUrE (EPFL)", b: true },
      { t: " und " },
      { t: "ENAC-IT-4-Research (EPFL)", b: true },
      { t: "." },
    ]),
  },
};

export default olma;
