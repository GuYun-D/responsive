import md5 from "md5"
import { login, getProfile } from '@/api/sys'
import { message } from '../../libs/message'

export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * @description 登录
     * @param {*} param0 
     * @param {*} payload 
     */
    async login({ commit, dispatch }, payload) {
      const { password } = payload
      const data = await login({
        ...payload,
        password: password ? md5(password) : 0
      })

      commit('setToken', data.token)
      dispatch('getUserProfile')
    },

    async getUserProfile({ commit }) {
      const res = await getProfile()
      commit('setUserInfo', res)
      message('success', '欢迎回来')
    }
  }
}