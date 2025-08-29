<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#82b1ff" :height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --color-primary: #1976d2;
  --color-secondary: #424242;
  --color-accent: #82b1ff;
  --bg: #f8fafc;
  --panel: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #e5e7eb;
}

html, body, #__nuxt {
  height: 100%;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

a { color: var(--color-primary); text-decoration: none; }
button { font-family: inherit; }

.app-root {
  min-height: 100vh;
}
</style>
