<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { RouterView } from 'vue-router'

// State to track window width for responsive behavior
const windowWidth = ref(window.innerWidth)

// Update window width on resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Set up and clean up resize event listener
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <Navbar />
    </header>

    <div class="flex flex-row flex-grow">
      <!-- Sidebar - responsive width -->
      <Sidebar
        class="w-full hidden lg:block max-w-[60px] sm:max-w-[250px] lg:max-w-[280px] shrink-0"
      />

      <!-- Main content area - takes remaining space -->
      <main class="bg-[#F4F6FA] w-full min-h-0 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
