<!-- PDFSignView.vue -->
<template>
  <section class="bg-white p-6 rounded-2xl shadow-sm mb-6">
    <h2 class="text-[#0172CB] text-lg font-semibold mb-4">📑 PDF Document</h2>

    <div class="relative border border-gray-200 rounded-xl overflow-hidden">
      <!-- PDF Controls -->
      <div class="bg-gray-100 p-3 flex items-center justify-between border-b">
        <div class="flex space-x-3">
          <button
            @click="prevPage"
            class="bg-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
            :disabled="currentPage <= 1"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            class="bg-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
            :disabled="currentPage >= pageCount"
          >
            Next
          </button>
        </div>
        <div class="text-sm text-gray-600">Page {{ currentPage }} of {{ pageCount }}</div>
      </div>

      <!-- PDF Renderer -->
      <div class="h-96 overflow-auto bg-gray-50 flex justify-center p-4">
        <div class="relative pdf-page shadow-md" ref="pdfContainer" @click="handlePageClick">
          <canvas ref="pdfCanvas" class="max-w-full h-auto"></canvas>

          <!-- Signature placeholders -->
          <div
            v-for="(signature, idx) in signatures"
            :key="idx"
            v-show="signature.page === currentPage"
            class="absolute bg-blue-50 border border-blue-200 rounded p-1"
            :style="{
              left: `${signature.position.x}px`,
              top: `${signature.position.y}px`,
              transform: 'translate(-50%, -50%)',
            }"
          >
            <img
              v-if="signature.dataUrl"
              :src="signature.dataUrl"
              class="h-12 w-auto"
              alt="Signature"
            />
            <div v-else class="text-blue-500 text-sm p-1">Sign Here</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Define props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
})

// Define emits
const emit = defineEmits(['open-signature'])

// Component state
const pdfCanvas = ref(null)
const pdfContainer = ref(null)
const pdfDoc = ref(null)
const currentPage = ref(1)
const pageCount = ref(0)
const signatures = ref([])
const scale = ref(1.5)

// Load PDF when URL changes
watch(
  () => props.pdfUrl,
  async (newUrl) => {
    if (newUrl) {
      try {
        // Set the worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'

        // Load the PDF document
        pdfDoc.value = await pdfjsLib.getDocument(newUrl).promise
        pageCount.value = pdfDoc.value.numPages

        // Render the first page
        renderPage(currentPage.value)
      } catch (error) {
        console.error('Error loading PDF:', error)
      }
    }
  },
  { immediate: true },
)

// Render specified page
async function renderPage(pageNum) {
  if (!pdfDoc.value) return

  try {
    const page = await pdfDoc.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value })

    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')

    // Set canvas dimensions to match the viewport
    canvas.height = viewport.height
    canvas.width = viewport.width

    // Render the PDF page with proper color settings
    await page.render({
      canvasContext: context,
      viewport: viewport,
      // Add rendering options to ensure colors display properly
      renderInteractiveForms: true,
      enableWebGL: true,
      // Use CSS colors when available
      cssColors: true,
    }).promise
  } catch (error) {
    console.error('Error rendering page:', error)
  }
}

// Navigation functions
function nextPage() {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
    renderPage(currentPage.value)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    renderPage(currentPage.value)
  }
}

// Handle click on PDF to add signature
function handlePageClick(event) {
  const rect = pdfContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Emit event to parent to open signature modal
  emit('open-signature', {
    page: currentPage.value,
    position: { x, y },
  })

  // Add a signature placeholder
  signatures.value.push({
    page: currentPage.value,
    position: { x, y },
    dataUrl: null,
  })
}

// Add signed image to the document
function addSignature(dataUrl, position, page) {
  const signatureIndex = signatures.value.findIndex(
    (sig) => sig.page === page && sig.position.x === position.x && sig.position.y === position.y,
  )

  if (signatureIndex !== -1) {
    signatures.value[signatureIndex].dataUrl = dataUrl
  }
}

// Expose methods to parent component
defineExpose({
  addSignature,
})
</script>

<style scoped>
.pdf-page {
  background-color: white;
}

/* Add specific styling for the canvas to ensure proper color rendering */
canvas {
  image-rendering: high-quality;
}
</style>
