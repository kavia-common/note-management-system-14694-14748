import { ref, computed, watch } from 'vue'

type User = {
  id: string
  email: string
  name?: string
} | null

const _token = ref<string | null>(null)
const _user = ref<User>(null)

/**
 * PUBLIC_INTERFACE
 * useAuthToken - returns a ref to the auth token stored in memory and localStorage.
 */
export function useAuthToken() {
  if (process.client) {
    // initialize from localStorage once
    if (_token.value === null) {
      const existing = localStorage.getItem('auth_token')
      if (existing) _token.value = existing
    }

    watch(_token, (v) => {
      if (!v) localStorage.removeItem('auth_token')
      else localStorage.setItem('auth_token', v)
    }, { immediate: false })
  }
  return _token
}

/**
 * PUBLIC_INTERFACE
 * useAuthUser - reactive user object store.
 */
export function useAuthUser() {
  return _user
}

/**
 * PUBLIC_INTERFACE
 * useIsAuthenticated - computed boolean if user is authenticated (token exists).
 */
export function useIsAuthenticated() {
  return computed(() => !!_token.value)
}
