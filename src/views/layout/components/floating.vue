<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="
        w-4
        h-4
        mb-1
        bg-white
        dark:bg-zinc-900
        border
        dark:border-0
        border-zinc-900
        rounded
        flex
        justify-center
        items-center
        cursor-pointer
        duration-200
        hover:shadow-lg
        guide-start
      "
      @click="handleGuide"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="full-zinc-900 dark:full-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="guide-feedback flex items-center" placement="top-left">
      <template #reference>
        <div
          class="
            w-4
            h-4
            mb-1
            bg-white
            dark:bg-zinc-900
            border
            dark:border-0
            border-zinc-900
            rounded
            flex
            justify-center
            items-center
            cursor-pointer
            duration-200
            hover:shadow-lg
          "
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="full-zinc-900 dark:full-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="
            flex
            items-center
            p-1
            cursor-pointer
            rounded
            hover:bg-zinc-100/60
            dark:hover:bg-zinc-800
          "
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:full-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './step.js'

let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
})

/**
 * @description 点击开始引导
 */
const handleGuide = () => {
  driver.defineSteps(steps)
  driver.start()
}
</script>


<style lang="scss" scoped>
.driver-fix-stacking{
  position: fixed;
  z-index: 100004 !important;
}
</style>
