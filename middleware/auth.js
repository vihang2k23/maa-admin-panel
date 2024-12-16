export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // Redirect to login page if not authenticated
    if (!isAuthenticated && to.path !== '/login') {
      return navigateTo('/login');
    }

    // Redirect authenticated users away from the login page
    if (isAuthenticated && to.path === '/login') {
      return true;
    }
  }
});
