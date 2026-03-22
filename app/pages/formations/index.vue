<template>
  <div class="page-layout">
    <main class="page-main" :class="{ 'is-ready': ready }">

      <div class="col-timeline anim" style="--d:0ms">
        <h2 class="timeline-title">Parcours<br/><span class="text-accent">Scolaire</span></h2>

        <div class="timeline-list">
          <button
            v-for="(formation) in formations"
            :key="formation.id"
            class="timeline-item"
            :class="{ 'is-active': activeFormation?.id === formation.id }"
            @click="activeFormation = formation"
          >
            <div class="item-year">{{ formation.years }}</div>
            <div class="item-dot">
              <div class="dot-inner"></div>
            </div>
            <div class="item-info">
              <h3 class="item-name">{{ formation.shortName }}</h3>
              <span class="item-type">{{ formation.type }}</span>
            </div>
          </button>
        </div>
      </div>

      <div class="col-details">
        <Transition name="fade-slide" mode="out-in">
          <div v-if="activeFormation" :key="activeFormation.id" class="block block-detail anim" style="--d:150ms">

            <div class="detail-header">
              <div class="detail-badge">{{ activeFormation.status }}</div>
              <h1 class="detail-title">{{ activeFormation.title }}</h1>
              <p class="detail-school">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {{ activeFormation.school }} · {{ activeFormation.location }}
              </p>
            </div>

            <div class="detail-content">
              <p class="detail-desc">{{ activeFormation.description }}</p>
            </div>

            <div>
              <img :src="activeFormation.img" class="img-slide-up" />
            </div>


          </div>
        </Transition>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import type { Training } from '~/types/Training'
import { trainingService } from '~/services/TrainingService'
import useFetchSupa from '~/hooks/useFetch'

definePageMeta({ layout: 'default' })

const ready = ref(false)

const { data: formations, execute } = useFetchSupa<Training[]>(() => trainingService.getAllAsync());

const activeFormation = ref<Training | null>(null)

onMounted(async () => {
  await execute()

  if (formations.value && formations.value.length > 0) {
    activeFormation.value = formations.value[0]
  }

  setTimeout(() => { ready.value = true }, 100)
})

</script>

<style scoped>
.page-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.img-slide-up {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  transform: scale(1.3) translateY(60px);
  transition: transform 0.4s ease;
}

.page-main {
  flex: 1;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: clamp(20px, 3vw, 40px);
  padding: clamp(80px, 10vh, 100px) clamp(16px, 2.5vw, 36px) clamp(16px, 2.5vh, 28px);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.anim {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}
.is-ready .anim {
  opacity: 1;
  transform: translateY(0);
}

.col-timeline {
  display: flex;
  flex-direction: column;
}

.timeline-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  color: var(--text-primary);
  margin-bottom: 40px;
  letter-spacing: -0.03em;
}
.text-accent {
  background: linear-gradient(110deg, #818cf8, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timeline-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.timeline-list::before {
  content: '';
  position: absolute;
  top: 10px; bottom: 10px;
  left: 64px;
  width: 2px;
  background: linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(139,92,246,0.1) 80%, transparent);
  z-index: 0;
}

.timeline-item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  background: none;
  border: none;
  text-align: left;
  padding: 12px 0;
  cursor: pointer;
  group: true;
  opacity: 0.6;
  transition: opacity 0.3s, transform 0.3s;
}
.timeline-item:hover {
  opacity: 0.8;
  transform: translateX(5px);
}
.timeline-item.is-active {
  opacity: 1;
  transform: translateX(8px);
}

.item-year {
  width: 44px;
  font-family: monospace;
  font-size: 11px;
  color: var(--text-muted);
  text-align: right;
  line-height: 1.2;
}

.item-dot {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid rgba(99,102,241,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 0 rgba(129, 140, 248, 0);
}
.timeline-item.is-active .item-dot {
  border-color: #818cf8;
  box-shadow: 0 0 15px rgba(129, 140, 248, 0.4);
}
.dot-inner {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.3s;
}
.timeline-item.is-active .dot-inner {
  background: #a78bfa;
}

.item-info {
  display: flex;
  flex-direction: column;
}
.item-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s;
}
.timeline-item.is-active .item-name {
  color: #c4b5fd;
}
.item-type {
  font-size: 11px;
  font-family: monospace;
  color: var(--text-faint);
  text-transform: uppercase;
  margin-top: 2px;
}

.col-details {
  display: flex;
  flex-direction: column;
}

.block-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.block {
  border-radius: 18px;
  border: 0.5px solid rgba(99,102,241,0.14);
  background: rgba(255,255,255,0.024);
  backdrop-filter: blur(12px);
  padding: clamp(24px, 3vw, 40px);
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.block::before {
  content: '';
  position: absolute;
  top: 0; left: 15%; right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,0.3) 40%, rgba(139,92,246,0.4) 60%, transparent);
}

.detail-header {
  border-bottom: 1px solid rgba(99,102,241,0.1);
  padding-bottom: 20px;
}

.detail-badge {
  display: inline-block;
  font-size: 10px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  background: rgba(99,102,241,0.1);
  padding: 4px 10px;
  border-radius: 99px;
  margin-bottom: 12px;
}

.detail-title {
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin: 0 0 12px 0;
}

.detail-school {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  font-family: monospace;
  margin: 0;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

.section-title {
  font-size: 12px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-faint);
  margin: 0 0 12px 0;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
}
.hl-bullet {
  margin-top: 6px;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #a78bfa;
  flex-shrink: 0;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-accent);
  background: rgba(99,102,241,0.06);
  border: 0.5px solid rgba(99,102,241,0.15);
  padding: 5px 12px;
  border-radius: 99px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 900px) {
  .page-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .timeline-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 20px;
    gap: 30px;
  }
  .timeline-list::before {
    top: 52px; left: 20px; right: 20px; bottom: auto;
    width: auto; height: 2px;
    background: linear-gradient(to right, rgba(99,102,241,0.3), rgba(139,92,246,0.1) 80%, transparent);
  }
  .timeline-item {
    flex-direction: column;
    text-align: center;
    width: 120px;
    flex-shrink: 0;
  }
  .item-year { text-align: center; width: auto; margin-bottom: 8px; }
  .timeline-item:hover, .timeline-item.is-active {
    transform: translateY(-5px);
  }
}
</style>