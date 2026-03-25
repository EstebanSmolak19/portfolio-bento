<template>
  <main class="page-main" :class="{ 'is-ready': ready }">
    <div class="document-block block anim" style="--d:100ms">
      <div class="block-label">Aperçu interactif</div>
      <div class="iframe-wrapper">
        <iframe
          src="/img/E5/E5.pdf#toolbar=0&navpanes=0"
          width="100%"
          height="100%"
          frameborder="0"
          class="styled-iframe"
        ></iframe>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'default' })

const ready = ref(false)

onMounted(() => {
  setTimeout(() => { ready.value = true }, 50)
})
</script>

<style scoped>
.page-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1250px; /* Plus large pour l'impact */
  margin: 0 auto;
  width: 100%;
  padding: clamp(80px, 10vh, 100px) 20px 40px;
}

/* Header stylisé */
.hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: var(--bg-surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-surface);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -50%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--text-accent), transparent 70%);
  opacity: 0.1;
  pointer-events: none;
}

.header-content { display: flex; align-items: center; gap: 20px; z-index: 1; }

.icon-wrap {
  width: 48px;
  height: 48px;
  background: var(--bg-tag);
  border: 1px solid var(--border-btn);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-accent);
}

.titles { display: flex; flex-direction: column; gap: 4px; }
.main-title { font-size: 1.4rem; font-weight: 800; color: var(--text-primary); margin: 0; }
.accent-text { color: var(--text-accent); font-weight: 500; opacity: 0.8; }
.subtitle { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin: 0; }

.btn-download {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--bg-btn-primary);
  border: 1px solid var(--border-btn);
  border-radius: 12px;
  color: var(--text-accent);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1;
}
.btn-download:hover { transform: translateY(-2px); background: var(--text-accent); color: white; }

/* Bloc Document Géant */
.block {
  border-radius: 20px;
  border: 1px solid var(--border-surface);
  background: var(--bg-surface);
  backdrop-filter: blur(16px);
  padding: 24px;
}

.block-label {
  font-size: 10px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 16px;
  opacity: 0.7;
}

.iframe-wrapper {
  width: 100%;
  height: 82vh; /* Prend quasiment tout l'écran */
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-muted);
  box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
}

.styled-iframe { width: 100%; height: 100%; }

/* Animations */
.anim { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms); }
.is-ready .anim { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .hero-header { flex-direction: column; align-items: flex-start; gap: 20px; padding: 20px; }
  .iframe-wrapper { height: 65vh; }
  .main-title { font-size: 1.1rem; }
}
</style>