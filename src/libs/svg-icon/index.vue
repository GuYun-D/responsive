<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
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

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
