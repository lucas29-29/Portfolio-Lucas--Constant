import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'lottie-player',
    },
  },
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/style.scss" as *;',
        },
      },
    },
  },
  modules: ['@nuxt/content', '@nuxt/image-edge'],
  content: {
    navigation: {
      fields: ['title', 'slug', 'type'],
    },
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  image: {
    provider: 'netlify',
  },
  router: {
    base: 'Portfolio-Lucas--Constant\pages\index.vue',
  },
});
