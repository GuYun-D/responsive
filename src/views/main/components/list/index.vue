<template>
  <div>
    <Item v-for="item in pexelsList" :key="item.id" :data="item"></Item>
  </div>
</template>

<script setup>
import { getPexlesListApi } from '@/api/pexels'
import Item from './item.vue'
import { ref } from 'vue'

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
