<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-medium text-zinc-300">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="computedClasses"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
      />
    </div>
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  readonly?: boolean
  disabled?: boolean
}>(), {
  type: 'text',
  modelValue: '',
  readonly: false,
  disabled: false,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const id = useId()

const computedClasses = computed(() => {
  const base = 'flex w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-zinc-50 transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
  const stateClass = props.error 
    ? 'border-red-500 focus-visible:ring-red-500' 
    : 'border-zinc-800 focus-visible:ring-zinc-400'
  const disabledClass = (props.readonly || props.disabled) 
    ? 'bg-zinc-900 text-zinc-500 cursor-not-allowed' 
    : ''
    
  return [base, stateClass, disabledClass].filter(Boolean).join(' ')
})
</script>
