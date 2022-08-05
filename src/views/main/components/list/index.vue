<template>
  <m-infinite
    v-model="loading"
    :isFinished="isFinished"
    @onLoad="getPexlesData"
  >
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      :nodekey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width" @click="onToPins"></Item>
      </template>
    </m-waterfall>

    <!-- 详情内容展示 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Pins v-if="isVisiblePins" :id="currentPins.id"></Pins>
    </transition>
  </m-infinite>
</template>

<script setup>
import { getPexlesListApi } from '@/api/pexels'
import { useStore } from 'vuex'
import gsap from 'gsap'
import Item from './item.vue'
import { computed, ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { storeKey } from 'vuex'
import Pins from '../../../pins/components/pins.vue'
import { useEventListener } from '@vueuse/core'

let query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])
const loading = ref(false)
const isFinished = ref(false)
const store = useStore()
const isVisiblePins = ref(false)
const currentPins = ref({})

/**
 * 获取列表信息
 */
const getPexlesData = async () => {
  // 数据是否全部加载完成
  if (isFinished.value) {
    return
  }

  // 完成了第一次的请求之后，page自增
  if (pexelsList.value.length) {
    query.page += 1
  }

  const res = await getPexlesListApi(query)

  if (query.page === 1) {
    pexelsList.value = res.pexels
  } else {
    pexelsList.value.push(...res.pexels)
  }

  // 判断数据是否加载完成
  if (pexelsList.value.length >= res.total) {
    isFinished.value = true
  }

  loading.value = false
}

getPexlesData()

const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  pexelsList.value = []
}

/**
 * @description 进入 pins 修改url，不跳转页面
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
  console.log(item)
}

/**
 * @description 监听浏览器的后退事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}

const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done
  })
}

const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 1,
    onComplete: done
  })
}

/**
 * @description
 */

watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      categoryId: val
    })
  }
)
</script>

<style lang="scss" scoped></style>
