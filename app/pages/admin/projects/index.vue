<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1>Projets</h1>
        <p class="sub">{{ displayProjects.length }} projets au total</p>
      </div>
      <button class="btn-primary" @click="openModal">Nouveau projet</button>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Projet</th><th>Stack</th><th>Mis en avant</th><th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="displayProjects.length > 0">
          <tr v-for="p in displayProjects" :key="p.id" class="trow">
            <td>
              <div class="cell-proj">
                <span class="cdot"></span>
                <div>
                  <div class="cell-name">{{ p.title }}</div>
                  <div class="cell-desc">{{ p.description }}</div>
                </div>
              </div>
            </td>
            <td></td>
            <td>
              <button class="toggle" :class="{ 'toggle-on': p.is_featured }" @click="p.is_featured = !p.is_featured">
                <span class="toggle-thumb"></span>
              </button>
            </td>
            <td>
              <div class="row-acts">
                <button class="act edit">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5a1.414 1.414 0 0 1 2 2L3.5 10.5l-3 .5.5-3 7.5-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Edit
                </button>
                <button class="act delete">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 3h9M4 3V2h4v1M5 5.5v3M7 5.5v3M2.5 3l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="empty">
              {{ loading ? 'Chargement...' : 'Aucun projet dans la base de données' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="tfoot">{{ displayProjects.length }} résultat(s)</div>
    </div>

    <Transition name="m">
      <div v-if="modal" class="overlay" @click.self="modal = false">
        <div class="modal">
          <div class="modal-head">
            <div>
              <p class="modal-title">Ajouter un projet</p>
              <p class="modal-sub">Le repo GitHub sera importé automatiquement</p>
            </div>
            <button class="mclose" @click="modal = false">×</button>
          </div>

          <div class="modal-body">
            <div class="field">
              <label>Lien du repo GitHub <span class="req">*</span></label>
              <div class="input-icon-wrap" :class="{ 'input-err-wrap': errors.link }">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="input-icon">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="currentColor"/>
                </svg>
                <input
                  v-model="form.link"
                  placeholder="https://github.com/username/repo"
                  class="input-with-icon"
                />
              </div>
              <span v-if="errors.link" class="err">{{ errors.link[0] }}</span>
            </div>
          </div>

          <div class="modal-foot">
            <button class="btn-ghost" @click="modal = false">Annuler</button>
            <button class="btn-primary" @click="handleSubmit" :disabled="isSubmit">
              {{ isSubmit ? 'Import en cours...' : 'Importer et enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import { ProjectSchema } from '~/schema/ProjectSchema'
import { projectService } from '~/services/ProjectService'
import type { Project } from '~/types/Project'

definePageMeta({ layout: 'admin' })

const { data: projects, loading, execute } = useFetchSupa<Project[]>(() => projectService.getAllAsync())
const modal = ref(false)
const form = reactive({ link: '' })
const errors = ref<Record<string, string[]>>({})
const isSubmit = ref(false)

const displayProjects = computed(() => projects.value || [])

onMounted(() => execute())

const handleSubmit = async () => {
  errors.value = {}
  const result = ProjectSchema.safeParse(form)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }

  try {
    isSubmit.value = true
    await projectService.createProject(result.data.link)
    modal.value = false
    form.link = ''
    await execute()
  } catch (err: any) {
    errors.value = { link: [err?.data?.message ?? 'Une erreur est survenue'] }
  } finally {
    isSubmit.value = false
  }
}

const openModal = () => {
  errors.value = {}
  form.link = ''
  modal.value = true
}
</script>

<style scoped>
.page { padding: 28px 32px 48px; display: flex; flex-direction: column; gap: 18px; min-height: 100%; color: var(--text-primary); }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
h1 { font-size: 19px; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
.sub { font-size: 12px; color: var(--text-muted); }

.table-wrap { background: var(--bg-surface); border: 1px solid var(--border-surface); border-radius: 10px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th { padding: 9px 16px; text-align: left; font-size: 10px; color: var(--text-faint); text-transform: uppercase; }
td { padding: 11px 16px; border-bottom: 1px solid var(--border-surface); }
.empty { text-align: center; padding: 60px; color: var(--text-muted); font-size: 13px; }
.cdot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #6366f1; flex-shrink: 0; margin-top: 3px; }
.cell-proj { display: flex; align-items: flex-start; gap: 10px; }
.cell-name { font-size: 13px; color: var(--text-secondary); }
.cell-desc { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
.tag { font-size: 10px; background: var(--bg-tag); padding: 2px 6px; border-radius: 4px; color: var(--text-muted); margin-right: 4px; }
.tfoot { padding: 10px 16px; font-size: 11px; color: var(--text-faint); }

/* Toggle */
.toggle { width: 36px; height: 20px; border-radius: 99px; background: var(--border-muted); border: none; cursor: pointer; position: relative; transition: background 0.2s; padding: 0; flex-shrink: 0; }
.toggle-on { background: rgba(99,102,241,0.5); }
.toggle-thumb { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: var(--text-faint); transition: transform 0.2s, background 0.2s; }
.toggle-on .toggle-thumb { transform: translateX(16px); background: #a5b4fc; }

/* Actions */
.row-acts { display: flex; gap: 6px; }
.act { display: flex; align-items: center; gap: 5px; font-size: 11px; padding: 4px 10px; border-radius: 5px; cursor: pointer; border: 0.5px solid var(--border-surface); background: var(--bg-tag); color: var(--text-muted); transition: all 0.15s; }
.act.edit:hover { color: var(--text-accent); border-color: var(--border-btn); background: var(--bg-btn-primary); }
.act.delete:hover { color: #f87171; border-color: rgba(248,113,113,0.3); background: rgba(248,113,113,0.08); }

.btn-primary { background: var(--bg-btn-primary); color: var(--text-accent); border: 1px solid var(--border-btn); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: filter 0.15s; }
.btn-primary:hover { filter: brightness(1.15); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; filter: none; }
.btn-ghost { background: transparent; border: 0.5px solid var(--border-muted); color: var(--text-muted); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; }
.btn-ghost:hover { background: var(--bg-tag); color: var(--text-secondary); }

.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal { background: var(--bg-modal); border: 0.5px solid var(--border-modal); border-radius: 14px; width: 100%; max-width: 480px; overflow: hidden; box-shadow: 0 24px 48px rgba(0,0,0,0.15); }
.modal-head { padding: 18px 24px 16px; border-bottom: 0.5px solid var(--border-surface); display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.modal-title { font-size: 14px; font-weight: 600; color: var(--text-primary); line-height: 1; }
.modal-sub { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
.mclose { width: 26px; height: 26px; background: var(--bg-tag); border: 0.5px solid var(--border-muted); border-radius: 6px; color: var(--text-muted); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; transition: all 0.15s; flex-shrink: 0; }
.mclose:hover { color: var(--text-secondary); }
.modal-body { padding: 24px; }
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.req { color: #6366f1; }
.input-icon-wrap { display: flex; align-items: center; gap: 10px; background: var(--bg-input); border: 0.5px solid var(--border-input); border-radius: 9px; padding: 0 12px; transition: border-color 0.15s; }
.input-icon-wrap:focus-within { border-color: rgba(99,102,241,0.5); }
.input-err-wrap { border-color: rgba(239,68,68,0.5) !important; }
.input-icon { color: var(--text-faint); flex-shrink: 0; }
.input-with-icon { flex: 1; background: transparent; border: none; outline: none; padding: 11px 0; font-size: 13px; color: var(--text-secondary); font-family: inherit; }
.input-with-icon::placeholder { color: var(--text-faint); }
.err { font-size: 11px; color: #f87171; }
.modal-foot { padding: 14px 24px; border-top: 0.5px solid var(--border-surface); background: var(--bg-github); display: flex; align-items: center; justify-content: flex-end; gap: 10px; }

.m-enter-active, .m-leave-active { transition: opacity 0.2s, transform 0.2s; }
.m-enter-from, .m-leave-to { opacity: 0; transform: scale(0.97); }
</style>