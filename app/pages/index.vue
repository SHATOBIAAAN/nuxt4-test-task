<template>
  <div class="flex flex-col">
    <template v-if="pending">
      <section class="py-12 md:py-20">
        <div class="container mx-auto px-6">
          <div class="w-full rounded-2xl md:rounded-[32px] bg-zinc-900 border border-zinc-800 animate-pulse aspect-[16/9] md:aspect-[21/9] mb-12"></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="i in 8" :key="i" class="rounded-[24px] bg-zinc-900 border border-zinc-800 overflow-hidden animate-pulse">
              <div class="aspect-square bg-zinc-800/60"></div>
              <div class="p-6 space-y-3">
                <div class="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div class="h-4 bg-zinc-800 rounded w-1/2"></div>
                <div class="pt-4 border-t border-zinc-800/50 flex justify-between items-center">
                  <div class="h-6 bg-zinc-800 rounded w-24"></div>
                  <div class="w-10 h-10 rounded-full bg-zinc-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <div v-else-if="error" class="container mx-auto px-6 py-32 text-center">
      <h2 class="text-3xl font-bold font-headline mb-4 text-white">СИСТЕМНАЯ ОШИБКА</h2>
      <p class="text-zinc-400 font-body mb-6">{{ error.message }}</p>
      <BaseButton @click="() => refresh()">ПЕРЕЗАГРУЗИТЬ</BaseButton>
    </div>

    <template v-else>
      <section class="py-12 md:py-20">
        <div class="container mx-auto px-6">
          <div class="flex flex-col items-center text-center mb-12">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] tracking-tighter text-white mb-6">
              ОЩУТИ <br/>
              <span class="text-primary">ВСЮ МОЩЬ.</span>
            </h1>
            <p class="text-lg text-zinc-400 max-w-xl font-body leading-relaxed mb-8">
              Создано для элиты. Оцените аппаратное обеспечение с нулевой задержкой в корпусах аэрокосмического класса.
            </p>
            <BaseButton size="lg" class="px-10">
              ВЕСЬ КАТАЛОГ
            </BaseButton>
          </div>

          <div class="w-full relative px-0 sm:px-6 mt-8">
            <BannerSlider v-if="banners.length > 0" :banners="banners" />
          </div>
        </div>
      </section>

      <section v-if="products.length > 0" class="py-24">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div class="space-y-2">
              <span class="text-sm font-semibold tracking-wider text-primary font-headline uppercase">Категория // 01</span>
              <h2 class="text-4xl md:text-5xl font-headline font-bold text-white tracking-tight">ЛЕГЕНДАРНОЕ ОБОРУДОВАНИЕ</h2>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="py-12 text-center text-zinc-500 font-medium">
            По вашему запросу ничего не найдено
          </div>

          <ProductGrid v-else :products="filteredProducts" @order="openModal" />
        </div>
      </section>
    </template>

    <OrderModal :is-open="isOpen" :product="selectedProduct" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BannerSlider from '../components/BannerSlider.vue'
import ProductGrid from '../components/ProductGrid.vue'
import OrderModal from '../components/OrderModal.vue'
import { useHomePage } from '../composables/useHomePage'
import { useModal } from '../composables/useModal'

const { pending, error, refresh, banners, products, meta } = useHomePage()
const { isOpen, selectedProduct, open: openModal, close: closeModal } = useModal()

const searchQuery = useState('searchQuery', () => '')

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase().trim()
  return products.value.filter(p => p.NAME.toLowerCase().includes(query))
})

watchEffect(() => {
  if (meta.value) {
    useSeoMeta({
      title: meta.value.ELEMENT_META_TITLE,
      description: meta.value.ELEMENT_META_DESCRIPTION,
      ogTitle: meta.value.ELEMENT_META_TITLE,
      ogDescription: meta.value.ELEMENT_META_DESCRIPTION,
      ogType: 'website',
      twitterCard: 'summary_large_image',
    })
  }
})

useSchemaOrg([
  defineWebPage({
    name: () => meta.value?.ELEMENT_META_TITLE || 'TGames',
    description: () => meta.value?.ELEMENT_META_DESCRIPTION || ''
  }),
  defineWebSite({ name: 'TGames' }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Главная', item: '/' },
      { name: 'Каталог', item: '/#catalog' }
    ]
  }),
  ...products.value.map(p => defineProduct({
    name: p.NAME,
    image: p.PREVIEW_PICTURE,
    sku: p.ID,
    brand: { name: 'TGames' },
    offers: { 
      price: p.PRICE, 
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock'
    },
  }))
])
</script>
