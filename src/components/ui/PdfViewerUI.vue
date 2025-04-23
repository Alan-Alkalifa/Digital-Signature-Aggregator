<template>
  <div class="relative h-screen w-full bg-white rounded-xl shadow-md">
    <!-- Scroll-following Page Indicator -->
    <div
      class="fixed z-50 mx-4 px-2 py-1 text-xs font-medium text-white bg-black rounded-l-md shadow right-0 transform -translate-y-1/2 transition-all duration-100 ease-out"
      :style="{ top: `${indicatorTop}px` }"
      v-if="pages.length"
    >
      {{ currentPage }} / {{ pages.length }}
    </div>

    <!-- No PDF fallback -->
    <div v-if="!pdfUrl" class="p-10 text-center text-gray-500 text-sm">
      No PDF uploaded. Please upload a file first.
    </div>

    <!-- Scrollable PDF area -->
    <div
      v-if="pdfUrl"
      ref="pdfContainer"
      class="space-y-6 p-4 overflow-y-auto h-full w-full"
      @scroll="handleScroll"
    >
      <div
        v-for="(page, index) in pages"
        :key="index"
        :ref="el => pageRefs[index] = el"
        class="flex justify-center page-block"
      >
        <canvas :ref="el => (canvasRefs[index] = el)"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const route = useRoute()
const pdfUrl = ref(null)

const pdfContainer = ref(null)
const pages = ref([])
const canvasRefs = []
const pageRefs = []
const currentPage = ref(1)
const indicatorTop = ref(0)

// Watch route.query.blobUrl instead of just pdfUrl
watch(
  () => route.query.blobUrl,
  async (newUrl) => {
    if (!newUrl) return
    pdfUrl.value = newUrl
    try {
      const loadingTask = pdfjsLib.getDocument(newUrl)
      const pdf = await loadingTask.promise
      const numPages = pdf.numPages
      pages.value = Array.from({ length: numPages })

      for (let i = 0; i < numPages; i++) {
        const page = await pdf.getPage(i + 1)
        const viewport = page.getViewport({ scale: 1.5 })

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({ canvasContext: context, viewport }).promise

        requestAnimationFrame(() => {
          if (canvasRefs[i]) {
            canvasRefs[i].replaceWith(canvas)
          }
        })
      }
    } catch (err) {
      console.error('PDF render error:', err)
    }
  },
  { immediate: true }
)

function handleScroll() {
  const container = pdfContainer.value
  const scrollTop = container.scrollTop
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight

  const scrollRatio = scrollTop / (scrollHeight - clientHeight)
  indicatorTop.value = scrollRatio * clientHeight

  for (let i = 0; i < pageRefs.length; i++) {
    const el = pageRefs[i]
    if (el) {
      const offsetTop = el.offsetTop
      const offsetBottom = offsetTop + el.offsetHeight

      if (
        scrollTop + clientHeight / 2 >= offsetTop &&
        scrollTop + clientHeight / 2 < offsetBottom
      ) {
        currentPage.value = i + 1
        break
      }
    }
  }
}
</script>

<style scoped>
canvas {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.page-block {
  position: relative;
}
</style>
