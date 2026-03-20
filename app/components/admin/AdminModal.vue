<template>
  <Transition name="m">
    <div v-if="modelValue" class="overlay" @click.self="$emit('update:modelValue', false)">
      <div class="modal">
        <div class="modal-head">
          <div>
            <p class="modal-title">{{ title }}</p>
            <p v-if="subtitle" class="modal-sub">{{ subtitle }}</p>
          </div>
          <button class="mclose" @click="$emit('update:modelValue', false)">×</button>
        </div>

        <div class="modal-body">
          <div v-for="field in fields" :key="field.key" class="field">
            <label>{{ field.label }} <span v-if="field.required" class="req">*</span></label>
            <div class="input-icon-wrap" :class="{ 'input-err-wrap': errors?.[field.key] }">
              <component :is="'svg'" v-if="field.icon" v-html="field.icon" width="14" height="14" class="input-icon" />
              <textarea
                v-if="field.type === 'textarea'"
                v-model="internalForm[field.key]"
                :placeholder="field.placeholder"
                class="input-with-icon textarea"
                :rows="field.rows ?? 3"
              />
              <input
                v-else
                v-model="internalForm[field.key]"
                :type="field.type ?? 'text'"
                :placeholder="field.placeholder"
                class="input-with-icon"
              />
            </div>
            <span v-if="errors?.[field.key]" class="err">{{ errors[field.key][0] }}</span>
          </div>
        </div>

        <div class="modal-foot">
          <button class="btn-ghost" @click="$emit('update:modelValue', false)">Annuler</button>
          <button class="btn-primary" @click="$emit('submit', internalForm)" :disabled="loading">
            {{ loading ? loadingText : submitText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  subtitle?: string
  fields: {
    key: string
    label: string
    type?: 'text' | 'textarea' | 'url' | 'email' | 'number'
    placeholder?: string
    required?: boolean
    icon?: string
    rows?: number
  }[]
  errors?: Record<string, string[]>
  loading?: boolean
  submitText?: string
  loadingText?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'submit': [form: Record<string, any>]
}>()

const internalForm = reactive<Record<string, any>>(
  Object.fromEntries(props.fields.map(f => [f.key, '']))
)

watch(() => props.modelValue, (val) => {
  if (val) {
    props.fields.forEach(f => internalForm[f.key] = '')
  }
})
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal { background: var(--bg-modal); border: 0.5px solid var(--border-modal); border-radius: 14px; width: 100%; max-width: 480px; overflow: hidden; box-shadow: 0 24px 48px rgba(0,0,0,0.15); }
.modal-head { padding: 18px 24px 16px; border-bottom: 0.5px solid var(--border-surface); display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.modal-title { font-size: 14px; font-weight: 600; color: var(--text-primary); line-height: 1; }
.modal-sub { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
.mclose { width: 26px; height: 26px; background: var(--bg-tag); border: 0.5px solid var(--border-muted); border-radius: 6px; color: var(--text-muted); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
.mclose:hover { color: var(--text-secondary); }
.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.req { color: #6366f1; }
.input-icon-wrap { display: flex; align-items: center; gap: 10px; background: var(--bg-input); border: 0.5px solid var(--border-input); border-radius: 9px; padding: 0 12px; transition: border-color 0.15s; }
.input-icon-wrap:focus-within { border-color: rgba(99,102,241,0.5); }
.input-err-wrap { border-color: rgba(239,68,68,0.5) !important; }
.input-icon { color: var(--text-faint); flex-shrink: 0; }
.input-with-icon { flex: 1; background: transparent; border: none; outline: none; padding: 11px 0; font-size: 13px; color: var(--text-secondary); font-family: inherit; }
.input-with-icon::placeholder { color: var(--text-faint); }
.textarea { resize: vertical; padding: 11px 0; line-height: 1.5; }
.err { font-size: 11px; color: #f87171; }
.modal-foot { padding: 14px 24px; border-top: 0.5px solid var(--border-surface); background: var(--bg-github); display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
.btn-primary { background: var(--bg-btn-primary); color: var(--text-accent); border: 1px solid var(--border-btn); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: filter 0.15s; }
.btn-primary:hover { filter: brightness(1.15); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; filter: none; }
.btn-ghost { background: transparent; border: 0.5px solid var(--border-muted); color: var(--text-muted); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; }
.btn-ghost:hover { background: var(--bg-tag); color: var(--text-secondary); }
.m-enter-active, .m-leave-active { transition: opacity 0.2s, transform 0.2s; }
.m-enter-from, .m-leave-to { opacity: 0; transform: scale(0.97); }
</style>