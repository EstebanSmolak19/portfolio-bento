<template>
  <div class="flex w-screen h-dvh overflow-hidden relative z-[1] isolate">

    <aside class="w-[220px] min-w-[220px] h-dvh flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-surface)] backdrop-blur-xl transition-[background,border-color] duration-200">

      <div class="flex items-center gap-2.5 px-4 py-[18px] pb-4 border-b border-[var(--border-surface)] shrink-0">
        <div class="w-[30px] h-[30px] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[7px] flex items-center justify-center text-[9px] font-extrabold text-white tracking-wide shrink-0">
          ES
        </div>
        <div>
          <p class="text-[13px] font-semibold text-[var(--text-primary)] leading-none">Admin</p>
          <p class="text-[10px] text-[var(--text-muted)] mt-0.5 tracking-wide">portfolio · 2026</p>
        </div>
      </div>

      <nav class="flex-1 flex flex-col gap-px px-2.5 py-3 overflow-y-auto">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-faint)] px-1.5 mb-1">Navigation</p>

        <NuxtLink to="/admin" exact-active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="7.8" y="1" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="1" y="7.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="7.8" y="7.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink to="/admin/projects" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3.5h12M3 1.5h3.5l1 1.5H13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-9A.5.5 0 0 1 1 1.5H3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
            <path d="M5 7.5l1.5 1.5L5 10.5M9 7.5l-1.5 1.5L9 10.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Projets
        </NuxtLink>

        <NuxtLink to="/admin/veille" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.25"/>
            <path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          </svg>
          Veille
        </NuxtLink>

        <NuxtLink to="/admin/categories" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1.5 1.5h4.8l6.2 6.2a1 1 0 0 1 0 1.4l-3.3 3.3a1 1 0 0 1-1.4 0L1.5 6.2V1.5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>
            <circle cx="4.5" cy="4.5" r="1" fill="currentColor"/>
          </svg>
          Categories
        </NuxtLink>

        <NuxtLink to="/admin/skills" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 12.5h12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
            <rect x="2" y="7" width="2.5" height="5.5" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
            <rect x="5.75" y="4" width="2.5" height="8.5" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
            <rect x="9.5" y="1.5" width="2.5" height="11" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
          </svg>
          Compétences
        </NuxtLink>

         <NuxtLink to="/admin/trainings" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 12.5h12" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
            <rect x="2" y="7" width="2.5" height="5.5" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
            <rect x="5.75" y="4" width="2.5" height="8.5" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
            <rect x="9.5" y="1.5" width="2.5" height="11" rx="0.5" stroke="currentColor" stroke-width="1.25"/>
          </svg>
          Formations
        </NuxtLink>

        <p class="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-faint)] px-1.5 mb-1 mt-5">Général</p>

        <a href="/" target="_blank" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 2H2.5a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1V9M8.5 1.5H12.5m0 0v4m0-4L6 8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Voir le site
        </a>
      </nav>

      <div class="px-2.5 pb-4 pt-2.5 border-t border-[var(--border-surface)] shrink-0 flex flex-col gap-1.5">
        <button
          class="flex items-center gap-2 w-full px-2.5 py-[7px] rounded-[7px] bg-transparent border-none cursor-pointer text-[12px] text-[var(--text-muted)] transition-all duration-150 hover:bg-[var(--bg-nav-hover)] hover:text-[var(--text-secondary)]"
          @click="toggleTheme"
          :title="theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'"
        >
          <svg v-if="theme === 'dark'" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.75 2.75l1.06 1.06M10.19 10.19l1.06 1.06M2.75 11.25l1.06-1.06M10.19 3.81l1.06-1.06" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 8.5A5.5 5.5 0 0 1 5.5 2a5.5 5.5 0 1 0 6.5 6.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ theme === 'dark' ? 'Mode clair' : 'Mode sombre' }}
        </button>

        <div class="flex items-center gap-2.5 px-1.5 py-1.5 rounded-[7px]">
          <div class="w-[26px] h-[26px] bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[7px] flex items-center justify-center text-[8px] font-extrabold text-white shrink-0">
            ES
          </div>
          <div class="flex-1 flex flex-col gap-px min-w-0">
            <span class="text-[12px] font-medium text-[var(--text-secondary)] truncate">Estéban Smolak</span>
            <span class="text-[10px] text-[var(--text-faint)]">Administrateur</span>
          </div>
          <button
            class="bg-transparent border-none cursor-pointer text-[var(--text-faint)] p-1 rounded-[5px] flex items-center shrink-0 transition-all duration-150 hover:text-red-400 hover:bg-red-400/10"
            @click="handleLogout">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 2H11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8.5M4.5 9l-3-2.5 3-2.5M1.5 6.5H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </aside>

    <main class="flex-1 h-dvh overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--scrollbar)] scrollbar-track-transparent">
      <slot />
    </main>

  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/hooks/useTheme'

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
}

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 10px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-nav);
  text-decoration: none;
  transition: all 0.15s;
}
.nav-item:hover {
  background: var(--bg-nav-hover);
  color: var(--text-secondary);
}
.nav-active {
  background: var(--bg-nav-active) !important;
  color: var(--text-nav-active) !important;
  font-weight: 600;
}
</style>