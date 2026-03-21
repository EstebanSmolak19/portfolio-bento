<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Categories</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayCategories.length }} categorie(s)</p>
      </div>
    </div>

    <AdminTable
      :columns="columns"
      :rows="displayCategories"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucune catégorie dans la base de données"
      @edit="handleEditClick"
      @delete="handleDelete"
    />

    <AdminModal
        v-model="show"
        :initial-data="selectedCategory"
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
import AdminModal from '~/components/admin/AdminModal.vue'
import AdminTable from '~/components/admin/AdminTable.vue'
import useFetchSupa from '~/hooks/useFetch'
import useShowModal from '~/hooks/useShowModal'
import { categorieService } from '~/services/CategorieService'
import type { Article } from '~/types/Article'
import type { Categorie } from '~/types/Categorie'
import type { ModalField } from '~/types/ModalField'

definePageMeta({ layout: 'admin' })

const { show, setShow } = useShowModal();
const selectedCategory = ref<Record<string, any> | null>(null);

const fields: ModalField[] = [
  {
    key: 'name',
    label: 'Nom de la categorie',
    type: 'text',
    placeholder: '...',
    required: true
  },
  {
    key: 'color',
    label: 'Couleur',
    type: 'text',
    placeholder: 'couleur en anglais ... ',
    required: true
  }
]

const columns = [
  { key: 'name', label: 'Nom', type: 'main'},
  { key: 'color', label: 'Couleur', type: 'color' },
]

const { data: categories, loading, execute } = useFetchSupa<Categorie[]>(() => categorieService.getAllAsync())

const displayCategories = computed(() => categories.value || [])

onMounted(() => execute())

const handleEditClick = (row: Record<string, any>) => {
  selectedCategory.value = { ...row };
  setShow();
};


const handleEditSumbit = async (row: Record<string, any>) => {
  const id = selectedCategory.value?.id;
  await categorieService.updateAsync(id, row);
  await execute()
  setShow(); // Change la valeur de show via le useShowModal
}

const handleDelete = async (row: Record<string, any>) => {
  const categorie = row as Article;
  await categorieService.deleteAsync(categorie.id)
  await execute()
}

</script>