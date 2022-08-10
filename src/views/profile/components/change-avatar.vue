<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      name="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>

    <img :src="blob" ref="imgRef" alt="" />

    <m-button :loading="loading" class="mt-4 w-[80%] xl:w-1/2" @click="confirm"
      >确定</m-button
    >
  </div>
</template>

<script>
// PC 的配置对象
const pcOptions = {
  aspectRatio: 1
}

// mobile 配置对象
const mobileOptions = {
  viewMode: 1,
  draMode: 'move',
  aspectRatio: 1,
  croBoxMovable: false,
  cropBoxResizable: false
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/flexible'

const props = defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close'])

const imgRef = ref(null)
const loading = ref(false)

/**
 * @description 点击关闭按钮
 */
const close = () => {
  emits('close')
}

let cropper = null
onMounted(() => {
  /**
   * 图片的裁切
   */
  cropper = new Cropper(
    imgRef.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * @description 点击确定
 */
const confirm = () => {
  loading.value = true
  // 拿到裁剪后的对象
  cropper.getCroppedCanvas().toBlob((blob) => {
    console.log(URL.createObjectURL(blob))
  })
}
</script>

<style lang="scss" scoped>
</style>