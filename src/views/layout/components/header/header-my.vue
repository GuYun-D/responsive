<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
      >
        <img
          class="w-3 h-3 rounded"
          src="https://img0.baidu.com/it/u=1776260030,3350744143&fm=253&fmt=auto&app=138&f=JPEG?w=250&h=300"
          alt=""
        />
        <m-svg-icon
          class="w-1.5 h-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900"
        >
        </m-svg-icon>

        <m-svg-icon
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
          name="vip"
        >
        </m-svg-icon>
      </div>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in menus"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fileClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
const menus = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 vip',
    icon: 'vip-profile',
    path: '/memeber'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<style lang="scss" scoped></style>
