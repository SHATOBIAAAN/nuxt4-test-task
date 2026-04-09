<template>
  <div class="flex flex-col rounded-[24px] bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/80 group">
    <div class="relative w-full aspect-square bg-zinc-800 overflow-hidden rounded-t-[24px]">
      <img
        :src="product.PREVIEW_PICTURE"
        :alt="product.NAME"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
    </div>

    <div class="flex flex-col flex-1 p-6">
      <h3 class="text-base font-semibold text-zinc-100 line-clamp-2 leading-snug mb-6" :title="product.NAME">
        {{ product.NAME }}
      </h3>

      <div class="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
        <span class="text-xl font-bold font-headline text-white tracking-tight">{{ formatPrice(product.PRICE) }}</span>

        <button
          @click="$emit('order', product)"
          class="w-10 h-10 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg shadow-white/10"
          aria-label="Оформить заказ"
        >
          <Icon name="lucide:arrow-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()

defineEmits<{ (e: 'order', product: Product): void }>()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
</script>
