import tailwindcss from "@tailwindcss/vite"
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  runtimeConfig: {
    supabaseUrl: process.env.VITE_SUPABASE_URL,
    supabaseKey: process.env.VITE_SUPABASE_ANON_KEY,
  },

  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
})
