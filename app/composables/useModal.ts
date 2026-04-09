import { ref } from 'vue'
import type { Product } from '../types'

export function useModal() {
  const isOpen = ref(false)
  const selectedProduct = ref<Product | null>(null)

  const open = (product: Product) => {
    selectedProduct.value = product
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    isOpen.value = false
    document.body.style.overflow = ''
    setTimeout(() => { selectedProduct.value = null }, 300)
  }

  return {
    isOpen,
    selectedProduct,
    open,
    close,
  }
}
