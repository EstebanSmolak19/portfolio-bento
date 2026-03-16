<template>
  <div class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
    <header class="bg-gray-900/85 backdrop-blur-md border border-indigo-500/15 rounded-2xl w-full max-w-[1400px] mx-8 px-8 py-4">
      <div class="flex items-center relative">

        <!-- Titre -->
        <NuxtLink to="/" class="text-indigo-200/90 text-xl font-semibold absolute left-0 whitespace-nowrap hover:text-white transition-colors duration-300">
          Mon portfolio
        </NuxtLink>

        <!-- Nav -->
        <nav class="w-full">
          <ul class="flex justify-center gap-8 list-none p-0 m-0">
            <li v-for="link in navLinks" :key="link.name">
              <NuxtLink :to="link.slug" class="nav-link text-indigo-200/90 text-base font-medium py-2 relative transition-colors duration-300 hover:text-white">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  </div>
</template>

<script setup lang="ts">

const navLinks = [
  { name: 'BTS SIO', slug: '/bts-sio' },
  { name: 'Formations', slug: '/Formations' },
  { name: 'Expériences', slug: '/Expériences' },
  { name: 'Contact', slug: '/Contact' }
]
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: rgb(99 102 241);
  transition: width 0.3s ease;
}
.nav-link:hover::after,
.nav-link.router-link-active::after { width: 100%; }
.nav-link.router-link-active { color: white; }
</style>