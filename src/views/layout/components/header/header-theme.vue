<template>
  <m-popover placement="top-left">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="dark:hover:bg-zinc-900 cursor-pointer w-4 h-4 p-1 rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in themes"
        :key="item.id"
        @click="changeTheme(item)"
        class="dark:hover:bg-zinc-800 flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1 dark:fill-zinc-300"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="dark:text-zinc-200 text-zinc-300 text-sm">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useStore } from 'vuex'
import { THMEN_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { computed } from '@vue/runtime-core'
const themes = [
  {
    id: 0,
    type: THMEN_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const store = useStore()

/**
 * @description 切换主题
 */
const changeTheme = (theme) => {
  store.commit('theme/changeThemeType', theme.type)
}

const svgIconName = computed(() => {
  const theme = themes.find((item) => {
    return item.type === store.getters.theme
  })

  return theme?.icon
})
</script>

<style lang="scss" scoped></style>
