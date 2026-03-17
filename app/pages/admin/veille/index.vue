<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1>Veille technologique</h1>
        <p class="sub">{{ articles.length }} articles au total</p>
      </div>
      <button class="btn-primary" @click="openModal()">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        Ajouter un article
      </button>
    </div>

    <!-- Filtres catégories -->
    <div class="cats">
      <button v-for="c in cats" :key="c.label" class="cat" :class="{ active: activeCat === c.label }" @click="activeCat = c.label">
        <span class="pip" :style="{ background: c.color }"></span>
        {{ c.label }}
        <span class="cat-n">{{ c.n }}</span>
      </button>
    </div>

    <!-- Cards -->
    <div class="grid">
      <div class="card" v-for="a in filtered" :key="a.id">
        <div class="card-top">
          <span class="badge" :style="{ color: a.catColor, background: a.catColor + '14', borderColor: a.catColor + '28' }">{{ a.cat }}</span>
          <div class="card-acts">
            <button class="act edit" @click="openModal(a)">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7.5 1.5l2 2-6 6H1.5v-2l6-6z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
            </button>
            <button class="act del" @click="del(a)">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 3h8M4 3V1.5h3V3M4.5 5v3.5M6.5 5v3.5M2.5 3l.6 6.5h4.8L8.5 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
        <h3>{{ a.title }}</h3>
        <p class="summary">{{ a.summary }}</p>
        <div class="tags"><span class="tag" v-for="t in a.tags" :key="t">{{ t }}</span></div>
        <div class="card-foot">
          <a :href="a.sourceUrl" target="_blank" class="source">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M4 1.5H1.5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7M6 1h3m0 0v3m0-3L4 7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ a.source }}
          </a>
          <span class="card-date">{{ a.date }}</span>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">Aucun article dans cette catégorie</div>

    <!-- Modal -->
    <Transition name="m">
      <div v-if="modal" class="overlay" @click.self="modal = false">
        <div class="modal">
          <div class="modal-head">
            <span>{{ editing ? "Modifier l'article" : 'Nouvel article' }}</span>
            <button class="mclose" @click="modal = false">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="fgrid">
              <div class="field s2"><label>Titre <span class="req">*</span></label><input v-model="form.title" placeholder="Titre de l'article"/></div>
              <div class="field s2"><label>Résumé <span class="req">*</span></label><textarea v-model="form.summary" rows="3" placeholder="Résumé..."></textarea></div>
              <div class="field">
                <label>Catégorie</label>
                <select v-model="form.cat">
                  <option value="">Choisir...</option>
                  <option v-for="c in ['IA','Web','Sécurité','BDD','DevOps','Mobile']" :key="c">{{ c }}</option>
                </select>
              </div>
              <div class="field"><label>Source</label><input v-model="form.source" placeholder="Ex: nuxt.com"/></div>
              <div class="field s2"><label>URL source</label><input v-model="form.sourceUrl" placeholder="https://..."/></div>
              <div class="field s2"><label>Tags <span class="hint">— séparés par virgules</span></label><input v-model="form.tags" placeholder="AI, LLM, Open Source"/></div>
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn-ghost" @click="modal = false">Annuler</button>
            <button class="btn-primary">{{ editing ? 'Enregistrer' : 'Ajouter' }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const activeCat = ref('Tous')
const modal = ref(false)
const editing = ref<any>(null)
const form = reactive({ title:'', summary:'', cat:'', source:'', sourceUrl:'', tags:'' })

const cats = [
  { label:'Tous',     color:'#818cf8', n:6 },
  { label:'IA',       color:'#a78bfa', n:2 },
  { label:'Web',      color:'#67e8f9', n:2 },
  { label:'Sécurité', color:'#f9a8d4', n:1 },
  { label:'BDD',      color:'#fcd34d', n:1 },
]
const articles = ref([
  { id:1, title:"Les LLMs en 2025 : état de l'art",   summary:"Tour d'horizon des grandes évolutions des modèles de langage en 2025.",                              cat:'IA',       catColor:'#a78bfa', tags:['AI','LLM'],         source:'lemondeinformatique.fr', sourceUrl:'#', date:'10 Mar 2025' },
  { id:2, title:'Nuxt 4 : toutes les nouveautés',     summary:'Revue des changements majeurs apportés par Nuxt 4 : routeur, performances et breaking changes.',     cat:'Web',      catColor:'#67e8f9', tags:['Nuxt','Vue'],        source:'nuxt.com',              sourceUrl:'#', date:'5 Mar 2025'  },
  { id:3, title:'OWASP Top 10 2025',                  summary:"L'OWASP publie sa liste des 10 principales vulnérabilités applicatives à surveiller en 2025.",        cat:'Sécurité', catColor:'#f9a8d4', tags:['OWASP','Sécu'],      source:'owasp.org',             sourceUrl:'#', date:'28 Fév 2025' },
  { id:4, title:'PostgreSQL 17 : nouvelles features', summary:'PostgreSQL 17 introduit des améliorations de perf et de nouvelles fonctionnalités SQL avancées.',     cat:'BDD',      catColor:'#fcd34d', tags:['PostgreSQL','SQL'],  source:'postgresql.org',        sourceUrl:'#', date:'20 Fév 2025' },
  { id:5, title:"Cursor AI : le futur de l'IDE ?",    summary:"Analyse de Cursor, l'éditeur de code boosté à l'IA qui change la façon de coder au quotidien.",       cat:'IA',       catColor:'#a78bfa', tags:['AI','IDE'],          source:'cursor.com',            sourceUrl:'#', date:'8 Fév 2025'  },
  { id:6, title:'TailwindCSS v4 : ce qui change',     summary:'Tailwind v4 : nouveau moteur CSS, config simplifiée et utilitaires supplémentaires.',                  cat:'Web',      catColor:'#67e8f9', tags:['Tailwind','CSS'],    source:'tailwindcss.com',       sourceUrl:'#', date:'2 Fév 2025'  },
])

const filtered = computed(() => activeCat.value === 'Tous' ? articles.value : articles.value.filter(a => a.cat === activeCat.value))
function openModal(a?: any) {
  editing.value = a || null
  a ? Object.assign(form, { ...a, tags: a.tags.join(', ') }) : Object.assign(form, { title:'', summary:'', cat:'', source:'', sourceUrl:'', tags:'' })
  modal.value = true
}
function del(a: any) { if (confirm(`Supprimer "${a.title}" ?`)) articles.value = articles.value.filter(x => x.id !== a.id) }
</script>

<style scoped>
.page { padding: 28px 32px 48px; display: flex; flex-direction: column; gap: 18px; min-height: 100%; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
h1 { font-size: 19px; font-weight: 700; color: #e2e8f0; letter-spacing: -0.02em; margin-bottom: 3px; }
.sub { font-size: 12px; color: #475569; }

.btn-primary { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; border: 1px solid rgba(99,102,241,0.35); cursor: pointer; background: rgba(99,102,241,0.15); color: #a5b4fc; font-size: 13px; font-weight: 600; font-family: inherit; transition: all 0.15s; }
.btn-primary:hover { background: rgba(99,102,241,0.25); border-color: rgba(99,102,241,0.55); color: #c7d2fe; }
.btn-ghost { padding: 7px 14px; border-radius: 8px; cursor: pointer; background: transparent; border: 1px solid rgba(99,102,241,0.15); color: #64748b; font-size: 13px; font-family: inherit; transition: all 0.15s; }
.btn-ghost:hover { border-color: rgba(99,102,241,0.3); color: #94a3b8; }

/* Cats */
.cats { display: flex; gap: 6px; flex-wrap: wrap; }
.cat { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 7px; border: 1px solid transparent; background: transparent; color: #475569; font-size: 12px; font-family: inherit; cursor: pointer; transition: all 0.15s; }
.cat:hover { background: rgba(99,102,241,0.07); color: #94a3b8; }
.cat.active { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.25); color: #a5b4fc; font-weight: 600; }
.pip { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.cat-n { font-size: 10px; color: #334155; background: rgba(99,102,241,0.08); padding: 0 5px; border-radius: 3px; }

/* Cards */
.grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.card { background: rgba(17,24,39,0.6); border: 1px solid rgba(99,102,241,0.1); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 9px; transition: border-color 0.15s; }
.card:hover { border-color: rgba(99,102,241,0.22); }
.card-top { display: flex; align-items: center; justify-content: space-between; }
.badge { font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 4px; border: 1px solid; text-transform: uppercase; letter-spacing: 0.07em; }
.card-acts { display: flex; gap: 4px; opacity: 0; transition: opacity 0.12s; }
.card:hover .card-acts { opacity: 1; }
.act { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 5px; border: none; cursor: pointer; transition: all 0.12s; }
.act.edit { background: rgba(99,102,241,0.08); color: #64748b; }
.act.edit:hover { background: rgba(99,102,241,0.18); color: #a5b4fc; }
.act.del  { background: rgba(99,102,241,0.08); color: #64748b; }
.act.del:hover  { background: rgba(248,113,113,0.12); color: #f87171; }
h3 { font-size: 13px; font-weight: 600; color: #cbd5e1; line-height: 1.4; }
.summary { font-size: 12px; color: #475569; line-height: 1.55; flex: 1; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tag { font-size: 10px; color: #475569; background: rgba(99,102,241,0.08); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(99,102,241,0.12); }
.card-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid rgba(99,102,241,0.07); }
.source { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #334155; text-decoration: none; transition: color 0.15s; }
.source:hover { color: #818cf8; }
.card-date { font-size: 11px; color: #334155; }
.empty { text-align: center; padding: 48px; font-size: 13px; color: #334155; }

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
.field input, .field textarea, .field select { padding: 8px 11px; background: rgba(15,17,23,0.8); border: 1px solid rgba(99,102,241,0.15); border-radius: 8px; color: #e2e8f0; font-size: 13px; font-family: inherit; outline: none; resize: vertical; transition: border-color 0.15s; }
.field select { appearance: none; cursor: pointer; }
.field select option { background: #0f1117; }
.field input:focus, .field textarea:focus, .field select:focus { border-color: rgba(99,102,241,0.4); }
.field input::placeholder, .field textarea::placeholder { color: #334155; }
.m-enter-active, .m-leave-active { transition: opacity 0.2s; }
.m-enter-from, .m-leave-to { opacity: 0; }
.m-enter-active .modal { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }
.m-enter-from .modal { transform: translateY(8px) scale(0.98); }
</style>