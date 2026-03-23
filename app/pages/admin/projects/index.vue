<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Projets</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayProjects.length }} projets au total</p>
      </div>
      <button
        class="bg-[var(--bg-btn-primary)] text-[var(--text-accent)] border border-[var(--border-btn)] px-4 py-2 rounded-lg cursor-pointer text-[13px] transition-all hover:brightness-110"
        @click="importModal = true"
      > Nouveau projet </button>
    </div>

    <AdminModal
      v-model="importModal"
      title="Nouveau projet"
      subtitle="Le repo GitHub sera importé automatiquement"
      submit-text="Importer et enregistrer"
      loading-text="Import en cours..."
      :loading="isSubmit"
      :errors="errors"
      :fields="createFields"
      @submit="handleCreate"
    />

    <AdminTable
      :columns="columns"
      :rows="displayProjects"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucun projet dans la base de données"
      @edit="handleEditClick"
      @delete="handleDelete"
      @toggle="handleToggle"
    />

     <AdminModal
        v-model="show"
        :initial-data="selectedProjects"
        title="Importer un projet"
        subtitle="Récupération automatique des données"
        :fields="fields"
        submit-text="Modifier"
        :loading="false"
        @submit="handleEditSumbit"
    />

  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import useMethodTable from '~/hooks/useMethodTable'
import { ProjectSchema } from '~/schema/ProjectSchema'
import { projectService } from '~/services/ProjectService'
import type { CreateProjectDto } from '~/types/DTO/CreateProjectDto'
import type { ModalField } from '~/types/ModalField'
import type { Project } from '~/types/Project'

definePageMeta({ layout: 'admin'})

const importModal = ref(false)
const isSubmit = ref(false)
const errors = ref<Record<string, string[]>>({})

const createFields: ModalField[] = [
  {
    key: 'link',
    label: 'Lien du repo GitHub',
    type: 'url',
    placeholder: 'https://github.com/username/repo',
    required: true,
  }
]

const handleCreate = async (form: Record<string, any>) => {
  errors.value = {}
  const result = ProjectSchema.safeParse(form)
  console.log('result:', result)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }
  try {
    isSubmit.value = true
    await projectService.createAsync({ link: result.data.link })
    importModal.value = false
    await execute()
  } catch (err: any) {
    errors.value = { link: [err?.data?.message ?? 'Une erreur est survenue'] }
  } finally {
    isSubmit.value = false
  }
}

const fields: ModalField[] = [
  {
    key: 'title',
    label: 'Nom du projet',
    type: 'text',
    placeholder: 'Mon Projet ... ',
    required: true,
  },
  {
    key: 'language',
    label: 'Stack',
    type: 'text',
    placeholder: 'Techno ... ',
    required: true,
  },
  {
    key: 'description',
    label: 'Description du projet',
    type: 'text',
    placeholder: '... ',
    required: false,
  }
]

const columns = [
  { key: 'title', label: 'Projet', type: 'main'},
  { key: 'language', label: 'Stack', type: 'main' },
  { key: 'is_featured', label: 'Mis en avant', type: 'toggle' },
  { key: 'first_page', label: 'Première page', type: 'toggle' },
]

const { data: projects, loading, execute } = useFetchSupa<Project[]>(() => projectService.getAllAsync())

const { show, selectedType: selectedProjects,
  handleDelete, handleEditClick,
  handleEditSumbit, handleToggle } = useMethodTable<Project, Partial<CreateProjectDto>>(projectService, execute);

const displayProjects = computed(() => projects.value || [])

onMounted(() => execute())

</script>