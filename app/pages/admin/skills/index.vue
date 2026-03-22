<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Compétences</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayArticles.length }} Nb de compétences</p>
      </div>
      <button
        class="bg-[var(--bg-btn-primary)] text-[var(--text-accent)] border border-[var(--border-btn)] px-4 py-2 rounded-lg cursor-pointer text-[13px] transition-all hover:brightness-110"
        @click="importModal = true"
      > Nouvelle compétence </button>
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
      :rows="displayArticles"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucune compétences dans la base de données"
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
import { SkillSchema } from '~/schema/SkillSchema'
import { skillService } from '~/services/SkillService'
import type { CreateSkillDto } from '~/types/DTO/CreateSkillDto'
import type { ModalField } from '~/types/ModalField'
import type { Skill } from '~/types/Skill'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { data, loading, execute } = useFetchSupa<Skill[]>(() => skillService.getAllAsync())
const importModal = ref(false)
const isSubmit = ref(false)
const errors = ref<Record<string, string[]>>({})

const handleCreate = async (form: Record<string, any>) => {
  errors.value = {}
  const result = SkillSchema.safeParse(form)
  console.log('result:', result)
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors as Record<string, string[]>
    return
  }
  try {
    isSubmit.value = true
    console.log(result.data)
    await skillService.createAsync(result.data)
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
  handleEditSumbit, handleToggle } = useMethodTable<Skill, Partial<CreateSkillDto>>(skillService, execute);

const createFields: ModalField[] = [
  {
    key: 'name',
    label: 'Nom de la compértence',
    type: 'text',
    placeholder: 'Laravel...',
    required: true,
  },
  {
    key: 'icon',
    label: "nom de l'icon",
    type: 'text',
    placeholder: 'logos:...',
    required: true,
  },
  {
    key: 'level',
    label: '% de la compétence',
    type: 'text',
    placeholder: '90',
    required: true,
  }
]

const columns = [
  { key: 'name', label: 'Nom', type: 'main'},
  { key: 'icon', label: 'icon', type: 'main' },
  { key: 'level', label: 'level', type: 'main' },
]

const displayArticles = computed(() => data.value || [] )

onMounted(() => execute())


</script>