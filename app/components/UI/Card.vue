<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from '~/hooks/useTheme'

type Props = {
  label?: string
  accent?: 'blue' | 'purple' | 'cyan' | 'amber' | 'rose' | 'violet'
  picture?: boolean
  neon?: boolean
  backgroundColor?: string
  tilt?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'violet',
  neon: false,
  backgroundColor: '',
  tilt: false
})

const { theme } = useTheme()

const accentMapDark: Record<string, { color: string; glow: string; header: string; border: string }> = {
  violet: { color: '139, 92, 246',  glow: 'rgba(139, 92, 246, 0.5)',  header: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(109,40,217,0.08))',  border: 'rgba(139, 92, 246, 0.25)'  },
  blue:   { color: '99, 102, 241',  glow: 'rgba(99, 102, 241, 0.5)',  header: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(79,70,229,0.08))',   border: 'rgba(99, 102, 241, 0.25)'  },
  purple: { color: '168, 85, 247',  glow: 'rgba(168, 85, 247, 0.5)',  header: 'linear-gradient(135deg, rgba(168,85,247,0.18), rgba(126,34,206,0.08))',  border: 'rgba(168, 85, 247, 0.25)'  },
  cyan:   { color: '6, 182, 212',   glow: 'rgba(6, 182, 212, 0.5)',   header: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(8,145,178,0.08))',    border: 'rgba(6, 182, 212, 0.25)'   },
  amber:  { color: '245, 158, 11',  glow: 'rgba(245, 158, 11, 0.5)',  header: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(217,119,6,0.08))',   border: 'rgba(245, 158, 11, 0.25)'  },
  rose:   { color: '244, 63, 94',   glow: 'rgba(244, 63, 94, 0.5)',   header: 'linear-gradient(135deg, rgba(244,63,94,0.18), rgba(190,18,60,0.08))',    border: 'rgba(244, 63, 94, 0.25)'   },
}

const accentMapLight: Record<string, { color: string; glow: string; header: string; border: string; bg: string }> = {
  violet: { color: '251, 146, 60',  glow: 'rgba(251, 146, 60, 0.7)',  header: 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(234,88,12,0.12))',  border: 'rgba(251, 146, 60, 0.45)',  bg: 'linear-gradient(145deg, rgba(40,18,4,0.92) 0%, rgba(25,10,2,0.96) 100%)' },
  blue:   { color: '251, 191, 36',  glow: 'rgba(251, 191, 36, 0.7)',  header: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(217,119,6,0.12))',  border: 'rgba(251, 191, 36, 0.45)',  bg: 'linear-gradient(145deg, rgba(38,24,2,0.92) 0%, rgba(22,14,1,0.96) 100%)' },
  purple: { color: '245, 158, 11',  glow: 'rgba(245, 158, 11, 0.7)',  header: 'linear-gradient(135deg, rgba(245,158,11,0.28), rgba(180,83,0,0.14))',   border: 'rgba(245, 158, 11, 0.45)',  bg: 'linear-gradient(145deg, rgba(36,16,2,0.94) 0%, rgba(20,9,1,0.97) 100%)' },
  cyan:   { color: '251, 191, 36',  glow: 'rgba(251, 191, 36, 0.7)',  header: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(217,119,6,0.12))',  border: 'rgba(251, 191, 36, 0.45)',  bg: 'linear-gradient(145deg, rgba(38,24,2,0.92) 0%, rgba(22,14,1,0.96) 100%)' },
  amber:  { color: '245, 158, 11',  glow: 'rgba(245, 158, 11, 0.7)',  header: 'linear-gradient(135deg, rgba(245,158,11,0.28), rgba(180,83,0,0.14))',   border: 'rgba(245, 158, 11, 0.45)',  bg: 'linear-gradient(145deg, rgba(36,16,2,0.94) 0%, rgba(20,9,1,0.97) 100%)' },
  rose:   { color: '239, 68, 68',   glow: 'rgba(239, 68, 68, 0.7)',   header: 'linear-gradient(135deg, rgba(239,68,68,0.22), rgba(185,28,28,0.10))',   border: 'rgba(239, 68, 68, 0.45)',   bg: 'linear-gradient(145deg, rgba(40,8,8,0.94) 0%, rgba(22,4,4,0.97) 100%)' },
}

const a = computed(() => {
  if (theme.value === 'light') return accentMapLight[props.accent] ?? accentMapLight.violet
  return accentMapDark[props.accent] ?? accentMapDark.violet
})

const cardBg = computed(() => {
  if (props.backgroundColor) return props.backgroundColor
  if (theme.value === 'light') return (accentMapLight[props.accent] ?? accentMapLight.violet).bg
  return 'rgba(255,255,255,0.03)'
})

const borderColor = computed(() => a.value?.border)
const glowColor   = computed(() => a.value?.glow)
const headerBg    = computed(() => a.value?.header)
const spotColor   = computed(() => `rgba(${a.value?.color}, 0.12)`)

const cardRef = ref<HTMLElement | null>(null)

function onMouseMove(e: MouseEvent) {
  const el = cardRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  if (props.tilt) {
    const cx = r.width  / 2
    const cy = r.height / 2
    const rotX = ((y - cy) / cy) * -6
    const rotY = ((x - cx) / cx) * 6
    el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`
    el.style.setProperty('--mx', `${((x / r.width)  * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((y / r.height) * 100).toFixed(1)}%`)
  }
}

function onMouseLeave() {
  const el = cardRef.value
  if (!el) return
  if (props.tilt) el.style.transform = ''
}
</script>

<template>
  <div
    ref="cardRef"
    class="card-root rounded-2xl w-full h-full flex flex-col border backdrop-blur-xl relative overflow-hidden"
    :class="{ 'card-neon': neon, 'card-picture-root': picture, 'card-solar': theme === 'light' }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="card-shine" />
    <div v-if="theme === 'light'" class="card-ember" />
    <div v-if="theme === 'light'" class="card-heat-wave" />
    <div class="card-spotlight" />

    <template v-if="label">
      <div class="card-header px-4 py-2.5 border-b text-sm font-medium text-center">
        {{ label }}
      </div>
    </template>

    <div
      class="flex-1 flex items-center justify-center p-2 z-10 min--0"
      :class="{ 'overflow-hidden relative !p-0': picture }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-root {
  background: v-bind(cardBg);
  border-color: v-bind(borderColor);
  box-shadow: 0 0 0 1px v-bind(borderColor), 0 4px 24px rgba(0,0,0,0.18);
  transition: box-shadow 0.35s ease, border-color 1.2s ease, background 1.2s ease;
  will-change: transform;
  color: var(--text-primary);
}

.card-solar {
  box-shadow:
    0 0 0 1px v-bind(borderColor),
    0 4px 32px rgba(0,0,0,0.55),
    inset 0 1px 0 rgba(255,200,80,0.08);
}

.card-neon {
  box-shadow:
    0 0 22px -8px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 4px 24px rgba(0,0,0,0.15);
}

.card-solar.card-neon {
  box-shadow:
    0 0 28px -6px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 6px 40px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,200,80,0.10);
}

.card-root:hover {
  box-shadow:
    0 0 32px -6px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 12px 40px rgba(0,0,0,0.22);
}

.card-solar:hover {
  box-shadow:
    0 0 40px -4px v-bind(glowColor),
    0 0 0 1px v-bind(borderColor),
    0 16px 50px rgba(0,0,0,0.55),
    inset 0 1px 0 rgba(255,200,80,0.14);
}

.card-header {
  background: v-bind(headerBg);
  border-bottom-color: v-bind(borderColor);
  color: var(--text-primary);
  transition: color 1.2s ease, background 1.2s ease, border-color 1.2s ease;
}

.card-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.card-solar .card-shine {
  background: linear-gradient(135deg,
    rgba(255,200,80,0.08) 0%,
    rgba(255,140,30,0.04) 30%,
    transparent 60%
  );
}

.card-ember {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 0% 50%, rgba(234,88,12,0.04) 0%, transparent 70%),
    radial-gradient(ellipse 35% 35% at 100% 100%, rgba(220,50,10,0.03) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
  animation: emberPulse 6s ease-in-out infinite alternate;
}

@keyframes emberPulse {
  0%   { opacity: 0.6; }
  100% { opacity: 1.0; }
}

.card-heat-wave {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 28px,
    rgba(245,158,11,0.018) 28px,
    rgba(245,158,11,0.018) 29px
  );
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
}

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