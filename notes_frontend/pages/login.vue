<template>
  <div class="auth-wrap">
    <div class="card">
      <h1>Sign in</h1>
      <form @submit.prevent="onSubmit">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" required />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="••••••••" required />

        <button class="primary" type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <p class="muted">
        Don't have an account?
        <NuxtLink to="/register">Create one</NuxtLink>
      </p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '~/services/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await login(email.value, password.value)
    navigateTo('/')
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-wrap {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
.card {
  width: 100%;
  max-width: 360px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}
h1 {
  margin: 0 0 16px 0;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  font-size: 14px;
}
input {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
}
button.primary {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
}
.muted { color: var(--muted); margin-top: 8px; }
.error { color: #d32f2f; margin-top: 8px; }
</style>
