import { computed } from "vue"
import { useWindowSize } from "@vueuse/core"
import { PC_DEVICE_WIDTH } from "../constants"

const { width } = useWindowSize()

/**
 * @author GuYun-D
 * @description 判断当前设备是否是移动设备，判断依据就是根据当前屏幕宽度是否小于指定值
 * @returns {Boolean}
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * @description 动态计算REM的值
 * @description 计算方法：屏幕宽度 / 10
 */
export const useREM = () => {
  const html = document.documentElement
  const MAX_FONT_SIZE = 40
  // 监听到html文档被解析完成
  document.addEventListener('DOMContentLoaded', () => {
    const fontSize = window.innerWidth / 10
    html.style.fontSize = fontSize >= MAX_FONT_SIZE ? MAX_FONT_SIZE + 'px' : fontSize + 'px'
  })
}