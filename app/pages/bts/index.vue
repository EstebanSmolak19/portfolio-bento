<template>
  <div class="page-layout">
    <Header />
    <main class="page-main" :class="{ 'is-ready': ready }">
        <div class="col-left">
            <div class="block block-hero anim" style="--d:0ms">
                <div class="hero-tag">Formation · 2024 — 2026</div>
                <h1 class="hero-title">BTS<br/><span class="hero-accent">SIO</span></h1>
                <p class="hero-school">Lycée Saint-Bénigne · Dijon</p>
                <div class="hero-badge">
                    option SLAM
                </div>
            </div>

            <div class="block block-options anim" style="--d:150ms">
                <div class="options-row">
                    <div
                      class="opt"
                      :class="{ 'opt-active': selectedOption === 'SLAM', 'opt-dim': selectedOption !== 'SLAM' }"
                      @click="selectedOption = 'SLAM'"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" stroke-width="1.3"/>
                            <path d="M5 8.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>SLAM</span>
                    </div>
                    <div class="opt-sep">vs</div>
                    <div
                      class="opt"
                      :class="{ 'opt-active': selectedOption === 'SISR', 'opt-dim': selectedOption !== 'SISR' }"
                      @click="selectedOption = 'SISR'"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" stroke-width="1.3"/>
                            <path d="M5 6h6M5 8.5h4.5M5 11h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                        </svg>
                        <span>SISR</span>
                    </div>
                </div>
                <p class="opt-desc">{{ optionData.desc }}</p>
            </div>

            <div class="block block-why anim" style="--d:300ms">
                <div class="why-label">{{ optionData.whyLabel }}</div>
                <p class="why-text">
                    {{ optionData.whyText }}
                </p>
            </div>

        </div>

        <div class="col-center">

            <div class="block block-stat anim" style="--d:100ms">
                <div class="stat-num">Bac<span class="stat-plus">+2</span></div>
                <div class="stat-label">niveau diplôme</div>
                <div class="stat-sub">RNCP niveau 5</div>
            </div>

            <div class="block block-skills anim" style="--d:250ms">
                <div class="block-title">Ce que j'apprends</div>
                <div class="skills-mosaic">
                    <div v-for="(s, i) in btsSkills" :key="s.label"
                    class="skill-chip anim"
                    :style="`--d:${350 + i * 60}ms`"
                    >
                    <div class="chip-dot" />
                    <div>
                        <p class="chip-name">{{ s.label }}</p>
                        <p class="chip-desc">{{ s.desc }}</p>
                    </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-right">

            <div class="block block-epreuves anim" style="--d:200ms">
            <div class="block-title">Matières</div>
            <div class="epreuves-list">
                <div v-for="(m, i) in matieres" :key="i"
                class="epreuve-row anim"
                :style="`--d:${300 + i * 40}ms`"
                >
                <span class="ep-num">{{ String(i+1).padStart(2,'0') }}</span>
                <span class="ep-name">{{ m.name }}</span>
                <span class="ep-coef">×{{ m.coef }}</span>
                </div>
            </div>
        </div>

        <div class="block block-stack anim" style="--d:350ms">
            <div class="block-title">Enseignement</div>
            <div class="stack-tags">
                <span v-for="t in stack" :key="t" class="stack-tag">{{ t }}</span>
            </div>
            <div class="promo-line">
                <span class="promo-year">Promo 2026</span>
                <span class="promo-dot" />
                <span class="promo-school">St-Bénigne</span>
            </div>
            </div>

        </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

definePageMeta({ layout: 'default' })

const ready = ref(false)

onMounted(() => setTimeout(() => { ready.value = true }, 100))

const selectedOption = ref('SLAM')

const optionData = computed(() => {
  if (selectedOption.value === 'SLAM') {
    return {
      desc: "Solutions Logicielles et Applications Métiers — développement web, mobile et logiciel de A à Z.",
      whyLabel: "Pourquoi SLAM ?",
      whyText: "Créer des interfaces, architecturer des APIs, faire communiquer un front et un back — c'est ce qui m'a naturellement attiré vers cette option."
    }
  } else {
    return {
      desc: "Solutions d'Infrastructure, Systèmes et Réseaux — administration systèmes, réseaux et cybersécurité.",
      whyLabel: "Pourquoi SISR ?",
      whyText: "Déployer des architectures réseaux, administrer des serveurs et garantir la sécurité du système d'information."
    }
  }
})

const btsSkills = [
  { label: 'Dev web',         desc: 'Full-stack, APIs REST' },
  { label: 'Bases de données',desc: 'SQL · PostgreSQL · SQLServer · NoSQL' },
  { label: 'Gestion projet',  desc: 'Méthodologie SCRUM' },
  { label: 'Cybersécurité',   desc: 'Developper sans faille' },
  { label: 'Mobile',          desc: 'Applications Natvie' },
  { label: 'Support',         desc: "Gestion d'incident" },
]

const matieres = [
  { name: 'Culture générale',      coef: 3 },
  { name: 'Mathématiques',         coef: 2 },
  { name: 'Anglais',               coef: 2 },
  { name: 'Support et mise à disposition des services informatiques.',    coef: 4 },
  { name: 'Cybersécurité',         coef: 3 },
  { name: 'Solutions logicielles', coef: 4 },
  { name: 'Atelier',  coef: 4 },
  { name: 'culture économique, juridique et managériale',  coef: 4 },
]

const stack = ['Laravel', 'React', 'HTML/CSS/JS', 'TypeScript', 'Boostrap', 'PostgreSQL', 'MySQl', 'SQLServer', '.NET', 'Docker', 'NoSql', 'Flutter']
</script>

<style scoped>
.page-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  display: grid;
  grid-template-columns: 1.1fr 1.4fr 1fr;
  grid-template-rows: 1fr;
  gap: clamp(10px, 1.2vw, 18px);
  padding: clamp(80px, 10vh, 100px) clamp(16px, 2.5vw, 36px) clamp(16px, 2.5vh, 28px);
}

.col-left, .col-center, .col-right {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.2vw, 18px);
  min-height: 0;
}

.block {
  border-radius: 18px;
  border: 0.5px solid rgba(99,102,241,0.14);
  background: rgba(255,255,255,0.024);
  backdrop-filter: blur(12px);
  padding: clamp(18px, 2.2vw, 30px);
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.block:hover {
  border-color: rgba(99,102,241,0.28);
  box-shadow: 0 0 28px rgba(99,102,241,0.07);
}
.block::before {
  content: '';
  position: absolute;
  top: 0; left: 15%; right: 15%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(99,102,241,0.3) 40%,
    rgba(139,92,246,0.4) 60%,
    transparent
  );
}

.anim {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity  0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}
.is-ready .anim {
  opacity: 1;
  transform: translateY(0);
}

.block-hero {
  flex: 0 0 auto;
  background: rgba(99,102,241,0.05);
  border-color: rgba(99,102,241,0.22);
}

.hero-tag {
  font-size: 10px;
  font-family: monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-accent);
  opacity: 0.65;
  margin-bottom: 10px;
}

.hero-title {
  font-size: clamp(3rem, 5.5vw, 5.5rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0 0 10px;
}

.hero-accent {
  background: linear-gradient(110deg, #818cf8, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-school {
  font-size: 11.5px;
  color: var(--text-muted);
  font-family: monospace;
  margin-bottom: 18px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: #a78bfa;
  background: rgba(139,92,246,0.10);
  border: 0.5px solid rgba(139,92,246,0.25);
  padding: 5px 12px;
  border-radius: 99px;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #a78bfa;
  box-shadow: 0 0 6px rgba(167,139,250,0.7);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity: 0.7; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.25); }
}

.block-options { flex: 0 0 auto; }

.options-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.opt {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 0.5px solid rgba(99,102,241,0.14);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  background: rgba(99,102,241,0.05);
  flex: 1;
  cursor: pointer;
}
.opt-active {
  border-color: rgba(129,140,248,0.35);
  background: rgba(99,102,241,0.10);
  color: #a5b4fc;
}
.opt-dim {
  opacity: 0.4;
}
.opt-tag {
  margin-left: auto;
  font-size: 9px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #818cf8;
  background: rgba(99,102,241,0.12);
  padding: 2px 6px;
  border-radius: 99px;
}
.opt-sep {
  font-size: 11px;
  color: var(--text-faint);
  font-family: monospace;
  flex-shrink: 0;
}
.opt-desc {
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

.block-why { flex: 1; }

.why-label {
  font-size: 10px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-accent);
  opacity: 0.6;
  margin-bottom: 10px;
}
.why-text {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
}
.why-text strong { color: var(--text-primary); font-weight: 600; }

.block-stat {
  flex: 0 0 auto;
  text-align: center;
  background: rgba(99,102,241,0.04);
}

.stat-num {
  font-size: clamp(3.5rem, 6vw, 5.5rem);
  font-weight: 900;
  line-height: 1;
  color: var(--text-primary);
  letter-spacing: -0.04em;
}
.stat-plus {
  background: linear-gradient(110deg, #818cf8, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-top: 6px;
}
.stat-sub {
  font-size: 10px;
  font-family: monospace;
  color: var(--text-faint);
  margin-top: 4px;
  letter-spacing: 0.05em;
}

.block-skills { flex: 1; }

.block-title {
  font-size: 10px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  opacity: 0.6;
  margin-bottom: 14px;
}

.skills-mosaic {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.skill-chip {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  padding: 10px 12px;
  border-radius: 10px;
  border: 0.5px solid rgba(99,102,241,0.09);
  background: rgba(99,102,241,0.025);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  cursor: default;
}
.skill-chip:hover {
  background: rgba(99,102,241,0.06);
  border-color: rgba(99,102,241,0.22);
  transform: translateY(-1px);
}

.chip-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(129,140,248,0.6);
  margin-top: 5px;
  flex-shrink: 0;
}

.chip-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px;
  line-height: 1.2;
}
.chip-desc {
  font-size: 10.5px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

.block-epreuves { flex: 1; overflow: hidden; }

.epreuves-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 4px;
}

.epreuve-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background 0.15s;
  cursor: default;
}
.epreuve-row:hover { background: rgba(99,102,241,0.05); }

.ep-num {
  font-size: 9px;
  font-family: monospace;
  color: rgba(129,140,248,0.3);
  width: 18px;
  flex-shrink: 0;
}
.ep-name {
  flex: 1;
  font-size: 12.5px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ep-coef {
  font-size: 10px;
  font-family: monospace;
  color: rgba(129,140,248,0.45);
  flex-shrink: 0;
  background: rgba(99,102,241,0.08);
  padding: 2px 6px;
  border-radius: 99px;
}

.block-stack { flex: 0 0 auto; }

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px 0 14px;
  margin-bottom: 14px;
}

.stack-tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-accent);
  background: rgba(99,102,241,0.08);
  border: 0.5px solid rgba(99,102,241,0.18);
  padding: 4px 10px;
  border-radius: 99px;
  transition: background 0.2s, transform 0.2s;
  cursor: default;
}
.stack-tag:hover {
  background: rgba(99,102,241,0.16);
  transform: translateY(-1px);
}

.promo-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 0.5px solid rgba(99,102,241,0.10);
}
.promo-year, .promo-school {
  font-size: 11px;
  font-family: monospace;
  color: var(--text-faint);
}
.promo-dot {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: rgba(99,102,241,0.3);
}

@media (max-width: 1024px) {
  .page-main {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .col-right { grid-column: 1 / -1; flex-direction: row; }
  .block-epreuves { flex: 1; }
  .block-stack { flex: 0 0 260px; }
}

@media (max-width: 640px) {
  .page-main {
    grid-template-columns: 1fr;
  }
  .col-right { flex-direction: column; }
  .block-stack { flex: 0 0 auto; }
  .skills-mosaic { grid-template-columns: 1fr; }
}
</style>