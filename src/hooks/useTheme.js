import { useCallback, useEffect, useState } from "react";

const KEY = "fn-theme";
const PAPER = { dark: "#1c1a16", light: "#e6dfcf" };

const currentTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/**
 * Theme lives on <html data-theme>. The initial value is written by the inline
 * script in index.html, so React only ever takes over from there — no flash.
 */
export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", PAPER[theme]);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // Safari private mode — the theme simply won't persist.
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((value) => (value === "light" ? "dark" : "light"));
  }, []);

  return [theme, toggle];
}
