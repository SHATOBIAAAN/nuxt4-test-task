<template>
  <div class="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 font-body">
    <header class="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <nav class="container mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-10">
          <NuxtLink to="/" class="text-xl font-bold tracking-tight font-headline text-white hover:text-primary transition-colors">
            TGAMES
          </NuxtLink>
          <div class="hidden md:flex gap-8">
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 relative group">
              Каталог
              <span class="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 relative group">
              Сообщество
              <span class="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 relative group">
              Поддержка
              <span class="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <!-- Search Toggle -->
          <div
            class="relative flex items-center h-10 transition-all duration-500 ease-in-out px-1"
            :class="isSearchActive ? 'bg-zinc-900 border border-zinc-800 rounded-full w-48 sm:w-64' : 'w-10 bg-transparent'"
          >
            <button
              @click="toggleSearch"
              @mousedown.prevent
              class="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors shrink-0"
              aria-label="Поиск"
            >
              <Icon :name="isSearchActive ? 'lucide:x' : 'lucide:search'" class="w-5 h-5 transition-transform duration-300" :class="isSearchActive ? 'rotate-90' : 'rotate-0'" />
            </button>
            <div class="overflow-hidden flex-1 h-full relative">
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Поиск..."
                class="w-full h-full bg-transparent border-none text-sm text-zinc-100 placeholder:text-zinc-500 focus:ring-0 px-2"
                :class="isSearchActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
                @keyup.esc="closeSearch"
              />
            </div>
          </div>

          <!-- Mobile Menu Toggle -->
          <button 
            @click="isMenuOpen = !isMenuOpen" 
            class="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors bg-transparent border-none"
            aria-label="Меню"
          >
            <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
          </button>
        </div>
      </nav>

      <!-- Mobile Drawer Overlay -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-[-10px]"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-[-10px]"
      >
        <div v-if="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 py-8 px-6 space-y-6 shadow-2xl z-40">
          <a href="#" @click="isMenuOpen = false" class="block text-lg font-medium text-zinc-100 hover:text-primary transition-colors">Каталог</a>
          <a href="#" @click="isMenuOpen = false" class="block text-lg font-medium text-zinc-100 hover:text-primary transition-colors">Сообщество</a>
          <a href="#" @click="isMenuOpen = false" class="block text-lg font-medium text-zinc-100 hover:text-primary transition-colors">Поддержка</a>
        </div>
      </Transition>
    </header>

    <div class="flex-1 mt-16 flex flex-col overflow-x-hidden">
      <main>
        <slot />
      </main>
    </div>

    <footer class="border-t border-zinc-800 bg-zinc-950 pt-16 pb-8 mt-24">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="space-y-4">
          <span class="text-lg font-bold font-headline">TGAMES</span>
          <p class="text-zinc-500 text-sm leading-relaxed max-w-sm">Премиальное игровое оборудование, созданное для максимальной производительности.</p>
        </div>
        <div>
          <h4 class="font-headline font-semibold text-sm mb-4">Продукция</h4>
          <ul class="space-y-3 text-sm text-zinc-400">
            <li><a href="#" class="hover:text-white transition-colors">Компьютеры</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Периферия</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Аксессуары</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-headline font-semibold text-sm mb-4">Поддержка</h4>
          <ul class="space-y-3 text-sm text-zinc-400">
            <li><a href="#" class="hover:text-white transition-colors">Контакты</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Доставка</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Возвраты</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-headline font-semibold text-sm mb-4">Юридическая информация</h4>
          <ul class="space-y-3 text-sm text-zinc-400">
            <li><a href="#" class="hover:text-white transition-colors">Политика конфиденциальности</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Условия использования</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = useState('searchQuery', () => '')
const isSearchActive = ref(false)
const isMenuOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
  if (isSearchActive.value) {
    setTimeout(() => searchInput.value?.focus(), 150)
  } else {
    searchQuery.value = ''
  }
}

const closeSearch = () => {
  isSearchActive.value = false
  searchQuery.value = ''
}
</script>
