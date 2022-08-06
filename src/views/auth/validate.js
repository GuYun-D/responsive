/**
 * @description 用户名校验
 * @param {String} val 输入的内容
 * @returns {Boolean, String} true: 校验通过； string: 校验不通过， 提示信息
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名为必填'
  }

  if (val.length < 3 || val.length > 12) {
    return '用户名应该在 3-12 位之间'
  }

  return true
}

/**
 * @description 密码校验
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码为必填'
  }

  if (val.length < 6 || val.length > 12) {
    return '密码应该在 3-12 位之间'
  }

  return true
}
