<template>
  <main class="min-h-screen bg-[#F5F6FA] p-6 space-y-6">
    <!-- Upload Area -->
    <section class="bg-white p-6 rounded-2xl shadow-sm">
      <h2 class="text-[#0172CB] text-lg font-semibold mb-4">📄 Upload PDF</h2>
      <div
        class="border-2 border-dashed border-gray-300 p-8 text-center rounded-2xl cursor-pointer hover:bg-gray-50"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <p class="text-sm text-gray-500 mb-4">Drag & drop your PDF here</p>
        <button
          class="bg-[#0172CB] text-white px-4 py-2 rounded-2xl font-medium text-sm"
          @click="$refs.fileInput.click()"
        >
          Choose File
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="application/pdf"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
    </section>

    <!-- PDF Viewer (Auto push on upload) -->
    <PdfViewer
      v-if="pdfUrl"
      :pdf-url="pdfUrl"
      @open-signature="openSignatureModal"
      ref="pdfViewer"
    />

    <!-- Signature Modal -->
    <SignaturePad
      v-if="showSignature"
      :page="selectedPage"
      :position="signaturePosition"
      @close="showSignature = false"
      @signed="handleSignature"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import PdfViewer from '@/views/components/PDFViewerView.vue'
import SignaturePad from '@/components/ui/SignaturePad.vue'

const pdfUrl = ref(null)
const showSignature = ref(false)
const selectedPage = ref(null)
const signaturePosition = ref({ x: 0, y: 0 })
const pdfViewer = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  processFile(file)
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  processFile(file)
}

const processFile = (file) => {
  if (file?.type === 'application/pdf') {
    // Revoke previous URL to avoid memory leaks
    if (pdfUrl.value) {
      URL.revokeObjectURL(pdfUrl.value)
    }
    pdfUrl.value = URL.createObjectURL(file)
  } else {
    alert('Please upload a valid PDF.')
  }
}

const openSignatureModal = ({ page, position }) => {
  selectedPage.value = page
  signaturePosition.value = position
  showSignature.value = true
}

const handleSignature = (meta) => {
  console.log('Signed at:', meta)
  // Add the signature to the PDF viewer
  pdfViewer.value?.addSignature(meta.dataUrl, meta.position, meta.page)
  showSignature.value = false
}
</script>
