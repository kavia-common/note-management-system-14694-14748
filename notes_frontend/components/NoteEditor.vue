<template>
  <div class="editor">
    <div class="row gap">
      <input
        v-model="local.title"
        type="text"
        class="title-input"
        placeholder="Note title..."
      />
      <div class="spacer" />
      <button class="ghost" @click="emitDelete" :disabled="!note?.id">Delete</button>
      <button class="primary" @click="emitSave" :disabled="!hasChanges">Save</button>
    </div>
    <textarea
      v-model="local.content"
      class="content-input"
      placeholder="Start typing your note..."
    />
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes'

const props = defineProps<{
  note: Note | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: { title: string; content: string }): void
  (e: 'delete'): void
}>()

const local = reactive({
  title: '',
  content: '',
})

watch(() => props.note, (n) => {
  local.title = n?.title || ''
  local.content = n?.content || ''
}, { immediate: true })

const hasChanges = computed(() => {
  return local.title !== (props.note?.title || '') ||
         local.content !== (props.note?.content || '')
})

function emitSave() {
  emit('save', { title: local.title, content: local.content })
}

function emitDelete() {
  emit('delete')
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  align-items: center;
}
.gap {
  gap: 8px;
}
.spacer { flex: 1; }

.title-input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  font-size: 16px;
  min-width: 220px;
}

.content-input {
  min-height: 55vh;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  resize: vertical;
  line-height: 1.5;
}

.primary {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.ghost {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
