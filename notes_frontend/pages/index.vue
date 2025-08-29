<template>
  <div class="home">
    <div v-if="state.loading" class="panel">Loading notes...</div>
    <div v-else-if="selected && isAuthenticated" class="panel">
      <NoteEditor
        :note="selected"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
    <div v-else-if="isAuthenticated" class="panel">
      <p>Select or create a note to begin.</p>
    </div>
    <div v-else class="panel">
      <p>Please sign in to view and edit your notes.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteEditor from '~/components/NoteEditor.vue'
import { getSelectedNote, updateNote, deleteNote, loadNotes, useNotesState } from '~/composables/useNotes'
import { useIsAuthenticated } from '~/composables/useAuth'

const state = useNotesState()
const isAuthenticated = useIsAuthenticated()
const selected = getSelectedNote()

onMounted(async () => {
  if (isAuthenticated.value && state.notes.value.length === 0) {
    await loadNotes()
  }
})

async function onSave(payload: { title: string; content: string }) {
  if (!selected.value) return
  await updateNote(selected.value.id, payload)
}

async function onDelete() {
  if (!selected.value) return
  const id = selected.value.id
  await deleteNote(id)
  navigateTo('/')
}
</script>

<style scoped>
.home { width: 100%; }
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
</style>
