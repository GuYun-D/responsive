<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themeDate.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          v-lazy
          class="h-full w-full object-cover rounded"
          :src="themeDate.big.photo"
          alt=""
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded text-white px-1 text-xs duration-300 hover:backdrop-blur-none"
        >
          # {{ themeDate.big.title }}
        </p>
      </div>

      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themeDate.list"
          :key="item.id"
          class="h-[45%] w-[220px] text-white text-xs relative ml-1.5 mb-1.5 rounded cursor-pointer"
        >
          <img
            :src="item.photo"
            class="w-full h-full object-cover rounded"
            alt=""
          />
          <p
            class="absolute bottom-0 left-0 w-full h-full flex items-center backdrop-blur rounded text-white px-1 text-xs duration-300 hover:backdrop-blur-none"
          >
            # {{ themeDate.big.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getThemes } from '@/api/pexels'
import { randomRGB } from '@/utils/color.js'

const themeDate = ref({
  big: {},
  list: []
})

const getThemeDate = async () => {
  const { themes } = await getThemes()
  themeDate.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}

getThemeDate()
</script>

<style lang="scss" scoped></style>
