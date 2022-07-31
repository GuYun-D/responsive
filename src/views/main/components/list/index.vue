<template>
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
/**
 * 获取列表信息
 */
const getPexlesData = async () => {
  const res = await getPexlesListApi(query)
  pexelsList.value = res.pexels
}

getPexlesData()
</script>

<style lang="scss" scoped></style>
