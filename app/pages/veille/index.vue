<template>
  <div class="veille-wrapper">
    <div class="page-header">
      <h1 class="page-title">Veille <span class="title-accent">Technologique</span></h1>
    </div>

    <div class="main-grid">
      <aside class="sidebar">
        <div class="sidebar-section">
          <span class="section-label">Recherche</span>
          <div class="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Titre, résumé..." class="search-input" />
          </div>
        </div>

        <div class="sidebar-section">
          <span class="section-label">Catégories</span>
          <select v-model.number="selectedCategory" class="category-select">
            <option :value="null">Toutes les catégories</option>
            <option v-for="cat in availableCategories" :key="cat" :value="cat">Catégorie {{ cat }}</option>
          </select>
        </div>

        <div class="sidebar-section">
          <span class="section-label">Score ({{ scoreRange[0] }} - {{ scoreRange[1] }})</span>
          <div class="score-inputs">
            <input v-model.number="scoreRange[0]" type="number" min="0" max="10" class="score-input" />
            <span class="range-sep">à</span>
            <input v-model.number="scoreRange[1]" type="number" min="0" max="10" class="score-input" />
          </div>
          <div class="slider-container">
            <input type="range" v-model.number="scoreRange[0]" min="0" max="10" class="range-slider" @input="ensureRangeOrder" />
            <input type="range" v-model.number="scoreRange[1]" min="0" max="10" class="range-slider" @input="ensureRangeOrder" />
          </div>
        </div>

        <button class="reset-btn" @click="resetFilters">Réinitialiser les filtres</button>
      </aside>

      <section class="content-area">
        <div class="content-header">
          <div class="article-count">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
            <span>{{ filteredArticles.length }} articles trouvés</span>
          </div>

          <div class="pagination-controls">
            <span class="page-number">{{ currentPage }}</span>
            <button class="nav-btn" @click="previousPage" :disabled="currentPage === 1">‹ Précédent</button>
            <button class="nav-btn" @click="nextPage" :disabled="currentPage >= totalPages">Suivant ›</button>
          </div>
        </div>

        <div class="articles-container">
          <div v-if="loading" class="empty-state">
            <div class="spinner"></div>
            <p>Chargement des articles...</p>
          </div>

          <div v-else-if="paginatedArticles.length === 0" class="empty-state">
            <svg class="telescope-icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="50" cy="30" r="8"></circle>
              <path d="M 50 38 L 35 70 L 65 70 Z"></path>
              <line x1="50" y1="70" x2="50" y2="85"></line>
              <circle cx="45" cy="85" r="3"></circle>
            </svg>
            <p>Aucun article correspondant à votre recherche.</p>
            <button class="reset-btn-outline" @click="resetFilters">Réinitialiser les filtres</button>
          </div>

          <div v-else class="articles-grid">
            <article
              v-for="article in paginatedArticles"
              :key="article.id"
              class="article-card"
              :class="{ 'is-read': article.is_read }"
            >
              <div class="card-accent"></div>
              <div class="card-content">
                <div class="card-header">
                  <span class="category-badge">Cat {{ article.category_id }}</span>
                  <div class="card-meta">
                    <span class="date">{{ formatDate(article.published_at) }}</span>
                    <span v-if="article.is_read" class="read-badge">✓ Lu</span>
                  </div>
                </div>
                <h3 class="card-title">{{ article.title }}</h3>
                <p class="card-summary">{{ article.summary }}</p>
                <div class="card-footer">
                  <div class="article-meta">
                    <span v-if="article.author" class="author">{{ article.author }}</span>
                    <span v-if="article.score" class="score-badge">★ {{ article.score }}/10</span>
                  </div>
                  <a :href="article.url" target="_blank" rel="noopener noreferrer" class="read-link">
                    Lire
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import useFetchSupa from '~/hooks/useFetch'
import { articleService } from '~/services/ArticleService'
import type { Article } from '~/types/Article'

const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const scoreRange = ref<[number, number]>([0, 10])
const showUnreadOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = 4

const { data: articles, execute, loading } = useFetchSupa<Article[]>(() => articleService.getAllAsync())

onMounted(async () => {
  await execute()
})

const availableCategories = computed(() => {
  if (!articles.value) return []
  const cats = articles.value
    .map(a => a.category_id)
    .filter((c): c is number => c !== undefined && c !== null)
  return [...new Set(cats)].sort((a, b) => a - b)
})

const filteredArticles = computed(() => {
  if (!articles.value) return []
  return articles.value
    .filter(article => {
      const matchSearch =
        article.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        article.summary?.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchCategory = selectedCategory.value === null || article.category_id === selectedCategory.value
      const score = article.score || 0
      const matchScore = score >= scoreRange.value[0] && score <= scoreRange.value[1]
      const matchUnread = !showUnreadOnly.value || !article.is_read
      return matchSearch && matchCategory && matchScore && matchUnread
    })
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredArticles.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / itemsPerPage) || 1)

const ensureRangeOrder = () => {
  if (scoreRange.value[0] > scoreRange.value[1]) {
    [scoreRange.value[0], scoreRange.value[1]] = [scoreRange.value[1], scoreRange.value[0]]
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  scoreRange.value = [0, 10]
  showUnreadOnly.value = false
  currentPage.value = 1
}

const previousPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateString))
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.veille-wrapper {
  width: 100%;
  height: 100vh;
  padding: 72px 48px 40px 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  margin-bottom: 32px;
  flex-shrink: 0;
}

.page-title {
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
  color: #ffffff;
}

.title-accent {
  color: #a5b4fc;
}

.main-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.sidebar {
  background: rgba(10, 10, 25, 0.4);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  max-height: 100%;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a5b4fc;
  font-family: 'Courier New', monospace;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 12px;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.search-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  padding: 10px 10px 10px 36px;
  color: #ffffff;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
}

.search-input::placeholder { color: rgba(255, 255, 255, 0.4); }
.search-input:focus {
  border-color: #818cf8;
  background: rgba(99, 102, 241, 0.05);
}

.category-select {
  width: 100%;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.category-select:hover { border-color: rgba(99, 102, 241, 0.3); }
.category-select:focus {
  border-color: #818cf8;
  background: rgba(99, 102, 241, 0.05);
}
.category-select option { background: #0a0a19; color: white; }

.score-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.score-input {
  flex: 1;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  outline: none;
  transition: all 0.2s;
  text-align: center;
}

.score-input:focus {
  border-color: #818cf8;
  background: rgba(99, 102, 241, 0.05);
}

.range-sep {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  min-width: 20px;
  text-align: center;
}

.slider-container {
  position: relative;
  height: 20px;
  margin-bottom: 4px;
}

.range-slider {
  position: absolute;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(129, 140, 248, 0.2);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
}

.range-slider:nth-child(1) { z-index: 5; }
.range-slider:nth-child(2) { z-index: 6; }

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #818cf8;
  cursor: pointer;
  border: 2px solid rgba(129, 140, 248, 0.5);
  transition: all 0.2s;
}

.range-slider::-webkit-slider-thumb:hover {
  background: #4f46e5;
  border-color: #4f46e5;
  transform: scale(1.2);
}

.range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #818cf8;
  cursor: pointer;
  border: 2px solid rgba(129, 140, 248, 0.5);
  transition: all 0.2s;
}

.reset-btn {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
}

.reset-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #818cf8;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.article-count {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.article-count svg { color: #818cf8; }

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-number {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  min-width: 30px;
  text-align: center;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 6px 10px;
  border-radius: 6px;
}

.nav-btn {
  padding: 8px 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(99, 102, 241, 0.2);
  border-color: #818cf8;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.articles-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 6px;
}

.articles-container::-webkit-scrollbar { width: 4px; }
.articles-container::-webkit-scrollbar-track { background: transparent; }
.articles-container::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 2px;
}
.articles-container::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  padding-bottom: 8px;
}

.article-card {
  background: rgba(39, 39, 71, 0.725);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 0;
}

.article-card:hover {
  background: rgba(15, 15, 30, 0.7);
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.1);
}

.article-card.is-read { opacity: 0.7; }
.article-card.is-read:hover { opacity: 1; }

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #818cf8, #a5b4fc, transparent);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
  min-width: 0;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.category-badge {
  background: rgba(99, 102, 241, 0.1);
  color: #a5b4fc;
  font-size: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  font-weight: 600;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
  flex-shrink: 0;
}

.date { color: rgba(255, 255, 255, 0.5); }
.read-badge { color: #818cf8; font-weight: 600; }

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-summary {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 14px;
  margin-top: auto;
  gap: 12px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  flex: 1;
  min-width: 0;
}

.author {
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.score-badge {
  color: #fbbf24;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.read-link:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  text-align: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.telescope-icon {
  width: 100px;
  height: 100px;
  opacity: 0.3;
}

.empty-state p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.reset-btn-outline {
  background: transparent;
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn-outline:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #ffffff;
  border-color: #818cf8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(129, 140, 248, 0.2);
  border-top-color: #818cf8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

@media (max-width: 1200px) {
  .veille-wrapper { height: auto; overflow: auto; }
  .main-grid { grid-template-columns: 1fr; gap: 32px; overflow: visible; }
  .sidebar { max-height: none; }
  .content-area { height: auto; overflow: visible; }
  .articles-container { overflow: visible; }
  .articles-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .veille-wrapper { padding: 24px 16px; }
  .page-title { font-size: 36px; }
  .content-header { flex-direction: column; gap: 16px; align-items: flex-start; }
  .pagination-controls { width: 100%; justify-content: flex-start; }
  .articles-grid { gap: 16px; }
}
</style>