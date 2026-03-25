<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Formations</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayExperiences.length }} Nb d'experience(s)</p>
      </div>
      <button
        class="bg-[var(--bg-btn-primary)] text-[var(--text-accent)] border border-[var(--border-btn)] px-4 py-2 rounded-lg cursor-pointer text-[13px] transition-all hover:brightness-110"
        @click="importModal = true"
      > Nouvelle expérience </button>
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
      :rows="displayExperiences"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucune expérience dans la base de données"
      @edit="handleEditClick"
      @delete="handleDelete"
      @toggle="handleToggle"
    />

     <AdminModal
        v-model="show"
        :initial-data="selectedVeille"
        title="Importer une expérience"
        subtitle="Récupération automatique des données"
        :fields="createFields"
        submit-text="Modifier"
        :loading="false"
        @submit="handleEditSumbit"
    />

  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import useMethodTable from '~/hooks/useMethodTable'
import { ExperienceSchema } from '~/schema/ExeperienceSchema'
import { experienceService } from '~/services/ExperienceService'
import type { CreateExperienceDto } from '~/types/DTO/CreateExperienceDto'
import type { Experience } from '~/types/Experience'
import type { ModalField } from '~/types/ModalField'

definePageMeta({ layout: 'admin' })

const { data, loading, execute } = useFetchSupa<Experience[]>(() => experienceService.getAllAsync())

const importModal = ref(false)
const isSubmit = ref(false)
const errors = ref<Record<string, string[]>>({})

const handleCreate = async (form: Record<string, any>) => {
  errors.value = {}
  const result = ExperienceSchema.safeParse(form)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }
  try {
    isSubmit.value = true
    await experienceService.createAsync(result.data)
    importModal.value = false
    await execute()
  } catch (err: any) {
    errors.value = { link: [err?.data?.message ?? 'Une erreur est survenue'] }
  } finally {
    isSubmit.value = false
  }
}

const { show, selectedType: selectedVeille,
   handleDelete, handleEditClick,
  handleEditSumbit, handleToggle } = useMethodTable<Experience, Partial<CreateExperienceDto>>(experienceService, execute);

const createFields: ModalField[] = [
  { key: 'company', label: 'Entreprise', type: 'text', placeholder: 'PM-GEST', required: true },
  { key: 'role', label: 'Role', type: 'text', placeholder: 'Stagiaire', required: true },
  { key: 'year', label: 'Année', type: 'text', placeholder: 'ex: 2024', required: true },
  { key: 'duration', label: 'Temps', type: 'text', placeholder: '7 semaines...', required: true },
  { key: 'type', label: 'Type', type: 'text', placeholder: '2e année...', required: true },
  { key: 'location', label: 'Lieu', type: 'text', placeholder: 'Dijon', required: true },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'ma description...', required: true },
  { key: 'missions', label: 'Les missions', type: 'text', placeholder: 'mission 1, mission2, ...', required: true },
  { key: 'context', label: 'contexte', type: 'text', placeholder: 'Durant mon stage...', required: true },
  { key: 'skills', label: 'compétences', type: 'text', placeholder: 'skills1, skills2, ...', required: true },
  { key: 'stack', label: 'Les technos', type: 'text', placeholder: 'stack1, stack2, ...', required: true },
  { key: 'order', label: 'Ordre', type: 'text', placeholder: 'un entier', required: true },
]

const columns = [
  { key: 'company', label: 'Entreprise', type: 'main'},
  { key: 'role', label: 'Role', type: 'main' },
  { key: 'year', label: 'Année', type: 'main' },
  { key: 'duration', label: 'Temps', type: 'main' },
  { key: 'type', label: 'Type', type: 'main' },
  { key: 'location', label: 'Lieu', type: 'main' },
  { key: 'description', label: 'Description', type: 'main' },
  { key: 'missions', label: 'Les missions', type: 'main' },
  { key: 'context', label: 'Le contexte', type: 'main' },
  { key: 'skills', label: 'Les compétences', type: 'main' },
  { key: 'stack', label: 'Les technos', type: 'main' },
]

const displayExperiences = computed(() => data.value || [] )

onMounted(() => execute())

</script>