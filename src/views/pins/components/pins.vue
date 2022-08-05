<template>
  <div class="fixed top-0 left-0 w-screen h-screen text-xl bg-slate-200 z-20">
    <m-navbar>测试</m-navbar>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>