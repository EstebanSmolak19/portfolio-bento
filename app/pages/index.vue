<template>
  <div class="grid grid-cols-5 gap-5 w-[1200px] h-[650px] translate-y-9" style="grid-template-rows: repeat(4, 1fr)">

    <!-- Profile -->
    <Card accent="blue" :neon="true" class="col-span-2 row-span-3">
      <div class="p-6 flex flex-col gap-6 h-full items-center">
        <div class="pb-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-white">Estéban SMOLAK</h1>
          <p class="text-indigo-300 font-mono text-sm">BTS SIO option SLAM promo 2026</p>
        </div>

        <Divider type="dotted"/>

        <div class="">
          <p class="text-gray-200 text-lg">
            J'ai 19 ans et je suis actuellement en deuxième année de BTS Services Informatiques aux Organisations (SIO) option SLAM au
            <a href="https://www.groupesaintbenigne.fr/lycee/" class="link">Lycée saint bénigne</a>,
            à Dijon. J'envisage de devenir développeur Fullstack.
          </p>
        </div>

        <Divider type="dotted"/>

        <div class="flex gap-3 mt-auto">
            <a href="#" class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all duration-300 group relative">
                <Icon icon="mdi:file-document-outline" class="w-5 h-5" />
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#333] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">CV</span>
            </a>

            <a href="https://github.com/EstebanSmolak19" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all duration-300 group relative">
                <Icon icon="mdi:github" class="w-5 h-5" />
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#333] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">GitHub</span>
            </a>

            <a href="https://www.linkedin.com/in/esteban-smolak" target="_blank" class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all duration-300 group relative">
                <Icon icon="mdi:linkedin" class="w-5 h-5" />
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#333] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">LinkedIn</span>
            </a>
        </div>

      </div>
    </Card>

    <!-- Skills -->
    <Card label="Compétences" accent="purple" class="col-span-1 row-span-2"/>

    <!-- Dernier Projet -->
    <Card label="Dernier Projet" accent="cyan" class="col-span-2 row-span-1"/>

    <!-- LinkedIn -->
    <Card :picture="true" backgroundColor="#4B1A9B" :neon="true" accent="purple" class="col-span-1 row-span-1 overflow-hidden">
      <a href="https://www.linkedin.com/in/esteban-smolak/" class="block w-full scale-[1.3] hover:translate-y-2 transition-transform duration-300">
        <img src="/img/index/linkedinTel.png" alt="tel" class="w-full h-auto translate-y-20" />
      </a>
    </Card>

    <!-- Photo -->
    <Card accent="cyan" :picture="true" :neon="true" class="col-span-1 row-span-3 overflow-hidden">
      <img src="/img/index/pp.JPG" alt="photo de profil" class="w-full h-full object-cover rounded-lg" />
    </Card>

    <!-- Expérience -->
    <Card accent="blue" class="col-span-2 row-span-1">
      <NuxtLink to="/Expériences">
        <h1 class="experience-title">Expériences</h1>
      </NuxtLink>
    </Card>

     <!-- Contact -->
    <Card label="Contact" accent="amber" class="col-span-2 row-span-1">
      <div class="flex flex-col gap-3 p-2 items-start">
        <p class="text-xs text-blue-300/80">EMAIL</p>
        <p class="text-white font-medium">estebansmolak@gmail.com</p>
      </div>
    </Card>

      <!-- Formation -->
    <Card :picture="true" :neon="true" accent="amber" class="col-span-1 row-span-1 overflow-hidden">
      <a href="https://www.groupesaintbenigne.fr/lycee/" class="block w-full scale-[1.3] hover:translate-y-2 transition-transform duration-300">
        <img src="/img/index/ecoleTel.png" alt="tel" class="w-full h-auto translate-y-20" />
      </a>
    </Card>

    <!-- Veille -->
    <Card accent="rose" :neon="true" class="col-span-1 row-span-1 group">
      <a href="/veille"
        class="relative flex flex-col items-center justify-center h-full w-full p-4 gap-3">

        <!-- Icône RSS simple et lisible -->
        <div class="transition-transform duration-500 group-hover:scale-110">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20M4 9.1a10.9 10.9 0 0 1 10.9 10.9"
                  stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <!-- Texte visible sans hover -->
        <div class="flex flex-col items-center gap-0.5 transition-opacity duration-300 group-hover:opacity-0">
          <span class="text-sm font-semibold text-white tracking-widest uppercase">Veille</span>
          <span class="text-xs font-medium text-rose-300 tracking-wider">Technologique</span>
        </div>

        <!-- Overlay au hover -->
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 bg-rose-950/30 rounded-xl backdrop-blur-sm">
          <span class="text-lg font-semibold text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500">Veille</span>
          <span class="text-lg font-semibold text-rose-300 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">Technologique</span>
          <span class="text-xs text-rose-200/70 mt-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-150">Consulter →</span>
        </div>

      </a>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Divider } from 'primevue';
import Card from '~/components/UI/Card.vue';

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.link {
  color: #9966f3;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  position: relative;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}
.link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background-color: #9966f3;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}
.link:hover { color: #f59e0b; }
.link:hover::after { transform: scaleX(1); transform-origin: bottom left; }

.experience-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  background: linear-gradient(90deg, #6366f1, #4f46e5, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  transition: all 0.3s ease-in-out;
}
.experience-title:hover { transform: scale(1.05); }
</style>