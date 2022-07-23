<template>
  <div
    class="relative"
    @mouseleave="onMouseLeaveHandler"
    @mouseenter="onMouseEnterHandler"
  >
    <div ref="referenceRef">
      <slot name="reference"></slot>
    </div>
    <transition name="slider">
      <div
        :style="contentStyle"
        ref="contentRef"
        v-if="isVisiable"
        class="absolute p-1 z-20 bg-white border rounded-md duration-500"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const POP_TOP_LEFT = 'top-left'
const POP_TOP_RIGHT = 'top-right'
const POP_BOTTOM_RIGHT = 'bottom-right'
const POP_BOTTOM_LEFT = 'bottom-left'

const placementEnum = [
  POP_TOP_LEFT,
  POP_TOP_RIGHT,
  POP_BOTTOM_RIGHT,
  POP_BOTTOM_LEFT
]
</script>

<script setup>
import { computed, nextTick, ref, warn, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: POP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的其中一个`
        )
      }
      return result
    }
  }
})

const isVisiable = ref(false)
const referenceRef = ref()
const contentRef = ref()

const onMouseLeaveHandler = () => {
  isVisiable.value = false
}

const onMouseEnterHandler = () => {
  isVisiable.value = true
}

const useElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

const contentStyle = computed(() => {
  return { top: 0, left: 0 }
})

watch(
  () => isVisiable.value,
  (val) => {
    if (!val) return
    // 等元素渲染完成之后再调用
    nextTick(() => {
      console.log(props.placement)
      switch (props.placement) {
        case POP_TOP_LEFT:
          contentRef.value.style.top = 0
          contentRef.value.style.left =
            -useElementSize(contentRef.value).width + 'px'
          break

        case POP_TOP_RIGHT:
          contentRef.value.style.top = 0
          contentRef.value.style.left =
            useElementSize(referenceRef.value).width + 'px'
          break

        case POP_BOTTOM_LEFT:
          contentRef.value.style.top =
            useElementSize(referenceRef.value).height + 'px'
          contentRef.value.style.left =
            -useElementSize(contentRef.value).width + 'px'
          break

        case POP_BOTTOM_RIGHT:
          contentRef.value.style.top =
            useElementSize(referenceRef.value).height + 'px'
          contentRef.value.style.left =
            -useElementSize(referenceRef.value).width + 'px'
          break
      }
    })
  }
)
</script>

<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition-property: opacity,transform;
  transition-duration: 350ms,350ms;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
