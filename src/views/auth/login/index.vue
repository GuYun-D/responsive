<template>
  <div
    class="
      relative
      h-screen
      bg-white
      dark:bg-zinc-800
      text-center
      xl:bg-zinc-200 xl:pt-4
    "
  >
    <!-- 表单 -->
    <div
      class="
        block
        px-3
        mt-4
        dark:bg-zinc-800
        xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto
        pt-2
        xl:rounded-sm xl:shadow-lg
        py-4
      "
    >
      <!-- <Hearder></Hearder> -->

      <h3
        class="
          hidden
          mb-2
          font-semibold
          text-base text-main
          dark:text-zinc-300
          xl:block
        "
      >
        账号登陆
      </h3>

      <!-- 表单 -->
      <Form @submit="handleLogin">
        <Field
          type="text"
          class="
            dark:bg-zinc-800 dark:text-zinc-400
            border-b-zinc-400 border-b
            w-full
            outline-0
            pb-1
            px-1
            text-base
            focus:border-b-main
            dark:focus:border-b-zinc-200
            xl:default:bg-zinc-900
          "
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="loginForm.username"
        />

        <ErrorMessage
          name="username"
          class="text-sm text-red-600 block mt-0.5 text-left"
        ></ErrorMessage>

        <Field
          type="password"
          class="
            dark:bg-zinc-800 dark:text-zinc-400
            border-b-zinc-400 border-b
            w-full
            outline-0
            pb-1
            px-1
            text-base
            focus:border-b-main
            dark:focus:border-b-zinc-200
            xl:default:bg-zinc-900
          "
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="loginForm.password"
        />

        <ErrorMessage
          name="password"
          class="text-sm text-red-600 block mt-0.5 text-left"
        ></ErrorMessage>

        <!-- 跳转 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            href=""
            class="
              text-zinc-400
              inline-block
              p-1
              text-sm
              duration-300
              dark:text-zinc-600
              hover:text-zinc-600
              dark:hover:text-zinc-400
              cursor-pointer
            "
            >去注册</a
          >
        </div>

        <!-- 登陆按钮 -->
        <m-button
          :loading="loading"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >登录</m-button
        >
      </Form>

      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>

    <SilderCatche
      v-if="isSilderCaptchVisiable"
      @close="isSilderCaptchVisiable = false"
      @success="handleCaptcha"
    ></SilderCatche>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Hearder from '../components/header.vue'
import { validateUsername, validatePassword } from '../validate'
import SilderCatche from './slider-captche.vue'

const router = useRouter()
const isSilderCaptchVisiable = ref(false)
const loading = ref(false)
const store = useStore()
const loginForm = ref({
  username: 'admin1',
  password: 'admin12345'
})

/**
 * @description 点击登录，触发
 */
const handleLogin = () => {
  isSilderCaptchVisiable.value = true
}

/**
 * 登录
 */
const onLogin = () => {
  loading.value = true

  try {
    store.dispatch('user/login', { ...loginForm.value })
  } finally {
    loading.value = false
  }

  router.push('/')
}

/**
 * 验证通过，触发登录
 */
const handleCaptcha = () => {
  isSilderCaptchVisiable.value = false
  onLogin()
}
</script>