// Number and text formatting, ported from the True Cost prototype.

/** Money with a real minus sign, 2 decimals by default. */
export function money(v: number, dp = 2): string {
  return (v < 0 ? "−" : "") + Math.abs(v).toFixed(dp);
}

/** Bar width as a percent of max, never so small it disappears. */
export function pct(v: number, max: number): string {
  if (!max) return "1.5%";
  return Math.max(1.5, (Math.abs(v) / max) * 100).toFixed(1) + "%";
}

/** A physical value with enough digits to be readable, whatever its size. */
export function sig(v: number): string {
  const a = Math.abs(v);
  if (a === 0) return "0";
  if (a >= 100) return v.toFixed(0);
  if (a >= 1) return v.toFixed(2);
  if (a >= 0.001) {
    return v
      .toPrecision(3)
      .replace(/0+$/, "")
      .replace(/\.$/, "");
  }
  return v.toExponential(2);
}

/**
 * The source CSV keeps a few characters as their cp1252 code in plain text
 * ("planet\92s", "m\B2/kg") and escapes the percent sign. Put the real
 * characters back before showing the text.
 */
const CP1252_HIGH = "\u20ac\u0081\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160\u2039\u0152\u008d\u017d\u008f\u0090\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u02dc\u2122\u0161\u203a\u0153\u009d\u017e\u0178";

export function unescapeCp1252(t: string): string {
  return (t || "")
    .replaceAll(/\\([89a-f][0-9a-f])/gi, (_m, hex: string) => {
      const code = parseInt(hex, 16);
      return code < 0xa0 ? CP1252_HIGH[code - 0x80] : String.fromCharCode(code);
    })
    .replaceAll("\\%", "%");
}

/** Cuts a long definition at the last full sentence, or adds an ellipsis. */
export function tidy(t: string): string {
  const s = (t || "").trim();
  if (!s || /[.!?]$/.test(s)) return s;
  const dot = s.lastIndexOf(". ");
  if (dot > 40) return s.slice(0, dot + 1);
  const sp = s.lastIndexOf(" ");
  return (sp > 0 ? s.slice(0, sp) : s) + "…";
}

export function firstSentence(t: string): string {
  const i = t.indexOf(". ");
  return i > 0 ? t.slice(0, i + 1) : tidy(t);
}

export function restSentences(t: string): string {
  const i = t.indexOf(". ");
  return i > 0 ? tidy(t.slice(i + 2)) : "";
}

/** URL slug: lower case, no accents, dashes between words. */
export function slug(s: string): string {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
