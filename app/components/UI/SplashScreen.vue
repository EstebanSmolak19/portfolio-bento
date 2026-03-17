<template>
  <Transition name="splash">
    <div v-if="visible" class="splash">
      <canvas ref="canvasEl" class="splash-canvas" />

      <div class="center">
        <div class="lottie-wrap" :class="{ in: phase >= 1 }">

          <!-- Aura canvas autour de la Lottie -->
          <canvas ref="auraCanvas" class="aura-canvas" />

          <!-- Rings CSS -->
          <div class="ring ring-1" />
          <div class="ring ring-2" />
          <div class="ring ring-3" />

          <div ref="lottieEl" class="lottie-player" />
        </div>

        <p class="name" :class="{ in: phase >= 2 }">Estéban Smolak</p>
        <p class="sub"  :class="{ in: phase >= 3 }">Développeur Fullstack</p>

        <div class="bar-wrap" :class="{ in: phase >= 4 }">
          <div class="bar" :style="{ width: progress + '%' }" />
        </div>
        <p class="pct" :class="{ in: phase >= 4 }">{{ Math.round(progress) }}%</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit       = defineEmits(['done'])
const visible    = ref(true)
const progress   = ref(0)
const phase      = ref(0)
const canvasEl   = ref<HTMLCanvasElement | null>(null)
const auraCanvas = ref<HTMLCanvasElement | null>(null)
const lottieEl   = ref<HTMLElement | null>(null)
let raf: number
let auraRaf: number

// ── Lottie (import dynamique client-only) ─────────────────────────────────
async function startLottie() {
  if (!lottieEl.value) return
  const { default: lottie } = await import('lottie-web')
  lottie.loadAnimation({
    container: lottieEl.value,
    renderer:  'svg',
    loop:      true,
    autoplay:  true,
    path:      '/lottie/anim.json',
  })
}

// ── Aura canvas orbitale ──────────────────────────────────────────────────
function startAura() {
  const canvas = auraCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const S = 320
  canvas.width  = S
  canvas.height = S
  const C = S / 2

  // orbes orbitaux locaux autour du perso
  const orbs = [
    { angle: 0,                  r: 118, speed: 0.004,  size: 3.5, hue: 260, alpha: 0.9  },
    { angle: Math.PI,            r: 118, speed: 0.004,  size: 2.5, hue: 280, alpha: 0.7  },
    { angle: Math.PI / 2,        r: 132, speed: -0.003, size: 2,   hue: 240, alpha: 0.5  },
    { angle: Math.PI * 1.5,      r: 105, speed: 0.006,  size: 1.8, hue: 200, alpha: 0.45 },
    { angle: Math.PI * 0.3,      r: 145, speed: -0.005, size: 1.5, hue: 270, alpha: 0.35 },
    { angle: Math.PI * 1.7,      r: 145, speed: -0.005, size: 1.5, hue: 220, alpha: 0.35 },
  ]

  // traînes pour chaque orbe
  const trails: { x: number; y: number }[][] = orbs.map(() => [])
  const TRAIL = 32

  let t = 0
  let introA = 0

  const draw = () => {
    ctx.clearRect(0, 0, S, S)
    introA = Math.min(1, introA + 0.018)
    t++

    // halo central pulsant
    const pulse = 1 + 0.06 * Math.sin(t * 0.025)
    const g = ctx.createRadialGradient(C, C, 0, C, C, 90 * pulse)
    g.addColorStop(0,   `rgba(99,102,241,${0.12 * introA})`)
    g.addColorStop(0.5, `rgba(139,92,246,${0.06 * introA})`)
    g.addColorStop(1,   'rgba(99,102,241,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, S, S)

    // dessine chaque orbe + traîne
    for (let i = 0; i < orbs.length; i++) {
      const o = orbs[i]
      o.angle += o.speed

      const x = C + Math.cos(o.angle) * o.r
      const y = C + Math.sin(o.angle) * o.r * 0.38 // aplatissement ellipse

      // traîne
      trails[i].push({ x, y })
      if (trails[i].length > TRAIL) trails[i].shift()

      for (let j = 1; j < trails[i].length; j++) {
        const p0 = trails[i][j - 1]
        const p1 = trails[i][j]
        const frac = j / trails[i].length
        const a = frac * o.alpha * 0.5 * introA
        const w = frac * o.size * 0.8
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.strokeStyle = `hsla(${o.hue}, 80%, 68%, ${a})`
        ctx.lineWidth   = w
        ctx.lineCap     = 'round'
        ctx.stroke()
      }

      // point lumineux
      const gOrb = ctx.createRadialGradient(x, y, 0, x, y, o.size * 3.5)
      gOrb.addColorStop(0,   `hsla(${o.hue}, 90%, 80%, ${o.alpha * introA})`)
      gOrb.addColorStop(0.5, `hsla(${o.hue}, 80%, 65%, ${o.alpha * 0.4 * introA})`)
      gOrb.addColorStop(1,   `hsla(${o.hue}, 70%, 55%, 0)`)
      ctx.beginPath()
      ctx.arc(x, y, o.size * 3.5, 0, Math.PI * 2)
      ctx.fillStyle = gOrb
      ctx.fill()
    }

    auraRaf = requestAnimationFrame(draw)
  }
  draw()
}

// ── Canvas fond étoilé ────────────────────────────────────────────────────
function startCanvas() {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)
  const W = () => canvas.width, H = () => canvas.height

  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.1 + 0.2,
    a: Math.random() * 0.55 + 0.08,
    tw: Math.random() * Math.PI * 2,
    sp: 0.007 + Math.random() * 0.016,
  }))
  const orbs = Array.from({ length: 38 }, () => ({
    angle: Math.random() * Math.PI * 2,
    r: 90 + Math.random() * 480,
    speed: (0.06 + Math.random() * 0.13) * (Math.random() < 0.5 ? 1 : -1),
    size: Math.random() * 1.1 + 0.3,
    hue: 248 + Math.random() * 35,
    alpha: Math.random() * 0.3 + 0.07,
  }))

  let ia = 0, t = 0
  const draw = () => {
    ctx.clearRect(0, 0, W(), H())
    ia = Math.min(1, ia + 0.013); t++
    const CX = W() / 2, CY = H() / 2

    for (const s of stars) {
      s.tw += s.sp
      const a = s.a * (0.55 + 0.45 * Math.sin(s.tw)) * ia
      ctx.beginPath(); ctx.arc(s.x * W(), s.y * H(), s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,200,255,${a})`; ctx.fill()
    }
    ctx.fillStyle = `rgba(99,102,241,${0.016 * ia})`
    for (let x = 0; x < W(); x += 55) ctx.fillRect(x, 0, 1, H())
    for (let y = 0; y < H(); y += 55) ctx.fillRect(0, y, W(), 1)

    const pulse = 1 + 0.07 * Math.sin(t * 0.02)
    const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, 220 * pulse)
    g.addColorStop(0,   `rgba(99,102,241,${0.09 * ia})`)
    g.addColorStop(0.5, `rgba(139,92,246,${0.04 * ia})`)
    g.addColorStop(1,   'rgba(99,102,241,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W(), H())

    for (const p of orbs) {
      p.angle += p.speed * 0.01
      const x = CX + Math.cos(p.angle) * p.r
      const y = CY + Math.sin(p.angle) * p.r * 0.4
      const fade = Math.max(0, 1 - Math.sqrt((x-CX)**2+(y-CY)**2) / (Math.max(W(),H()) * 0.48))
      ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},80%,72%,${p.alpha * fade * ia})`; ctx.fill()
    }
    raf = requestAnimationFrame(draw)
  }
  draw()
}

// ── Progression ───────────────────────────────────────────────────────────
function runProgress() {
  const steps = [
    { target: 22, duration: 300 },
    { target: 55, duration: 380 },
    { target: 80, duration: 260 },
    { target: 100, duration: 340 },
  ]
  let si = 0
  const runStep = () => {
    if (si >= steps.length) {
      setTimeout(() => { visible.value = false; setTimeout(() => emit('done'), 520) }, 280)
      return
    }
    const { target, duration } = steps[si]
    const from = progress.value, t0 = performance.now()
    const tick = (now: number) => {
      const x = Math.min((now - t0) / duration, 1)
      progress.value = from + (target - from) * (1 - Math.pow(1 - x, 3))
      if (x < 1) requestAnimationFrame(tick)
      else { si++; setTimeout(runStep, 80) }
    }
    requestAnimationFrame(tick)
  }
  runStep()
}

onMounted(() => {
  startCanvas()
  startAura()
  startLottie()
  setTimeout(() => phase.value = 1, 100)
  setTimeout(() => phase.value = 2, 500)
  setTimeout(() => phase.value = 3, 650)
  setTimeout(() => phase.value = 4, 820)
  setTimeout(runProgress, 920)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  cancelAnimationFrame(auraRaf)
})
</script>

<style scoped>
.splash {
  position: fixed; inset: 0; z-index: 9999;
  background: #07070e;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.splash-canvas { position: absolute; inset: 0; pointer-events: none; }

.center {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}

/* ── Lottie wrap + aura ── */
.lottie-wrap {
  width: 200px; height: 200px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  opacity: 0; transform: scale(0.82) translateY(12px);
  transition: opacity .7s cubic-bezier(.22,1,.36,1),
              transform .7s cubic-bezier(.22,1,.36,1);
}
.lottie-wrap.in { opacity: 1; transform: scale(1) translateY(0); }

/* canvas aura centré, plus grand que la Lottie */
.aura-canvas {
  position: absolute;
  width: 320px; height: 320px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

/* rings CSS concentriques */
.ring {
  position: absolute;
  top: 50%; left: 50%;
  border-radius: 50%;
  border: 0.5px solid transparent;
  transform: translate(-50%, -50%) scaleY(0.38);
  pointer-events: none;
}
.ring-1 {
  width: 236px; height: 236px;
  border-color: rgba(99,102,241,0.18);
  animation: ringPulse 3s ease-in-out infinite;
}
.ring-2 {
  width: 210px; height: 210px;
  border-color: rgba(139,92,246,0.12);
  animation: ringPulse 3s ease-in-out infinite .5s;
}
.ring-3 {
  width: 264px; height: 264px;
  border-color: rgba(99,102,241,0.07);
  animation: ringPulse 3s ease-in-out infinite 1s;
}

@keyframes ringPulse {
  0%,100% { opacity: 0.6; }
  50%     { opacity: 1; }
}

.lottie-player {
  width: 100%; height: 100%;
  position: relative; z-index: 1;
}

/* ── Textes ── */
.name {
  font-size: 22px; font-weight: 700; letter-spacing: -.03em;
  color: rgba(255,255,255,.9);
  opacity: 0; transform: translateY(8px);
  transition: opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1);
  margin-bottom: 5px;
}
.name.in { opacity: 1; transform: translateY(0); }

.sub {
  font-size: 10px; font-weight: 400; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(99,102,241,.65);
  opacity: 0; transform: translateY(6px);
  transition: opacity .5s .1s ease, transform .5s .1s cubic-bezier(.22,1,.36,1);
  margin-bottom: 40px;
}
.sub.in { opacity: 1; transform: translateY(0); }

/* ── Barre ── */
.bar-wrap {
  width: 200px; height: 1px; background: rgba(255,255,255,.05);
  border-radius: 99px; overflow: visible; position: relative;
  opacity: 0; transition: opacity .3s ease; margin-bottom: 10px;
}
.bar-wrap.in { opacity: 1; }
.bar {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6, #6366f1);
  background-size: 200% 100%;
  animation: shimmer 1.8s linear infinite;
  transition: width .08s linear;
  box-shadow: 0 0 8px rgba(99,102,241,.9), 0 0 20px rgba(99,102,241,.3);
  position: relative;
}
.bar::after {
  content: ''; position: absolute; right: -3px; top: 50%; transform: translateY(-50%);
  width: 5px; height: 5px; border-radius: 50%; background: #c4b5fd;
  box-shadow: 0 0 6px #8b5cf6, 0 0 16px rgba(139,92,246,.7);
}
@keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }

.pct {
  font-size: 10px; font-weight: 600; letter-spacing: .1em;
  color: rgba(139,92,246,.5); font-variant-numeric: tabular-nums;
  opacity: 0; transition: opacity .3s ease;
}
.pct.in { opacity: 1; }

.splash-enter-active, .splash-leave-active { transition: opacity .52s ease, transform .52s ease; }
.splash-enter-from { opacity: 0; }
.splash-leave-to   { opacity: 0; transform: scale(1.03); }
</style>