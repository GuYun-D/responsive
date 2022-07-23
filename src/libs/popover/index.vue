<template>
  <div
    class="relative"
    @mouseleave="onMouseLeaveHandler"
    @mouseenter="onMouseEnterHandler"
  >
    <div>
      <slot name="reference"></slot>
    </div>
    <transition name="slider">
      <div
        v-show="isVisiable"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisiable = ref(false)

const onMouseLeaveHandler = () => {
  isVisiable.value = false
}

const onMouseEnterHandler = () => {
  isVisiable.value = true
}
</script>

<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: opacity 300ms, transform 300ms;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(20);
}
</style>
