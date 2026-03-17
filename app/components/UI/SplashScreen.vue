<template>
  <Transition name="splash">
    <div v-if="visible" class="splash">
      <div class="splash-content">
        <div class="splash-logo">
          <span class="splash-initials">ES</span>
          <div class="splash-ring" />
        </div>
        <p class="splash-name">Estéban Smolak</p>
        <div class="splash-bar-wrap">
          <div class="splash-bar" :style="{ width: progress + '%' }" />
        </div>
        <p class="splash-pct">{{ Math.round(progress) }}%</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['done'])
const visible  = ref(true)
const progress = ref(0)

onMounted(() => {
  const steps = [
    { target: 30,  duration: 300 },
    { target: 65,  duration: 400 },
    { target: 85,  duration: 300 },
    { target: 100, duration: 350 },
  ]
  let current = 0

  const run = () => {
    if (current >= steps.length) {
      setTimeout(() => {
        visible.value = false
        setTimeout(() => emit('done'), 500)
      }, 300)
      return
    }
    const { target, duration } = steps[current]
    const start = progress.value
    const startTime = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      progress.value = start + (target - start) * ease
      if (t < 1) requestAnimationFrame(tick)
      else { current++; setTimeout(run, 80) }
    }
    requestAnimationFrame(tick)
  }
  run()
})
</script>

<style scoped>
.splash {
  position: fixed; inset: 0; z-index: 9999;
  background: #0e1018;
  display: flex; align-items: center; justify-content: center;
}
.splash-content {
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.splash-logo {
  position: relative; width: 72px; height: 72px;
  display: flex; align-items: center; justify-content: center;
}
.splash-initials {
  font-size: 22px; font-weight: 800; letter-spacing: 0.1em;
  background: linear-gradient(135deg, #818cf8, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  position: relative; z-index: 1;
}
.splash-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1.5px solid transparent;
  background: linear-gradient(#0e1018, #0e1018) padding-box,
              linear-gradient(135deg, #6366f1, #818cf8, #4f46e5) border-box;
  animation: spinRing 1.8s linear infinite;
}
@keyframes spinRing { to { transform: rotate(360deg); } }
.splash-name {
  font-size: 13px; font-weight: 500; letter-spacing: 0.2em;
  text-transform: uppercase; color: rgba(255,255,255,0.35);
}
.splash-bar-wrap {
  width: 200px; height: 2px;
  background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden;
}
.splash-bar {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #4f46e5, #818cf8, #6366f1);
  background-size: 200% 100%;
  animation: barShimmer 1.5s linear infinite;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(99,102,241,0.6);
}
@keyframes barShimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
.splash-pct {
  font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
  color: rgba(129,140,248,0.6); font-variant-numeric: tabular-nums;
}
.splash-enter-active, .splash-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.splash-enter-from { opacity: 0; }
.splash-leave-to   { opacity: 0; transform: scale(1.04); }
</style>