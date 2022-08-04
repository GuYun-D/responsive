<template>
  <div
    class="
      duration-500
      w-full
      dark:bg-zinc-800 dark:border-b-zinc-700
      bg-white
      border-b border-b-zinc-200
      py-1
      px-2
    "
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-2 guide-home"
        @click="toHome"
        src="https://img1.baidu.com/it/u=472952010,194694002&fm=253&fmt=auto&app=138&f=JPEG?w=240&h=180"
        alt=""
      />
      <HeaderSearch class="mr-1"></HeaderSearch>
      <HeaderTheme class="mr-1"></HeaderTheme>
      <HeaderMy></HeaderMy>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'

const router = useRouter()

const toHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
