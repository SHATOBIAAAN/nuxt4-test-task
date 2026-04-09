import type { HomePageResponse, Product, Banner } from '../types'
import { computed } from 'vue'

export function useHomePage() {
  const { data, pending, error, refresh } = useFetch<HomePageResponse>('http://api-tgames.twc1.net/api/v1/test', {
    lazy: true,
  })

  const banners = computed<Banner[]>(() => {
    return data.value?.data.BANNERS || []
  })

  const products = computed<Product[]>(() => {
    if (!data.value?.data.HITS || data.value.data.HITS.length === 0) return []
    return data.value.data.HITS[0] || []
  })

  const meta = computed(() => {
    return data.value?.meta.META
  })

  return {
    data,
    pending,
    error,
    refresh,
    banners,
    products,
    meta,
  }
}
