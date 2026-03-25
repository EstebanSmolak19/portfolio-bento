<template>
  <div class="px-8 py-7 pb-12 flex flex-col gap-4 min-h-full text-[var(--text-primary)]">
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-[19px] font-bold text-[var(--text-primary)] mb-1">Vielle</h1>
        <p class="text-[12px] text-[var(--text-muted)]">{{ displayArticles.length }} Nb d'articles</p>
      </div>
    </div>

    <AdminTable
      :columns="columns"
      :rows="displayArticles"
      :loading="loading"
      :editable="true"
      :deletable="true"
      empty-text="Aucun article dans la base de données"
      @edit="handleEditClick"
      @delete="handleDelete"
      @toggle="handleToggle"
    />

     <AdminModal
        v-model="show"
        :initial-data="selectedVeille"
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
import { articleService } from '~/services/ArticleService'
import type { Article } from '~/types/Article'
import type { CreateArticleDto } from '~/types/DTO/CreateArticleDto'
import type { ModalField } from '~/types/ModalField'

definePageMeta({ layout: 'admin' })

const { data, loading, execute } = useFetchSupa<Article[]>(() => articleService.getAllAsync())

const { show, selectedType: selectedVeille,
   handleDelete, handleEditClick,
  handleEditSumbit, handleToggle } = useMethodTable<Article, Partial<CreateArticleDto>>(articleService, execute);

const fields: ModalField[] = [
  {
    key: 'title',
    label: "Nom de l'article",
    type: 'text',
    placeholder: '...',
    required: true
  },
  {
    key: 'url',
    label: 'URL',
    type: 'text',
    placeholder: 'Source (url)',
    required: true
  },
  {
    key: 'category_id',
    label: 'categorie',
    type: 'text',
    placeholder: 'ID',
    required: true
  },
]

const columns = [
  { key: 'title', label: 'Nom', type: 'main'},
  { key: 'url', label: 'url', type: 'main' },
  { key: 'category_id', label: 'categorie', type: 'main' },
  { key: 'is_read', label: 'Mis en avant', type: 'toggle' },
]

const displayArticles = computed(() => data.value || [] )


onMounted(() => execute())


</script>