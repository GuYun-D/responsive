<template>
  <div
    class="
      w-full
      h-5
      border-b
      flex
      items-center
      z-10
      bg-white
      dark:bg-zinc-800
      border-b-zinc-200
      dark:border-b-zinc-700
    "
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      @click="handleClickLeft"
      class="h-full w-5 absolute left-0 flex items-center justify-center"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="
        h-full
        flex
        items-center
        justify-center
        m-auto
        font-bold
        text-base text-zinc-900
        dark:bg-zinc-200
      "
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      @click="handleClickRight"
      class="h-full w-5 absolute right-0 flex items-center justify-center"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  clickLeft: Function,
  clickRight: Function,
  sticky: Boolean
})

const router = useRouter()

/**
 * @description 点击左侧的
 */
const handleClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }

  router.back()
}

/**
 * @description 右侧点击事件
 */
const handleClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
  }
}
</script>

<style lang="scss" scoped>
</style>