<template>
  <button
    class="text-sm text-center rounded duration-500 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnmi
      }
    ]"
  >
    <my-svg-icon
      v-if="loading"
      class="w-2 h-2 animate-spin mr-1"
      name="loading"
    ></my-svg-icon>

    <m-svg-icon
      :class="sizeEnum[sizeKey]"
      v-if="icon"
      :name="icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>

    <slot v-else></slot>
  </button>
</template>

<script>
import { computed } from '@vue/runtime-core'

const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-800 hover:bg-zinc-900',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}

const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },

  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },

  'icon-default': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>

<script setup>
const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`m-button组件的type必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((item) => !item.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`m-button组件的size必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  isActiveAnmi: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
</script>

<style lang="scss" scoped></style>
