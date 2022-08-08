<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      class="
        border-gray-200
        dark:border-zinc-600 dark:bg-zinc-800
        duration-100
        dark:text-zinc-400
        border
        outline-0
        py-0.5
        px-1
        text-sm
        rounded-sm
        focus:border-blue-400
        w-full
      "
      type="text"
      :maxlength="max"
      v-if="type === TYPE_TEXT"
      v-model="text"
    />
    <!-- 多行 -->
    <textarea
      class="
        border-gray-200
        dark:border-zinc-600 dark:bg-zinc-800
        duration-100
        dark:text-zinc-400
        border
        outline-0
        py-0.5
        px-1
        text-sm
        rounded-sm
        focus:border-blue-400
        w-full
      "
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      rows="5"
      :maxlength="max"
    ></textarea>

    <!-- 最大长度 -->
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ ' text-red-700': currentNumber === parseInt(max) }"
    >
      {{ currentNumber }}/{{ max }}
    </span>
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { computed } from '@vue/runtime-core'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: TYPE_TEXT,
    validator(val) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(val)
      if (!result) {
        throw new Error(`type 的值必须在可选范围内 [${arr.join(',')}]`)
      }

      return result
    }
  },

  max: {
    type: [String, Number]
  }
})

const emits = defineEmits(['update:modelValue'])

const text = useVModel(props)

const currentNumber = computed(() => {
  return text.value.length
})
</script>

<style lang="scss" scoped>
</style>