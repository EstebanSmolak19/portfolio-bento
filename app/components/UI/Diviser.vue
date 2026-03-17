<template>
  <div class="divider" :class="`divider--${type}`">
    <span v-if="$slots.default" class="divider-label">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
type Props = {
  type?: 'solid' | 'dotted' | 'dashed' | 'glow'
}

withDefaults(defineProps<Props>(), {
  type: 'solid'
})
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.divider--solid {
  background: var(--border-surface);
}

.divider--dotted {
  background: none;
  border-top: 1px dotted var(--border-surface);
}

.divider--dashed {
  background: none;
  border-top: 1px dashed var(--border-surface);
}

.divider--glow {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(99, 102, 241, 0.5) 30%,
    rgba(139, 92, 246, 0.6) 50%,
    rgba(99, 102, 241, 0.5) 70%,
    transparent 100%
  );
  height: 1px;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
}

.divider-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  font-size: 11px;
  color: var(--text-faint);
  background: var(--bg-modal);
  white-space: nowrap;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>