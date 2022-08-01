<template>
  <div class="w-screen">
    <m-search v-model="modelValue">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <Hint
            @search-click="handleSearchItemClick"
            v-show="modelValue"
            :searchText="modelValue"
          ></Hint>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hint from './hint.vue'

const handleSearchItemClick = (item) => {
  modelValue.value = item
}

const modelValue = ref('')
</script>

<style lang="scss" scoped></style>
