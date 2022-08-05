<template>
  <div
    class="
      backdrop-blur-4xl
      bg-transparent
      pb-2
      overflow-y-auto
      xl:p-2
      fixed
      top-0
      left-0
      w-screen
      h-screen
      text-xl
      z-20
    "
  >
    <!-- 移动端的 -->
    <m-navbar v-if="isMobileTerminal" sticky>
      {{ pexelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3 cursor-pointer"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>

    <!-- pc 下的 -->
    <m-svg-icon
      v-else
      name="close"
      class="
        w-3
        h-3
        ml-1
        p-0.5
        cursor-pointer
        duration-200
        rounded-sm
        hover:bg-zinc-100
        absolute
        right-2
        top-2
      "
      fillClass="fill-zinc-400"
      @click="handleClose"
    ></m-svg-icon>

    <!-- 内容区 -->
    <div class="xl:w-[800px] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="
          w-screen
          mb-2
          xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg
        "
        :src="pexelData.photo"
        alt=""
      />

      <div
        class="
          xl:w-2/5
          xl:h-full
          xl:bg-white
          xl:dark:bg-zinc-900
          xl:rounded-tr-lg
          xl:rounded-bl-lg
          xl:p-3
        "
      >
        <!-- pc: 收藏、分享 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="
              w-4
              p-1
              h-4
              cursor-pointer
              hover:bg-zinc-200
              dark:hover:border-zinc-800
              duration-300
            "
          ></m-svg-icon>

          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>

        <!-- 标题 -->
        <p
          class="
            text-base text-zinc-900
            dark:text-zinc-200
            ml-1
            font-bold
            xl:text-xl xl:mb-5
          "
        >
          {{ pexelData.title }}
        </p>

        <!-- 作者 -->
        <div class="flex items-center">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDetailByIdApi } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()

const pexelData = ref({})
const getPexelsDate = async () => {
  const { result } = await getDetailByIdApi(props.id)
  pexelData.value = result
}

getPexelsDate()

/**
 * @description 点击关闭按钮
 */
const handleClose = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
</style>