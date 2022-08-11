<template>
  <div
    class="w-5 flex items-center flex-col justify-center mx-0.5"
    @click="handleClick"
  >
    <m-svg-icon
      class="w-1.5 h-1.5"
      :fillClass="iconClass"
      :name="icon"
    ></m-svg-icon>
    <p class="text-sm mt=0.5" :class="textClass">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: String,
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  to: String
})

/**
 * @description 点击事件
 */
const handleClick = () => {
  if (!props.to) {
    return
  }

  router.push(props.router)
}
</script>

<style lang="scss" scoped>
</style>