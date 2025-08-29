import type { FetchOptions } from 'ofetch'

/**
 * PUBLIC_INTERFACE
 * apiFetch - Wrapper around $fetch that injects auth tokens and handles errors.
 * Automatically attaches Authorization headers when a token is present
 * and prefixes requests with the configured NUXT_PUBLIC_API_BASE.
 */
export async function apiFetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string | undefined
  const token = useAuthToken().value

  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // Final options
  const finalOptions: FetchOptions = {
    baseURL,
    ...options,
    headers,
  }

  try {
    const result = await $fetch<T>(url, finalOptions)
    return result
  } catch (e: any) {
    // Normalize error
    const status = e?.response?.status
    if (status === 401) {
      // Token invalid or expired — clear and redirect to login
      useAuthToken().value = null
      if (process.client) {
        // Use nextTick to ensure navigation happens in client context
        Promise.resolve().then(() => navigateTo('/login'))
      }
    }
    throw e
  }
}

/**
 * PUBLIC_INTERFACE
 * setAuthToken - Set the auth token to be used for subsequent API requests.
 */
export function setAuthToken(token: string | null) {
  useAuthToken().value = token
}

/**
 * PUBLIC_INTERFACE
 * getApiBase - Read the API base from runtime config.
 */
export function getApiBase() {
  const config = useRuntimeConfig()
  return config.public.apiBase
}
