<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Transaction } from '@/types/Transaction'
import { mockTransactions } from '@/data/Transaction'

const transactions = ref<Transaction[]>(mockTransactions)
const currentPage = ref(1)
const itemsPerPage = 10

// Calculate total pages
const totalPages = computed(() => Math.ceil(transactions.value.length / itemsPerPage))

// Get current page transactions
const currentTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return transactions.value.slice(start, end)
})

// Pagination logic
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Generate page numbers for pagination
const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const maxVisiblePages = 5

  if (totalPages.value <= maxVisiblePages) {
    // Show all pages if there are few
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Complex pagination logic for many pages
    if (currentPage.value <= 3) {
      // Near start: show first 4 pages
      for (let i = 1; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 2) {
      // Near end: show last 4 pages
      pages.push(1)
      pages.push('...')
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // Middle: show current page with neighbors
      pages.push(1)
      pages.push('...')
      pages.push(currentPage.value - 1)
      pages.push(currentPage.value)
      pages.push(currentPage.value + 1)
      pages.push('...')
      pages.push(totalPages.value)
    }
  }

  return pages
})
</script>

<template>
  <section class="bg-white rounded-2xl shadow-sm w-full overflow-x-auto">
    <!-- Title -->
    <div class="flex items-center gap-2 mb-3 pt-3 px-3">
      <img src="/Icon/Table.svg" alt="icon" />
      <h2 class="text-[#0C1544] text-base font-semibold">Riwayat Transaksi</h2>
    </div>

    <!-- Table -->
    <table class="min-w-full table-auto text-sm text-[#0C1544]">
      <thead>
        <tr class="text-left text-[#A1A8B8] bg-[#F9FAFC] border-b border-[#EDEFF5]">
          <th class="py-3 px-4">ID Transaction ↑</th>
          <th class="py-3 px-4">Date ↑</th>
          <th class="py-3 px-4">Provider ↑</th>
          <th class="py-3 px-4">Jenis Transaksi ↑</th>
          <th class="py-3 px-4">Nominal ↑</th>
          <th class="py-3 px-4">Status ↑</th>
          <th class="py-3 px-4">Documents</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in currentTransactions"
          :key="transaction.id"
          class="border-b border-[#EDEFF5] hover:bg-[#F9FAFC] transition-colors"
        >
          <td class="py-4 px-4 whitespace-nowrap">{{ transaction.id }}</td>
          <td class="py-4 px-4 whitespace-nowrap">{{ transaction.date }}</td>
          <td class="py-4 px-4 whitespace-nowrap">{{ transaction.provider }}</td>
          <td class="py-4 px-4 whitespace-nowrap">{{ transaction.type }}</td>
          <td class="py-4 px-4 text-[#F04438] font-medium whitespace-nowrap">
            {{ transaction.nominal }}
          </td>
          <td class="p-3 whitespace-nowrap">
            <span
              :class="[
                'px-2 py-1 rounded-full font-medium text-xs text-white',
                transaction.status === 'Success'
                  ? ' bg-[#52BD94]'
                  : transaction.status === 'Pending'
                    ? ' bg-[#FFB020]'
                    : ' bg-[#D14343]',
              ]"
            >
              {{ transaction.status }}
            </span>
          </td>
          <td class="py-4 px-4 whitespace-nowrap">
            <button class="flex items-center text-[#0172CB] font-medium gap-2 text-sm">
              <img src="/Icon/Docs.svg" alt="doc" />
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="flex flex-col sm:flex-row justify-between px-3 py-4 items-center text-sm text-[#696F8C] gap-4 overflow-x-auto"
    >
      <span>
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, transactions.length) }} of
        {{ transactions.length }} entries
      </span>
      <div class="flex items-center gap-2 whitespace-nowrap">
        <!-- Previous page button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded-lg border-[#EDEFF5]"
          :class="currentPage === 1 ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#0172CB]'"
        >
          &lt;
        </button>

        <!-- Page numbers -->
        <template v-for="(page, index) in pageNumbers" :key="index">
          <span v-if="typeof page === 'string'" class="text-[#A1A8B8]">{{ page }}</span>
          <button
            v-else
            @click="goToPage(page)"
            class="px-3 py-1 border rounded-lg border-[#EDEFF5]"
            :class="
              currentPage === page ? 'text-[#0172CB] font-medium bg-[#F0F7FF]' : 'text-[#A1A8B8]'
            "
          >
            {{ page }}
          </button>
        </template>

        <!-- Next page button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded-lg border-[#EDEFF5]"
          :class="
            currentPage === totalPages ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#0172CB]'
          "
        >
          &gt;
        </button>
      </div>
    </div>
  </section>
</template>
