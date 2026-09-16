import { watch } from "vue";
import { useRouter } from "vue-router";
import { toDrinks } from "@/utils/routes";

/**
 * A shared link, or a QR code printed months ago, can name a drink or a cup
 * that is not in the data any more. Send it back to the drink list instead of
 * drawing an empty screen. The data is already loaded when a view runs, so a
 * null here means the URL is wrong, not that we are still waiting.
 */
export function useKnown(found: () => unknown, salePoint: () => string): void {
  const router = useRouter();
  watch(
    found,
    (v) => {
      if (!v) router.replace(toDrinks(salePoint()));
    },
    { immediate: true }
  );
}
