<template>
  <mobile-navigation-vue
    v-if="isMobileTerminal"
    :data="categoryDate"
  ></mobile-navigation-vue>
</template>

<script setup>
import MobileNavigationVue from './mobile/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'
import { ref } from '@vue/reactivity'

const categoryDate = ref()
const getCategoryData = async () => {
  const { category } = await getCategory()
  categoryDate.value = category
  categoryDate.value.unshift(ALL_CATEGORY_ITEM)
}

getCategoryData()
</script>

<style lang="scss" scoped></style>
