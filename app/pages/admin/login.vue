<template>
  <div class="root">
    <div class="card">
      <div class="card-top">
        <div class="icon-wrap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2.5" y="7.5" width="11" height="8" rx="2" stroke="#818cf8" stroke-width="1.4"/>
            <path d="M5 7.5V5a3 3 0 0 1 6 0v2.5" stroke="#818cf8" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h1>Accès restreint</h1>
          <p>Back-office · Estéban Smolak</p>
        </div>
      </div>

      <form class="form" @submit.prevent>
        <div class="field">
          <label>Mot de passe</label>
          <div class="input-wrap">
            <input
              :type="show ? 'text' : 'password'"
              v-model="password"
              placeholder="••••••••••••"
              autocomplete="current-password"
            />
            <button type="button" class="eye" @click="show = !show" tabindex="-1">
              <svg v-if="!show" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5S3 2.5 6.5 2.5 12 6.5 12 6.5s-2 4-5.5 4S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.2"/><circle cx="6.5" cy="6.5" r="1.6" stroke="currentColor" stroke-width="1.2"/></svg>
              <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5S3 2.5 6.5 2.5 12 6.5 12 6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M2 11 11 2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
        <button type="submit" class="btn">
          Se connecter
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const password = ref('')
const show = ref(false)
</script>

<style scoped>
.root {
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  background: #0f1117;
  font-family: 'DM Sans', ui-sans-serif, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.card {
  width: 360px;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.18);
  border-radius: 14px;
  overflow: hidden;
  backdrop-filter: blur(16px);
  box-shadow: 0 0 0 1px rgba(99,102,241,0.05), 0 24px 48px rgba(0,0,0,0.4);
}

.card-top {
  display: flex; align-items: center; gap: 13px;
  padding: 22px 22px 20px;
  border-bottom: 1px solid rgba(99,102,241,0.1);
}
.icon-wrap {
  width: 36px; height: 36px; flex-shrink: 0;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
}
h1 { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 2px; }
p  { font-size: 11px; color: #475569; }

.form { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 11px; font-weight: 500; color: #64748b; }
.input-wrap { position: relative; }
.input-wrap input {
  width: 100%; padding: 8px 36px 8px 11px;
  background: rgba(15,17,23,0.8);
  border: 1px solid rgba(99,102,241,0.15);
  border-radius: 8px; color: #e2e8f0;
  font-size: 13px; font-family: inherit; outline: none;
  transition: border-color 0.15s;
}
.input-wrap input:focus { border-color: rgba(99,102,241,0.45); }
.input-wrap input::placeholder { color: #334155; }
.eye {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: #475569; display: flex; align-items: center; padding: 2px;
  transition: color 0.15s;
}
.eye:hover { color: #94a3b8; }
.btn {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 9px; border-radius: 8px; border: none; cursor: pointer;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.25);
  color: #a5b4fc; font-size: 13px; font-weight: 600; font-family: inherit;
  transition: all 0.15s;
}
.btn:hover {
  background: rgba(99,102,241,0.25);
  border-color: rgba(99,102,241,0.45);
  color: #c7d2fe;
}
</style>