import { apiFetch, setAuthToken } from '~/utils/api'
import { useAuthUser, useAuthToken } from '~/composables/useAuth'

type LoginResponse = {
  token: string
  user: {
    id: string
    email: string
    name?: string
  }
}

/**
 * PUBLIC_INTERFACE
 * login - Authenticate user via REST, store token and user.
 */
export async function login(email: string, password: string) {
  const res = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  setAuthToken(res.token)
  useAuthUser().value = res.user
  return res
}

/**
 * PUBLIC_INTERFACE
 * register - Create account via REST, returns the same payload as login.
 */
export async function register(email: string, password: string, name?: string) {
  const res = await apiFetch<LoginResponse>('/auth/register', {
    method: 'POST',
    body: { email, password, name },
  })
  setAuthToken(res.token)
  useAuthUser().value = res.user
  return res
}

/**
 * PUBLIC_INTERFACE
 * logout - Clear token and user info.
 */
export function logout() {
  useAuthToken().value = null
  useAuthUser().value = null
}
