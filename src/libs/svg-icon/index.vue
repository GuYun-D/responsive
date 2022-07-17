<template>
  <svg aria-hidden="true">
    <use :xlink:href="svgIcon" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from '@vue/runtime-core'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: String,
  fillClass: String
})

const svgIcon = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
