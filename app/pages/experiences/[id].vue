<template>
  <div class="page-layout">
    <Header />
    <main class="page-main" :class="{ 'is-ready': ready }">

      <div v-if="loading" class="loading anim" style="--d:0ms">
        <div class="spinner"></div>
      </div>

      <div v-else-if="!xp" class="not-found anim" style="--d:0ms">
        <span>Expérience introuvable.</span>
        <NuxtLink to="/experiences" class="back-link">← Retour aux expériences</NuxtLink>
      </div>

      <template v-else>

        <div class="topbar anim" style="--d:0ms">
          <NuxtLink to="/experiences" class="back-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 4L3 7l3 3" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour
          </NuxtLink>
          <div class="breadcrumb">
            <span>{{ xp.year }}</span>
            <span class="bc-sep">/</span>
            <span>{{ xp.type }}</span>
          </div>
        </div>

        <div class="hero-block anim" style="--d:80ms">
          <div class="hero-glow" />
          <div class="hero-content">
            <div class="hero-logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="2" fill="rgba(129,140,248,0.8)"/>
                <rect x="13" y="3" width="8" height="8" rx="2" fill="rgba(129,140,248,0.4)"/>
                <rect x="3" y="13" width="8" height="8" rx="2" fill="rgba(129,140,248,0.4)"/>
                <rect x="13" y="13" width="8" height="8" rx="2" fill="rgba(129,140,248,0.15)"/>
              </svg>
            </div>
            <div class="hero-titles">
              <h1 class="hero-role">{{ xp.role }} <span class="hero-company">chez {{ xp.company }}</span></h1>
              <p class="hero-location">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ xp.location }}
              </p>
            </div>
          </div>
          <div class="hero-badges">
            <span class="badge-pill">{{ xp.duration }}</span>
            <span class="badge-pill badge-type">{{ xp.type }}</span>
          </div>
        </div>

        <div class="content-grid">

          <div class="col-main">
            <div class="block anim" style="--d:150ms">
              <div class="block-label">Vue d'ensemble</div>
              <p class="block-text highlight">"{{ xp.context }}"</p>
              <p class="block-text">{{ xp.description }}</p>
            </div>

            <div class="block anim" style="--d:200ms">
              <div class="block-label">Missions réalisées</div>
              <ul class="missions-list">
                <li v-for="(m, i) in formattedMissions" :key="i" class="mission-item" :style="`--mi: ${i}`">
                  <div class="mission-bar" />
                  <span class="mission-text">{{ m }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-side">
            <div class="block block-stats anim" style="--d:150ms">
              <div class="stat">
                <span class="stat-val">{{ xp.duration?.split(' ')[0] || '-' }}</span>
                <span class="stat-unit">{{ xp.duration?.split(' ').slice(1).join(' ') || 'temps' }}</span>
              </div>
              <div class="stat-div" />
              <div class="stat">
                <span class="stat-val">{{ formattedMissions.length }}</span>
                <span class="stat-unit">missions</span>
              </div>
              <div class="stat-div" />
              <div class="stat">
                <span class="stat-val">{{ formattedStack.length }}</span>
                <span class="stat-unit">technos</span>
              </div>
            </div>

            <div class="block anim" style="--d:200ms">
              <div class="block-label">Stack technique</div>
              <div class="chips-wrap">
                <span v-for="tech in formattedStack" :key="tech" class="tech-chip">
                  <span class="chip-dot"></span>{{ tech }}
                </span>
              </div>
            </div>

            <div class="block anim" style="--d:250ms">
              <div class="block-label">Compétences</div>
              <div class="chips-wrap">
                <span v-for="s in formattedSkills" :key="s" class="skill-chip">{{ s }}</span>
              </div>
            </div>
          </div>

        </div>

      </template>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import type { Experience } from '~/types/Experience'
import { experienceService } from '~/services/ExperienceService'
import useFetchSupa from '~/hooks/useFetch'

definePageMeta({ layout: 'default' })

const route = useRoute()
const ready = ref(false)

const { data: xp, execute, loading } = useFetchSupa<Experience>(() => experienceService.getAsync(route.params.id))

onMounted(async () => {
  await execute()
  setTimeout(() => { ready.value = true }, 50)
})

const parseDataList = (data: any): string[] => {
  if (!data) return []
  if (Array.isArray(data)) return data.filter(Boolean)
  if (typeof data === 'string') {
    if (data.includes('\n')) {
      return data.split('\n').map(item => item.trim().replace(/^[•*-]\s*/, '')).filter(Boolean)
    }
    if (data.includes(',')) {
      return data.split(',').map(item => item.trim()).filter(Boolean)
    }
    return [data.trim()]
  }
  return []
}

const formattedMissions = computed(() => parseDataList(xp.value?.missions))
const formattedStack = computed(() => parseDataList(xp.value?.stack))
const formattedSkills = computed(() => parseDataList(xp.value?.skills))
</script>

<style scoped>
.page-layout { min-height: 100dvh; display: flex; flex-direction: column; }

.page-main {
  flex: 1;
  display: flex; flex-direction: column;
  gap: 16px;
  padding: clamp(80px, 10vh, 100px) clamp(16px, 3vw, 24px) clamp(24px, 4vh, 48px);
  max-width: 900px;
  margin: 0 auto; width: 100%;
}

.loading, .not-found {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex: 1; gap: 16px; color: #a5b4fc; font-family: monospace;
}
.spinner { width: 24px; height: 24px; border: 2px solid rgba(129,140,248,0.2); border-top-color: #818cf8; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.back-link { color: #818cf8; font-size: 13px; text-decoration: none; }

.topbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 4px;
}
.back-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600; color: white;
  text-decoration: none; padding: 6px 10px; border-radius: 6px;
  background: transparent; transition: color 0.2s, transform 0.2s;
}
.back-btn:hover { color: #a5b4fc; transform: translateX(-3px); }
.breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 10px; font-family: monospace; color: white;
}
.bc-sep { color: rgba(255, 255, 255, 0.3); }

.hero-block {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 20px 24px; border-radius: 16px;
  border: 0.5px solid rgba(99,102,241,0.25); background: rgba(10, 10, 30, 0.4);
  position: relative; overflow: hidden; flex-wrap: wrap;
}
.hero-glow {
  position: absolute; width: 200px; height: 150px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%);
  top: -50px; right: -20px; pointer-events: none;
}
.hero-content { display: flex; align-items: center; gap: 14px; }
.hero-logo {
  width: 42px; height: 42px; border-radius: 10px;
  background: rgba(99,102,241,0.1); border: 0.5px solid rgba(99,102,241,0.3);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hero-titles { display: flex; flex-direction: column; gap: 2px; }
.hero-role {
  font-size: 1.2rem; font-weight: 800; color: white; margin: 0; letter-spacing: -0.01em;
}
.hero-company {
  font-weight: 500; font-size: 1rem; color: #c7d2fe;
}
.hero-location {
  display: flex; align-items: center; gap: 4px;
  font-size: 10px; font-family: monospace; color: #a5b4fc; margin: 0;
}
.hero-badges { display: flex; gap: 6px; flex-wrap: wrap; }
.badge-pill {
  font-size: 10px; font-family: monospace; color: white;
  background: rgba(99,102,241,0.15); border: 0.5px solid rgba(99,102,241,0.3);
  padding: 3px 8px; border-radius: 99px;
}
.badge-type { color: #c4b5fd; background: rgba(167,139,250,0.15); border-color: rgba(167,139,250,0.3); }

.content-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 16px; align-items: start;
}
.col-main, .col-side { display: flex; flex-direction: column; gap: 16px; }

.block {
  border-radius: 14px; border: 0.5px solid rgba(99,102,241,0.2);
  background: rgba(10, 10, 30, 0.3); backdrop-filter: blur(8px);
  padding: 20px; position: relative;
}
.block-label {
  font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;
  color: #c7d2fe; margin-bottom: 12px;
}
.block-text { font-size: 12.5px; line-height: 1.6; color: white; margin: 0 0 10px; }
.block-text:last-child { margin-bottom: 0; }
.block-text.highlight { color: #e0e7ff; font-weight: 500; }

.block-stats { display: flex; flex-direction: row; justify-content: space-around; align-items: center; padding: 16px; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-val { font-size: 1.6rem; font-weight: 800; color: #818cf8; line-height: 1; }
.stat-unit { font-size: 9px; font-family: monospace; color: #a5b4fc; text-transform: uppercase; }
.stat-div { width: 1px; height: 24px; background: rgba(99,102,241,0.2); }

.missions-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.mission-item {
  display: flex; align-items: flex-start; gap: 10px;
  animation: fade-up 0.4s forwards; opacity: 0; animation-delay: calc(200ms + var(--mi) * 50ms);
}
@keyframes fade-up { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.mission-bar { width: 2px; height: 14px; border-radius: 2px; background: #818cf8; flex-shrink: 0; margin-top: 3px; }
.mission-text { font-size: 12.5px; color: white; line-height: 1.4; flex: 1; }

.chips-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-chip, .skill-chip {
  font-size: 11px; padding: 4px 10px; border-radius: 8px;
  display: inline-flex; align-items: center; gap: 6px;
}
.tech-chip {
  color: white; background: rgba(99,102,241,0.08); border: 0.5px solid rgba(99,102,241,0.25);
}
.chip-dot { width: 4px; height: 4px; border-radius: 50%; background: #a78bfa; }
.skill-chip { color: white; background: rgba(167,139,250,0.1); border: 0.5px solid rgba(167,139,250,0.3); }

.anim { opacity: 0; transform: translateY(12px); transition: opacity 0.5s ease var(--d, 0ms), transform 0.5s ease var(--d, 0ms); }
.is-ready .anim { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .content-grid { grid-template-columns: 1fr; }
  .hero-block { flex-direction: column; align-items: flex-start; }
  .back-btn, .breadcrumb { color: white; }
}
</style>