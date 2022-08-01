import { h, render } from 'vue'
import Confirm from './index.vue'
/**
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} cancelText  取消按钮文本
 * @param {*} confirmText 确认按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    const closeHandler = () => {
      render(null, document.body)
    }
    const cancelHandler = () => {
      reject(new Error('cancel'))
    }
    const confirmHandler = () => {
      resolve('confirm')
    }

    const vnode = h(Confirm, {
      title, content, cancelText, confirmText, closeHandler, cancelHandler, confirmHandler
    }, null)

    render(vnode, document.body)
  })
}