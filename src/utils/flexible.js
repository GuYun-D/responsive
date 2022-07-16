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