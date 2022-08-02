<template>
  <div class="w-screen">
    <m-search v-model="modelValue" @search="handleSearchItemClick">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <Hint
            @search-click="handleSearchItemClick"
            v-show="modelValue"
            :searchText="modelValue"
          ></Hint>

          <!-- 最近搜索 -->
          <History
            v-show="!modelValue"
            @search="handleSearchItemClick"
          ></History>

          <!-- 推荐 -->
          <Theme v-show="!modelValue"></Theme>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Hint from './hint.vue'
import History from './history.vue'
import Theme from './theme.vue'

const store = useStore()

const handleSearchItemClick = (item) => {
  modelValue.value = item
  if (item) {
    store.commit('search/addHistory', item)
    store.commit('app/changeSearchText', item)
  }
}

const modelValue = ref('')
</script>

<style lang="scss" scoped></style>
