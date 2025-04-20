<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { RouterView } from 'vue-router'
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
