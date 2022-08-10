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

    <m-button class="mt-4 w-[80%] xl:w-1/2" @click="confirm">确定</m-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'

const props = defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close'])

const imgRef = ref(null)

/**
 * @description 点击关闭按钮
 */
const close = () => {
  emits('close')
}

/**
 * @description 点击确定
 */
const confirm = () => {}
</script>

<style lang="scss" scoped>
</style>