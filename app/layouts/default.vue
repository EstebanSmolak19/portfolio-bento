<template>
  <div class="layout" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
      <SplashScreen @done="splashDone = true" v-if="isHome && !splashDone"/>
    <Header />

    <div v-if="theme === 'dark'" class="cosmos-overlay" aria-hidden="true">
      <div class="nebula nebula-1" :style="{ transform: `translate(${mx * 0.018}px, ${my * 0.018}px) scale(0.92)` }" />
      <div class="nebula nebula-2" :style="{ transform: `translate(${mx * -0.024}px, ${my * -0.024}px) scale(0.92)` }" />
      <div class="nebula nebula-3" :style="{ transform: `translate(${mx * 0.012}px, ${my * 0.030}px) scale(0.92)` }" />
      <div class="nebula nebula-4" :style="{ transform: `translate(${mx * -0.015}px, ${my * -0.012}px) scale(0.92)` }" />

      <!-- Constel lation gauche bas -->
      <svg class="const const-gb" viewBox="0 0 160 110" :style="{ transform: `translate(${mx * -0.006}px, ${my * -0.008}px)` }">
        <line x1="10"  y1="70"  x2="40"  y2="50"  class="c-line" />
        <line x1="40"  y1="50"  x2="75"  y2="45"  class="c-line" />
        <line x1="75"  y1="45"  x2="100" y2="60"  class="c-line" />
        <line x1="100" y1="60"  x2="115" y2="35"  class="c-line" />
        <line x1="115" y1="35"  x2="145" y2="12"  class="c-line" />
        <line x1="145" y1="12"  x2="150" y2="42"  class="c-line" />
        <line x1="100" y1="60"  x2="75"  y2="88"  class="c-line" />
        <line x1="75"  y1="88"  x2="40"  y2="98"  class="c-line" />
        <circle cx="10"  cy="70"  r="1.5" class="c-star c-dim" />
        <circle cx="40"  cy="50"  r="2"   class="c-star" />
        <circle cx="75"  cy="45"  r="2"   class="c-star" />
        <circle cx="100" cy="60"  r="1.5" class="c-star c-dim" />
        <circle cx="115" cy="35"  r="2"   class="c-star" />
        <circle cx="145" cy="12"  r="2.5" class="c-star" />
        <circle cx="150" cy="42"  r="2"   class="c-star" />
        <circle cx="75"  cy="88"  r="1.5" class="c-star c-dim" />
        <circle cx="40"  cy="98"  r="1.5" class="c-star c-dim" />
        <text x="50" y="108" class="c-label">Nebula SIO</text>
      </svg>

      <!-- Constellation droite bas -->
      <svg class="const const-db" viewBox="0 0 100 210" :style="{ transform: `translate(${mx * 0.009}px, ${my * 0.007}px)` }">
        <line x1="50" y1="10"  x2="35" y2="35"  class="c-line" />
        <line x1="35" y1="35"  x2="50" y2="60"  class="c-line" />
        <line x1="50" y1="60"  x2="50" y2="88"  class="c-line" />
        <line x1="50" y1="88"  x2="40" y2="112" class="c-line" />
        <line x1="40" y1="112" x2="50" y2="138" class="c-line" />
        <line x1="50" y1="138" x2="58" y2="162" class="c-line" />
        <line x1="58" y1="162" x2="72" y2="180" class="c-line" />
        <line x1="72" y1="180" x2="82" y2="200" class="c-line" />
        <circle cx="50" cy="10"  r="2.5" class="c-star" />
        <circle cx="35" cy="35"  r="1.5" class="c-star c-dim" />
        <circle cx="50" cy="60"  r="2"   class="c-star" />
        <circle cx="50" cy="88"  r="1.5" class="c-star c-dim" />
        <circle cx="40" cy="112" r="2"   class="c-star" />
        <circle cx="50" cy="138" r="1.5" class="c-star c-dim" />
        <circle cx="58" cy="162" r="2"   class="c-star" />
        <circle cx="72" cy="180" r="1.5" class="c-star c-dim" />
        <circle cx="82" cy="200" r="2.5" class="c-star" />
        <text x="5" y="205" class="c-label">Cluster SLAM</text>
      </svg>

      <div
        class="planet-wrap"
        :style="{ transform: `translate(${mx * 0.035}px, ${my * 0.035}px)` }"
      >
        <div class="planet">
          <div class="planet-surface" />
          <div class="planet-band band-1" />
          <div class="planet-band band-2" />
          <div class="planet-band band-3" />
          <div class="planet-shadow" />
          <div class="planet-glow" />
        </div>
        <div class="ring-wrap">
          <div class="ring ring-back" />
          <div class="ring ring-front" />
        </div>
        <div class="moon-orbit">
          <div class="moon" />
        </div>
      </div>

      <div class="shooting-star ss-1" />
      <div class="shooting-star ss-2" />
      <div class="shooting-star ss-3" />

    </div>

    <main class="layout-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'
import SplashScreen from '~/components/UI/SplashScreen.vue'
import useSplashNavigation from '~/hooks/useSplashNavigation'
import { useTheme } from '~/hooks/useTheme'

const { theme } = useTheme()
const { isHome, splashDone, initSplash } = useSplashNavigation()

initSplash()

provide('splashDone', splashDone)

const mx = ref(0)
const my = ref(0)
let rafId: number | null = null
let targetX = 0
let targetY = 0

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX - window.innerWidth  / 2
  targetY = e.clientY - window.innerHeight / 2
  if (!rafId) animate()
}
function onMouseLeave() {
  targetX = 0; targetY = 0
  if (!rafId) animate()
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function animate() {
  mx.value = lerp(mx.value, targetX, 0.07)
  my.value = lerp(my.value, targetY, 0.07)
  const moving = Math.abs(mx.value - targetX) > 0.1 || Math.abs(my.value - targetY) > 0.1
  if (moving) { rafId = requestAnimationFrame(animate) }
  else { mx.value = targetX; my.value = targetY; rafId = null }
}
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})


</script>

<style scoped>

.layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  isolation: isolate;
}

.layout-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 4rem 16px;
  min-height: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.cosmos-overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: nebulaBreath 8s ease-in-out infinite alternate;
  will-change: transform, opacity;
}
.nebula-1 {
  width: 520px; height: 340px; top: -80px; left: -60px;
  background: radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, rgba(79,70,229,0.10) 50%, transparent 70%);
  animation-duration: 9s;
}
.nebula-2 {
  width: 440px; height: 380px; top: 30%; right: -100px;
  background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 50%, transparent 70%);
  animation-duration: 11s; animation-delay: 2s;
}
.nebula-3 {
  width: 480px; height: 300px; bottom: -60px; left: 20%;
  background: radial-gradient(ellipse, rgba(67,56,202,0.20) 0%, rgba(99,102,241,0.09) 50%, transparent 70%);
  animation-duration: 13s; animation-delay: 1s;
}
.nebula-4 {
  width: 360px; height: 320px; top: 50%; left: 38%;
  background: radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(79,70,229,0.05) 50%, transparent 70%);
  animation-duration: 15s; animation-delay: 4s;
}
@keyframes nebulaBreath {
  0%   { opacity: 0.0; }
  20%  { opacity: 1.0; }
  50%  { opacity: 0.8; }
  80%  { opacity: 1.0; }
  100% { opacity: 0.0; }
}

.const {
  position: absolute;
  will-change: transform;
  opacity: 0.55;
}

.const-gl { top: 8%;    left: 10px;  width: 110px; height: 200px; }
.const-gb { bottom: 8%; left: 10px;  width: 160px; height: 110px; }
.const-dh { top: 6%;    right: 10px; width: 180px; height: 70px;  }
.const-db { top: 30%;   right: 10px; width: 100px; height: 210px; }

.c-line {
  stroke: rgba(167, 139, 250, 0.28);
  stroke-width: 0.7;
  stroke-dasharray: 4 4;
}

.c-star {
  fill: rgba(220, 228, 255, 0.80);
}
.c-dim {
  fill: rgba(160, 170, 230, 0.45);
}

.c-label {
  fill: rgba(139, 92, 246, 0.40);
  font-size: 8px;
  font-family: monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.planet-wrap {
  position: absolute;
  bottom: -80px; right: -70px;
  width: 220px; height: 220px;
  will-change: transform;
  transition: transform 0.12s linear;
}

.planet { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; }

.planet-surface {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%,
    #2d2b6e 0%, #1a1855 30%, #0f0d3a 65%, #080728 100%
  );
}

.planet-band { position: absolute; left: 0; right: 0; border-radius: 50%; opacity: 0.22; }
.band-1 { top: 28%; height: 14%; background: linear-gradient(180deg, transparent, rgba(139,92,246,0.55), transparent); }
.band-2 { top: 50%; height: 10%; background: linear-gradient(180deg, transparent, rgba(99,102,241,0.45), transparent); }
.band-3 { top: 66%; height: 8%;  background: linear-gradient(180deg, transparent, rgba(167,139,250,0.35), transparent); }

.planet-shadow {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 72% 28%, transparent 30%, rgba(4,3,20,0.75) 80%);
}

.planet-glow {
  position: absolute; inset: -18px; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 70%);
  filter: blur(8px);
  animation: planetPulse 4s ease-in-out infinite alternate;
}
@keyframes planetPulse {
  from { opacity: 0.6; transform: scale(0.95); }
  to   { opacity: 1.0; transform: scale(1.05); }
}

.ring-wrap { position: absolute; inset: 0; pointer-events: none; }
.ring {
  position: absolute; top: 50%; left: 50%;
  width: 310px; height: 60px;
  margin-left: -155px; margin-top: -30px;
  border-radius: 50%; border: 8px solid transparent;
  transform: rotateX(72deg) rotateZ(-18deg);
}
.ring-back {
  border-color: rgba(139,92,246,0.28);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 50%);
          mask-image: linear-gradient(to bottom, black 50%, transparent 50%);
  box-shadow: 0 0 12px rgba(139,92,246,0.15);
}
.ring-front {
  border-color: rgba(167,139,250,0.45);
  -webkit-mask-image: linear-gradient(to top, black 50%, transparent 50%);
          mask-image: linear-gradient(to top, black 50%, transparent 50%);
  box-shadow: 0 0 8px rgba(167,139,250,0.20);
}

.moon-orbit {
  position: absolute; inset: -30px; border-radius: 50%;
  animation: moonOrbit 12s linear infinite;
}
.moon {
  position: absolute; top: 0; left: 50%;
  width: 14px; height: 14px;
  margin-left: -7px; margin-top: -7px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #d4d0f0, #8880c0);
  box-shadow: 0 0 8px rgba(167,139,250,0.5);
}
@keyframes moonOrbit {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.shooting-star {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(200,210,255,0.6) 70%, rgba(255,255,255,0) 100%);
  border-radius: 1px; opacity: 0; transform-origin: left center;
}
.ss-1 { width: 180px; top: 18%; left: 10%; animation: shootingStar 7s ease-in-out infinite; animation-delay: 1.5s; }
.ss-2 { width: 140px; top: 42%; left: 55%; animation: shootingStar 9s ease-in-out infinite; animation-delay: 4.5s; }
.ss-3 { width: 220px; top: 72%; left: 25%; animation: shootingStar 11s ease-in-out infinite; animation-delay: 7s; }
@keyframes shootingStar {
  0%   { opacity: 0; transform: translateX(-40px) rotate(-20deg); }
  3%   { opacity: 1; }
  12%  { opacity: 0; transform: translateX(260px) rotate(-20deg); }
  100% { opacity: 0; transform: translateX(260px) rotate(-20deg); }
}

@media (max-width: 1024px) {
  .layout { height: auto; min-height: 100dvh; overflow: visible; }
  .layout-main { overflow: visible; align-items: flex-start; padding: 88px 16px 32px; }
  .planet-wrap { width: 180px; height: 180px; }
  .const { display: none; }
}

@media (max-width: 640px) {
  .layout-main { padding: 72px 10px 20px; }
  .nebula      { filter: blur(60px); }
  .planet-wrap { width: 140px; height: 140px; }
  .ring        { width: 240px; margin-left: -120px; }
}
</style>