<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Formations</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayTrainings.length }} Nb de formation(s)</p>
      </div>
      <button
        class="bg-[var(--bg-btn-primary)] text-[var(--text-accent)] border border-[var(--border-btn)] px-4 py-2 rounded-lg cursor-pointer text-[13px] transition-all hover:brightness-110"
        @click="importModal = true"
      > Nouvelle Formation </button>
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
      :rows="displayTrainings"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucune formation dans la base de données"
      @edit="handleEditClick"
      @delete="handleDelete"
      @toggle="handleToggle"
    />

     <AdminModal
        v-model="show"
        :initial-data="selectedVeille"
        title="Importer un projet"
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
import { TrainingSchema } from '~/schema/TrainingSchema'
import { trainingService } from '~/services/TrainingService'
import type { CreateTrainingDto } from '~/types/DTO/CreateTrainingDto'
import type { ModalField } from '~/types/ModalField'
import type { Training } from '~/types/Training'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { data, loading, execute } = useFetchSupa<Training[]>(() => trainingService.getAllAsync())

const importModal = ref(false)
const isSubmit = ref(false)
const errors = ref<Record<string, string[]>>({})

const handleCreate = async (form: Record<string, any>) => {
  errors.value = {}
  const result = TrainingSchema.safeParse(form)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }
  try {
    isSubmit.value = true
    await trainingService.createAsync(result.data)
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
  handleEditSumbit, handleToggle } = useMethodTable<Training, Partial<CreateTrainingDto>>(trainingService, execute);

const createFields: ModalField[] = [
  {
    key: 'years',
    label: 'Année(s)',
    type: 'text',
    placeholder: 'ex: 2024 — 2026',
    required: true,
  },
  {
    key: 'shortName',
    label: 'Nom court',
    type: 'text',
    placeholder: 'ex: BTS SIO',
    required: true,
  },
  {
    key: 'type',
    label: 'Type de diplôme',
    type: 'text',
    placeholder: 'ex: Bac +2',
    required: true,
  },
  {
    key: 'title',
    label: 'Titre complet',
    type: 'text',
    placeholder: 'ex: BTS SIO option SLAM',
    required: true,
  },
  {
    key: 'school',
    label: 'École / Établissement',
    type: 'text',
    placeholder: 'ex: Lycée Saint-Bénigne',
    required: true,
  },
  {
    key: 'location',
    label: 'Lieu',
    type: 'text',
    placeholder: 'ex: Dijon',
    required: true,
  },
  {
    key: 'status',
    label: 'État actuel',
    type: 'text',
    placeholder: 'ex: En cours, Obtenu...',
    required: true,
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Détails de ce que tu as appris...',
    required: true,
  },
  {
    key: 'order',
    label: 'Ordre',
    type: 'text',
    placeholder: 'Ordre',
    required: true,
  },
]

const columns = [
  { key: 'years', label: 'Année', type: 'main'},
  { key: 'shortName', label: 'ShortName', type: 'main' },
  { key: 'type', label: 'Type', type: 'main' },
  { key: 'title', label: 'Titre', type: 'main' },
  { key: 'school', label: 'Ecole', type: 'main' },
  { key: 'location', label: 'Lieu', type: 'main' },
  { key: 'status', label: 'Etat', type: 'main' },
  { key: 'description', label: 'Description', type: 'main' },
  { key: 'order', label: 'Ordre', type: 'main' },
  { key: 'img', label: 'Image', type: 'main' },
]

const displayTrainings = computed(() => data.value || [] )

onMounted(() => execute())

</script>