import type { LangCode, Strings } from "@/i18n/types";
import en from "@/i18n/en";
import fr from "@/i18n/fr";
import de from "@/i18n/de";

export const LANGS: LangCode[] = ["en", "fr", "de"];

export const TABLES: Record<LangCode, Strings> = { en, fr, de };

export function isLang(v: unknown): v is LangCode {
  return typeof v === "string" && (LANGS as string[]).includes(v);
}

export type { LangCode, Strings };
