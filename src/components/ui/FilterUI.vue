<template>
  <main class="w-full flex gap-2 flex-wrap items-center bg-[#F5F7FC] rounded-2xl">
    <!-- Refresh Button -->
    <button
      class="p-3 rounded-full min-w-10 min-h-10 bg-white flex items-center justify-center shadow-sm cursor-pointer group"
    >
      <img
        src="/Icon/Refresh.svg"
        alt="Refresh"
        class="rounded-2xl transition-transform duration-300 group-hover:rotate-180"
      />
    </button>

    <!-- Search Input -->
    <div class="flex items-center h-[44px] p-3 bg-white rounded-xl shadow-sm flex-1 min-w-[308px]">
      <img src="/Icon/Search.svg" alt="Search" class="" />
      <input
        type="text"
        placeholder="Search"
        class="bg-transparent outline-none no-underline text-[14px] text-[#8F95B2] placeholder-[#8F95B2]"
      />
    </div>

    <!-- Status Dropdown -->
    <select
      class="p-3 bg-white rounded-xl shadow-sm text-[14px] text-[#8F95B2] outline-none flex-1 min-w-[308px]"
    >
      <option>All Status</option>
      <option>Pending</option>
      <option>Approved</option>
      <option>Rejected</option>
    </select>

    <!-- Date Dropdown -->
    <select
      class="p-3 bg-white rounded-xl shadow-sm text-[14px] text-[#8F95B2] outline-none flex-1 min-w-[308px]"
    >
      <option>Last 30 days</option>
      <option>Last 7 days</option>
      <option>This Month</option>
      <option>Custom</option>
    </select>

    <!-- Filter Button -->
    <button
      class="bg-[#0C1544] text-white p-3 rounded-xl text-[16px] font-semibold shadow-sm cursor-pointer flex-1 max-w-[136px] sm:w-auto"
    >
      Filter
    </button>
  </main>
</template>
