<script setup lang="ts">
import { CARD_COLORS, type CardAccent } from '../../contants/colors'

type Props = {
  label?: string,
  accent?: CardAccent,
  picture?: boolean,
  neon?: boolean,
  backgroundColor?: string,
}

const props = withDefaults(defineProps<Props>(), {
  accent: 'blue',
  neon: false,
  backgroundColor: '',
});

const cardStyles = computed(() => {
  const color = CARD_COLORS[props.accent];
  return {
    base: {
      borderColor: color.border,
      boxShadow: props.neon ? `0 0 15px -5px ${color.shadowNeon}` : 'none',
      backgroundColor: props.backgroundColor || 'rgba(17, 24, 39, 0.3)'
    },
    hover: {
      boxShadow: `0 0 15px -3px ${color.shadow}`,
      borderColor: color.borderHover
    },
    header: {
      background: color.headerGradient,
      borderBottomColor: color.borderBottom
    }
  };
});
</script>

<template>
  <div
    class="rounded-xl w-full h-full flex flex-col backdrop-blur-md border transition-all duration-300"
    :style="cardStyles.base"
    :class="{ 'card-neon': props.neon }"
  >
    <template v-if="label">
      <div
        class="px-4 py-2.5 border-b text-sm font-medium text-gray-100 text-center"
        :style="cardStyles.header"
      >
        {{ label }}
      </div>
    </template>

    <div
      class="flex-1 flex items-center justify-center p-2 text-gray-200"
      :class="{ 'overflow-hidden relative !p-0': picture }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-neon:hover {
  box-shadow: v-bind('cardStyles.hover.boxShadow');
  border-color: v-bind('cardStyles.hover.borderColor');
}
</style>