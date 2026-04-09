<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster
      position="top-right"
      rich-colors
      theme="dark"
      :toast-options="{
        style: {
          background: '#18181b',
          border: '1px solid #3f3f46',
          color: '#f4f4f5',
          borderRadius: '12px',
          fontSize: '13px',
        }
      }"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'index, follow' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'canonical', href: 'https://test-task-demo.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700;900&display=swap' },
  ],
  style: [
    { innerHTML: 'html, body { background-color: #09090b; } [data-sonner-toaster][data-y-position="top"] { top: 76px !important; }' }
  ]
})
</script>
