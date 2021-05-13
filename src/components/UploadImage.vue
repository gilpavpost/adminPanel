<template>
  <div class="image-upload">
    <div class="text-center">
      <img class="img-fluid rounded" :src="imageRealUrl">
    </div>

    <div class="text-center p-2">
      <input
          v-bind="$attrs"
          type="file"
          :accept="mimeType"
          class="image-input"
          ref="fileInput"
          @change="uploadFile($event.target.files)">
      <slot></slot>
      <b-button
          class="mr-1"
          variant="primary"
          size="sm"
          @click="selectFile">
        <font-awesome-icon icon="upload"></font-awesome-icon>
      </b-button>
      <b-button
          variant="danger"
          size="sm"
          v-if="image"
          @click="deleteFile">
        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      image: {
        type: String,
        required: true,
      },
      mimeType: {
        type: String,
        required: false,
        default: 'image/*',
      },
      source: {
        type: String,
        required: false,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '/img/placeholder-image.png',
      },
    },
    data() {
      return {};
    },
    computed: {
      imageRealUrl() {
        return this.imageUrl ? this.imageUrl : this.placeholder;
      }
    },
    methods: {
      uploadFile(fileList) {
        this.$emit('upload', fileList);
      },
      selectFile() {
        this.$refs.fileInput.click();
      },
      deleteFile() {
        this.$emit('delete');
      },
      clearInput() {
        try {
          // Wrapped in try in case IE < 11 craps out
          this.$refs.fileInput.value = ''
        } catch (e) {
          console.log(e)
        }
        this.$refs.fileInput.type = '';
        this.$refs.fileInput.type = 'file';
      }
    },
  }
</script>

<style lang="scss">
  .image-input {
    background: rgba(255, 255, 255, 0);
    overflow: hidden;
    position: fixed;
    width: 1px;
    height: 1px;
    z-index: -1;
    opacity: 0;
  }

  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;

    h3 {
      margin: -.5em 0 0;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      font-size: 40px;
      color: #fff;
      padding: 0;
    }
  }
</style>