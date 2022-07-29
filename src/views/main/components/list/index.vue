<template>
  <div class="m-5">
    <m-waterfall
      :data="pexelsList"
      :nodekey="id"
      :column="5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <Item :data="item"></Item>
      </template>
    </m-waterfall>
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
