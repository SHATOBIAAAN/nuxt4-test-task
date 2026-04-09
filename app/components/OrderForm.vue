<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
    <BaseInput v-model="productName" label="Выбранный товар" readonly />

    <BaseInput
      v-model="formState.customerName"
      label="Фамилия Имя Отчество"
      placeholder="Иванов Иван"
      :error="errors.customerName"
    />

    <div class="space-y-2">
      <label class="block text-sm font-medium text-zinc-300">Номер телефона</label>
      <input
        ref="phoneRef"
        type="tel"
        :value="formState.customerPhone"
        placeholder="+7 (___) ___-__-__"
        :class="[
          'flex w-full rounded-xl border px-4 py-3 text-sm text-zinc-50 bg-zinc-900/50 transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1',
          errors.customerPhone
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-zinc-800 focus-visible:ring-zinc-400'
        ]"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @keydown="onKeydown"
        @paste="onPaste"
      />
      <p v-if="errors.customerPhone" class="text-sm text-red-500">{{ errors.customerPhone }}</p>
    </div>

    <BaseButton type="submit" class="w-full mt-2" :loading="isSubmitting" size="lg">
      Оформить заказ
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '../types'
import { useOrderForm } from '../composables/useOrderForm'
import BaseInput from './ui/BaseInput.vue'
import BaseButton from './ui/BaseButton.vue'

const props = defineProps<{ product: Product | null }>()
const emit = defineEmits<{ (e: 'success'): void }>()

const productName = computed(() => props.product?.NAME || '')
const phoneRef = ref<HTMLInputElement | null>(null)

const { formState, errors, isSubmitting, submit } = useOrderForm(() => emit('success'))

const PREFIX = '+7 ('
const MIN_LENGTH = PREFIX.length

function getLocalDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits
}

function applyMask(localDigits: string): string {
  const d = localDigits.slice(0, 10)
  if (!d) return PREFIX
  let result = PREFIX + d.slice(0, Math.min(3, d.length))
  if (d.length > 3) result += `) ${d.slice(3, Math.min(6, d.length))}`
  if (d.length > 6) result += `-${d.slice(6, Math.min(8, d.length))}`
  if (d.length > 8) result += `-${d.slice(8, 10)}`
  return result
}

function setValueAndMoveCursor(formatted: string) {
  formState.customerPhone = formatted
  const input = phoneRef.value
  if (!input) return
  input.value = formatted
  requestAnimationFrame(() => {
    input.selectionStart = input.selectionEnd = formatted.length
  })
}

function onFocus() {
  if (!formState.customerPhone) {
    setValueAndMoveCursor(PREFIX)
  }
}

function onBlur() {
  const local = getLocalDigits(formState.customerPhone)
  if (local.length === 0) {
    formState.customerPhone = ''
    if (phoneRef.value) phoneRef.value.value = ''
  }
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  const local = getLocalDigits(input.value)
  setValueAndMoveCursor(applyMask(local))
}

function onKeydown(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const pos = input.selectionStart ?? 0
  const isSelection = input.selectionStart !== input.selectionEnd

  if (e.key === 'Backspace' && !isSelection) {
    e.preventDefault()
    if (pos <= MIN_LENGTH) return

    const val = input.value
    const charBefore = val[pos - 1]
    if (!charBefore) return

    const removeCount = /\d/.test(charBefore) ? 1 : 2
    const newRaw = val.slice(0, Math.max(MIN_LENGTH - 1, pos - removeCount)) + val.slice(pos)
    const local = getLocalDigits(newRaw)
    setValueAndMoveCursor(applyMask(local))
  }

  if (e.key === 'Home' || e.key === 'ArrowLeft') {
    if (pos <= MIN_LENGTH) {
      e.preventDefault()
      requestAnimationFrame(() => {
        input.selectionStart = input.selectionEnd = MIN_LENGTH
      })
    }
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') ?? ''
  const local = getLocalDigits(pasted)
  setValueAndMoveCursor(applyMask(local))
}

const handleSubmit = () => submit(props.product)
</script>
