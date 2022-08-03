import { h, render } from 'vue'
import MessageComponent from './index.vue'

/**
 * 函数调用message
 * @param {*} type 类型
 * @param {*} content 文本
 * @param {*} duration 展示时间
 */
export const message = (type, content, duration = 3000, destory) => {
  const onDestory = () => {
    render(null, document.body)
  }
  const vnode = h(MessageComponent, {
    type,
    content,
    duration,
    destory: onDestory
  })

  render(vnode, document.body)


}