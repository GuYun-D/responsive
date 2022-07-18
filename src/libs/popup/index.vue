<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          @click="emits('update:modelValue', false)"
          v-if="modelValue"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        ></div>
      </transition>

      <transition name="popup-down-up">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-screen bg-white fixed z-50 bottom-0"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { watch } from '@vue/runtime-core'
import { useScrollLock } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 锁定滚动
const isLock = useScrollLock(document.body)

watch(
  () => props.modelValue,
  (val) => {
    isLock.value = val
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
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

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
