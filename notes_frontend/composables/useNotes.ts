import { ref, computed } from 'vue'
import { apiFetch } from '~/utils/api'

export type Note = {
  id: string
  title: string
  content: string
  updated_at?: string
  created_at?: string
}

const notes = ref<Note[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const selectedId = ref<string | null>(null)
const searchQuery = ref('')

/**
 * PUBLIC_INTERFACE
 * useNotesState - expose reactive state for notes, selection, search, loading, error.
 */
export function useNotesState() {
  return {
    notes,
    loading,
    error,
    selectedId,
    searchQuery,
  }
}

/**
 * PUBLIC_INTERFACE
 * useFilteredNotes - computed list filtered by search query.
 */
export function useFilteredNotes() {
  return computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return notes.value
    return notes.value.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q),
    )
  })
}

/**
 * PUBLIC_INTERFACE
 * loadNotes - fetch all notes from backend.
 */
export async function loadNotes() {
  loading.value = true
  error.value = null
  try {
    const data = await apiFetch<Note[]>('/notes', { method: 'GET' })
    notes.value = data.sort((a, b) => {
      const aTime = new Date(a.updated_at ?? a.created_at ?? 0).getTime()
      const bTime = new Date(b.updated_at ?? b.created_at ?? 0).getTime()
      return bTime - aTime
    })
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load notes'
  } finally {
    loading.value = false
  }
}

/**
 * PUBLIC_INTERFACE
 * createNote - create a new note; returns created note and selects it.
 */
export async function createNote(payload: Partial<Note>) {
  const created = await apiFetch<Note>('/notes', {
    method: 'POST',
    body: payload,
  })
  notes.value.unshift(created)
  selectedId.value = created.id
  return created
}

/**
 * PUBLIC_INTERFACE
 * updateNote - update a note by id; updates local list as well.
 */
export async function updateNote(id: string, payload: Partial<Note>) {
  const updated = await apiFetch<Note>(`/notes/${id}`, {
    method: 'PUT',
    body: payload,
  })
  const idx = notes.value.findIndex(n => n.id === id)
  if (idx >= 0) {
    notes.value[idx] = { ...notes.value[idx], ...updated }
  }
  return updated
}

/**
 * PUBLIC_INTERFACE
 * deleteNote - delete by id; removes from local list and adjusts selection.
 */
export async function deleteNote(id: string) {
  await apiFetch<void>(`/notes/${id}`, { method: 'DELETE' })
  const idx = notes.value.findIndex(n => n.id === id)
  if (idx >= 0) {
    notes.value.splice(idx, 1)
  }
  if (selectedId.value === id) {
    selectedId.value = notes.value[0]?.id ?? null
  }
}

/**
 * PUBLIC_INTERFACE
 * getSelectedNote - computed currently selected note object.
 */
export function getSelectedNote() {
  return computed(() => notes.value.find(n => n.id === selectedId.value) || null)
}
