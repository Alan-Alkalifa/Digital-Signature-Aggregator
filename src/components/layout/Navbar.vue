<script setup lang="ts"></script>

<template>
  <nav
    class="mx-4 px-4 py-3 flex flex-wrap items-center justify-between space-y-4 border-b border-[#EDEFF5] bg-white"
  >
    <img src="/Icon/Logo.svg" alt="Logo" class="w-auto" />

    <div class="flex items-center gap-4 sm:gap-5 md:gap-6 flex-wrap">
      <!-- Notification Button -->
      <button class="relative p-3 bg-[#F4F6FA] rounded-full cursor-pointer">
        <img src="/Icon/Notification.svg" alt="Notification" class="" />
        <span
          class="absolute top-1.5 right-1.5 bg-[#F04438] w-5 h-5 flex items-center justify-center rounded-full text-white text-[10px] font-medium leading-none"
          >5</span
        >
      </button>

      <!-- Help Button -->
      <button class="p-3 bg-[#F4F6FA] rounded-full cursor-pointer">
        <img src="/Icon/Question.svg" alt="Question" class="" />
      </button>

      <!-- Divider -->
      <span class="hidden sm:block w-px h-6 bg-[#E6E8F0]"></span>

      <!-- User Info -->
      <div class="flex items-center gap-3">
        <button class="cursor-pointer">
          <img src="/Icon/Avatar.svg" alt="Avatar" class="rounded-full" />
        </button>
        <div class="hidden sm:block">
          <h2 class="text-[#474D66] text-sm font-semibold">Bessie Cooper</h2>
          <h3 class="text-[#C1C4D6] text-xs">bessie.cooper97</h3>
        </div>
      </div>

      <!-- Dropdown Arrow -->
      <button class="cursor-pointer p-3 bg-[#F4F6FA] rounded-md">
        <img src="/Icon/VectorDown.svg" alt="DownVector" class="" />
      </button>
    </div>
  </nav>
</template>
