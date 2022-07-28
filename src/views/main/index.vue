<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <Navgition></Navgition>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <List></List>
    </div>
  </div>
</template>

<script setup>
import Navgition from './components/navigation/index.vue'
import List from './components/list/index.vue'
</script>
