<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">
      <ul class="overflow-y-scroll">
        <li
          class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
          v-for="(item, index) in $store.getters.category"
          :key="item.id"
          @click="$emit('nav-click', index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </h2>
  </div>
</template>

<script setup>

defineEmits(['nav-click'])
</script>

<style lang="scss" scoped></style>
