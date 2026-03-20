<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Vielle</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayProjects.length }} Nb d'articles</p>
      </div>
    </div>

    <AdminTable
      :columns="columns"
      :rows="displayProjects"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucun article dans la base de données"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle="handleToggle"
    />
  </div>
</template>

<script setup lang="ts">
import useFetchSupa from '~/hooks/useFetch'
import { articleService } from '~/services/ArticleService'
import type { Article } from '~/types/Article'

definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'title', label: 'Nom', type: 'main'},
  { key: 'language', label: 'url', type: 'main' },
  { key: 'language', label: 'categorie', type: 'main' },
  { key: 'is_featured', label: 'Mis en avant', type: 'toggle' },
]

const { data: projects, loading, execute } = useFetchSupa<Article[]>(() => articleService.getAllAsync())

const displayProjects = computed(() => projects.value || [])

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