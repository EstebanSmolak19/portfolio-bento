<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '~/components/UI/Card.vue'
import Diviser from '~/components/UI/Diviser.vue'
import useFetchSupa from '~/hooks/useFetch'
import { projectService } from '~/services/ProjectService'
import { skillService } from '~/services/SkillService'
import type { Project } from '~/types/Project'
import type { Skill } from '~/types/Skill'

definePageMeta({ layout: 'default' })

const splashDone = inject<Ref<boolean>>('splashDone', ref(false))
const ready = ref(false)
const barsAnimated = ref(false)
const { data: featuredProject, execute } = useFetchSupa<Project|null>(() => projectService.getFeaturedProject())
const { data: skills, execute: executeSkills } = useFetchSupa<Skill[]>(() => skillService.getAllAsync())

const age = computed(() => {
  const birth = new Date(2006, 4, 19)
  const today = new Date()
  let ageNow = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) ageNow--
  return ageNow
})

watch(splashDone, (val) => {
  if (val) {
    setTimeout(() => { ready.value = true }, 80)
    setTimeout(() => { barsAnimated.value = true }, 1500)
  }
}, { immediate: true })

onMounted(() => {
  execute(),
  executeSkills()
})

const socialLinks = [
  { href: '#',                                           target: '_self',  icon: 'mdi:file-document-outline', label: 'CV' },
  { href: 'https://github.com/EstebanSmolak19',          target: '_blank', icon: 'mdi:github',                 label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/esteban-smolak', target: '_blank', icon: 'mdi:linkedin',               label: 'LinkedIn' },
]
</script>

<template>
  <div class="bento-grid">
    <Card accent="violet" :neon="true" :tilt="true" class="card-profile" :class="{ 'card-ready': ready }">
      <div class="profile-inner">
        <div class="profile-header">
          <h1 class="profile-name">Estéban SMOLAK</h1>
          <p class="profile-subtitle">BTS SIO option SLAM · promo 2026</p>
        </div>
        <Diviser type="glow" />
        <p class="profile-desc">
          J'ai {{ age }} ans, je suis en 2ème année de BTS SIO option SLAM au
          <a href="https://www.groupesaintbenigne.fr/lycee/" class="link">Lycée Saint Bénigne</a>
          à Dijon. Je vise un poste de développeur Fullstack.
        </p>
        <div class="spacer" />
        <div class="tech-stack">
          <span v-for="tech in ['Laravel', 'Nuxt', 'C#', 'React']" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
        <Diviser type="glow" />
        <div class="profile-footer">
          <div class="location">
            <Icon icon="lucide:map-pin" class="icon-small" />
            Dijon, France
          </div>
          <div class="social-links">
            <a v-for="(link, i) in socialLinks" :key="i" :href="link.href" :target="link.target" class="icon-btn group">
              <Icon :icon="link.icon" class="icon-small" />
              <span class="tooltip">{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>
    </Card>

    <!-- COMPETENCES -->
    <Card label="Compétences" accent="purple" class="card-skills" :class="{ 'card-ready': ready }">
      <div class="skills-wrapper">
        <div class="skills-scroll">
          <template v-for="(skill, i) in skills" :key="skill.name">
            <div class="skill-row">
              <div class="skill-icon-wrap">
                <Icon :icon="skill.icon" class="skill-icon-sm" />
              </div>
              <div class="skill-center">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar-bg">
                  <div
                    class="skill-bar-fill"
                    :class="{ 'bar-animated': barsAnimated }"
                    :style="{ '--target-width': skill.level + '%', '--bar-delay': (i * 80) + 'ms' }"
                  />
                </div>
              </div>
              <span class="skill-pct">{{ skill.level }}%</span>
            </div>
            <div v-if="i < skills!.length - 1" class="skill-divider" />
          </template>
        </div>
      </div>
    </Card>

    <!-- DERNIER PROJET -->
    <Card label="Dernier Projet" accent="cyan" class="card-project" :class="{ 'card-ready': ready }"
      backgroundColor="linear-gradient(145deg, rgba(7,18,28,0.95) 0%, rgba(3,8,15,0.98) 100%)">
      <div v-if="featuredProject" class="project-wrapper">
        <div class="project-content">
          <div class="project-middle">
            <h3 class="project-title">{{ featuredProject?.title }}</h3>
            <p class="project-text">{{ featuredProject?.description }}</p>
          </div>
          <div class="project-bottom">
            <a :href="featuredProject?.link" target="_blank" class="project-url">
              <span>Lien du projet</span>
              <Icon icon="lucide:arrow-up-right" class="icon-link" />
            </a>
            <div class="project-tags"><span>{{ featuredProject?.language }}</span></div>
          </div>
        </div>
        <Icon icon="lucide:layout-dashboard" class="project-icon-deco" />
      </div>
      <div v-else class="project-empty"><p>Chargement du projet...</p></div>
    </Card>

    <!-- LINKEDIN -->
    <Card :picture="true" backgroundColor="#4B1A9B" :neon="true" accent="purple" class="card-linkedin" :class="{ 'card-ready': ready }">
      <a href="https://www.linkedin.com/in/esteban-smolak/" class="img-link">
        <img src="/img/index/linkedinTel.png" alt="LinkedIn" class="img-slide-up" />
      </a>
    </Card>

    <!-- PHOTO -->
    <Card accent="cyan" :picture="true" :neon="true" class="card-photo" :class="{ 'card-ready': ready }">
      <img src="/img/index/pp.JPG" alt="photo" class="full-img" />
    </Card>

    <!-- EXPERIENCES -->
    <Card accent="violet" class="card-exp" :class="{ 'card-ready': ready }">
      <NuxtLink to="/Expériences" class="exp-link">
        <h1 class="exp-title">Expériences</h1>
      </NuxtLink>
    </Card>

    <!-- CONTACT -->
    <Card label="Contact" accent="amber" class="card-contact" :class="{ 'card-ready': ready }">
      <div class="contact-inner">
        <p class="contact-label">Email</p>
        <p class="contact-value">estebansmolak@gmail.com</p>
      </div>
    </Card>

    <!-- FORMATION -->
    <Card :picture="true" :neon="true" accent="amber" backgroundColor="rgba(245,158,11,0.15)" class="card-formation" :class="{ 'card-ready': ready }">
      <a href="https://www.groupesaintbenigne.fr/lycee/" class="img-link">
        <img src="/img/index/ecoleTel.png" alt="école" class="img-slide-up" />
      </a>
    </Card>

    <!-- VEILLE -->
    <Card accent="rose" :neon="true" class="card-veille" :class="{ 'card-ready': ready }">
      <a href="/veille" class="veille-inner">
        <div class="veille-icon-wrapper">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20 4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20M4 9.1a10.9 10.9 0 0 1 10.9 10.9" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="veille-text-static">
          <span class="veille-title">Veille</span>
          <span class="veille-sub">Technologique</span>
        </div>
        <div class="veille-overlay">
          <span class="overlay-title">Veille</span>
          <span class="overlay-sub">Technologique</span>
          <span class="overlay-action">Consulter →</span>
        </div>
      </a>
    </Card>

  </div>
</template>

<style scoped>
/* BENTO GRID */
.bento-grid {
  display: grid;
  width: 100%;
  max-width: 1200px;
  height: 100%;
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

/* ANIMATIONS ENTREE */
.card-profile, .card-skills, .card-project, .card-linkedin,
.card-photo, .card-exp, .card-contact, .card-formation, .card-veille {
  opacity: 0;
  transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.card-profile   { transform: translate(-40px, -20px) scale(0.93) rotate(-1deg); }
.card-skills    { transform: translateY(-35px) scale(0.94) rotate(0.5deg); }
.card-project   { transform: translate(30px, -35px) scale(0.93) rotate(1deg); }
.card-photo     { transform: translate(35px, -20px) scale(0.94) rotate(-0.5deg); }
.card-linkedin  { transform: translate(30px, 10px) scale(0.93); }
.card-exp       { transform: translateY(25px) scale(0.94); }
.card-contact   { transform: translate(-35px, 30px) scale(0.93) rotate(0.8deg); }
.card-formation { transform: translateY(35px) scale(0.94) rotate(-0.5deg); }
.card-veille    { transform: translate(30px, 30px) scale(0.93) rotate(1deg); }

.card-ready { opacity: 1 !important; transform: translate(0,0) scale(1) rotate(0deg) !important; }
.card-profile.card-ready   { transition-delay: 0ms; }
.card-photo.card-ready     { transition-delay: 70ms; }
.card-skills.card-ready    { transition-delay: 140ms; }
.card-project.card-ready   { transition-delay: 210ms; }
.card-linkedin.card-ready  { transition-delay: 280ms; }
.card-exp.card-ready       { transition-delay: 350ms; }
.card-contact.card-ready   { transition-delay: 420ms; }
.card-formation.card-ready { transition-delay: 490ms; }
.card-veille.card-ready    { transition-delay: 560ms; }

.skills-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 10px 6px;
}

.skills-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
  padding: 0 4px;
  flex-shrink: 0;
}

.skills-count {
  font-size: 10px;
  font-weight: 500;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(167, 139, 250, 0.4);
}

.skills-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 4px 24px;
  mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
}

.skills-scroll::-webkit-scrollbar        { width: 3px; }
.skills-scroll::-webkit-scrollbar-track  { background: transparent; }
.skills-scroll::-webkit-scrollbar-thumb  { background: rgba(167,139,250,0.2); border-radius: 99px; }
.skills-scroll::-webkit-scrollbar-thumb:hover { background: rgba(167,139,250,0.45); }

.skill-row {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 8px;
  border-radius: 10px;
  border: 0.5px solid rgba(167, 139, 250, 0.07);
  background: rgba(167, 139, 250, 0.025);
  transition: border-color 0.25s ease, background 0.25s ease;
  position: relative;
  overflow: hidden;
  cursor: default;
  box-sizing: border-box;
  flex-shrink: 0;
}

.skill-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  border-radius: 0 1px 1px 0;
  background: linear-gradient(180deg, #c4b5fd, #7c3aed);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.skill-row:hover { border-color: rgba(167,139,250,0.25); background: rgba(167,139,250,0.07); }
.skill-row:hover::before { opacity: 1; }

.skill-icon-wrap {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(167,139,250,0.07);
  border: 0.5px solid rgba(167,139,250,0.12);
  flex-shrink: 0;
}
.skill-icon-sm { width: 16px; height: 16px; }
.skill-center { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.skill-name { font-size: 11.5px; font-weight: 600; color: var(--text-primary); line-height: 1; }
.skill-bar-bg { height: 3px; background: rgba(167,139,250,0.1); border-radius: 2px; overflow: hidden; }

.skill-bar-fill {
  height: 100%; width: 0%; border-radius: 2px;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  position: relative; transition: none;
}
.skill-bar-fill.bar-animated {
  width: var(--target-width);
  transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1) var(--bar-delay);
}
.skill-bar-fill::after {
  content: ''; position: absolute; right: 0; top: 0; bottom: 0;
  width: 5px; background: #d8b4fe; border-radius: 2px;
  box-shadow: 0 0 5px #a78bfa;
}

.skill-pct { font-size: 10px; font-family: monospace; color: rgba(167,139,250,0.5); flex-shrink: 0; line-height: 1; }
.skill-divider {
  height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.12) 50%, transparent);
  margin: 3px 4px;
  flex-shrink: 0;
}

/* PROFIL */
.profile-inner { display: flex; flex-direction: column; align-items: center; height: 100%; width: 100%; padding: clamp(14px, 2vw, 26px); gap: clamp(8px, 1.2vh, 14px); }
.profile-header { display: flex; flex-direction: column; align-items: center; gap: 6px; padding-top: 8px; }
.profile-name { font-weight: 700; letter-spacing: -0.02em; font-size: clamp(1.1rem, 1.8vw, 2rem); color: var(--text-primary); }
.profile-subtitle { font-family: monospace; font-size: clamp(0.62rem, 0.85vw, 0.82rem); color: #a78bfa; }
.profile-desc { text-align: center; font-size: clamp(0.72rem, 0.9vw, 0.95rem); line-height: 1.6; max-width: 36ch; color: var(--text-secondary); }
.tech-stack { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.tech-tag { font-size: clamp(0.58rem, 0.72vw, 0.72rem); padding: 4px 10px; border-radius: 99px; font-weight: 500; background: var(--bg-tag); border: 0.5px solid var(--border-btn); color: var(--text-accent); transition: all 0.2s; }
.tech-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(139,92,246,0.2); }
.profile-footer { display: flex; justify-content: space-between; width: 100%; padding: 0 4px 4px; }
.location { display: flex; align-items: center; gap: 6px; font-size: clamp(0.6rem, 0.75vw, 0.78rem); color: var(--text-muted); }
.social-links { display: flex; gap: 6px; }
.icon-btn { position: relative; display: flex; align-items: center; justify-content: center; width: clamp(26px,2.2vw,34px); height: clamp(26px,2.2vw,34px); border-radius: 8px; background: var(--bg-tag); border: 0.5px solid var(--border-muted); color: var(--text-secondary); transition: all 0.25s; }
.icon-btn:hover { background: var(--bg-btn-primary); color: var(--text-accent); transform: translateY(-2px); }
.tooltip { position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); padding: 4px 8px; background: var(--bg-modal); color: var(--text-primary); border: 0.5px solid var(--border-surface); border-radius: 4px; font-size: 10px; opacity: 0; pointer-events: none; transition: opacity 0.2s; white-space: nowrap; }
.icon-btn:hover .tooltip { opacity: 1; }

/* PROJET */
.project-wrapper { position: relative; width: 100%; height: 100%; padding: 10px; display: flex; flex-direction: column; overflow: hidden; }
.project-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; }
.project-title { font-size: 1.2rem; font-weight: 900; color: #ccf6ff; text-shadow: 0 0 15px rgba(34,211,238,0.2); }
.project-text { font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; margin-bottom: 5.5px; -webkit-box-orient: vertical; overflow: hidden; }
.project-bottom { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; }
.project-url { display: flex; align-items: center; gap: 4px; font-family: monospace; font-size: 11px; color: var(--text-accent); text-decoration: none; }
.project-tags span { font-size: 11px; font-weight: 600; color: #22d3ee; background: rgba(34,211,238,0.06); border: 1px solid rgba(34,211,238,0.15); padding: 4px 10px; border-radius: 8px; }
.project-icon-deco { position: absolute; right: -15px; bottom: -15px; font-size: 6rem; opacity: 0.05; color: var(--text-accent); transform: rotate(-15deg); pointer-events: none; transition: ease .2s; }
.card-project:hover .project-icon-deco { transform: rotate(0deg) scale(1.1); opacity: 0.12; color: #22d3ee; text-shadow: 0 0 15px rgba(34,211,238,0.2); }
.project-empty { display: flex; height: 100%; align-items: center; justify-content: center; color: var(--text-muted); }

/* AUTRES */
.exp-link { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-decoration: none; }
.exp-title { font-size: clamp(1.2rem,2.2vw,2.4rem); font-weight: 900; text-transform: uppercase; background: linear-gradient(90deg, #8b5cf6, #6366f1, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.contact-inner { display: flex; flex-direction: column; padding: 12px; gap: 4px; }
.contact-label { font-size: 11px; text-transform: uppercase; color: var(--text-accent); }
.contact-value { font-weight: 500; font-size: clamp(0.72rem,0.9vw,0.9rem); color: var(--text-primary); }
.full-img { width: 100%; height: 100%; object-fit: cover; }
.img-link { display: block; width: 100%; height: 100%; transform: translateY(-35px); }
.img-slide-up { width: 100%; transform: scale(1.3) translateY(60px); transition: transform 0.4s ease; }
.img-link:hover .img-slide-up { transform: scale(1.3) translateY(50px); }

/* VEILLE */
.veille-inner { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 16px; gap: 12px; text-decoration: none; }
.veille-text-static { display: flex; flex-direction: column; align-items: center; }
.veille-title { font-size: 14px; font-weight: 600; text-transform: uppercase; color: var(--text-primary); }
.veille-sub { font-size: 12px; color: #f43f5e; }
.veille-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(76,5,25,0.4); backdrop-filter: blur(4px); opacity: 0; transition: opacity 0.4s; }
.card-veille:hover .veille-overlay { opacity: 1; }
.overlay-title { font-size: 14px; font-weight: 700; color: #fff; }
.overlay-sub { font-size: 11px; color: #fda4af; }
.overlay-action { font-size: 11px; color: #f43f5e; margin-top: 6px; font-family: monospace; }

@media (max-width: 1024px) {
  .bento-grid { height: auto; grid-template-columns: repeat(3, 1fr); grid-template-areas: "profile  profile  photo" "profile  profile  photo" "project  project  skills" "exp      exp      linkedin" "contact  contact  formation" "veille   veille   veille"; }
}
@media (max-width: 640px) {
  .bento-grid { grid-template-columns: 1fr; grid-template-areas: "profile" "project" "skills" "exp" "photo" "contact" "linkedin" "formation" "veille"; }
}

/* UTILS */
.spacer { flex: 1; }
.icon-small { width: 14px; height: 14px; }
.link { color: var(--text-accent); font-weight: 600; text-decoration: none; position: relative; }
.link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1.5px; background: var(--text-accent); transform: scaleX(0); transition: transform 0.25s; }
.link:hover::after { transform: scaleX(1); }
</style>