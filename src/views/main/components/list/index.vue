<template>
  <m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexlesData">
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      :nodekey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width"></Item>
      </template>
    </m-waterfall>
  </m-infinite>
</template>

<script setup>
import { getPexlesListApi } from '@/api/pexels'
import Item from './item.vue'
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'

const query = {
  page: 1,
  size: 20
}

const pexelsList = ref([])
const loading = ref(false)
const isFinished = ref(false)
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
</script>

<style lang="scss" scoped></style>
