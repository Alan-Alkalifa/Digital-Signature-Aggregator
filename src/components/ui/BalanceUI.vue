<template>
  <main class="flex flex-col lg:flex-row bg-white rounded-2xl justify-between shadow-sm">
    <!-- Left section (Balance Info) -->
    <div class="flex flex-col sm:flex-row p-6 gap-4 items-start sm:items-center">
      <img src="/Icon/Wallet.svg" alt="Balance" class="bg-[#0172CB] p-4 rounded-full" />
      <div class="flex flex-col">
        <h3 class="text-[#696F8C] text-sm font-semibold">Available Balance</h3>
        <h2 class="text-[#0172CB] text-[20px] font-semibold">Rp237.200.230</h2>
      </div>
    </div>

    <!-- Right section (Buttons) -->
    <div class="flex flex-col sm:flex-row p-6 gap-4 items-start sm:items-center">
      <RouterLink
        to=""
        class="flex items-center justify-center gap-2 sm:gap-4 bg-[#0172CB] px-4 py-3 rounded-2xl w-full sm:w-auto"
      >
        <img src="/Icon/TopUp.svg" alt="Top Up" class="" />
        <h2 class="text-white text-[16px] font-semibold whitespace-nowrap">Top Up Balance</h2>
      </RouterLink>
      <RouterLink to="" class="p-4 bg-[#EDEFF5] rounded-2xl flex items-center justify-center group">
        <img
          src="/Icon/History.svg"
          alt="History"
          class="rounded-2xl transition-transform duration-300 group-hover:rotate-180"
        />
      </RouterLink>
    </div>
  </main>
</template>
