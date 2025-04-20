<!-- src/views/components/MainDashboardView.vue -->
<script setup>
import BalanceUI from '@/components/ui/BalanceUI.vue'
import FilterUI from '@/components/ui/FilterUI.vue'
import TransactionGraphUI from '@/components/ui/TransactionGraphUI.vue'
import TransactionHistoryUI from '@/components/ui/TransactionHistoryUI.vue'
</script>

<template>
  <main class="m-4 px-4 py-3 space-y-4 text-zinc-950">
    <BalanceUI />
    <div class="w-full h-[1px] bg-[#E6E8F0]"></div>
    <FilterUI />
    <TransactionHistoryUI />
    <TransactionGraphUI />
  </main>
</template>
