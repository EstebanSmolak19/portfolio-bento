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
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle="handleToggle"
    />
  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import { categorieService } from '~/services/categorieService'
import type { Article } from '~/types/Article'
import type { Categorie } from '~/types/Categorie'

definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'name', label: 'Nom', type: 'main'},
  { key: 'color', label: 'Couleur', type: 'color' },
]

const { data: categories, loading, execute } = useFetchSupa<Categorie[]>(() => categorieService.getAllAsync())

const displayCategories = computed(() => categories.value || [])

onMounted(() => execute())

const handleEdit = (row: Article) => {
  // form.link = row.link
  // modal.value = true
}

const handleDelete = async (row: Article) => {
  // await projectService.delete(row.id)
  // await execute()
}

const handleToggle = async (row: Article, key: string) => {
  // await projectService.update(row.id, { [key]: !row[key] })
  // await execute()
}

</script>