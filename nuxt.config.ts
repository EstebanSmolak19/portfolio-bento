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
    
    public: {
      apiBase: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
    }
  },

  modules: ['@primevue/nuxt-module', 'nuxt-auth-utils'],

  primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
})