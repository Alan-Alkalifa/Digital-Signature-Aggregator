<template>
    <div class="w-[400px] p-6 bg-white shadow rounded-2xl flex flex-col gap-4">
      <h2 class="text-[#474D66] text-[14px]">Progress</h2>
            <div class="w-full flex flex-col gap-4">
          <div class="flex w-1/1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div class="bg-[#0172CB] h-full w-1/3 transition-all border border-r-4 border-white rounded-2xl"></div>
            <div class="bg-[#0172CB] h-full w-1/3 transition-all border border-r-4 border-white rounded-2xl"></div>
            <div class="bg-[#0172CB] h-full w-1/3 transition-all border border-r-4 border-white rounded-2xl"></div>
          </div>
          <span class="text-[14px] text-end font-medium text-gray-500">3/3</span>
        </div>
        
      <div class="space-y-4">
        <h2 class="text-[16px] text-[#0061AD]">Detail Dokumen</h2>
        <label class="text-sm text-[#8F95B2] font-semibold">Judul Dokumen<span class="text-red-600 ml-1">*</span></label>
        <input v-model="form.title" type="text" class="input text-[#101840] " placeholder="Masukkan judul" />
      </div>
  
      <div>
        <label class="text-sm bg-white text-[#8F95B2] font-semibold">Jenis Dokumen<span class="text-red-600 ml-1">*</span></label>
        <select v-model="form.type" class="input text-[#101840] ">
          <option selected>Pilih jenis dokumen</option>
          <option>Kontrak Perjanjian</option>
          <option>Nota Dinas</option>
          <option>Surat Edaran</option>
        </select>
      </div>
  
      <div>
        <label class="text-sm bg-white text-[#8F95B2] font-semibold">Priority<span class="text-red-600 ml-1">*</span></label>
        <select v-model="form.priority" class="input text-[#101840] ">
          <option>Low</option>
          <option selected>Medium</option>
          <option>High</option>
          <option>Highest</option>
        </select>
      </div>
  
      <div>
        <label class="text-sm text-[#8F95B2] font-semibold">Deskripsi Dokumen<span class="text-red-600 ml-1">*</span></label>
        <textarea v-model="form.description" class="input resize-none h-24" placeholder="Masukkan deskripsi"></textarea>
      </div>
  
      <div class="flex justify-between w-full gap-2 mt-12 md:mt-32 lg:mt-62">
        <button class="px-4 py-2 rounded-2xl w-1/3 bg-gray-200 hover:bg-gray-300 text-[#696F8C] font-semibold" @click="goToStepTwo">Back</button>
        <button class="px-4 py-2 rounded-2xl w-3/3 bg-[#52BD94] hover:bg-[#52BD80] text-white font-semibold" @click="goToSend">Send</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router' 


const router = useRouter()

const goToStepTwo = () => {
  router.push('/MyDocument/StepTwo')
}

const goToSend = () => {
  router.push('/MainDashboard')
}

  const form = reactive({
    title: '',
    type: '',
    priority: 'Medium',
    description: ''
  })
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    margin-top: 4px;
  }
  </style>
  