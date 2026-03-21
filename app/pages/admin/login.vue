<template>
  <div class="min-h-dvh flex items-center justify-center bg-[#0f1117] font-sans antialiased">
    <div class="w-[360px] bg-[rgba(17,24,39,0.8)] border border-[rgba(99,102,241,0.18)] rounded-[14px] overflow-hidden backdrop-blur-[16px] shadow-[0_0_0_1px_rgba(99,102,241,0.05),0_24px_48px_rgba(0,0,0,0.4)]">

      <!-- Header -->
      <div class="flex items-center gap-[13px] px-[22px] pt-[22px] pb-[20px] border-b border-[rgba(99,102,241,0.1)]">
        <div class="w-9 h-9 shrink-0 bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] rounded-[9px] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2.5" y="7.5" width="11" height="8" rx="2" stroke="#818cf8" stroke-width="1.4"/>
            <path d="M5 7.5V5a3 3 0 0 1 6 0v2.5" stroke="#818cf8" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h1 class="text-[14px] font-semibold text-[#e2e8f0] mb-[2px]">Accès restreint</h1>
          <p class="text-[11px] text-[#475569]">Back-office · Estéban Smolak</p>
        </div>
      </div>

      <!-- Form -->
      <form class="px-[22px] pt-[20px] pb-[22px] flex flex-col gap-[14px]" @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="flex flex-col gap-[6px]">
          <label class="text-[11px] font-medium text-[#64748b]">Adresse e-mail</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            autocomplete="email"
            class="w-full px-[11px] py-[8px] bg-[rgba(15,17,23,0.8)] border border-[rgba(99,102,241,0.15)] rounded-[8px] text-[#e2e8f0] text-[13px] outline-none placeholder:text-[#334155] focus:border-[rgba(99,102,241,0.45)] transition-colors"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-[6px]">
          <label class="text-[11px] font-medium text-[#64748b]">Mot de passe</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="show ? 'text' : 'password'"
              placeholder="••••••••••••"
              autocomplete="current-password"
              class="w-full pl-[11px] pr-[36px] py-[8px] bg-[rgba(15,17,23,0.8)] border border-[rgba(99,102,241,0.15)] rounded-[8px] text-[#e2e8f0] text-[13px] outline-none placeholder:text-[#334155] focus:border-[rgba(99,102,241,0.45)] transition-colors"
            />
            <button type="button" class="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94a3b8] transition-colors flex items-center p-[2px]" @click="show = !show" tabindex="-1">
              <svg v-if="!show" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5S3 2.5 6.5 2.5 12 6.5 12 6.5s-2 4-5.5 4S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="6.5" cy="6.5" r="1.6" stroke="currentColor" stroke-width="1.2"/></svg>
              <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5S3 2.5 6.5 2.5 12 6.5 12 6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 11 11 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-[11px] text-red-400">{{ error }}</p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="flex items-center justify-center gap-[7px] py-[9px] rounded-[8px] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.25)] text-[#a5b4fc] text-[13px] font-semibold cursor-pointer hover:bg-[rgba(99,102,241,0.25)] hover:border-[rgba(99,102,241,0.45)] hover:text-[#c7d2fe] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const form = reactive({ email: '', password: '' })
const show = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: form })
    window.location.href = '/admin'
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}
</script>