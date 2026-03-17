<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
    <header class="header backdrop-blur-md rounded-2xl w-full max-w-[1400px] mx-8 px-8 py-4">
      <div class="flex items-center relative">

        <!-- Titre -->
        <NuxtLink to="/" class="brand-link text-xl font-semibold absolute left-0 whitespace-nowrap transition-colors duration-300">
          Mon portfolio
        </NuxtLink>

        <!-- Nav -->
        <nav class="w-full">
          <ul class="flex justify-center gap-8 list-none p-0 m-0">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink :to="link.slug" class="nav-link text-base font-medium py-2 relative transition-colors duration-300">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Toggle theme -->
        <button class="theme-btn absolute right-0" @click="toggleTheme" :title="theme === 'dark' ? 'Mode clair' : 'Mode sombre'">
          <!-- Soleil -->
          <svg v-if="theme === 'dark'" width="15" height="15" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.75 2.75l1.06 1.06M10.19 10.19l1.06 1.06M2.75 11.25l1.06-1.06M10.19 3.81l1.06-1.06" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <!-- Lune -->
          <svg v-else width="15" height="15" viewBox="0 0 14 14" fill="none">
            <path d="M12 8.5A5.5 5.5 0 0 1 5.5 2a5.5 5.5 0 1 0 6.5 6.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/hooks/useTheme';

const { theme, toggleTheme } = useTheme()

const navLinks = [
  { name: 'BTS SIO', slug: '/bts-sio' },
  { name: 'Formations', slug: '/Formations' },
  { name: 'Expériences', slug: '/Expériences' },
  { name: 'Contact', slug: '/Contact' }
]
</script>

<style scoped>
.header {
  background: var(--bg-sidebar);
  border: 1px solid var(--border-surface);
  transition: background 0.2s, border-color 0.2s;
}

.brand-link {
  color: var(--text-accent);
}
.brand-link:hover { color: var(--text-primary); }

.nav-link {
  color: var(--text-nav);
}
.nav-link:hover { color: var(--text-primary); }
.nav-link.router-link-active { color: var(--text-primary); }

.nav-link::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 2px;
  background: #6366f1;
  transition: width 0.3s ease;
}
.nav-link:hover::after,
.nav-link.router-link-active::after { width: 100%; }

.theme-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--bg-tag);
  border: 0.5px solid var(--border-muted);
  color: var(--text-muted);
  cursor: pointer; transition: all 0.15s;
}
.theme-btn:hover { color: var(--text-accent); background: var(--bg-btn-primary); border-color: var(--border-btn); }
</style>