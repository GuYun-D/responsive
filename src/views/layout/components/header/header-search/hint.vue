<template>
  <div>
    <div
      v-html="highLightText(item)"
      v-for="item in hintDate"
      :key="item"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { getHint } from '@/api/pexels'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['search-click'])

const hintDate = ref([])

/**
 * @description 搜索逻辑
 */
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintDate.value = result
}

/**
 * @description 点击搜索的结果
 */
const onItemClick = (item) => {
  emits('search-click', item)
}

/**
 * @description 处理关键字高亮
 */
const highLightText = (text) => {
  const highLightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, highLightStr)
}

watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
</script>

<style lang="less" scoped></style>
