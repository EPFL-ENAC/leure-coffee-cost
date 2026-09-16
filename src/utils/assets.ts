// URLs for everything under public/.
//
// The routes are nested now (/le-klee/d/cafe), so a relative "./data/x" would
// resolve against the current path. Everything goes through BASE_URL instead.

const BASE = import.meta.env.BASE_URL || "/";

export function asset(path: string): string {
  return BASE + path.replace(/^\//, "");
}

export const dataUrl = (path: string) => asset("data/" + path);
export const labelUrl = (file: string) => asset("labels/" + file);
export const coffeeUrl = (name: string) => asset("coffee/" + name + ".svg");
