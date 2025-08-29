<template>
  <div class="page">
    <div v-if="!note && state.loading" class="panel">Loading...</div>
    <div v-else-if="note" class="panel">
      <NoteEditor
        :note="note"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
    <div v-else class="panel">
      <p>Note not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteEditor from '~/components/NoteEditor.vue'
import { getSelectedNote, updateNote, deleteNote, useNotesState, loadNotes } from '~/composables/useNotes'

const route = useRoute()
const state = useNotesState()
const note = getSelectedNote()

onMounted(async () => {
  const id = route.params.id as string
  if (!state.notes.value.length) {
    await loadNotes()
  }
  // ensure selected is the route id
  state.selectedId.value = id
})

async function onSave(payload: { title: string; content: string }) {
  if (!note.value) return
  await updateNote(note.value.id, payload)
}

async function onDelete() {
  if (!note.value) return
  const id = note.value.id
  await deleteNote(id)
  navigateTo('/')
}
</script>

<style scoped>
.page { width: 100%; }
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
</style>
