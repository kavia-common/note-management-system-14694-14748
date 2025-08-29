<template>
  <div class="panel">
    <h2>API Debug</h2>
    <p><strong>API Base:</strong> {{ apiBase }}</p>
    <p><strong>Site URL:</strong> {{ siteUrl }}</p>
    <button class="ghost" @click="testPing">Test /notes (GET)</button>
    <pre class="result">{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
import { apiFetch } from '~/utils/api'

const cfg = useRuntimeConfig()
const apiBase = cfg.public.apiBase
const siteUrl = cfg.public.siteUrl
const result = ref('')

async function testPing() {
  try {
    const res = await apiFetch<any>('/notes', { method: 'GET' })
    result.value = JSON.stringify(res, null, 2)
  } catch (e: any) {
    result.value = e?.message || JSON.stringify(e, null, 2)
  }
}
</script>

<style scoped>
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
.result {
  background: #f3f4f6;
  padding: 10px;
  border-radius: 8px;
  overflow: auto;
}
.ghost {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
