<template>
  <div class="page-layout">
    <Header />

    <main class="page-main" :class="{ 'is-ready': ready }">

      <div class="page-heading anim" style="--d:0ms">
        <h1 class="page-title">Expé<span class="title-accent">riences</span></h1>
      </div>

      <div class="scene anim" style="--d:120ms">
        <div class="carousel-stage" ref="stageRef">
          <div
            v-for="(xp, i) in (experiences ?? [])"
            :key="xp.id"
            class="xp-card"
            :class="{
              'is-active': i === current,
              'is-prev':   i === current - 1 || (current === 0 && i === (experiences ?? []).length - 1),
              'is-next':   i === current + 1 || (current === (experiences ?? []).length - 1 && i === 0),
            }"
            :style="getCardStyle(i)"
            @click="goTo(i)"
          >
            <div class="card-glow" />
            <div class="card-watermark">{{ String(i + 1).padStart(2, '0') }}</div>

            <div class="card-header">
              <div class="card-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3"  y="3"  width="8" height="8" rx="2" fill="rgba(129,140,248,0.8)"/>
                  <rect x="13" y="3"  width="8" height="8" rx="2" fill="rgba(129,140,248,0.35)"/>
                  <rect x="3"  y="13" width="8" height="8" rx="2" fill="rgba(129,140,248,0.35)"/>
                  <rect x="13" y="13" width="8" height="8" rx="2" fill="rgba(129,140,248,0.15)"/>
                </svg>
              </div>
              <div class="card-meta">
                <span class="meta-year">{{ xp.year }}</span>
                <span class="meta-dot">·</span>
                <span class="meta-type">{{ xp.type }}</span>
              </div>
              <div class="card-duration">{{ xp.duration }}</div>
            </div>

            <div class="card-body">
              <h2 class="card-company">{{ xp.company }}</h2>
              <p class="card-location">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ xp.location }}
              </p>
              <h3 class="card-role">{{ xp.role }}</h3>
              <p class="card-desc">{{ xp.description }}</p>
            </div>

            <div class="card-footer">
              <div class="card-tags">
                <span v-for="t in xp.stack.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
              </div>
              <NuxtLink :to="`/experiences/${xp.id}`" class="card-cta" @click.stop>
                <span>Détail</span>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="stage-floor" />
      </div>

      <div class="controls anim" style="--d:300ms">
        <button class="ctrl-btn" @click="prev">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11 8H5M8 5L5 8l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="ctrl-dots">
          <button
            v-for="(_, i) in (experiences ?? [])"
            :key="i"
            class="ctrl-dot"
            :class="{ 'dot-active': i === current }"
            @click="goTo(i)"
          />
        </div>

        <button class="ctrl-btn" @click="next">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8h6M8 5l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="counter anim" style="--d:350ms">
        <span class="counter-cur">{{ String(current + 1).padStart(2, '0') }}</span>
        <span class="counter-sep">/</span>
        <span class="counter-total">{{ String((experiences ?? []).length).padStart(2, '0') }}</span>
      </div>

    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import type { Experience } from '~/types/Experience'
import { experienceService } from '~/services/ExperienceService'
import useFetchSupa from '~/hooks/useFetch'

definePageMeta({ layout: 'default' })

const { data: experiences, execute } = useFetchSupa<Experience[]>(() => experienceService.getAllAsync());

const ready    = ref(false)
const current  = ref(0)
const stageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => { ready.value = true }, 100)
  const el = stageRef.value
  if (!el) return
  let tx = 0
  el.addEventListener('touchstart', (e: TouchEvent) => { tx = e.touches[0].clientX })
  el.addEventListener('touchend',   (e: TouchEvent) => {
    const diff = tx - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
  })
  execute()
})

function goTo(i: number) { current.value = i }
function prev() {
  const len = experiences.value?.length ?? 0
  current.value = (current.value - 1 + len) % len
}
function next() {
  const len = experiences.value?.length ?? 0
  current.value = (current.value + 1) % len
}

function getCardStyle(i: number) {
  const total = experiences.value?.length ?? 0
  let offset  = i - current.value
  if (offset >  total / 2) offset -= total
  if (offset < -total / 2) offset += total

  const abs  = Math.abs(offset)
  const sign = offset < 0 ? -1 : 1

  const tx = sign * Math.min(abs, 2) * 255
  const tz = -abs * 175
  const ry = sign * Math.min(abs, 2) * 20
  const sc = Math.max(0.62, 1 - abs * 0.15)
  const op = abs === 0 ? 1 : abs === 1 ? 0.65 : abs === 2 ? 0.3 : 0

  return {
    transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
    opacity: op,
    zIndex: 10 - abs,
    pointerEvents: abs <= 1 ? 'auto' : 'none',
  }
}
</script>

<style scoped>
.page-layout { min-height: 100dvh; display: flex; flex-direction: column; }

.page-main {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  width: 50rem;
  gap: clamp(14px, 2.2vh, 26px);
  padding: clamp(80px, 10vh, 100px) clamp(16px, 3vw, 48px) clamp(16px, 3vh, 32px);
  overflow: hidden;
}

.page-heading { text-align: center; }
.eyebrow {
  font-size: 10px; font-family: monospace;
  text-transform: uppercase; letter-spacing: 0.16em;
  color: rgba(129,140,248,0.45); display: block; margin-bottom: 8px;
}
.page-title {
  font-size: clamp(2.6rem, 5vw, 5rem); font-weight: 900;
  line-height: 0.95; letter-spacing: -0.04em; color: var(--text-primary); margin: 0;
}
.title-accent {
  background: linear-gradient(110deg, #818cf8, #a78bfa, #c4b5fd);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.scene {
  position: relative; width: 100%; max-width: 1050px;
  height: clamp(360px, 48vh, 500px);
  perspective: 1400px; perspective-origin: 50% 42%;
}
.carousel-stage {
  width: 100%; height: 100%; position: relative;
  transform-style: preserve-3d;
  display: flex; align-items: center; justify-content: center;
}

.xp-card {
  position: absolute;
  width: clamp(280px, 33vw, 370px);
  min-height: clamp(290px, 38vh, 410px);
  border-radius: 22px;
  border: 0.5px solid rgba(99,102,241,0.16);
  background: rgba(17,24,39,0.88);
  backdrop-filter: blur(20px);
  padding: clamp(20px, 2.4vw, 28px);
  display: flex; flex-direction: column; gap: 14px;
  cursor: pointer;
  will-change: transform;
  transition:
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity   0.5s ease,
    border-color 0.3s,
    box-shadow 0.4s;
}
.xp-card::before {
  content: '';
  position: absolute; top: 0; left: 12%; right: 12%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,0.32) 40%, rgba(139,92,246,0.42) 60%, transparent);
}
.xp-card.is-active {
  border-color: rgba(99,102,241,0.36);
  box-shadow: 0 0 0 1px rgba(99,102,241,0.07), 0 32px 80px rgba(0,0,0,0.55), 0 0 55px rgba(99,102,241,0.11);
  cursor: default;
}
.xp-card.is-prev:hover,
.xp-card.is-next:hover { border-color: rgba(99,102,241,0.26); }

.card-glow {
  position: absolute; width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.13), transparent 65%);
  top: -70px; right: -50px; pointer-events: none;
}
.xp-card.is-active .card-glow { background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 65%); }

.card-watermark {
  position: absolute; bottom: 14px; right: 18px;
  font-size: 3.8rem; font-weight: 900; font-family: monospace;
  color: rgba(99,102,241,0.06); line-height: 1; pointer-events: none;
  transition: color 0.3s;
}
.xp-card.is-active .card-watermark { color: rgba(99,102,241,0.11); }

.card-header {
  display: flex; align-items: center; gap: 10px;
  padding-bottom: 13px; border-bottom: 0.5px solid rgba(99,102,241,0.09);
}
.card-logo {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: rgba(99,102,241,0.08); border: 0.5px solid rgba(99,102,241,0.2);
  display: flex; align-items: center; justify-content: center;
}
.card-meta { display: flex; align-items: center; gap: 6px; flex: 1; min-width: 0; }
.meta-year { font-size: 10px; font-family: monospace; color: rgba(129,140,248,0.6); }
.meta-dot  { color: rgba(99,102,241,0.2); font-size: 10px; }
.meta-type {
  font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.07em;
  color: rgba(129,140,248,0.5); background: rgba(99,102,241,0.08);
  border: 0.5px solid rgba(99,102,241,0.16); padding: 2px 7px; border-radius: 99px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.card-duration { font-size: 9px; font-family: monospace; color: rgba(167,139,250,0.55); flex-shrink: 0; }

.card-body { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.card-company {
  font-size: clamp(0.95rem, 1.5vw, 1.2rem); font-weight: 800;
  color: var(--text-primary); margin: 0; letter-spacing: -0.02em;
}
.card-location {
  display: flex; align-items: center; gap: 5px;
  font-size: 10px; font-family: monospace; color: var(--text-muted); margin: 0;
}
.card-role {
  font-size: clamp(1.05rem, 1.7vw, 1.4rem); font-weight: 800;
  background: linear-gradient(110deg, #818cf8, #c4b5fd);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin: 4px 0 0; letter-spacing: -0.02em; line-height: 1.2;
}
.card-desc {
  font-size: 11.5px; line-height: 1.65; color: var(--text-secondary); margin: 4px 0 0;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 11px; border-top: 0.5px solid rgba(99,102,241,0.08); gap: 8px;
}
.card-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.tag {
  font-size: 9.5px; font-weight: 500; color: #a5b4fc;
  background: rgba(99,102,241,0.07); border: 0.5px solid rgba(99,102,241,0.15);
  padding: 2px 7px; border-radius: 99px;
}
.card-cta {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: #a5b4fc;
  background: rgba(99,102,241,0.1); border: 0.5px solid rgba(99,102,241,0.28);
  padding: 5px 11px; border-radius: 8px; text-decoration: none; flex-shrink: 0;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.card-cta:hover { background: rgba(99,102,241,0.2); color: #c7d2fe; transform: translateY(-1px); }

.stage-floor {
  position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
  width: clamp(230px, 26vw, 320px); height: 28px;
  background: rgba(99,102,241,0.07); filter: blur(16px); border-radius: 50%;
  pointer-events: none;
}

.controls { display: flex; align-items: center; gap: 18px; }
.ctrl-btn {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(99,102,241,0.07); border: 0.5px solid rgba(99,102,241,0.2);
  color: rgba(129,140,248,0.7);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;
}
.ctrl-btn:hover {
  background: rgba(99,102,241,0.15); color: #a5b4fc;
  border-color: rgba(99,102,241,0.4); transform: scale(1.08);
}

.ctrl-dots { display: flex; gap: 7px; align-items: center; }
.ctrl-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(99,102,241,0.2); border: none; cursor: pointer; padding: 0;
  transition: background 0.25s, width 0.3s, border-radius 0.3s;
}
.ctrl-dot.dot-active { background: #818cf8; width: 20px; border-radius: 99px; }
.ctrl-dot:not(.dot-active):hover { background: rgba(129,140,248,0.45); transform: scale(1.3); }

.counter { display: flex; align-items: baseline; gap: 5px; font-family: monospace; }
.counter-cur   { font-size: 1.3rem; font-weight: 900; color: #a5b4fc; line-height: 1; }
.counter-sep   { font-size: 0.85rem; color: rgba(99,102,241,0.3); }
.counter-total { font-size: 0.8rem; color: rgba(99,102,241,0.35); }

.anim {
  opacity: 0; transform: translateY(22px);
  transition:
    opacity  0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}
.is-ready .anim { opacity: 1; transform: translateY(0); }

@media (max-width: 640px) {
  .scene { height: clamp(320px, 58vh, 430px); perspective: 900px; }
  .xp-card { width: min(85vw, 310px); }
}
</style>