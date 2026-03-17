<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="sub">{{ today }}</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat" v-for="s in stats" :key="s.label">
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-val">{{ s.value }}</div>
        <div class="stat-delta" :class="s.up ? 'up' : 'flat'">
          <span>{{ s.up ? '↑' : '—' }}</span> {{ s.delta }}
        </div>
      </div>
    </div>

    <!-- Two col -->
    <div class="two-col">
      <div class="panel">
        <div class="panel-head">
          <span>Projets récents</span>
          <NuxtLink to="/admin/projects" class="see-all">Voir tout →</NuxtLink>
        </div>
        <div class="list">
          <div class="list-row" v-for="p in recentProjects" :key="p.title">
            <span class="dot" :style="{ background: p.color }"></span>
            <div class="list-body">
              <span class="list-title">{{ p.title }}</span>
              <div class="tags"><span class="tag" v-for="t in p.tech" :key="t">{{ t }}</span></div>
            </div>
            <span class="list-date">{{ p.date }}</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <span>Veille récente</span>
          <NuxtLink to="/admin/veille" class="see-all">Voir tout →</NuxtLink>
        </div>
        <div class="list">
          <div class="list-row" v-for="v in recentVeille" :key="v.title">
            <span class="cat-pill" :style="{ color: v.color, background: v.color + '14', borderColor: v.color + '30' }">{{ v.cat }}</span>
            <div class="list-body">
              <span class="list-title">{{ v.title }}</span>
              <span class="list-sub">{{ v.source }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bar chart -->
    <div class="panel">
      <div class="panel-head">
        <span>Vues par page</span>
        <span class="badge-neutral">7 derniers jours</span>
      </div>
      <div class="bars">
        <div class="bar-row" v-for="p in pageStats" :key="p.page">
          <span class="bar-lbl">{{ p.page }}</span>
          <div class="bar-track"><div class="bar-fill" :style="{ width: p.pct + '%' }"></div></div>
          <span class="bar-n">{{ p.views }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const stats = [
  { label: 'Projets',          value: '4',   delta: '+1 ce mois',    up: true  },
  { label: 'Articles veille',  value: '12',  delta: '+3 ce mois',    up: true  },
  { label: 'Vues totales',     value: '348', delta: 'cette semaine', up: false },
  { label: 'Visiteurs uniq.',  value: '214', delta: 'cette semaine', up: false },
]
const recentProjects = [
  { title: 'Portfolio Nuxt',  tech: ['Nuxt','Vue','Tailwind'], color: '#818cf8', date: 'Mar 2025' },
  { title: 'App de gestion',  tech: ['Laravel','MySQL'],       color: '#67e8f9', date: 'Fév 2025' },
  { title: 'API REST',        tech: ['Node.js','Express'],     color: '#f9a8d4', date: 'Jan 2025' },
  { title: 'Dashboard stats', tech: ['Vue','Chart.js'],        color: '#fcd34d', date: 'Déc 2024' },
]
const recentVeille = [
  { title: "Les LLMs en 2025 : état de l'art", cat: 'IA',     source: 'lemondeinformatique.fr', color: '#818cf8' },
  { title: 'Nuxt 4 : toutes les nouveautés',   cat: 'Web',    source: 'nuxt.com',              color: '#67e8f9' },
  { title: 'OWASP Top 10 2025',                cat: 'Sécu',   source: 'owasp.org',             color: '#f9a8d4' },
  { title: 'PostgreSQL 17 : nouveautés',        cat: 'BDD',    source: 'postgresql.org',        color: '#fcd34d' },
]
const pageStats = [
  { page: 'Accueil',     views: 142, pct: 100 },
  { page: 'Projets',     views: 87,  pct: 61  },
  { page: 'Expériences', views: 64,  pct: 45  },
  { page: 'Veille',      views: 35,  pct: 25  },
  { page: 'Contact',     views: 20,  pct: 14  },
]
</script>

<style scoped>
.page { padding: 28px 32px 48px; display: flex; flex-direction: column; gap: 18px; min-height: 100%; }

/* Header */
.page-header { margin-bottom: 4px; }
h1 { font-size: 19px; font-weight: 700; color: #e2e8f0; letter-spacing: -0.02em; margin-bottom: 3px; }
.sub { font-size: 12px; color: #475569; }

/* Stats */
.stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.stat {
  background: rgba(17,24,39,0.6);
  border: 1px solid rgba(99,102,241,0.12);
  border-radius: 10px; padding: 16px 18px;
  transition: border-color 0.15s;
}
.stat:hover { border-color: rgba(99,102,241,0.28); }
.stat-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #475569; margin-bottom: 10px; }
.stat-val { font-size: 28px; font-weight: 700; color: #e2e8f0; letter-spacing: -0.04em; line-height: 1; margin-bottom: 7px; font-variant-numeric: tabular-nums; }
.stat-delta { font-size: 11px; }
.up   { color: #4ade80; }
.flat { color: #475569; }

/* Panel */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.panel {
  background: rgba(17,24,39,0.6);
  border: 1px solid rgba(99,102,241,0.12);
  border-radius: 10px; overflow: hidden;
}
.panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 16px; border-bottom: 1px solid rgba(99,102,241,0.08);
  font-size: 12px; font-weight: 600; color: #94a3b8;
}
.see-all { font-size: 11px; color: #475569; text-decoration: none; transition: color 0.15s; }
.see-all:hover { color: #818cf8; }
.badge-neutral { font-size: 11px; color: #475569; }

/* List */
.list { display: flex; flex-direction: column; }
.list-row {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(99,102,241,0.05);
  transition: background 0.12s;
}
.list-row:last-child { border-bottom: none; }
.list-row:hover { background: rgba(99,102,241,0.04); }
.dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.list-body { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.list-title { font-size: 13px; font-weight: 500; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.list-sub   { font-size: 11px; color: #475569; }
.list-date  { font-size: 11px; color: #334155; flex-shrink: 0; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tag { font-size: 10px; color: #475569; background: rgba(99,102,241,0.08); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(99,102,241,0.12); }
.cat-pill { font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 4px; border: 1px solid; text-transform: uppercase; letter-spacing: 0.06em; flex-shrink: 0; }

/* Bars */
.bars { padding: 14px 16px; display: flex; flex-direction: column; gap: 11px; }
.bar-row { display: flex; align-items: center; gap: 12px; }
.bar-lbl  { width: 80px; font-size: 12px; color: #475569; text-align: right; flex-shrink: 0; }
.bar-track { flex: 1; height: 4px; background: rgba(99,102,241,0.08); border-radius: 2px; overflow: hidden; }
.bar-fill  { height: 100%; border-radius: 2px; background: rgba(99,102,241,0.5); transition: width 0.6s ease; }
.bar-n    { width: 28px; font-size: 12px; font-weight: 500; color: #475569; text-align: right; font-variant-numeric: tabular-nums; }
</style>