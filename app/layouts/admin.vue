<template>
  <div class="shell">
    <aside class="sidebar">

      <div class="brand">
        <div class="brand-avatar">ES</div>
        <div>
          <p class="brand-name">Admin</p>
          <p class="brand-sub">portfolio · 2026</p>
        </div>
      </div>

      <nav class="nav">
        <p class="nav-section">Navigation</p>

        <NuxtLink to="/admin" exact-active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="7.8" y="1" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="1" y="7.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
            <rect x="7.8" y="7.8" width="5.2" height="5.2" rx="1.2" stroke="currentColor" stroke-width="1.25"/>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink to="/admin/projects" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3.5" width="12" height="8.5" rx="1.5" stroke="currentColor" stroke-width="1.25"/>
            <path d="M1 6.5h12" stroke="currentColor" stroke-width="1.25"/>
            <path d="M4.5 1.5v2M9.5 1.5v2" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          </svg>
          Projets
          <span class="nav-badge">4</span>
        </NuxtLink>

        <NuxtLink to="/admin/veille" active-class="nav-active" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="3.5" cy="10.5" r="1.5" stroke="currentColor" stroke-width="1.25"/>
            <path d="M2 10.5C2 7.2 4.7 4.5 8 4.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" fill="none"/>
            <path d="M2 10.5C2 4 6.5 0.5 13 0.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" fill="none" opacity="0.35"/>
          </svg>
          Veille
          <span class="nav-badge">12</span>
        </NuxtLink>

        <p class="nav-section" style="margin-top:1.25rem">Général</p>

        <a href="/" target="_blank" class="nav-item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 2H2.5a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1V9M8.5 1.5H12.5m0 0v4m0-4L6 8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Voir le site
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="user">
          <div class="brand-avatar" style="width:26px;height:26px;font-size:8px">ES</div>
          <div class="user-info">
            <span class="user-name">Estéban Smolak</span>
            <span class="user-role">Administrateur</span>
          </div>
          <button class="logout" title="Déconnexion">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 2H11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8.5M4.5 9l-3-2.5 3-2.5M1.5 6.5H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </aside>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  background: #0f1117;
  color: #cbd5e1;
  font-family: 'DM Sans', 'Geist', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
}
</style>

<style scoped>
/* ── Shell ────────────────────────────────── */
.shell {
  display: flex;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background: #0f1117;
}

/* ── Sidebar ────────────────────────────────── */
.sidebar {
  width: 220px;
  min-width: 220px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: rgba(17, 24, 39, 0.95);
  border-right: 1px solid rgba(99, 102, 241, 0.12);
  backdrop-filter: blur(12px);
}

/* Brand */
.brand {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 16px 16px;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  flex-shrink: 0;
}
.brand-avatar {
  width: 30px; height: 30px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 800; color: #fff;
  letter-spacing: 0.04em; flex-shrink: 0;
}
.brand-name { font-size: 13px; font-weight: 600; color: #e2e8f0; line-height: 1; }
.brand-sub  { font-size: 10px; color: #475569; margin-top: 2px; letter-spacing: 0.04em; }

/* Nav */
.nav {
  flex: 1; display: flex; flex-direction: column; gap: 1px;
  padding: 12px 10px; overflow-y: auto;
}
.nav-section {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: #334155; padding: 0 6px; margin-bottom: 4px;
}
.nav-item {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 10px; border-radius: 7px;
  font-size: 13px; font-weight: 500; color: #64748b;
  text-decoration: none; transition: all 0.15s;
}
.nav-item:hover { background: rgba(99,102,241,0.08); color: #94a3b8; }
.nav-active {
  background: rgba(99,102,241,0.12) !important;
  color: #a5b4fc !important;
  font-weight: 600;
}
.nav-badge {
  margin-left: auto;
  font-size: 10px; font-weight: 600;
  color: #6366f1; background: rgba(99,102,241,0.12);
  padding: 1px 6px; border-radius: 4px;
}

/* Footer */
.sidebar-footer {
  padding: 10px 10px 16px;
  border-top: 1px solid rgba(99,102,241,0.1);
  flex-shrink: 0;
}
.user {
  display: flex; align-items: center; gap: 9px;
  padding: 6px 6px; border-radius: 7px;
}
.user-info { flex: 1; display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.user-name { font-size: 12px; font-weight: 500; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: 10px; color: #334155; }
.logout {
  background: none; border: none; cursor: pointer;
  color: #334155; padding: 4px; border-radius: 5px;
  display: flex; align-items: center; flex-shrink: 0;
  transition: all 0.15s;
}
.logout:hover { color: #f87171; background: rgba(248,113,113,0.08); }

/* ── Main ────────────────────────────────── */
.main {
  flex: 1; height: 100dvh; overflow-y: auto;
  background: #0f1117;
  scrollbar-width: thin;
  scrollbar-color: rgba(99,102,241,0.15) transparent;
}
.main::-webkit-scrollbar { width: 4px; }
.main::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.15); border-radius: 4px; }
</style>