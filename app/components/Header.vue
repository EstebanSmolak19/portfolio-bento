<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3">
    <header class="header backdrop-blur-md rounded-2xl w-full mx-4 sm:mx-8 px-5 sm:px-8 py-3">
      <div class="flex items-center justify-between relative">

        <NuxtLink to="/" class="brand-link text-base font-semibold whitespace-nowrap transition-colors duration-300">
          Mon portfolio
        </NuxtLink>

        <nav class="hidden sm:block absolute left-1/2 -translate-x-1/2">
          <ul class="flex justify-center gap-6 list-none p-0 m-0">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink :to="link.slug" class="nav-link text-sm font-medium py-2 relative transition-colors duration-300">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          <!-- <button class="theme-btn" @click="toggleTheme" aria-label="Toggle theme">
            <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>  -->

          <button class="hamburger-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path v-if="!mobileOpen" d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-else d="M2 2l10 10M12 2 2 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <Transition name="menu">
        <nav v-if="mobileOpen" class="sm:hidden mt-3 pt-3 border-t nav-mobile-border">
          <ul class="flex flex-col gap-1 list-none p-0 m-0">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink
                :to="link.slug"
                class="nav-link-mobile block text-sm font-medium px-2 py-2 rounded-lg transition-colors duration-200"
                @click="mobileOpen = false"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Transition>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '~/hooks/useTheme'

const { theme, toggleTheme } = useTheme()
const mobileOpen = ref(false)

const navLinks = [
  { name: 'BTS',         slug: '/bts'         },
  { name: 'Formations',  slug: '/formations'  },
  { name: 'Expériences', slug: '/experiences' },
  { name: 'Veille',      slug: '/veille'      },
  { name: 'E5',          slug: '/E5'          },
]
</script>

<style scoped>
.hamburger-btn {
  display: none;
  align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--bg-tag);
  border: 0.5px solid var(--border-muted);
  color: var(--text-muted);
  cursor: pointer; transition: all 0.15s;
}
.hamburger-btn:hover {
  color: var(--text-accent);
  background: var(--bg-btn-primary);
  border-color: var(--border-btn);
}

@media (max-width: 640px) {
  .hamburger-btn { display: flex; }
}

.header {
  background: var(--bg-sidebar);
  border: 1px solid var(--border-surface);
  transition: background 1.2s ease, border-color 1.2s ease, box-shadow 1.2s ease;
  max-width: 1400px;
}

.brand-link { color: var(--text-accent); transition: color 1.2s ease; }
.brand-link:hover { color: var(--text-primary); }

.nav-link { color: var(--text-nav); transition: color 1.2s ease; }
.nav-link:hover,
.nav-link.router-link-active { color: var(--text-primary); }
.nav-link::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  width: 0; height: 2px;
  background: var(--text-accent);
  transition: width 0.3s ease, background-color 1.2s ease;
}
.nav-link:hover::after,
.nav-link.router-link-active::after { width: 100%; }

.nav-link-mobile { color: var(--text-nav); transition: color 1.2s ease; }
.nav-link-mobile:hover,
.nav-link-mobile.router-link-active {
  color: var(--text-primary);
  background: var(--bg-tag);
}

.theme-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--bg-tag);
  border: 0.5px solid var(--border-muted);
  color: var(--text-muted);
  cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-btn:hover {
  color: var(--text-accent);
  background: var(--bg-btn-primary);
  border-color: var(--border-btn);
  transform: rotate(15deg) scale(1.1);
}

.menu-enter-active,
.menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-enter-from,
.menu-leave-to { opacity: 0; transform: translateY(-6px); }
</style>