<template>
  <div class="bg-white duration-500 dark:bg-zinc-900 sticky top-0 left-0 z-10">
    <ul
      ref="ulRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="siderRef"
        :style="sliderStyle"
        class="dark:bg-zinc-800 absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 按钮 -->
      <li
        @click="onShowPopup"
        class="dark:bg-zinc-900 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white dark:shadow-l-zinc"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <li
        :ref="setNavItemRef"
        v-for="(item, index) in $store.getters.category"
        :key="item.id"
        :class="{
          ' text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        @click="onNavItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>

    <m-popup v-model="isVisiable">
      <MenuVue @nav-click="onNavItemClick"></MenuVue>
    </m-popup>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, watch } from '@vue/runtime-core'
import MenuVue from '../../menu/index.vue'

const store = useStore()
const isVisiable = ref(false)

const ulRef = ref()
let navItemRefs = []
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

const setNavItemRef = (navItem) => {
  if (navItem) {
    navItemRefs.push(navItem)
  }
}

const onNavItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisiable.value = false
}

onBeforeUpdate(() => {
  /**
   * setNavItemRef 在数据源变化引起DOM变化之后就会执行 所以
   * navItemRefs内部的数据会越来越多
   * 数据变化后 => DOM更新之前 置空
   */
  navItemRefs = []
})

// 获取响应式的 scroll 滚动距离
const { x: ulScrollLeft } = useScroll(ulRef)

watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { width, left } = navItemRefs[val].getBoundingClientRect()
    sliderStyle.value = {
      // 横向滚动位置：ul的横向滚动位置 + 当前元素的left - ul.padding
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px'
    }
  }
)

const onShowPopup = () => {
  isVisiable.value = true
}
</script>

<style lang="scss" scoped></style>
