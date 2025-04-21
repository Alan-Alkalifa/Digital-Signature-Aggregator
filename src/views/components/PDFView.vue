<template>
  <div class="max-w-screen p-4 flex flex-col items-center">

    <!-- Drop Zone: Only show when there's no PDF -->
    <div
      v-if="!pdfUrl"
      class="w-full border-dashed border-2 border-[#0172CB] bg-[#E5F1FC] rounded-2xl p-10 flex flex-col items-center justify-center text-center"
    >
      <img src="/Icon/Docs.svg" alt="PDF Icon" class="w-16 mb-4" />

      <!-- Upload Button -->
      <label
        for="upload-input"
        class="inline-block px-6 py-3 bg-[#0172CB] hover:bg-[#0061AD] text-white text-sm font-semibold rounded-xl cursor-pointer shadow"
      >
        📄 Choose PDF File
        <input
          id="upload-input"
          type="file"
          accept="application/pdf"
          @change="handleFileUpload"
          class="hidden"
        />
      </label>

      <p class="text-sm text-[#8F95B2] mt-3">or drop files here</p>
    </div>

    <!-- Change Document Button -->
    <div v-else class="mt-4 w-full">
      <label
        for="upload-input"
        class="w-full border-dashed border-2 border-[#0172CB] text-[#0172CB] bg-[#E5F1FC] rounded-2xl p-3 flex flex-col items-center justify-center text-center"
      >
        🔄 Change Document
        <input
          id="upload-input"
          type="file"
          accept="application/pdf"
          @change="handleFileUpload"
          class="hidden"
        />
      </label>
    </div>

    <!-- PSPDFKit Viewer -->
    <div class="w-full mt-4">
      <PSPDFKitContainer
        v-if="pdfUrl"
        :pdfFile="pdfUrl"
        @loaded="viewerInstance = $event"
      />
    </div>
  </div>
</template>


  
  <script>
  import PSPDFKitContainer from "@/components/ui/PSPDFKitContainer.vue";
  
  export default {
    components: { PSPDFKitContainer },
    data() {
      return {
        pdfUrl: null,
        viewerInstance: null,
        oldBlobUrl: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
          if (this.oldBlobUrl) URL.revokeObjectURL(this.oldBlobUrl);
          this.oldBlobUrl = URL.createObjectURL(file);
          this.pdfUrl = this.oldBlobUrl;
        } else {
          alert("Please upload a valid PDF file.");
        }
      },
      async exportPDF() {
        if (!this.viewerInstance) return;
        const pdf = await this.viewerInstance.exportPDF();
        const blob = new Blob([pdf], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "signed-document.pdf";
        link.click();
      },
    },
    beforeDestroy() {
      if (this.oldBlobUrl) URL.revokeObjectURL(this.oldBlobUrl);
    },
  };
  </script>
  