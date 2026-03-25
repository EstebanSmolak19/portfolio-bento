<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3">
    <header class="header backdrop-blur-md rounded-2xl w-full mx-4 sm:mx-8 px-5 sm:px-8 py-3">
      <div class="flex items-center justify-between relative">

        <!-- Titre -->
        <NuxtLink to="/" class="brand-link text-base font-semibold whitespace-nowrap transition-colors duration-300">
          Mon portfolio
        </NuxtLink>

        <!-- Nav desktop -->
        <nav class="hidden sm:block absolute left-1/2 -translate-x-1/2">
          <ul class="flex justify-center gap-6 list-none p-0 m-0">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink :to="link.slug" class="nav-link text-sm font-medium py-2 relative transition-colors duration-300">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Droite : theme + hamburger -->
        <div class="flex items-center gap-2">
          <!-- Hamburger (mobile only) -->
          <button class="hamburger-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path v-if="!mobileOpen" d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path v-else d="M2 2l10 10M12 2 2 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Nav mobile dropdown -->
      <Transition name="menu">
        <nav v-if="mobileOpen" class="sm:hidden mt-3 pt-3 border-t border-[var(--border-surface)]">
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
import { useTheme } from '~/hooks/useTheme'
const { theme, toggleTheme } = useTheme()
const mobileOpen = ref(false)

const navLinks = [
  { name: 'BTS',     slug: '/bts'      },
  { name: 'Formations',  slug: '/formations'   },
  { name: 'Expériences', slug: '/experiences'  },
  { name: 'E5',     slug: '/E5'      },
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
  flex-shrink: 0;
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
  transition: background 0.2s, border-color 0.2s;
  max-width: 1400px;
}

.brand-link { color: var(--text-accent); }
.brand-link:hover { color: var(--text-primary); }

.nav-link { color: var(--text-nav); }
.nav-link:hover,
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

.nav-link-mobile {
  color: var(--text-nav);
}
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
  cursor: pointer; transition: all 0.15s;
  flex-shrink: 0;
}
.theme-btn:hover {
  color: var(--text-accent);
  background: var(--bg-btn-primary);
  border-color: var(--border-btn);
}

/* Transition menu mobile */
.menu-enter-active,
.menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.menu-enter-from,
.menu-leave-to { opacity: 0; transform: translateY(-6px); }
</style>