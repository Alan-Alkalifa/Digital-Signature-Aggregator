<!-- SignaturePad.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">Add Your Signature</h3>

      <div
        class="border border-gray-300 rounded-lg h-40 mb-4"
        ref="signaturePad"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart="handleTouch"
        @touchmove="handleTouch"
        @touchend="stopDrawing"
      >
        <canvas ref="canvas" class="w-full h-full"></canvas>
      </div>

      <div class="flex space-x-3 justify-between">
        <button
          @click="clearSignature"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium text-sm"
        >
          Clear
        </button>
        <div class="flex space-x-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium text-sm"
          >
            Cancel
          </button>
          <button
            @click="saveSignature"
            class="px-4 py-2 bg-[#0172CB] text-white rounded font-medium text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'signed'])

const canvas = ref(null)
const signaturePad = ref(null)
const context = ref(null)
const isDrawing = ref(false)

onMounted(() => {
  const canvasEl = canvas.value
  context.value = canvasEl.getContext('2d')

  // Set canvas to fill parent container
  canvasEl.width = signaturePad.value.clientWidth
  canvasEl.height = signaturePad.value.clientHeight

  // Set line style
  context.value.lineWidth = 2
  context.value.strokeStyle = '#000000'
  context.value.lineCap = 'round'
})

// Drawing functions
function startDrawing(e) {
  isDrawing.value = true
  context.value.beginPath()
  const pos = getPosition(e)
  context.value.moveTo(pos.x, pos.y)
  e.preventDefault()
}

function draw(e) {
  if (!isDrawing.value) return
  const pos = getPosition(e)
  context.value.lineTo(pos.x, pos.y)
  context.value.stroke()
  e.preventDefault()
}

function stopDrawing() {
  isDrawing.value = false
}

function getPosition(e) {
  const rect = canvas.value.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function handleTouch(e) {
  const touch = e.touches[0]
  const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY,
  })

  if (e.type === 'touchstart') {
    startDrawing(mouseEvent)
  } else if (e.type === 'touchmove') {
    draw(mouseEvent)
  }
}

function clearSignature() {
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}

function saveSignature() {
  const dataUrl = canvas.value.toDataURL('image/png')
  emit('signed', {
    dataUrl,
    page: props.page,
    position: props.position,
  })
}
</script>
