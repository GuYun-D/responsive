import request from '@/utils/request'

/**
 * @description 人类行为验证
 */
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}

/**
 * @description 登录
 */
export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

/**
 * @description 获取用户信息
 */
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}