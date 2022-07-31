<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="scrollRef" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
      v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经到底了
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

const loading = useVModel(props)

const scrollRef = ref(null)

useIntersectionObserver(scrollRef, ([{ isIntersecting }]) => {
  // 如果 scrollRef 可见了，isIntersecting 就是true
  // 视图可见 && loading = false && 数据尚未加载完成
  if (isIntersecting && !loading.value && !props.isFinished) {
    loading.value = true
    emits('onLoad')
  }
})
</script>

<style lang="scss" scoped></style>
