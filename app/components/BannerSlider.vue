<template>
  <div class="relative rounded-2xl md:rounded-[32px] overflow-hidden group border border-zinc-800 bg-zinc-900 w-full">
    <Swiper
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="{ nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' }"
      class="w-full aspect-[16/9] md:aspect-[21/9]"
    >
      <SwiperSlide v-for="banner in banners" :key="banner.ID">
        <div class="relative w-full h-full">
          <img :src="banner.PREVIEW_PICTURE" :alt="banner.NAME" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <h2 class="text-3xl md:text-5xl font-bold font-headline text-white mb-2 md:mb-6 max-w-2xl leading-tight">
              {{ banner.NAME }}
            </h2>
          </div>
        </div>
      </SwiperSlide>

      <button class="swiper-btn-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 hover:scale-105">
        <Icon name="lucide:chevron-left" class="w-6 h-6" />
      </button>
      <button class="swiper-btn-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/40 hover:scale-105">
        <Icon name="lucide:chevron-right" class="w-6 h-6" />
      </button>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination, Navigation as SwiperNavigation } from 'swiper/modules'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/navigation'
import type { Banner } from '../types'

defineProps<{ banners: Banner[] }>()
</script>

<style>
.swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.5) !important;
  opacity: 1 !important;
  transition: all 0.3s ease !important;
  width: 8px !important;
  height: 8px !important;
}
.swiper-pagination-bullet-active {
  background: white !important;
  width: 24px !important;
  border-radius: 4px !important;
}
</style>
