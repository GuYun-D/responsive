<template>
  <div
    class="
      h-full
      bg-zinc-200
      dark:bg-zinc-800
      duration-500
      overflow-auto
      xl:pt-1
    "
  >
    <div
      class="
        relative
        max-w-screen-lg
        mx-auto
        bg-white
        dark:bg-zinc-900
        duration-500
        xl:rounded-sm xl:border-zinc-600 xl:border xl:px-4 xl:py-2
      "
    >
      <!-- 移动端 -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="handelClickLeft">
        个人资料
      </m-navbar>

      <!-- pc端 -->
      <div
        v-if="isMobileTerminal"
        class="text-lg font-bold text-center mb-4 dark:text-zinc-300"
      >
        个人资料
      </div>

      <div class="h-full xl:w-2/3 px-1 pb-4 text-sm mt-2 xl:text-center">
        <!-- 头像部分 -->
        <div class="py-1 xl:absolute xl:right-[100px] xl:text-center">
          <span class="w-8 inline-block mb-2 font-black xl:mx-auto"
            >我的头像</span
          >

          <div
            class="
              relative
              w-[80px]
              h-[80px]
              group
              xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]
            "
          >
            <!-- 头像 -->
            <img
              @click="handleClickUploadAvatar"
              class="rounded-full w-full h-full xl:inline-block"
              :src="$store.getters.userInfo.avatar"
              alt=""
            />

            <!-- 鼠标移入 -->
            <div
              class="
                absolute
                top-0
                rounded-full
                w-full
                h-full
                bg-black/40
                hidden
                xl:group-hover:block
                duration-300
              "
              @click="handleClickUploadAvatar"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2"
              ></m-svg-icon>
              <div class="text-xs text-white dark:text-zinc-300 scale-90">
                点击更换头像
              </div>
            </div>

            <!-- 隐藏域 -->
            <input
              v-show="false"
              ref="inputFileRef"
              accept=".png, .jpeg, .jpg, .gif"
              @change="handleUploadImg"
              type="file"
            />
            <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
              只能上传.png, .jpeg, .jpg, .gif结尾的图片格式，最大为5M
            </p>
          </div>
        </div>

        <!-- 信息输入 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span
            class="text-sm w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input v-model="cao.name" class="w-full" max="20"></m-input>
        </div>

        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span
            class="text-sm w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input v-model="cao.age" class="w-full"></m-input>
        </div>

        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span
            class="text-sm w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input v-model="cao.company" class="w-full"></m-input>
        </div>

        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span
            class="text-sm w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input v-model="cao.homePage" class="w-full"></m-input>
        </div>

        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span
            class="text-sm w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="cao.introduction"
            max="50"
            type="textarea"
            class="w-full"
          ></m-input>
        </div>

        <m-button
          :loading="isLoading"
          @click="saveInfo"
          class="
            w-full
            mt-2
            mb-4
            dark:text-zinc-300 dark:bg-zinc-800
            xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]
          "
        >
          保存修改
        </m-button>

        <m-button
          @click="handleLagout"
          v-if="isMobileTerminal"
          class="
            w-full
            mt-2
            mb-4
            dark:text-zinc-300 dark:bg-zinc-800
            xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]
          "
        >
          退出登录
        </m-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import { confirm } from '@/libs/confirm'
import { message } from '../../libs/message'
import { useRouter } from 'vue-router'
import { editProfile } from '@/api/sys'

const cao = ref({
  name: '',
  age: '',
  company: '',
  homePage: '',
  introduction: ''
})

const store = useStore()
const router = useRouter()
const inputFileRef = ref(null)
const isLoading = ref(false)

/**
 * @description 左侧点击事件
 */
const handelClickLeft = () => {}

/**
 * @description 上传图片
 */
const handleUploadImg = () => {}

/**
 * @description 退出登录
 */
const handleLagout = () => {
  confirm('确定退出？').then((res) => {
    store.dispatch('user/logout')
    router.back()
  })
}

/**
 * @description 点击头像上传
 */
const handleClickUploadAvatar = () => {
  console.log(11111)
  inputFileRef.value.click()
}

/**
 * 保存修改
 */
const saveInfo = async () => {
  isLoading.value = true
  await editProfile(cao.value)
  message('success', '修改成功')
  isLoading.value = false
  router.back()
}
</script>
