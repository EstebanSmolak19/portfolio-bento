<template>
  <canvas ref="canvasEl" id="cursor-canvas" />
</template>

<script setup lang="ts">
const canvasEl = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf: number

interface Pt { x: number; y: number; t: number }
const pts: Pt[] = []
const MAX = 40

let mx = -200, my = -200
let idleX = -200, idleY = -200
let idleTimer: ReturnType<typeof setTimeout> | null = null
let isIdle = false

function resizeCanvas() {
  const c = canvasEl.value
  if (!c) return
  c.width  = window.innerWidth
  c.height = window.innerHeight
}

function drawGlowDot(x: number, y: number, alpha: number) {
  if (!ctx) return
  const g = ctx.createRadialGradient(x, y, 0, x, y, 14)
  g.addColorStop(0,   `hsla(175, 95%, 75%, ${alpha * 0.9})`)
  g.addColorStop(0.4, `hsla(175, 90%, 62%, ${alpha * 0.3})`)
  g.addColorStop(1,   `hsla(178, 80%, 55%, 0)`)
  ctx.beginPath()
  ctx.arc(x, y, 14, 0, Math.PI * 2)
  ctx.fillStyle = g
  ctx.fill()
}

function draw() {
  if (!ctx || !canvasEl.value) return
  ctx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  const now = Date.now()

  if (pts.length >= 2) {
    // passe blur sur le contexte
    ctx.filter = 'blur(1.5px)'

    for (let i = 1; i < pts.length; i++) {
      const p0  = pts[i - 1]
      const p1  = pts[i]
      const age = (now - p1!.t) / 600
      if (age > 1) continue

      const frac = i / pts.length
      const a    = (1 - age) * frac * 0.55
      const w    = (0.3 + frac * 1.8) * (1 - age * 0.5)

      ctx.beginPath()
      ctx.moveTo(p0!.x, p0!.y)
      ctx.lineTo(p1!.x, p1!.y)
      ctx.strokeStyle = `hsla(175, 85%, 65%, ${a})`
      ctx.lineWidth   = w
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      ctx.stroke()
    }

    ctx.filter = 'none'

    // tête sans blur
    const head    = pts[pts.length - 1]
    const headAge = (now - head!.t) / 600
    if (headAge < 1) drawGlowDot(head!.x, head!.y, 1 - headAge)
  }

  if (isIdle) {
    const pulse = 0.5 + 0.4 * Math.sin(now / 850)
    drawGlowDot(idleX, idleY, pulse)
  }

  raf = requestAnimationFrame(draw)
}

const onMove = (e: MouseEvent) => {
  mx = e.clientX
  my = e.clientY
  isIdle = false
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { isIdle = true; idleX = mx; idleY = my }, 400)
  pts.push({ x: mx, y: my, t: Date.now() })
  if (pts.length > MAX) pts.shift()
}

onMounted(() => {
  ctx = canvasEl.value?.getContext('2d') ?? null
  resizeCanvas()
  window.addEventListener('mousemove', onMove)
  window.addEventListener('resize', resizeCanvas)
  raf = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(raf)
  if (idleTimer) clearTimeout(idleTimer)
})
</script>

<style>
*, *::before, *::after { cursor: none !important; }

#cursor-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>