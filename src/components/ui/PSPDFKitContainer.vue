<template>
    <div class="pdf-container min-h-screen" ref="container"></div>
  </template>
  
  <script>
  import PSPDFKit from "pspdfkit";
  
  export default {
    name: "PSPDFKitContainer",
    props: {
      pdfFile: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        instance: null,
      };
    },
    mounted() {
      this.loadPSPDFKit();
    },
    watch: {
      pdfFile(newPdf) {
        this.reloadPSPDFKit(newPdf);
      },
    },
    methods: {
      async loadPSPDFKit() {
        this.instance = await PSPDFKit.load({
          container: this.$refs.container,
          document: this.pdfFile,
          baseUrl: `${window.location.protocol}//${window.location.host}/js/`,
          styleSheets: [`${window.location.protocol}//${window.location.host}/pspdfkit-custom.css`], // custom styles here
        });
        this.$emit("loaded", this.instance);
      },
      async reloadPSPDFKit(newPdf) {
        if (this.instance) {
          PSPDFKit.unload(this.$refs.container);
          this.instance = null;
        }
        await this.loadPSPDFKit();
      },
    },
    beforeDestroy() {
      if (this.instance) {
        PSPDFKit.unload(this.$refs.container);
      }
    },
  };
  </script>
  
  <style>
  .pdf-container {
    height: 100vh;
    width: 100%;
  }
  </style>
  