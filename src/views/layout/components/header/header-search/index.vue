<template>
  <div class="w-screen">
    <m-search v-model="modelValue">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modelValue = ref('')
</script>

<style lang="scss" scoped></style>
