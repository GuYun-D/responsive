<template>
  <mobile-navigation-vue v-if="isMobileTerminal"></mobile-navigation-vue>
  <PCNavigationVue v-else></PCNavigationVue>
</template>

<script setup>
import MobileNavigationVue from './mobile/index.vue'
import PCNavigationVue from './pc/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const store = useStore()
store.dispatch('category/useCategoryData')
</script>

<style lang="scss" scoped></style>
