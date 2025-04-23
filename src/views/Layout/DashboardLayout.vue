<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <header>
      <Navbar />
    </header>

    <!-- Layout -->
    <div class="flex flex-row flex-grow relative">
      <!-- Toggle Button for Mobile -->
      <button
        class="fixed top-1/2 left-2 -translate-y-1/2 z-50 bg-white p-2 rounded-full shadow-md lg:hidden"
        @click="toggleSidebar"
        aria-label="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <!-- ▶ Right Arrow (open) -->
          <path
            v-if="!isSidebarOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
          <!-- ◀ Left Arrow (close) -->
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Sidebar (desktop only) -->
      <Sidebar
        class="hidden lg:block max-w-[60px] sm:max-w-[250px] lg:max-w-[280px] shrink-0"
      />

      <!-- Sidebar (mobile overlay) -->
      <transition name="fade">
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 z-40 bg-white p-4 overflow-y-auto shadow-lg lg:hidden"
        >
          <div class="flex justify-end mb-4">
            <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-800 text-2xl">
              &times;
            </button>
          </div>
          <Sidebar />
        </div>
      </transition>

      <!-- Main Content -->
      <main class="bg-[#F4F6FA] w-full min-h-0 overflow-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { RouterView } from 'vue-router'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
