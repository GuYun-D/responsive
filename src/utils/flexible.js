import { computed } from "vue"
import { PC_DEVICE_WIDTH } from "../constants"

/**
 * @author GuYun-D
 * @description 判断当前设备是否是移动设备，判断依据就是根据当前屏幕宽度是否小于指定值
 * @returns {Boolean}
 */
export const isMobileTerminal = computed(() => {
  return document.documentElement.clientWidth < PC_DEVICE_WIDTH
})