<script setup lang="ts">
import { useTheme } from '~/hooks/useTheme'

type Props = {
  label?: string
  accent?: 'blue' | 'purple' | 'cyan' | 'amber' | 'rose' | 'violet'
  picture?: boolean
  neon?: boolean
  backgroundColor?: string,
  tilt?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'violet',
  neon: false,
  backgroundColor: '',
  tilt: false
})

const { theme } = useTheme()

const accentMap: Record<string, { color: string; glow: string; header: string; border: string }> = {
  violet: {
    color: '139, 92, 246',
    glow: 'rgba(139, 92, 246, 0.5)',
    header: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(109,40,217,0.08))',
    border: 'rgba(139, 92, 246, 0.25)',
  },
  blue: {
    color: '99, 102, 241',
    glow: 'rgba(99, 102, 241, 0.5)',
    header: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(79,70,229,0.08))',
    border: 'rgba(99, 102, 241, 0.25)',
  },
  purple: {
    color: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.5)',
    header: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(126,34,206,0.08))',
    border: 'rgba(168, 85, 247, 0.25)',
  },
  cyan: {
    color: '6, 182, 212',
    glow: 'rgba(6, 182, 212, 0.5)',
    header: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(8,145,178,0.08))',
    border: 'rgba(6, 182, 212, 0.25)',
  },
  amber: {
    color: '245, 158, 11',
    glow: 'rgba(245, 158, 11, 0.5)',
    header: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(217,119,6,0.08))',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  rose: {
    color: '244, 63, 94',
    glow: 'rgba(244, 63, 94, 0.5)',
    header: 'linear-gradient(135deg, rgba(244,63,94,0.18), rgba(190,18,60,0.08))',
    border: 'rgba(244, 63, 94, 0.25)',
  },
}

const a = computed(() => accentMap[props.accent] ?? accentMap.violet)

const cardBg = computed(() => {
  if (props.backgroundColor) return props.backgroundColor
  return theme.value === 'dark'
    ? 'rgba(255,255,255,0.04)'
    : 'rgba(255,253,248,0.82)'
})

const borderColor = computed(() => a.value.border)
const glowColor   = computed(() => a.value.glow)
const headerBg    = computed(() => a.value.header)
const spotColor   = computed(() => `rgba(${a.value.color}, 0.09)`)

const cardRef = ref<HTMLElement | null>(null)

function onMouseMove(e: MouseEvent) {
  const el = cardRef.value
  if (!el) return
  const r  = el.getBoundingClientRect()
  const x  = e.clientX - r.left
  const y  = e.clientY - r.top

  if(props.tilt) {
    const cx = r.width  / 2
    const cy = r.height / 2
    const rotX = ((y - cy) / cy) * -6
    const rotY = ((x - cx) / cx) *  6
    el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`
    el.style.setProperty('--mx', `${((x / r.width)  * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((y / r.height) * 100).toFixed(1)}%`)
  }
}

function onMouseLeave() {
  const el = cardRef.value
  if (!el) return
  if(props.tilt) {
    el.style.transform = ''
  }
}
</script>

<template>
  <div
    ref="cardRef"
    class="card-root rounded-2xl w-full h-full flex flex-col border backdrop-blur-xl relative overflow-hidden"
    :class="{ 'card-neon': neon, 'card-picture-root': picture }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="card-shine" />
    <div class="card-spotlight" />

    <template v-if="label">
      <div
        class="card-header px-4 py-2.5 border-b text-sm font-medium text-center"
        style="color: var(--text-primary)"
      >
        {{ label }}
      </div>
    </template>

    <div
      class="flex-1 flex items-center justify-center p-2 z-10"
      :style="{ color: 'var(--text-primary)' }"
      :class="{ 'overflow-hidden relative !p-0': picture }"
    >
      <div
        v-if="picture && theme === 'light'"
        class="absolute inset-0 z-10 rounded-2xl pointer-events-none"
        style="background: rgba(250,248,244,0.25); backdrop-filter: saturate(0.8) brightness(1.05);"
      />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-root {
  background: v-bind(cardBg);
  border-color: v-bind(borderColor);
  box-shadow: 0 0 0 1px v-bind(borderColor), 0 4px 24px rgba(0,0,0,0.12);
  transition: box-shadow 0.35s ease, border-color 0.35s ease;
  will-change: transform;
}

.card-neon {
  box-shadow:
    0 0 20px -8px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 4px 24px rgba(0,0,0,0.15);
}

.card-root:hover {
  box-shadow:
    0 0 30px -6px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 12px 40px rgba(0,0,0,0.22);
}

.card-header {
  background: v-bind(headerBg);
  border-bottom-color: v-bind(borderColor);
}

/* shine statique coin haut-gauche */
.card-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* spotlight dynamique qui suit la souris */
.card-spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    200px circle at var(--mx, 50%) var(--my, 50%),
    v-bind(spotColor) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.card-root:hover .card-spotlight {
  opacity: 1;
}
</style>