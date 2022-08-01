<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisiable"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>

    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisiable"
        class="w-[80%] fixed top-1/3 left-1/2 translate-x-[-50%] z-50 px-2 py-2 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button @click="handleCancelClick" type="info" class="mr-2">{{
            cancelText
          }}</m-button>
          <m-button @click="handleConfirmClick" type="primary">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 以方法来调用组件，需要手动导入组件，自动注册不生效
import MButton from '../button/index.vue'
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  content: {
    type: String,
    required: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelHandler: Function,
  confirmHandler: Function,
  closeHandler: Function
})

const isVisiable = ref(false)
const duration = '0.5s' // 关闭动画执行的时间

const show = () => {
  isVisiable.value = true
}

onMounted(() => {
  show()
})

/**
 * 关闭蒙版
 */
const close = () => {
  isVisiable.value = false
  setTimeout(() => {
    if (props.closeHandler) {
      props.closeHandler()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}

/**
 * 取消
 */
const handleCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }

  close()
}

/**
 * 确认
 */
const handleConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }

  close()
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-active,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
