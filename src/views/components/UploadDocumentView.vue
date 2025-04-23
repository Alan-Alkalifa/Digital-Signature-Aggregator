<template>
  <div class="w-full min-h-screen bg-[#F5F7FC] flex flex-col p-6 gap-4">
    <div class="flex flex-1 gap-6">
      <div class="flex-1 bg-white p-4 rounded-2xl shadow overflow-auto">
        <PdfViewer pdfUrl="/document.pdf" />
      </div>
      <RouterView /> <!-- Renders StepOne or StepTwo -->
    </div>
  </div>
</template>
  
  <script setup>
  import PdfViewer from '@/components/ui/PdfViewerUI.vue'
  import StepOneForm from '@/components/ui/StepOneFormUI.vue'
  </script>
  