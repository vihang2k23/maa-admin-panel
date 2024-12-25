// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  target: 'static',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['/maaLogoText.png'], // Externalize the image
      },
    },
  },
  devtools: { enabled: true }
})
