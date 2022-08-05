<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <Pins :id="$route.params.id"></Pins>
  </div>
</template>

<script setup>
import Pins from './components/pins.vue'
</script>

<style lang="scss" scoped>
</style>