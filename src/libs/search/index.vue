<template>
  <div
    ref="containerRef"
    class="
      dark:border-zinc-200
      group
      relative
      p-0.5
      rounded-xl
      border-white
      duration-500
      hover:bgred100/40
      guide-search
    "
  >
    <div>
      <m-svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></m-svg-icon>

      <input
        v-model="inputValue"
        placeholder="搜索"
        type="text"
        class="
          dark:bg-zinc-800
          dark:text-zinc-200
          dark:border-zinc-700
          dark:hover:group-hover:bg-zinc-900
          group-hover:border-zinc-300 group-hover:bg-white
          block
          text-sm
          duration-500
          w-full
          h-[44px]
          pl-4
          outline-0
          bg-zinc-100
          caret-zinc-400
          rounded-xl
          text-zinc-900
          tracking-wide
          font-semibold
          border border-zinc-100
          focus:border-red-300
        "
        @keyup.enter="onClickSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <m-svg-icon
        v-show="inputValue"
        @click="onClickClearIcon"
        name="input-delete"
        class="
          h-1.5
          w-1.5
          duration-500
          absolute
          top-[50%]
          right-9
          translate-y-[-50%]
          cursor-pointer
        "
      ></m-svg-icon>
      <div
        class="
          group-hover:opacity-100
          opacity-0
          h-1.5
          w-[1px]
          absolute
          top-[50%]
          right-[62px]
          translate-y-[-50%]
          duration-500
          bg-zinc-200
        "
      ></div>
    </div>
    <m-button
      class="
        group-hover:opacity-100
        opacity-0
        duration-500
        absolute
        translate-y-[-50%]
        top-[50%]
        right-1
        rounded-full
      "
      icon="search"
      icon-color="#fff"
      @click="onClickSearchHandler"
    ></m-button>
    <!-- drapdown -->

    <transition name="slider">
      <div
        v-if="!$slots.drapdown"
        v-show="isFocus"
        class="
          dark:border-zinc-600 dark:bg-zinc-800
          max-h-[368px]
          w-full
          text-base
          overflow-auto
          bg-white
          absolute
          z-20
          left-0
          top-[56px]
          p-2
          rounded
          border border-zinc-200
          duration-200
          hover:shadow-2xl
          scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent
          xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900
        "
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const EMIT_UPDATE_MODELVALUE = 'update:moadelValue'
const EVENT_SEARCH = 'search'
const EMIT_CLEAR = 'clear'
const EMIT_INPUT = 'input'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'

export default {
  name: 'search-name'
}
</script>

<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EVENT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

const inputValue = useVModel(props)
const isFocus = ref(false)
const containerRef = ref(null)

const onClickClearIcon = () => {
  inputValue.value = ''
  emit(EMIT_CLEAR, '')
}

const onClickSearchHandler = () => {
  emit(EVENT_SEARCH, inputValue.value)
}

const onFocusHandler = () => {
  isFocus.value = true
  emit(EMIT_FOCUS)
}

onClickOutside(containerRef, () => {
  isFocus.value = false
})

const onBlurHandler = () => {
  emit(EMIT_BLUR)
}

watch(
  () => inputValue,
  (val) => {
    emit(EMIT_INPUT, val)
  }
)
</script>

<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 500ms;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
