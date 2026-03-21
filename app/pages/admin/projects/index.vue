<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Projets</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayProjects.length }} projets au total</p>
      </div>
      <button
        class="bg-[var(--bg-btn-primary)] text-[var(--text-accent)] border border-[var(--border-btn)] px-4 py-2 rounded-lg cursor-pointer text-[13px] transition-all hover:brightness-110"
        @click="openModal"
      >
        Nouveau projet
      </button>
    </div>

    <AdminTable
      :columns="columns"
      :rows="displayProjects"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucun projet dans la base de données"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle="handleToggle"
    />

    <AdminModal
      v-model="modal"
      title="Ajouter un projet"
      subtitle="Le repo GitHub sera importé automatiquement"
      submit-text="Importer et enregistrer"
      loading-text="Import en cours..."
      :loading="isSubmit"
      :errors="errors"
      :fields="[
        {
          key: 'link',
          label: 'Lien du repo GitHub',
          type: 'url',
          placeholder: 'https://github.com/username/repo',
          required: true,
        }
      ]"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import { ProjectSchema } from '~/schema/ProjectSchema'
import { projectService } from '~/services/ProjectService'
import type { CreateProjectDto } from '~/types/DTO/CreateProjectDto'
import type { Project } from '~/types/Project'

definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'title', label: 'Projet', type: 'main'},
  { key: 'language', label: 'Stack', type: 'main' },
  { key: 'is_featured', label: 'Mis en avant', type: 'toggle' },
]

const { data: projects, loading, execute } = useFetchSupa<Project[]>(() => projectService.getAllAsync())
const modal = ref(false)
const form = reactive({ link: '' })
const errors = ref<Record<string, string[]>>({})
const isSubmit = ref(false)

const displayProjects = computed(() => projects.value || [])

onMounted(() => execute())

const handleSubmit = async (form: Record<string, any>) => {
  errors.value = {}
  const result = ProjectSchema.safeParse(form)

  const link: CreateProjectDto = {
    link: result.data.link
  }

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }
  try {
    isSubmit.value = true
    await projectService.createAsync(link)
    modal.value = false
    await execute()
  } catch (err: any) {
    errors.value = { link: [err?.data?.message ?? 'Une erreur est survenue'] }
  } finally {
    isSubmit.value = false
  }
}

const handleEdit = async (row: Project) => {
  // await projectService.updateAsync(row.id);
}

const handleDelete = async (row: Project) => {
  await projectService.deleteAsync(row.id)
  await execute()
}

const handleToggle = async (row: Record<string, any>, key: string) => {
  const project = row as Project;
  const currentValue = project[key as keyof Project];
  await projectService.updateAsync(row.id, {
    [key]: !currentValue
  });
  await execute()
}

const openModal = () => {
  errors.value = {}
  form.link = ''
  modal.value = true
}
</script>