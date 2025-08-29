import { useIsAuthenticated } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const isAuth = useIsAuthenticated().value

  // Allow access to login/register pages without auth
  if (to.path.startsWith('/login') || to.path.startsWith('/register')) {
    if (isAuth) return navigateTo('/')
    return
  }

  // Protect all other routes
  if (!isAuth) {
    return navigateTo('/login')
  }
})
