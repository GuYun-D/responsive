<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] overflow-hidden mx-auto text-zinc-600 duration-500 py-1 text-xs relative flex flex-wrap justify-center overflow-x-auto px-[10px]"
    >
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-500 hover:bg-zinc-200"
      >
        <m-svg-icon
          name="unfold"
          class="w-1 h-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
      </div>

      <li
        v-for="item in $store.getters.category"
        class="text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 shrink-0 px-5 py-0 z-10 rounded mr-1 mb-1 duration-200"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
