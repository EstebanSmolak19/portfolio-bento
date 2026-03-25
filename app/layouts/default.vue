<template>
  <div class="layout" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <SplashScreen @done="splashDone = true" v-if="isHome && !splashDone"/>
    <Header />

    <div v-if="theme === 'dark'" class="cosmos-overlay" aria-hidden="true">
      <div class="nebula nebula-1" :style="{ transform: `translate(${mx * 0.018}px, ${my * 0.018}px) scale(0.92)` }" />
      <div class="nebula nebula-2" :style="{ transform: `translate(${mx * -0.024}px, ${my * -0.024}px) scale(0.92)` }" />
      <div class="nebula nebula-3" :style="{ transform: `translate(${mx * 0.012}px, ${my * 0.030}px) scale(0.92)` }" />
      <div class="nebula nebula-4" :style="{ transform: `translate(${mx * -0.015}px, ${my * -0.012}px) scale(0.92)` }" />

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

      <div class="planet-wrap" :style="{ transform: `translate(${mx * 0.035}px, ${my * 0.035}px)` }">
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

    <div v-if="theme === 'light'" class="solar-overlay" aria-hidden="true">

      <div class="solar-stars">
        <div v-for="i in 80" :key="i" class="solar-star" :style="{
          left: (Math.sin(i * 137.5) * 50 + 50) + '%',
          top:  (Math.cos(i * 97.3)  * 50 + 50) + '%',
          width:  (Math.sin(i * 23) * 1 + 1.4) + 'px',
          height: (Math.sin(i * 23) * 1 + 1.4) + 'px',
          animationDelay:    (i * 0.17) + 's',
          animationDuration: (2 + Math.abs(Math.sin(i * 17)) * 2) + 's'
        }" />
      </div>

      <div
        class="solar-wind-wrap"
        :style="{ transform: `translate(${mx * 0.005}px, ${my * 0.005}px)` }"
      >
        <div v-for="j in 18" :key="j" class="solar-wind-ray" :style="{
          '--ray-angle': (j * 20) + 'deg',
          '--ray-delay': (j * 0.22) + 's',
          '--ray-len':   (38 + (j % 5) * 8) + 'vh'
        }" />
      </div>

      <div
        class="giant-sun"
        :style="{ transform: `translate(calc(-20vh + ${mx * 0.015}px), calc(-20vh + ${my * 0.015}px))` }"
      >
        <div class="sun-halo-outer" />
        <div class="sun-halo" />
        <div class="sun-corona" />
        <div class="sun-corona-2" />

        <div class="sun-surface">
          <div class="sun-texture-1" />
          <div class="sun-texture-2" />
          <div class="sun-convection" />
          <div class="sun-granulation" />
          <div class="sun-faculae" />

          <div class="sunspot sunspot-1" />
          <div class="sunspot sunspot-2" />
          <div class="sunspot sunspot-3" />
          <div class="sunspot sunspot-4" />
        </div>

        <div class="sun-flare-ring" />

        <svg class="sun-prominence-svg prom-svg-1" viewBox="0 0 200 200">
          <path d="M 100 100 Q 60 30 30 80 Q 10 110 50 130 Q 80 145 100 100Z" class="prom-fill prom-fill-1" />
        </svg>
        <svg class="sun-prominence-svg prom-svg-2" viewBox="0 0 200 200">
          <path d="M 100 100 Q 155 55 170 100 Q 185 145 140 160 Q 110 170 100 100Z" class="prom-fill prom-fill-2" />
        </svg>
        <svg class="sun-prominence-svg prom-svg-3" viewBox="0 0 200 200">
          <path d="M 100 100 Q 80 160 50 145 Q 20 130 40 105 Q 60 80 100 100Z" class="prom-fill prom-fill-3" />
        </svg>

        <div class="spicule-wrap">
          <div v-for="k in 24" :key="k" class="spicule" :style="{
            '--sp-angle': (k * 15) + 'deg',
            '--sp-delay': (k * 0.15) + 's',
            '--sp-h':     (4 + (k % 4) * 2) + 'px'
          }" />
        </div>

        <div class="solar-particle-wrap">
          <div v-for="p in 30" :key="p" class="sol-particle" :style="{
            '--p-x':     (Math.sin(p * 53.7) * 45 + 50) + '%',
            '--p-y':     (Math.cos(p * 37.1) * 45 + 50) + '%',
            '--p-delay': (p * 0.38) + 's',
            '--p-dur':   (3 + (p % 5)) + 's',
            '--p-tx':    (Math.sin(p * 71) * 60) + 'px',
            '--p-ty':    (Math.cos(p * 43) * 60) + 'px',
            '--p-size':  (1 + (p % 3)) + 'px'
          }" />
        </div>
      </div>

      <div
        class="solar-ambient"
        :style="{ transform: `translate(${mx * 0.008}px, ${my * 0.008}px)` }"
      />
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
import { ref, onUnmounted, provide } from 'vue'

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

.cosmos-overlay, .solar-overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  animation: fadeIn 1.2s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.nebula { position: absolute; border-radius: 50%; filter: blur(80px); animation: nebulaBreath 8s ease-in-out infinite alternate; will-change: transform, opacity; }
.nebula-1 { width: 520px; height: 340px; top: -80px; left: -60px; background: radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, rgba(79,70,229,0.10) 50%, transparent 70%); animation-duration: 9s; }
.nebula-2 { width: 440px; height: 380px; top: 30%; right: -100px; background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 50%, transparent 70%); animation-duration: 11s; animation-delay: 2s; }
.nebula-3 { width: 480px; height: 300px; bottom: -60px; left: 20%; background: radial-gradient(ellipse, rgba(67,56,202,0.20) 0%, rgba(99,102,241,0.09) 50%, transparent 70%); animation-duration: 13s; animation-delay: 1s; }
.nebula-4 { width: 360px; height: 320px; top: 50%; left: 38%; background: radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, rgba(79,70,229,0.05) 50%, transparent 70%); animation-duration: 15s; animation-delay: 4s; }
@keyframes nebulaBreath { 0% { opacity: 0.0; } 20% { opacity: 1.0; } 50% { opacity: 0.8; } 80% { opacity: 1.0; } 100% { opacity: 0.0; } }

.const { position: absolute; will-change: transform; opacity: 0.55; }
.const-gb { bottom: 8%; left: 10px; width: 160px; height: 110px; }
.const-db { top: 30%; right: 10px; width: 100px; height: 210px; }
.c-line  { stroke: rgba(167,139,250,0.28); stroke-width: 0.7; stroke-dasharray: 4 4; }
.c-star  { fill: rgba(220,228,255,0.80); }
.c-dim   { fill: rgba(160,170,230,0.45); }
.c-label { fill: rgba(139,92,246,0.40); font-size: 8px; font-family: monospace; letter-spacing: 0.06em; text-transform: uppercase; }

.planet-wrap { position: absolute; bottom: -80px; right: -70px; width: 220px; height: 220px; will-change: transform; transition: transform 0.12s linear; }
.planet { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; }
.planet-surface { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #2d2b6e 0%, #1a1855 30%, #0f0d3a 65%, #080728 100%); }
.planet-band { position: absolute; left: 0; right: 0; border-radius: 50%; opacity: 0.22; }
.band-1 { top: 28%; height: 14%; background: linear-gradient(180deg, transparent, rgba(139,92,246,0.55), transparent); }
.band-2 { top: 50%; height: 10%; background: linear-gradient(180deg, transparent, rgba(99,102,241,0.45), transparent); }
.band-3 { top: 66%; height: 8%; background: linear-gradient(180deg, transparent, rgba(167,139,250,0.35), transparent); }
.planet-shadow { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 72% 28%, transparent 30%, rgba(4,3,20,0.75) 80%); }
.planet-glow { position: absolute; inset: -18px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 70%); filter: blur(8px); animation: planetPulse 4s ease-in-out infinite alternate; }
@keyframes planetPulse { from { opacity: 0.6; transform: scale(0.95); } to { opacity: 1.0; transform: scale(1.05); } }

.ring-wrap { position: absolute; inset: 0; pointer-events: none; }
.ring { position: absolute; top: 50%; left: 50%; width: 310px; height: 60px; margin-left: -155px; margin-top: -30px; border-radius: 50%; border: 8px solid transparent; transform: rotateX(72deg) rotateZ(-18deg); }
.ring-back  { border-color: rgba(139,92,246,0.28); -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 50%); mask-image: linear-gradient(to bottom, black 50%, transparent 50%); box-shadow: 0 0 12px rgba(139,92,246,0.15); }
.ring-front { border-color: rgba(167,139,250,0.45); -webkit-mask-image: linear-gradient(to top, black 50%, transparent 50%); mask-image: linear-gradient(to top, black 50%, transparent 50%); box-shadow: 0 0 8px rgba(167,139,250,0.20); }

.moon-orbit { position: absolute; inset: -30px; border-radius: 50%; animation: moonOrbit 12s linear infinite; }
.moon { position: absolute; top: 0; left: 50%; width: 14px; height: 14px; margin-left: -7px; margin-top: -7px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #d4d0f0, #8880c0); box-shadow: 0 0 8px rgba(167,139,250,0.5); }
@keyframes moonOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.shooting-star { position: absolute; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(200,210,255,0.6) 70%, rgba(255,255,255,0) 100%); border-radius: 1px; opacity: 0; transform-origin: left center; }
.ss-1 { width: 180px; top: 18%; left: 10%; animation: shootingStar 7s ease-in-out infinite; animation-delay: 1.5s; }
.ss-2 { width: 140px; top: 42%; left: 55%; animation: shootingStar 9s ease-in-out infinite; animation-delay: 4.5s; }
.ss-3 { width: 220px; top: 72%; left: 25%; animation: shootingStar 11s ease-in-out infinite; animation-delay: 7s; }
@keyframes shootingStar { 0% { opacity: 0; transform: translateX(-40px) rotate(-20deg); } 3% { opacity: 1; } 12% { opacity: 0; transform: translateX(260px) rotate(-20deg); } 100% { opacity: 0; transform: translateX(260px) rotate(-20deg); } }

.solar-stars { position: absolute; inset: 0; }
.solar-star {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  animation: solarStarTwinkle var(--dur, 3s) ease-in-out infinite alternate;
}
@keyframes solarStarTwinkle { 0% { opacity: 0.08; transform: scale(0.6); } 100% { opacity: 0.55; transform: scale(1.4); } }

.solar-wind-wrap {
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 0;
  z-index: 1;
}
.solar-wind-ray {
  position: absolute;
  top: 0; left: 0;
  width: var(--ray-len);
  height: 1px;
  transform-origin: 0% 50%;
  transform: rotate(var(--ray-angle));
  background: linear-gradient(90deg,
    rgba(245,158,11,0.18) 0%,
    rgba(245,158,11,0.06) 40%,
    transparent 100%
  );
  animation: rayPulse 4s ease-in-out infinite alternate;
  animation-delay: var(--ray-delay);
  filter: blur(1.5px);
}
@keyframes rayPulse {
  0%   { opacity: 0.3; }
  100% { opacity: 0.9; }
}

.giant-sun {
  position: absolute;
  top: 0; left: 0;
  width: 52vh; height: 52vh;
  border-radius: 50%;
  z-index: 2;
  animation: sunEntrance 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform;
}
@keyframes sunEntrance { 0% { opacity: 0; filter: blur(25px); } 100% { opacity: 1; filter: blur(0px); } }

.sun-halo-outer {
  position: absolute;
  inset: -35vh;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,200,50,0.10)  0%,
    rgba(245,120,11,0.06) 30%,
    rgba(200,50,10,0.02)  60%,
    transparent           80%
  );
  filter: blur(60px);
  animation: pulseSunGlow 9s ease-in-out infinite alternate;
}

.sun-halo {
  position: absolute;
  inset: -18vh;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,240,120,0.32) 0%,
    rgba(245,158,11,0.16)  28%,
    rgba(234,88,12,0.07)   55%,
    transparent            78%
  );
  filter: blur(38px);
  animation: pulseSunGlow 7s ease-in-out infinite alternate;
  animation-delay: 1s;
}

.sun-corona {
  position: absolute;
  inset: -6vh;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,252,200,0.70) 0%,
    rgba(245,158,11,0.40)  38%,
    rgba(234,88,12,0.12)   68%,
    transparent            100%
  );
  filter: blur(16px);
  animation: rotateCorona 30s linear infinite;
}

.sun-corona-2 {
  position: absolute;
  inset: -3vh;
  border-radius: 50%;
  background: conic-gradient(from 0deg,
    rgba(255,220,80,0.22),
    rgba(255,140,30,0.08),
    rgba(255,220,80,0.18),
    rgba(255,100,10,0.05),
    rgba(255,220,80,0.22)
  );
  filter: blur(10px);
  animation: rotateCorona 18s linear infinite reverse;
  mix-blend-mode: screen;
}

.sun-surface {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 32%,
    #ffffff 0%,
    #fff9d0 6%,
    #fde68a 16%,
    #fbbf24 32%,
    #f59e0b 50%,
    #dc6f00 68%,
    #92300a 85%,
    #5c1a06 100%
  );
  box-shadow:
    0 0 90px rgba(245,158,11,0.75),
    0 0 180px rgba(234,88,12,0.38),
    inset -18px -18px 55px rgba(100,15,0,0.88),
    inset 14px 14px 38px rgba(255,255,230,0.65);
  overflow: hidden;
}

.sun-texture-1 {
  position: absolute; inset: -15%;
  background:
    radial-gradient(circle at 38% 38%, rgba(234,88,12,0.60)  0%, transparent 30%),
    radial-gradient(circle at 68% 62%, rgba(180,20,0,0.68)   0%, transparent 38%),
    radial-gradient(circle at 22% 75%, rgba(251,191,36,0.48) 0%, transparent 34%),
    radial-gradient(circle at 62% 18%, rgba(255,220,60,0.38) 0%, transparent 26%),
    radial-gradient(circle at 85% 35%, rgba(200,60,5,0.42)   0%, transparent 28%);
  filter: blur(9px);
  animation: surfaceFlow 28s ease-in-out infinite alternate;
  mix-blend-mode: overlay;
}

.sun-texture-2 {
  position: absolute; inset: -10%;
  background: conic-gradient(from 0deg,
    transparent,
    rgba(254,240,138,0.50),
    transparent,
    rgba(245,158,11,0.60),
    transparent,
    rgba(253,186,116,0.40),
    transparent,
    rgba(255,240,100,0.45),
    transparent
  );
  animation: rotatePlasma 35s linear infinite;
  mix-blend-mode: hard-light;
  filter: blur(14px);
}

.sun-convection {
  position: absolute; inset: 0; border-radius: 50%;
  background:
    radial-gradient(circle at 28% 55%, rgba(255,200,50,0.14) 0%, transparent 18%),
    radial-gradient(circle at 72% 30%, rgba(255,140,20,0.12) 0%, transparent 15%),
    radial-gradient(circle at 50% 78%, rgba(245,100,10,0.10) 0%, transparent 14%),
    radial-gradient(circle at 15% 20%, rgba(255,220,80,0.11) 0%, transparent 16%),
    radial-gradient(circle at 85% 70%, rgba(220,70,5,0.10)   0%, transparent 13%);
  animation: convectionShift 18s ease-in-out infinite alternate;
  mix-blend-mode: screen;
}

.sun-granulation {
  position: absolute; inset: 0; border-radius: 50%; opacity: 0.20;
  background-image:
    radial-gradient(circle at center, rgba(255,210,80,0.65) 0%, transparent 1.2%),
    radial-gradient(circle at center, rgba(255,160,40,0.45) 0%, transparent 0.7%);
  background-size: 7px 7px, 5px 5px;
  animation: granulationTwist 14s ease infinite alternate;
}

.sun-faculae {
  position: absolute; inset: 0; border-radius: 50%;
  background:
    radial-gradient(circle at 80% 20%, rgba(255,255,200,0.22) 0%, transparent 12%),
    radial-gradient(circle at 15% 70%, rgba(255,240,160,0.18) 0%, transparent 10%),
    radial-gradient(circle at 55% 88%, rgba(255,250,180,0.15) 0%, transparent 9%);
  animation: faculaePulse 8s ease-in-out infinite alternate;
  mix-blend-mode: screen;
}

.sunspot {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(20,5,0,0.90)  0%,
    rgba(60,15,0,0.70) 40%,
    rgba(120,40,5,0.40) 70%,
    transparent        100%
  );
  animation: sunspotDrift 20s ease-in-out infinite alternate;
}
.sunspot-1 { width: 8%;  height: 8%;  top: 38%; left: 42%; animation-duration: 22s; }
.sunspot-2 { width: 5%;  height: 5%;  top: 56%; left: 28%; animation-duration: 17s; animation-delay: 3s; }
.sunspot-3 { width: 6%;  height: 6%;  top: 28%; left: 60%; animation-duration: 25s; animation-delay: 6s; }
.sunspot-4 { width: 3.5%;height: 3.5%;top: 62%; left: 58%; animation-duration: 19s; animation-delay: 9s; }

.sun-flare-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: conic-gradient(from 0deg,
    rgba(255,200,60,0.6),
    transparent 25%,
    rgba(255,140,20,0.5),
    transparent 60%,
    rgba(255,220,80,0.55),
    transparent 85%,
    rgba(255,200,60,0.6)
  ) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  animation: rotateCorona 12s linear infinite;
  filter: blur(0.5px);
}

.sun-prominence-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  mix-blend-mode: screen;
}
.prom-fill { fill-opacity: 0; stroke-width: 0; }
.prom-fill-1 { fill: rgba(255,80,10,0.55); animation: promFill 18s ease-in-out infinite; }
.prom-fill-2 { fill: rgba(255,140,20,0.45); animation: promFill 14s ease-in-out infinite; animation-delay: 4s; }
.prom-fill-3 { fill: rgba(255,60,5,0.50);   animation: promFill 22s ease-in-out infinite; animation-delay: 8s; }

@keyframes promFill {
  0%   { fill-opacity: 0;    transform: scale(0.9) translateY(4px); }
  20%  { fill-opacity: 0.8;  transform: scale(1.0) translateY(0px); }
  60%  { fill-opacity: 0.65; transform: scale(1.05) translateY(-2px); }
  85%  { fill-opacity: 0.3;  transform: scale(0.95) translateY(2px); }
  100% { fill-opacity: 0;    transform: scale(0.9) translateY(4px); }
}

.spicule-wrap {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
}
.spicule {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px;
  height: var(--sp-h, 6px);
  transform-origin: bottom center;
  transform: rotate(var(--sp-angle)) translateY(-49%);
  background: linear-gradient(to top, rgba(255,200,80,0.7), transparent);
  animation: spiculePulse 2.5s ease-in-out infinite alternate;
  animation-delay: var(--sp-delay);
  filter: blur(0.3px);
}
@keyframes spiculePulse {
  0%   { opacity: 0.2; height: var(--sp-h); }
  100% { opacity: 0.9; height: calc(var(--sp-h) * 2.2); }
}

.solar-particle-wrap { position: absolute; inset: 0; }
.sol-particle {
  position: absolute;
  left: var(--p-x);
  top:  var(--p-y);
  width: var(--p-size, 2px);
  height: var(--p-size, 2px);
  border-radius: 50%;
  background: #fef08a;
  box-shadow: 0 0 6px #f59e0b, 0 0 10px #ea580c;
  opacity: 0;
  animation: particleEject var(--p-dur, 4s) ease-out infinite;
  animation-delay: var(--p-delay);
}
@keyframes particleEject {
  0%   { opacity: 0;   transform: translate(0, 0) scale(0.5); }
  15%  { opacity: 1;   transform: translate(calc(var(--p-tx) * 0.2), calc(var(--p-ty) * 0.2)) scale(1); }
  70%  { opacity: 0.6; transform: translate(calc(var(--p-tx) * 0.8), calc(var(--p-ty) * 0.8)) scale(0.8); }
  100% { opacity: 0;   transform: translate(var(--p-tx), var(--p-ty)) scale(0.2); }
}

.solar-ambient {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 55% 45% at 0% 0%, rgba(245,158,11,0.10) 0%, transparent 65%),
    radial-gradient(ellipse 30% 40% at 100% 100%, rgba(234,88,12,0.05) 0%, transparent 65%);
  pointer-events: none;
}

@keyframes surfaceFlow     { 0% { transform: scale(1) translate(0,0); } 100% { transform: scale(1.12) translate(3%, 3%); } }
@keyframes rotatePlasma    { 100% { transform: rotate(360deg); } }
@keyframes rotateCorona    { 100% { transform: rotate(360deg) scale(1.02); } }
@keyframes pulseSunGlow    { 0% { transform: scale(0.93); opacity: 0.60; } 100% { transform: scale(1.07); opacity: 1; } }
@keyframes granulationTwist { 100% { transform: rotate(12deg) scale(1.12); opacity: 0.26; } }
@keyframes convectionShift { 0% { transform: scale(1) rotate(0deg); } 100% { transform: scale(1.05) rotate(8deg); } }
@keyframes faculaePulse    { 0% { opacity: 0.5; } 100% { opacity: 1.0; } }
@keyframes sunspotDrift    { 0% { transform: translate(0,0); } 100% { transform: translate(3px, 2px); } }

@media (max-width: 1024px) {
  .layout { height: auto; min-height: 100dvh; overflow: visible; }
  .layout-main { overflow: visible; align-items: flex-start; padding: 88px 16px 32px; }
  .planet-wrap { width: 180px; height: 180px; }
  .const { display: none; }
  .giant-sun { width: 40vh; height: 40vh; }
}

@media (max-width: 640px) {
  .layout-main { padding: 72px 10px 20px; }
  .nebula { filter: blur(60px); }
  .planet-wrap { width: 140px; height: 140px; }
  .ring { width: 240px; margin-left: -120px; }
  .giant-sun { width: 30vh; height: 30vh; }
}
</style>