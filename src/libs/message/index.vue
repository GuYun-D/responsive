<template>
  <transition name="down">
    <div
      v-show="isVisiable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
import { onMounted, ref } from 'vue'
import MSvgIcon from '../svg-icon/index.vue'

const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'

const typeEnum = [SUCCESS, WARN, ERROR]
</script>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 多久关闭
  duration: {
    type: Number
  },
  // 关闭的回调
  destory: {
    type: Function
  }
})

const styles = {
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'error',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
}

const isVisiable = ref(false)
const animateDuration = '0.5s'

onMounted(() => {
  isVisiable.value = true

  setTimeout(() => {
    isVisiable.value = false
    setTimeout(() => {
      if (props.destory) {
        props.destory()
      }
    }, parseInt(animateDuration.replace('0.', '').replace('s', '') * 100))
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animateDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
