<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bgred100/40"
  >
    <div>
      <m-svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></m-svg-icon>

      <input
        placeholder="搜索"
        type="text"
        class="group-hover:border-zinc-300 group-hover:bg-white block text-sm duration-500 w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 focus:border-red-300"
      />
      <m-svg-icon
        name="input-delete"
        class="h-1.5 w-1.5 duration-500 absolute top-[50%] right-9 translate-y-[-50%]"
      ></m-svg-icon>
      <div
        class="group-hover:opacity-100 opacity-0 h-1.5 w-[1px] absolute top-[50%] right-[62px] translate-y-[-50%] duration-500 bg-zinc-200"
      ></div>
      <!-- drapdown -->
      <transition name="slider">
        <div
          class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
        >
          <slot name="drapdown"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
  transition: all 500ms;
}

.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
