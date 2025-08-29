<template>
  <div class="list">
    <div
      v-for="note in notes"
      :key="note.id"
      class="item"
      :class="{ selected: note.id === selectedId }"
      @click="$emit('select', note.id)"
    >
      <div class="title">{{ note.title || 'Untitled' }}</div>
      <div class="snippet">{{ (note.content || '').slice(0, 80) }}</div>
      <div class="meta">
        <span>{{ formatDate(note.updated_at || note.created_at) }}</span>
      </div>
    </div>
    <div v-if="!notes || notes.length === 0" class="empty">
      No notes yet. Click "New Note" to create one.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes'

defineProps<{
  notes: Note[]
  selectedId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
}>()

function formatDate(dt?: string) {
  if (!dt) return ''
  const d = new Date(dt)
  return d.toLocaleString()
}
</script>

<style scoped>
.list {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item {
  padding: 10px;
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.item:hover {
  border-color: var(--color-primary);
}

.item.selected {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(130, 177, 255, 0.25);
}

.title {
  font-weight: 600;
  margin-bottom: 6px;
}

.snippet {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 6px;
}

.meta {
  color: var(--muted);
  font-size: 12px;
}
.empty {
  color: var(--muted);
  text-align: center;
  padding: 12px;
}
</style>
