<template>
  <div class="bg-[var(--bg-surface)] border border-[var(--border-surface)] rounded-xl overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-2.5 text-left text-[10px] uppercase tracking-wide text-[var(--text-faint)] w-auto"
          >
            {{ col.label }}
          </th>
          <th class="px-4 py-2.5 text-right text-[10px] uppercase tracking-wide text-[var(--text-faint)] w-px whitespace-nowrap">
            Actions
          </th>
        </tr>
      </thead>

      <tbody v-if="rows.length > 0">
        <tr v-for="row in rows" :key="row.id" class="border-t border-[var(--border-surface)]">
          <td v-for="col in columns" :key="col.key" class="px-4 py-3">

            <!-- type: main -->
            <div v-if="col.type === 'main'" class="flex items-start gap-2.5">
              <div>
                <div class="text-[13px] text-[var(--text-secondary)]">{{ row[col.key] }}</div>
                <div v-if="col.subKey" class="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {{ row[col.subKey] }}
                </div>
              </div>
            </div>

            <!-- type: toggle -->
            <button
              v-else-if="col.type === 'toggle'"
              class="w-9 h-5 rounded-full relative transition-colors duration-200 border-none cursor-pointer p-0 shrink-0"
              :class="row[col.key] ? 'bg-indigo-500/50' : 'bg-[var(--border-muted)]'"
              @click="$emit('toggle', row, col.key)"
            >
              <span
                class="absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full transition-all duration-200"
                :class="row[col.key] ? 'translate-x-4 bg-indigo-300' : 'bg-[var(--text-faint)]'"
              />
            </button>

            <!-- type: badge -->
            <span
              v-else-if="col.type === 'badge' && row[col.key]"
              class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-tag)] text-[var(--text-muted)]"
            >
              {{ row[col.key] }}
            </span>

            <!-- type: color -->
            <div
              v-else-if="col.type === 'color' && row[col.key]"
              class="flex items-center gap-2"
            >
              <span
                class="w-3 h-3 rounded-full shrink-0"
                :style="{ background: row[col.key] }"
              />
            </div>

            <!-- default -->
            <span v-else class="text-[13px] text-[var(--text-secondary)]">
              {{ row[col.key] ?? '—' }}
            </span>

          </td>

          <!-- Actions -->
          <td class="px-4 py-3 w-px whitespace-nowrap">
            <div class="flex gap-1.5 justify-end">
              <button
                v-if="editable"
                class="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md cursor-pointer border border-[var(--border-surface)] bg-[var(--bg-tag)] text-[var(--text-muted)] transition-all duration-150 hover:text-[var(--text-accent)] hover:border-[var(--border-btn)] hover:bg-[var(--bg-btn-primary)]"
                @click="$emit('edit', row)"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M8.5 1.5a1.414 1.414 0 0 1 2 2L3.5 10.5l-3 .5.5-3 7.5-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Edit
              </button>

              <button
                v-if="deletable"
                class="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md cursor-pointer border border-[var(--border-surface)] bg-[var(--bg-tag)] text-[var(--text-muted)] transition-all duration-150 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10"
                @click="$emit('delete', row)"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 3h9M4 3V2h4v1M5 5.5v3M7 5.5v3M2.5 3l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Supprimer
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td
            :colspan="columns.length + 1"
            class="text-center py-16 text-[13px] text-[var(--text-muted)]"
          >
            {{ loading ? 'Chargement...' : emptyText ?? 'Aucune donnée' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="px-4 py-2.5 text-[11px] text-[var(--text-faint)] border-t border-[var(--border-surface)]">
      {{ rows.length }} résultat(s)
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: {
    key: string
    label: string
    type?: 'main' | 'toggle' | 'badge' | 'color' | 'text'
    subKey?: string
  }[]
  rows: Record<string, any>[]
  loading?: boolean
  emptyText?: string
  editable?: boolean
  deletable?: boolean
}>()

defineEmits<{
  edit: [row: Record<string, any>]
  delete: [row: Record<string, any>]
  toggle: [row: Record<string, any>, key: string]
}>()
</script>