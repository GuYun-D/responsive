<template>
  <div>
    <div class="flex items-center text-base mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="handleDeleteClick"
      ></m-svg-icon>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historys"
        :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="handleItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="handleDeleteItem(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { confirm } from '@/libs'

const store = useStore()

const emits = defineEmits(['search'])

/**
 * @description 删除全部
 */
const handleDeleteClick = () => {
  // store.commit('search/deleteAllHistory')
  confirm('删除历史', '你要删除所有记录吗', '不删了', '麻溜的')
    .then((res) => {
      store.commit('search/deleteAllHistory')
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * @description 删除单个历史
 */
const handleDeleteItem = (index) => {
  store.commit('search/deleteHistory', index)
}

/**
 * @description 点击搜索
 */
const handleItemClick = (item) => {
  emits('search', item)
}
</script>
