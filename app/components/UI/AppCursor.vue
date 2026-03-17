<template>
  <div>
    <div id="custom-cursor" ref="dot" />
    <div id="custom-cursor-ring" ref="ring" />
  </div>
</template>

<script setup lang="ts">
const dot  = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

let mouseX = 0, mouseY = 0
let ringX  = 0, ringY  = 0
let raf: number

const onMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (dot.value) {
    dot.value.style.left = `${mouseX}px`
    dot.value.style.top  = `${mouseY}px`
  }
}

const animate = () => {
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12
  if (ring.value) {
    ring.value.style.left = `${ringX}px`
    ring.value.style.top  = `${ringY}px`
  }
  raf = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  raf = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>