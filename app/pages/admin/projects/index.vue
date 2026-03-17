<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1>Projets</h1>
        <p class="sub">{{ projects.length }} projets au total</p>
      </div>
      <button class="btn-primary" @click="openModal()">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        Nouveau projet
      </button>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="search">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="search-ico"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.2"/><path d="M9 9l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <input v-model="search" placeholder="Rechercher..." />
      </div>
      <div class="filters">
        <button v-for="f in ['Tous','Mis en avant']" :key="f" class="filter" :class="{ active: activeFilter === f }" @click="activeFilter = f">{{ f }}</button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Projet</th><th>Stack</th><th>Mis en avant</th><th>Date</th><th>Liens</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.id" class="trow">
            <td>
              <div class="cell-proj">
                <span class="cdot" :style="{ background: p.color }"></span>
                <div>
                  <div class="cell-name">{{ p.title }}</div>
                  <div class="cell-desc">{{ p.description }}</div>
                </div>
              </div>
            </td>
            <td><div class="tags"><span class="tag" v-for="t in p.tech" :key="t">{{ t }}</span></div></td>
            <td><span class="pill" :class="p.featured ? 'pill-yes' : 'pill-no'">{{ p.featured ? 'Oui' : 'Non' }}</span></td>
            <td class="cell-date">{{ p.date }}</td>
            <td>
              <div class="link-row">
                <a v-if="p.github" :href="p.github" target="_blank" class="ilink" title="GitHub">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1C3.46 1 1 3.46 1 6.5c0 2.43 1.57 4.49 3.75 5.21.27.05.37-.12.37-.26v-.92c-1.52.33-1.84-.74-1.84-.74-.25-.63-.61-.8-.61-.8-.5-.34.04-.33.04-.33.55.04.84.57.84.57.49.84 1.29.6 1.6.46.05-.36.19-.6.35-.74-1.21-.14-2.49-.61-2.49-2.7 0-.6.21-1.08.56-1.46-.06-.14-.24-.69.05-1.44 0 0 .46-.15 1.5.56a5.23 5.23 0 0 1 2.73 0c1.04-.71 1.5-.56 1.5-.56.3.75.11 1.3.05 1.44.35.38.56.87.56 1.46 0 2.1-1.28 2.56-2.5 2.69.2.17.37.51.37 1.02v1.52c0 .15.1.31.38.26A5.5 5.5 0 0 0 12 6.5C12 3.46 9.54 1 6.5 1z" fill="currentColor"/></svg>
                </a>
                <a v-if="p.live" :href="p.live" target="_blank" class="ilink" title="Live">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 2.5H2.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9M7.5 1.5h4m0 0v4m0-4L5 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
              </div>
            </td>
            <td>
              <div class="row-acts">
                <button class="act edit" @click="openModal(p)">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7.5 1.5l2 2-6 6H1.5v-2l6-6z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                </button>
                <button class="act del" @click="del(p)">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 3h8M4 3V1.5h3V3M4.5 5v3.5M6.5 5v3.5M2.5 3l.6 6.5h4.8L8.5 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="6" class="empty">Aucun projet trouvé</td></tr>
        </tbody>
      </table>
      <div class="tfoot">{{ filtered.length }} résultat(s)</div>
    </div>

    <!-- Modal -->
    <Transition name="m">
      <div v-if="modal" class="overlay" @click.self="modal = false">
        <div class="modal">
          <div class="modal-head">
            <span>{{ editing ? 'Modifier le projet' : 'Nouveau projet' }}</span>
            <button class="mclose" @click="modal = false">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="fgrid">
              <div class="field s2"><label>Titre <span class="req">*</span></label><input v-model="form.title" placeholder="Nom du projet"/></div>
              <div class="field s2"><label>Description <span class="req">*</span></label><textarea v-model="form.description" rows="2" placeholder="Courte description..."></textarea></div>
              <div class="field s2"><label>Technologies <span class="hint">— séparées par virgules</span></label><input v-model="form.tech" placeholder="Vue, Nuxt, Tailwind"/></div>
              <div class="field"><label>GitHub</label><input v-model="form.github" placeholder="https://github.com/..."/></div>
              <div class="field"><label>URL live</label><input v-model="form.live" placeholder="https://..."/></div>
              <div class="field s2 toggle-row">
                <div class="toggle" :class="{ on: form.featured }" @click="form.featured = !form.featured"><div class="thumb"></div></div>
                <span>Mettre en avant sur le portfolio</span>
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="modal = false">Annuler</button>
            <button class="btn-primary">{{ editing ? 'Enregistrer' : 'Créer' }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const search = ref('')
const activeFilter = ref('Tous')
const modal = ref(false)
const editing = ref<any>(null)
const form = reactive({ title:'', description:'', tech:'', github:'', live:'', featured: false })

const projects = ref([
  { id:1, title:'Portfolio Nuxt',  description:'Portfolio personnel développé avec Nuxt 3', tech:['Nuxt','Vue','Tailwind'], featured:true,  date:'Mar 2025', color:'#818cf8', github:'#', live:'#'  },
  { id:2, title:'App de gestion',  description:'Application de gestion pour un client',     tech:['Laravel','MySQL'],       featured:false, date:'Fév 2025', color:'#67e8f9', github:'#', live:null },
  { id:3, title:'API REST',        description:'API RESTful pour une application mobile',    tech:['Node.js','Express'],     featured:false, date:'Jan 2025', color:'#f9a8d4', github:'#', live:null },
  { id:4, title:'Dashboard stats', description:'Dashboard de statistiques interactif',       tech:['Vue','Chart.js'],        featured:true,  date:'Déc 2024', color:'#fcd34d', github:'#', live:'#'  },
])

const filtered = computed(() => {
  let l = projects.value
  if (activeFilter.value === 'Mis en avant') l = l.filter(p => p.featured)
  if (search.value) l = l.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
  return l
})
function openModal(p?: any) {
  editing.value = p || null
  p ? Object.assign(form, { ...p, tech: p.tech.join(', ') }) : Object.assign(form, { title:'', description:'', tech:'', github:'', live:'', featured:false })
  modal.value = true
}
function del(p: any) { if (confirm(`Supprimer "${p.title}" ?`)) projects.value = projects.value.filter(x => x.id !== p.id) }
</script>

<style scoped>
.page { padding: 28px 32px 48px; display: flex; flex-direction: column; gap: 18px; min-height: 100%; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
h1 { font-size: 19px; font-weight: 700; color: #e2e8f0; letter-spacing: -0.02em; margin-bottom: 3px; }
.sub { font-size: 12px; color: #475569; }

/* Buttons */
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px; border: 1px solid rgba(99,102,241,0.35); cursor: pointer;
  background: rgba(99,102,241,0.15); color: #a5b4fc;
  font-size: 13px; font-weight: 600; font-family: inherit;
  transition: all 0.15s;
}
.btn-primary:hover { background: rgba(99,102,241,0.25); border-color: rgba(99,102,241,0.55); color: #c7d2fe; }
.btn-ghost {
  padding: 7px 14px; border-radius: 8px; cursor: pointer;
  background: transparent; border: 1px solid rgba(99,102,241,0.15);
  color: #64748b; font-size: 13px; font-family: inherit; transition: all 0.15s;
}
.btn-ghost:hover { border-color: rgba(99,102,241,0.3); color: #94a3b8; }

/* Toolbar */
.toolbar { display: flex; align-items: center; gap: 10px; }
.search { position: relative; }
.search-ico { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #475569; pointer-events: none; }
.search input {
  padding: 7px 10px 7px 30px;
  background: rgba(17,24,39,0.6); border: 1px solid rgba(99,102,241,0.12);
  border-radius: 8px; color: #cbd5e1; font-size: 13px; font-family: inherit; outline: none; width: 220px;
  transition: border-color 0.15s;
}
.search input:focus { border-color: rgba(99,102,241,0.35); }
.search input::placeholder { color: #334155; }
.filters { display: flex; gap: 4px; }
.filter {
  padding: 6px 12px; border-radius: 7px; border: 1px solid transparent;
  background: transparent; color: #475569;
  font-size: 12px; font-family: inherit; cursor: pointer; transition: all 0.15s;
}
.filter:hover { background: rgba(99,102,241,0.07); color: #94a3b8; }
.filter.active { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.25); color: #a5b4fc; font-weight: 600; }

/* Table */
.table-wrap {
  background: rgba(17,24,39,0.6);
  border: 1px solid rgba(99,102,241,0.12);
  border-radius: 10px; overflow: hidden;
}
table { width: 100%; border-collapse: collapse; }
thead tr { border-bottom: 1px solid rgba(99,102,241,0.08); }
th { padding: 9px 16px; text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #334155; }
.trow { border-bottom: 1px solid rgba(99,102,241,0.05); transition: background 0.12s; }
.trow:last-child { border-bottom: none; }
.trow:hover { background: rgba(99,102,241,0.04); }
td { padding: 11px 16px; vertical-align: middle; }

.cell-proj { display: flex; align-items: flex-start; gap: 10px; }
.cdot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.cell-name { font-size: 13px; font-weight: 500; color: #cbd5e1; margin-bottom: 3px; }
.cell-desc { font-size: 11px; color: #475569; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tag { font-size: 10px; color: #475569; background: rgba(99,102,241,0.08); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(99,102,241,0.12); }
.pill { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 4px; }
.pill-yes { background: rgba(74,222,128,0.1); color: #4ade80; }
.pill-no  { background: rgba(99,102,241,0.06); color: #334155; }
.cell-date { font-size: 12px; color: #334155; }
.link-row { display: flex; gap: 8px; }
.ilink { color: #334155; transition: color 0.15s; }
.ilink:hover { color: #818cf8; }
.row-acts { display: flex; gap: 5px; opacity: 0; transition: opacity 0.12s; }
.trow:hover .row-acts { opacity: 1; }
.act { display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; border: none; cursor: pointer; transition: all 0.12s; }
.act.edit { background: rgba(99,102,241,0.08); color: #64748b; }
.act.edit:hover { background: rgba(99,102,241,0.18); color: #a5b4fc; }
.act.del  { background: rgba(99,102,241,0.08); color: #64748b; }
.act.del:hover  { background: rgba(248,113,113,0.12); color: #f87171; }
.empty { text-align: center; padding: 32px; font-size: 13px; color: #334155; }
.tfoot { padding: 8px 16px; font-size: 11px; color: #334155; border-top: 1px solid rgba(99,102,241,0.06); }

/* Modal */
.overlay { position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; }
.modal { width: 520px; max-height: 90dvh; background: rgba(15,17,23,0.97); border: 1px solid rgba(99,102,241,0.2); border-radius: 14px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.5); }
.modal-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(99,102,241,0.1); font-size: 13px; font-weight: 600; color: #e2e8f0; }
.mclose { background: none; border: none; cursor: pointer; color: #475569; display: flex; padding: 4px; border-radius: 5px; transition: all 0.12s; }
.mclose:hover { color: #94a3b8; background: rgba(99,102,241,0.08); }
.modal-body { padding: 20px; overflow-y: auto; flex: 1; }
.modal-foot { display: flex; justify-content: flex-end; gap: 8px; padding: 14px 20px; border-top: 1px solid rgba(99,102,241,0.1); }
.fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.s2 { grid-column: 1 / -1; }
.field label { font-size: 11px; font-weight: 500; color: #64748b; }
.req { color: #f9a8d4; }
.hint { font-weight: 400; color: #334155; }
.field input, .field textarea {
  padding: 8px 11px;
  background: rgba(15,17,23,0.8); border: 1px solid rgba(99,102,241,0.15);
  border-radius: 8px; color: #e2e8f0; font-size: 13px; font-family: inherit; outline: none; resize: vertical;
  transition: border-color 0.15s;
}
.field input:focus, .field textarea:focus { border-color: rgba(99,102,241,0.4); }
.field input::placeholder, .field textarea::placeholder { color: #334155; }
.toggle-row { flex-direction: row; align-items: center; gap: 10px; }
.toggle { width: 34px; height: 19px; border-radius: 10px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); position: relative; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
.toggle.on { background: rgba(99,102,241,0.3); border-color: rgba(99,102,241,0.5); }
.thumb { width: 13px; height: 13px; border-radius: 50%; background: #475569; position: absolute; top: 2px; left: 2px; transition: transform 0.15s, background 0.15s; }
.toggle.on .thumb { transform: translateX(15px); background: #a5b4fc; }
.toggle-row span { font-size: 13px; color: #64748b; }
.m-enter-active, .m-leave-active { transition: opacity 0.2s; }
.m-enter-from, .m-leave-to { opacity: 0; }
.m-enter-active .modal { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }
.m-enter-from .modal { transform: translateY(8px) scale(0.98); }
</style>