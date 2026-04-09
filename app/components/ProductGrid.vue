<template>
  <div class="relative">
    <TransitionGroup
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 relative"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <ProductCard
        v-for="product in products"
        :key="product.ID"
        :product="product"
        @order="$emit('order', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()

defineEmits<{
  (e: 'order', product: Product): void
}>()

function onEnter(el: Element, done: () => void) {
  const elem = el as HTMLElement
  
  elem.style.opacity = '0'
  elem.style.transform = 'translateY(15px)'
  elem.style.transition = 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)'

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      elem.style.opacity = '1'
      elem.style.transform = 'translateY(0)'
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'opacity') {
          elem.removeEventListener('transitionend', onEnd)
          done()
        }
      }
      elem.addEventListener('transitionend', onEnd)
    })
  })
}

function onLeave(el: Element, done: () => void) {
  const elem = el as HTMLElement
  const rect = elem.getBoundingClientRect()
  const parent = elem.parentElement
  if (!parent) return done()
  
  const parentRect = parent.getBoundingClientRect()

  elem.style.position = 'absolute'
  elem.style.zIndex = '0'
  elem.style.pointerEvents = 'none'
  elem.style.top = `${rect.top - parentRect.top}px`
  elem.style.left = `${rect.left - parentRect.left}px`
  elem.style.width = `${rect.width}px`
  elem.style.height = `${rect.height}px`
  elem.style.margin = '0'
  elem.style.transition = 'opacity 300ms ease, transform 300ms ease'

  requestAnimationFrame(() => {
    elem.style.opacity = '0'
    elem.style.transform = 'scale(0.95)'
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'opacity') {
        elem.removeEventListener('transitionend', onEnd)
        done()
      }
    }
    elem.addEventListener('transitionend', onEnd)
  })
}
</script>
