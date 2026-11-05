export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_APP_ID
    }
  },

  routeRules: {
    '/**': { ssr: false }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      include: ['zod']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
