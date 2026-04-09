<template>
  <button
    :class="computedClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <Icon v-if="loading" name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  class?: string
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  class: ''
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const computedClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none rounded-xl'
  
  const variants = {
    primary: 'bg-zinc-50 text-zinc-950 hover:bg-zinc-200 shadow-sm font-semibold',
    secondary: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700',
    outline: 'border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-100',
    ghost: 'hover:bg-zinc-800 hover:text-zinc-50 text-zinc-300'
  }
  
  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base'
  }
  
  return [base, variants[props.variant], sizes[props.size], props.class].filter(Boolean).join(' ')
})
</script>
