import { ref, computed } from "vue";

type Theme = "light" | "dark" | "matrix";

const theme = ref<Theme>("dark");

function applyTheme(t: Theme) {
  theme.value = t;
  localStorage.setItem("theme", t);
  document.documentElement.setAttribute("data-theme", t);

  if (t === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (favicon) {
    const faviconMap: Record<Theme, string> = {
      light: "/favicon-light.svg",
      dark: "/favicon-dark.svg",
      matrix: "/favicon-matrix.svg",
    };
    favicon.href = faviconMap[t];
  }
}

function cycleTheme() {
  const order: Theme[] = ["light", "dark", "matrix"];
  const currentIndex = order.indexOf(theme.value);
  const next = order[(currentIndex + 1) % order.length];
  applyTheme(next);
}

function initTheme() {
  const saved = localStorage.getItem("theme") as Theme | null;
  const validThemes: Theme[] = ["light", "dark", "matrix"];
  const initial = saved && validThemes.includes(saved) ? saved : "dark";
  applyTheme(initial);
}

export function useTheme() {
  const isMatrix = computed(() => theme.value === "matrix");
  const isDark = computed(() => theme.value === "dark");

  return {
    theme,
    isMatrix,
    isDark,
    cycleTheme,
    applyTheme,
    initTheme,
  };
}
