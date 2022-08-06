<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="false"
        class="
          guide-my
          dark:hover:bg-zinc-900
          relative
          flex
          items-center
          p-0.5
          rounded-sm
          cursor-pointer
          duration-200
          outline-none
          hover:bg-zinc-100
        "
      >
        <img
          v-lazy
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
          fileClass="fill-zinc-900 dark:fill-zinc-300"
        >
        </m-svg-icon>
      </div>

      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          @click="handlelogin"
          iconColor="#fff"
        ></m-button>
      </div>
    </template>

    <div v-if="false" class="w-[140px] overflow-hidden">
      <div
        class="
          flex
          dark:hover:bg-zinc-800
          items-center
          p-1
          cursor-pointer
          rounded
          hover:bg-zinc-100/60
        "
        v-for="item in menus"
        :key="item.id"
      >
        <m-svg-icon
          fileClass="fill-zinc-900 dark:fill-zinc-200"
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
        ></m-svg-icon>
        <span class="dark:text-zinc-300 text-zinc-800 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

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

/**
 * @description 点击登录
 */
const handlelogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
