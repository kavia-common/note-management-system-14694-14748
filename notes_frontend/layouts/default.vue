<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
        <span class="dot" />
        Notes
      </div>

      <div class="search">
        <input
          v-model="state.searchQuery"
          type="text"
          placeholder="Search notes..."
          @input="onSearch"
        />
      </div>

      <div class="actions">
        <button class="primary" @click="onNewNote">
          New Note
        </button>
      </div>

      <NoteList
        :notes="filtered"
        :selected-id="state.selectedId"
        @select="onSelect"
      />
    </aside>

    <section class="main">
      <header class="topbar">
        <div class="left">
          <button class="ghost" @click="goHome" aria-label="Home">
            🗒️
          </button>
        </div>
        <div class="grow" />
        <div class="right">
          <span v-if="isAuthenticated" class="user-chip">{{ userLabel }}</span>
          <button v-if="isAuthenticated" class="ghost" @click="onLogout">Logout</button>
        </div>
      </header>

      <div class="content">
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import NoteList from '~/components/NoteList.vue'
import { createNote, loadNotes, useFilteredNotes, useNotesState } from '~/composables/useNotes'
import { logout } from '~/services/auth'
import { useAuthUser, useIsAuthenticated } from '~/composables/useAuth'

const state = useNotesState()
const filtered = useFilteredNotes()
const isAuthenticated = useIsAuthenticated()
const user = useAuthUser()

const userLabel = computed(() => {
  return user.value?.name || user.value?.email || 'User'
})

function onSelect(id: string) {
  state.selectedId.value = id
  navigateTo(`/notes/${id}`)
}

async function onNewNote() {
  const created = await createNote({ title: 'Untitled', content: '' })
  navigateTo(`/notes/${created.id}`)
}

function onSearch() {
  // reactive filter already updates NoteList
}

function goHome() {
  navigateTo('/')
}

function onLogout() {
  logout()
  navigateTo('/login')
}

onMounted(async () => {
  if (isAuthenticated.value) {
    await loadNotes()
  }
})
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: var(--panel);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo .dot {
  width: 10px;
  height: 10px;
  background: var(--color-accent);
  display: inline-block;
  border-radius: 50%;
}

.search input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #fff;
  outline: none;
}

.search input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(130, 177, 255, 0.3);
}

.actions .primary {
  width: 100%;
  padding: 10px 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.actions .primary:hover {
  background: #1561a8;
}

.topbar {
  height: 56px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.topbar .grow {
  flex: 1;
}

.user-chip {
  color: var(--muted);
  margin-right: 8px;
}

.ghost {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
}

.ghost:hover {
  border-color: var(--color-primary);
}

.main {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 16px;
}
</style>
