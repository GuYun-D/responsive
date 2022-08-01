<template>
  <div
    class="duration-500 bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10"
  >
    <ul
      class="w-[800px] overflow-hidden mx-auto text-zinc-600 duration-200 py-1 text-xs relative flex flex-wrap justify-center overflow-x-auto px-[10px]"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <div
        class="absolute dark:hover:bg-zinc-900 right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </div>

      <li
        v-for="(item, index) in $store.getters.category"
        class="text-zinc-900 dark:bg-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 shrink-0 px-5 py-0 z-10 rounded mr-1 mb-1 duration-200"
        :key="item.id"
        @click="onItemClick(item)"
        :class="{
          ' dark:bg-zinc-900 text-zinc-900 bg-zinc-200 dark:text-zinc-300':
            $store.getters.currentCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

/**
 * @description 切换菜单的展开和收起
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}

const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>
