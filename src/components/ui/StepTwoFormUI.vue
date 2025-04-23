<template>
  <div class="w-[400px] p-6 bg-white shadow rounded-2xl flex flex-col gap-6">
    <!-- Progress Bar -->
    <div>
      <h2 class="text-[#474D66] text-[14px]">Progress</h2>
      <div class="w-full flex flex-col gap-2">
        <div class="flex w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="bg-[#0172CB] h-full w-1/3 transition-all border-r-4 border-white rounded-2xl"></div>
          <div class="bg-[#0172CB] h-full w-1/3 transition-all border-r-4 border-white rounded-2xl"></div>
          <div class="bg-[#E6E8F0] h-full w-1/3 transition-all border-r-4 border-white rounded-2xl"></div>
        </div>
        <span class="text-[14px] text-end font-medium text-gray-500">{{ signers.length }}/3</span>
      </div>
    </div>

    <!-- Loop Penandatangan -->
    <div v-for="(signer, index) in signers" :key="index" class="space-y-4 p-4 rounded-2xl bg-[#F4F6FA]">
      <h2 class="text-[#0061AD] text-[16px] font-semibold">Detail Penandatangan {{ index + 1 }}</h2>

      <div>
        <label class="text-sm text-[#8F95B2] font-semibold">Organisasi</label>
        <select v-model="signer.org" class="input">
          <option disabled value="">Pilih organisasi</option>
          <option>Divisi A</option>
          <option>Divisi B</option>
          <option>Divisi C</option>
        </select>
      </div>

      <div class="relative">
        <label class="text-sm text-[#8F95B2] font-semibold">Nama Penerima</label>
        <input v-model="signer.receiverName" type="text" placeholder="Cari nama.." class="input text-[#101840] pr-10" />
        <img class="absolute right-3 top-[36px] text-[#CBD5E0]" src="/Icon/Search.svg">
      </div>

      <div class="relative">
        <label class="text-sm text-[#8F95B2] font-semibold">Email Penerima</label>
        <input v-model="signer.receiverEmail" type="email" placeholder="Cari email.." class="input text-[#101840] pr-10" />
        <img class="absolute right-3 top-[36px] text-[#CBD5E0]" src="/Icon/Search.svg">
      </div>

      <div>
        <label class="text-sm text-[#8F95B2] font-semibold">Status</label>
        <select v-model="signer.status" class="input">
          <option disabled value="">Pilih status</option>
          <option>Menunggu</option>
          <option>Disetujui</option>
          <option>Ditolak</option>
        </select>
      </div>
    </div>

    <!-- Button to Add Signer -->
    <button
      class="mt-2 w-full border border-[#0172CB] text-[#0172CB] font-semibold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#F0F7FF]"
      @click="addSigner"
    >
      <span class="text-xl">+</span> Tambah Penandatangan
    </button>

    <!-- Navigation Buttons -->
    <div class="flex justify-between w-full gap-2 mt-8">
      <button class="px-4 py-2 rounded-2xl w-1/3 bg-gray-200 hover:bg-gray-300 text-[#696F8C] font-semibold" @click="goToStepOne">Back</button>
      <button class="px-4 py-2 rounded-2xl w-3/3 bg-[#0172CB] hover:bg-[#0061AD] text-white font-semibold" @click="goToStepThree">Next</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToStepThree = () => {
  router.push('/MyDocument/StepThree')
}
const goToStepOne = () => {
  router.push('/MyDocument/StepOne')
}

// List of penandatangan
const signers = ref([
  {
    org: '',
    receiverName: '',
    receiverEmail: '',
    status: ''
  }
])

// Add new penandatangan
const addSigner = () => {
  signers.value.push({
    org: '',
    receiverName: '',
    receiverEmail: '',
    status: ''
  })
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 14px;
}
</style>
