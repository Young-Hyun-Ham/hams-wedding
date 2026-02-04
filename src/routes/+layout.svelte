<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "./layout.css";
  import { browser } from "$app/environment";

  const KEY = "anniv:theme:v1"; // localStorage 키

  function applyTheme(theme: "light" | "dark") {
    document.documentElement.dataset.theme = theme;
  }

  // 브라우저에서만 실행 (SSR/프리렌더 안전)
  if (browser) {
    const saved = localStorage.getItem(KEY) as "light" | "dark" | null;

    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#ff5aa7" />
</svelte:head>

<div style="padding-top: var(--safe-top); padding-bottom: var(--safe-bottom); min-height: 100dvh;">
  <slot />
</div>
