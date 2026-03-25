<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 scale-[0.97]"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-[0.97]"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[4px]"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="w-full max-w-[480px] overflow-hidden rounded-[14px] border border-white/10 bg-[#161b22] shadow-[0_24px_48px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh]">

        <!-- Header — fixe -->
        <div class="flex items-center justify-between border-b border-white/5 px-5 py-3 shrink-0">
          <div>
            <p class="text-[13px] font-semibold leading-none text-white">{{ title }}</p>
            <p v-if="subtitle" class="mt-0.5 text-[11px] text-gray-500">{{ subtitle }}</p>
          </div>
          <button
            class="flex h-[24px] w-[24px] items-center justify-center rounded-md border border-white/10 bg-white/5 text-[15px] text-gray-400 transition-all hover:text-gray-200"
            @click="$emit('update:modelValue', false)"
          >
            ×
          </button>
        </div>

        <!-- Champs — scrollable -->
        <div class="overflow-y-auto px-5 py-4 flex-1">
          <div class="grid grid-cols-2 gap-x-3 gap-y-3">
            <div
              v-for="field in fields"
              :key="field.key"
              class="flex flex-col gap-1"
              :class="field.type === 'textarea' || field.col === 'full' ? 'col-span-2' : 'col-span-1'"
            >
              <label class="text-[10px] uppercase tracking-wider text-gray-500">
                {{ field.label }}<span v-if="field.required" class="text-[#6366f1] ml-0.5">*</span>
              </label>
              <div
                class="flex items-center gap-2 rounded-md border bg-[#0d1117] px-2.5 transition-colors focus-within:border-indigo-500/50"
                :class="errors?.[field.key] ? 'border-red-500/50' : 'border-white/10'"
              >
                <component
                  :is="'svg'"
                  v-if="field.icon"
                  v-html="field.icon"
                  width="12"
                  height="12"
                  class="shrink-0 text-gray-600"
                />
                <textarea
                  v-if="field.type === 'textarea'"
                  v-model="internalForm[field.key]"
                  :placeholder="field.placeholder"
                  :rows="field.rows ?? 2"
                  class="w-full bg-transparent py-2 text-[12px] leading-relaxed text-gray-200 outline-none placeholder:text-gray-600 resize-none"
                />
                <input
                  v-else
                  v-model="internalForm[field.key]"
                  :type="field.type ?? 'text'"
                  :placeholder="field.placeholder"
                  class="w-full bg-transparent py-2 text-[12px] text-gray-200 outline-none placeholder:text-gray-600"
                />
              </div>
              <span v-if="errors?.[field.key]" class="text-[10px] text-[#f87171]">
                {{ errors[field.key][0] }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer — fixe -->
        <div class="flex items-center justify-end gap-2 border-t border-white/5 bg-black/10 px-5 py-3 shrink-0">
          <button
            class="rounded-md border border-white/10 px-3 py-1.5 text-[12px] text-gray-400 transition-all hover:bg-white/5 hover:text-gray-200"
            @click="$emit('update:modelValue', false)"
          >
            Annuler
          </button>
          <button
            class="rounded-md border border-white/10 bg-indigo-600 px-3 py-1.5 text-[12px] text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
            @click="$emit('submit', internalForm)"
          >
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
  initialData?: Record<string, any> | null
  fields: {
    key: string
    label: string
    type?: 'text' | 'textarea' | 'url' | 'email' | 'number'
    placeholder?: string
    required?: boolean
    icon?: string
    rows?: number
    col?: 'full' | 'half' 
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
    props.fields.forEach(f => {
      internalForm[f.key] = props.initialData?.[f.key] ?? ''
    })
  }
})
</script>