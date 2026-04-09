<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6">
        <Transition
          enter-active-class="transition duration-200 ease-out delay-75"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            ref="modalRef"
            class="relative w-full max-w-md bg-zinc-950 rounded-[28px] shadow-2xl overflow-hidden border border-zinc-800"
          >
            <div class="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50">
              <h3 class="text-xl font-bold font-headline text-white">Оформление заказа</h3>
              <button
                @click="onClose"
                class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-6">
              <OrderForm :product="product" @success="onClose" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Product } from '../types'
import OrderForm from './OrderForm.vue'

const props = defineProps<{ isOpen: boolean; product: Product | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const modalRef = ref(null)

onClickOutside(modalRef, () => {
  if (props.isOpen) emit('close')
})

const onClose = () => emit('close')
</script>
