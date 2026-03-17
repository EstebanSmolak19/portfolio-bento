<template>
  <div class="bento-grid">

    <Card accent="violet" :neon="true" class="card-profile" :class="{ 'card-ready': ready }">
      <div class="profile-inner">
        <div class="flex flex-col items-center gap-1.5 pt-2">
          <h1 class="font-bold tracking-tight text-[clamp(1.1rem,1.8vw,2rem)]" style="color:var(--text-primary)">
            Estéban SMOLAK
          </h1>
          <p class="font-mono text-[clamp(0.62rem,0.85vw,0.82rem)] text-violet-400">
            BTS SIO option SLAM · promo 2026
          </p>
        </div>

        <Diviser type="glow" />

        <p class="text-center text-[clamp(0.72rem,0.9vw,0.95rem)] leading-relaxed max-w-[36ch]" style="color:var(--text-secondary)">
          J'ai 19 ans, en 2ème année de BTS SIO option SLAM au
          <a href="https://www.groupesaintbenigne.fr/lycee/" class="link">Lycée saint bénigne</a>
          à Dijon. Je vise un poste de développeur Fullstack.
        </p>

        <div class="flex-1" />

        <div class="flex flex-wrap gap-1.5 justify-center">
          <span
            v-for="tech in ['Laravel', 'Nuxt', 'C#', 'React']"
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>

        <Diviser type="glow" />

        <div class="flex items-center justify-between w-full px-1 pb-1">
          <div class="flex items-center gap-1.5 text-[clamp(0.6rem,0.75vw,0.78rem)]" style="color:var(--text-muted)">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="7" cy="5" r="1.2" stroke="currentColor" stroke-width="1.3"/>
            </svg>
            Dijon, France
          </div>
          <div class="flex gap-1.5">
            <a
              v-for="(link, i) in socialLinks"
              :key="i"
              :href="link.href"
              :target="link.target"
              class="icon-btn group relative"
            >
              <Icon :icon="link.icon" class="w-3.5 h-3.5" />
              <span class="tooltip">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </Card>

    <Card label="Compétences"  accent="purple" class="card-skills"    :class="{ 'card-ready': ready }" />
    <Card label="Dernier Projet" accent="cyan" class="card-project"   :class="{ 'card-ready': ready }" />

    <Card :picture="true" backgroundColor="#4B1A9B" :neon="true" accent="purple" class="card-linkedin overflow-hidden" :class="{ 'card-ready': ready }">
      <a href="https://www.linkedin.com/in/esteban-smolak/" class="block w-full scale-[1.3] hover:translate-y-2 transition-transform duration-300">
        <img src="/img/index/linkedinTel.png" alt="LinkedIn" class="w-full h-auto translate-y-20" />
      </a>
    </Card>

    <Card accent="cyan" :picture="true" :neon="true" class="card-photo overflow-hidden" :class="{ 'card-ready': ready }">
      <img src="/img/index/pp.JPG" alt="photo de profil" class="w-full h-full object-cover" />
    </Card>

    <Card accent="violet" class="card-exp" :class="{ 'card-ready': ready }">
      <NuxtLink to="/Expériences" class="w-full h-full flex items-center justify-center">
        <h1 class="experience-title">Expériences</h1>
      </NuxtLink>
    </Card>

    <Card label="Contact" accent="amber" class="card-contact" :class="{ 'card-ready': ready }">
      <div class="flex flex-col gap-2 p-3 items-start w-full">
        <p class="text-[11px] tracking-widest uppercase" style="color:var(--text-accent)">Email</p>
        <p class="font-medium text-[clamp(0.72rem,0.9vw,0.9rem)]" style="color:var(--text-primary)">
          estebansmolak@gmail.com
        </p>
      </div>
    </Card>

    <Card :picture="true" :neon="true" accent="amber" backgroundColor="rgba(245,158,11,0.15)" class="card-formation overflow-hidden" :class="{ 'card-ready': ready }">
      <a href="https://www.groupesaintbenigne.fr/lycee/" class="block w-full scale-[1.3] hover:translate-y-2 transition-transform duration-300">
        <img src="/img/index/ecoleTel.png" alt="école" class="w-full h-auto translate-y-20" />
      </a>
    </Card>

    <Card accent="rose" :neon="true" class="card-veille group" :class="{ 'card-ready': ready }">
      <a href="/veille" class="relative flex flex-col items-center justify-center h-full w-full p-4 gap-3">
        <div class="transition-transform duration-500 group-hover:scale-110">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20M4 9.1a10.9 10.9 0 0 1 10.9 10.9"
              stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="flex flex-col items-center gap-0.5 transition-opacity duration-300 group-hover:opacity-0">
          <span class="text-sm font-semibold tracking-widest uppercase" style="color:var(--text-primary)">Veille</span>
          <span class="text-xs font-medium text-rose-400 tracking-wider">Technologique</span>
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-40 bg-rose-950/30 rounded-2xl backdrop-blur-sm">
          <span class="text-lg font-semibold text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-500">Veille</span>
          <span class="text-lg font-semibold text-rose-300 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">Technologique</span>
          <span class="text-xs text-rose-200/70 mt-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-150">Consulter →</span>
        </div>
      </a>
    </Card>

  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '~/components/UI/Card.vue'
import Diviser from '~/components/UI/Diviser.vue'

definePageMeta({ layout: 'default' })

const splashDone = inject<Ref<boolean>>('splashDone', ref(false))
const ready = ref(false)

watch(splashDone, (val) => {
  if (val) setTimeout(() => { ready.value = true }, 80)
}, { immediate: true })

const socialLinks = [
  { href: '#',                                           target: '_self',  icon: 'mdi:file-document-outline', label: 'CV'       },
  { href: 'https://github.com/EstebanSmolak19',          target: '_blank', icon: 'mdi:github',                label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/esteban-smolak', target: '_blank', icon: 'mdi:linkedin',              label: 'LinkedIn' },
]
</script>

<style scoped>
.bento-grid {
  display: grid;
  width: 100%; max-width: 1200px; height: 100%;
  gap: clamp(8px, 0.9vw, 14px);
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "profile  profile  skills   project  project"
    "profile  profile  skills   linkedin photo"
    "profile  profile  exp      exp      photo"
    "contact  contact  formation veille  photo";
}

.card-profile   { grid-area: profile; }
.card-skills    { grid-area: skills; }
.card-project   { grid-area: project; }
.card-linkedin  { grid-area: linkedin; }
.card-photo     { grid-area: photo; }
.card-exp       { grid-area: exp; }
.card-contact   { grid-area: contact; }
.card-formation { grid-area: formation; }
.card-veille    { grid-area: veille; }

.card-profile   { opacity: 0; transform: translate(-40px, -20px) scale(0.93) rotate(-1deg); }
.card-skills    { opacity: 0; transform: translateY(-35px) scale(0.94) rotate(0.5deg); }
.card-project   { opacity: 0; transform: translate(30px, -35px) scale(0.93) rotate(1deg); }
.card-photo     { opacity: 0; transform: translate(35px, -20px) scale(0.94) rotate(-0.5deg); }
.card-linkedin  { opacity: 0; transform: translate(30px, 10px) scale(0.93); }
.card-exp       { opacity: 0; transform: translateY(25px) scale(0.94); }
.card-contact   { opacity: 0; transform: translate(-35px, 30px) scale(0.93) rotate(0.8deg); }
.card-formation { opacity: 0; transform: translateY(35px) scale(0.94) rotate(-0.5deg); }
.card-veille    { opacity: 0; transform: translate(30px, 30px) scale(0.93) rotate(1deg); }

.card-profile, .card-skills, .card-project, .card-photo,
.card-linkedin, .card-exp, .card-contact, .card-formation, .card-veille {
  transition:
    opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-profile.card-ready,
.card-skills.card-ready,
.card-project.card-ready,
.card-photo.card-ready,
.card-linkedin.card-ready,
.card-exp.card-ready,
.card-contact.card-ready,
.card-formation.card-ready,
.card-veille.card-ready {
  opacity: 1;
  transform: translate(0, 0) scale(1) rotate(0deg);
}

.card-profile.card-ready   { transition-delay: 0ms;   }
.card-photo.card-ready     { transition-delay: 70ms;  }
.card-skills.card-ready    { transition-delay: 140ms; }
.card-project.card-ready   { transition-delay: 210ms; }
.card-linkedin.card-ready  { transition-delay: 280ms; }
.card-exp.card-ready       { transition-delay: 350ms; }
.card-contact.card-ready   { transition-delay: 420ms; }
.card-formation.card-ready { transition-delay: 490ms; }
.card-veille.card-ready    { transition-delay: 560ms; }

@media (max-width: 1024px) {
  .bento-grid {
    height: auto;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "profile  profile  photo"
      "profile  profile  photo"
      "project  project  skills"
      "exp      exp      linkedin"
      "contact  contact  formation"
      "veille   veille   veille";
  }
  .card-profile   { min-height: 280px; }
  .card-photo     { min-height: 280px; }
  .card-project   { min-height: 130px; }
  .card-skills    { min-height: 260px; }
  .card-exp       { min-height: 130px; }
  .card-contact   { min-height: 130px; }
  .card-linkedin  { min-height: 130px; }
  .card-formation { min-height: 130px; }
  .card-veille    { min-height: 130px; }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "profile" "project" "skills" "exp"
      "photo" "contact" "linkedin" "formation" "veille";
    gap: 10px;
  }
  .card-profile   { min-height: 340px; }
  .card-project   { min-height: 110px; }
  .card-skills    { min-height: 180px; }
  .card-exp       { min-height: 100px; }
  .card-photo     { min-height: 220px; }
  .card-contact   { min-height: 110px; }
  .card-linkedin  { min-height: 130px; }
  .card-formation { min-height: 130px; }
  .card-veille    { min-height: 130px; }
}

/* ── Profile inner ── */
.profile-inner {
  display: flex; flex-direction: column; align-items: center;
  height: 100%; width: 100%;
  padding: clamp(14px, 2vw, 26px);
  gap: clamp(8px, 1.2vh, 14px);
}

/* ── Tech tags ── */
.tech-tag {
  font-size: clamp(0.58rem, 0.72vw, 0.72rem);
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-weight: 500;
  letter-spacing: 0.05em;
  background: var(--bg-tag);
  border: 0.5px solid var(--border-btn);
  color: var(--text-accent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
}

/* ── Social icon buttons ── */
.icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: clamp(26px, 2.2vw, 34px); height: clamp(26px, 2.2vw, 34px);
  border-radius: 7px;
  background: var(--bg-tag);
  border: 0.5px solid var(--border-muted);
  color: var(--text-secondary);
  transition: all 0.25s;
}
.icon-btn:hover {
  background: var(--bg-btn-primary);
  color: var(--text-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

/* ── Tooltip ── */
.tooltip {
  position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  margin-bottom: 6px; padding: 3px 8px; font-size: 10px;
  background: var(--bg-modal); color: var(--text-primary);
  border: 0.5px solid var(--border-surface); border-radius: 5px;
  white-space: nowrap; opacity: 0; pointer-events: none;
  transition: opacity 0.2s;
}
.icon-btn:hover .tooltip { opacity: 1; }

/* ── Link ── */
.link {
  color: var(--text-accent); font-weight: 600;
  text-decoration: none; position: relative;
  display: inline-block; padding: 0.1rem 0.3rem;
  border-radius: 4px; transition: all 0.25s ease;
}
.link::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 100%; height: 1.5px; background: var(--text-accent);
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.25s ease;
}
.link:hover::after { transform: scaleX(1); transform-origin: left; }

/* ── Experience title ── */
.experience-title {
  font-size: clamp(1.2rem, 2.2vw, 2.4rem);
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.15rem;
  background: linear-gradient(90deg, #8b5cf6, #6366f1, #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  text-align: center; transition: transform 0.3s ease, filter 0.3s ease;
}
.experience-title:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}
</style>