<template>
  <div class="">
    <!-- 蒙板 -->
    <transition name="fade">
      <div
        v-if="isVisiable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容去 -->
    <transition name="up">
      <div
        v-if="isVisiable"
        class="
          max-w-[80%] max-h-[80%]
          overflow-auto
          fixed
          top-[10%]
          left-[50%]
          translate-x-[-50%]
          z-50
          px-2
          py-1.5
          rounded-sm
          border
          dark:border-zinc-600
          cursor-pointer
          bg-white
          dark:bg-zinc-800
          xl:min-w-[35%]
        "
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>

        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>

        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHnadler || confirmHnadler">
          <m-button @click="handleConfirm">{{ cancelText }}</m-button>
          <m-button @click="handleCancel">{{ confirmText }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: String,
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelHnadler: Function,
  confirmHnadler: Function,
  close: Function
})

const emites = defineEmits(['update:modelValue'])

let isVisiable = useVModel(props)

/**
 * @description 点击蒙层关闭
 */
const close = () => {
  isVisiable.value = false
  if(props.close){
    props.close()
  }
}

/**
 * @description 点击确定
 */
const handleConfirm = () => {
  if (props.confirmHnadler) {
    props.confirmHnadler()
  }

  close()
}

/**
 * @description 点击取消
 */
const handleCancel = () => {
  if (props.cancelHnadler) {
    props.cancelHnadler()
  }

  close()
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.1s;
}

.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-active,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>