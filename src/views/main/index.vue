<template>
  <div
    class="
      scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent
      xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900
      h-full
      overflow-auto
      bg-white
      dark:bg-zinc-800
      duration-500
    "
  >
    <Navgition></Navgition>

    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List></List>
    </div>

    <!-- 移动端下的 tabbar -->
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass=" fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </m-trigger-menu-item>

      <m-trigger-menu-item
        icon="vip"
        iconClass=" fill-zinc-900 dark:fill-zinc-200"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="handleVipClick"
      >
        vip
      </m-trigger-menu-item>

      <m-trigger-menu-item
        icon="home"
        iconClass=" fill-zinc-900 dark:fill-zinc-200"
        @click="handleMyClick"
      >
        {{ $store.getters.token ? '我的' : '去登陆' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import Navgition from './components/navigation/index.vue'
import List from './components/list/index.vue'

/**
 * @description vip
 */
const handleVipClick = () => {}

/**
 * @description 点击我的
 */
const handleMyClick = () => {}
</script>
