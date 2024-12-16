export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  // Redirect to login page if not authenticated
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && to.path === '/login') {
    return true
  }
})
