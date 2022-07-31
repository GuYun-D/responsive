import { useIntersectionObserver } from '@vueuse/core'

/**
 * @description 图片懒加载, 看到了再去加载
 */
export default {
  mounted(el) {
    const imgSrc = el.src
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  },
}