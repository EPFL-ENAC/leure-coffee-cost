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
      "Prices are what you pay at OLMA. The hidden cost is the damage each beverage causes, priced in francs. Price plus hidden cost gives the true price.",
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
      "Les prix sont ceux payés à l’OLMA. Le coût caché, ce sont les dommages causés par chaque boisson, chiffrés en francs. Prix + coût caché = prix réel.",
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
      "Die Preise sind die OLMA-Preise. Die versteckten Kosten sind die Schäden, die jedes Getränk verursacht, in Franken bewertet. Preis plus versteckte Kosten ergibt den wahren Preis.",
    beanSub:
      "Gleiches Getränk, andere Bohnen. Das Label und das Herkunftsland der Bohnen verändern die versteckten Kosten.",
    pricePaid: "Bezahlter Preis",
    sugarNoteNone: "Die niedrigsten Kosten hier: das Getränk, wie es serviert wird.",
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
