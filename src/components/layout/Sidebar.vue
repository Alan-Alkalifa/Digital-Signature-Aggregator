<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const fileInput = ref(null)
const router = useRouter()

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const blobUrl = URL.createObjectURL(file)
    // Menambahkan query `t` agar route berubah walau file yang sama diupload
    router.push({ path: '/MyDocument/StepOne', query: { blobUrl, t: Date.now() } })
  }
}
</script>

<template>
  <aside class="m-4 px-4 py-3 flex flex-col">
    <div class="space-y-4">
      <div>
        <button
          @click="triggerFileInput"
          class="bg-[#0172CB] flex justify-center space-x-2 p-3 cursor-pointer w-full h-14 hover:bg-[#0061AD] text-white rounded-2xl items-center text-center"
        >
          <img src="/Icon/UploadFile.svg" alt="Upload File" />
          <span class="text-[16px] font-medium">Upload Document</span>
        </button>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="application/pdf"
          class="hidden"
        />
      </div>

    <button
      class="flex justify-center space-x-2 p-2 cursor-pointer w-full h-14 text-[#0172CB] hover:bg-[#EDF7FF] hover:border-1 hover:border-[#0172CB] rounded-2xl items-center text-center"
    >
      <img src="/Icon/ScanVerification.svg" alt="Scan Verification" />
      <span class="text-[16px] font-medium">PDF Verification</span>
    </button>
 
    <span class="w-full h-px bg-[#E6E8F0]"></span>
  </div>
  <div class="">
    <RouterLink
      to="/MainDashboard"
      :class="[
        'flex justify-left space-x-2 p-2 cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/MainDashboard'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <img src="/Icon/Dashboard.svg" alt="Dashboard" />
      <span class="text-[16px] font-medium">Dashboard</span>
    </RouterLink>

    <RouterLink
      to="/MyDocument"
      :class="[
        'flex justify-left space-x-2 p-2 cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/MyDocument'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <img src="/Icon/MyDocuments.svg" alt="My Document" />
      <span class="text-[16px] font-medium">My Document</span>
    </RouterLink>

    <div class="w-full h-[1px] border bg-[#E6E8F0]"></div>

    <RouterLink
      to="/Inbox"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Inbox'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Inbox.svg" alt="Inbox" />
        <span class="text-[16px] font-medium">Inbox</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <RouterLink
      to="/Sent"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Sent'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Sent.svg" alt="Sent" />
        <span class="text-[16px] font-medium">Sent</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <RouterLink
      to="/Draft"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Draft'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Draft.svg" alt="Draft" />
        <span class="text-[16px] font-medium">Draft</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <RouterLink
      to="/Completed"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Completed'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Completed.svg" alt="Completed" />
        <span class="text-[16px] font-medium">Completed</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <RouterLink
      to="/Archive"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Archive'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Archive.svg" alt="Archive" />
        <span class="text-[16px] font-medium">Archive</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <RouterLink
      to="/Trash"
      :class="[
        'flex justify-left space-x-2 p-2 justify-between cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Trash'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <div class="flex space-x-2">
        <img src="/Icon/Trash.svg" alt="Trash" />
        <span class="text-[16px] font-medium">Trash</span>
      </div>
      <div
        class="text-center items-center justify-center bg-[#F4F6FA] p-1 w-7 h-7 text-[12px] text-[#0172CB] rounded-full"
      >
        0
      </div>
    </RouterLink>

    <span class="w-full h-px bg-[#E6E8F0]"></span>

    <RouterLink
      to="/Settings"
      :class="[
        'flex justify-left space-x-2 p-2 cursor-pointer w-full h-14 rounded-2xl items-center text-left text-[#696F8C] hover:bg-[#F5F7FC]',
        $route.path === '/Settings'
          ? 'bg-[#F5F7FC] text-[#101840] border-l-[3px] font-semibold border-[#0172CB]'
          : '',
      ]"
    >
      <img src="/Icon/Settings.svg" alt="Settings" />
      <span class="text-[16px] font-medium">Settings</span>
    </RouterLink>
  </div>
  </aside>
</template>
