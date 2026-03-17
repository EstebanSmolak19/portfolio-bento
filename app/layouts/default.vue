<template>
  <div class="layout">
    <SplashScreen @done="splashDone = true" />
    <Header />
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
import { useTheme } from '~/hooks/useTheme'
const { theme } = useTheme()
const splashDone = ref(false)
provide('splashDone', splashDone)
</script>

<style scoped>

.layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 4rem 16px;
  min-height: 0;
  overflow: hidden;
}

/* ── Tablet ── */
@media (max-width: 1024px) {
  .layout {
    height: auto;
    min-height: 100dvh;
    overflow: visible;
  }
  .layout-main {
    overflow: visible;
    align-items: flex-start;
    padding: 88px 16px 32px;
  }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .layout-main {
    padding: 72px 10px 20px;
  }
}
</style>