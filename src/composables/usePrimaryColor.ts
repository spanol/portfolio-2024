import { computed } from "vue";
import { useTheme } from "./useTheme";

// Three.js shaders still need a hue value; the interface accent itself lives
// in the semantic CSS tokens so it remains steady throughout the session.
export function usePrimaryColor() {
  const { isMatrix } = useTheme();
  const hue = computed(() => (isMatrix.value ? 120 : 80));

  return { hue };
}
