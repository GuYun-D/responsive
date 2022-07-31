<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getAllImg,
  getImgElement,
  getMaxHeight,
  getMinHeight,
  getMinHeightColumn,
  onComplateImgs
} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

const containerHeight = ref(0) // 容器总高度 = 最高的column
const columnHeightObj = ref({}) // 记录每列高度的容器
const containerRef = ref(null) // 容器的dom
const containerWidth = ref(0) // 容器的总宽度 （不含padding, margin, border）
const containerLeft = ref(0) // 容器的左边距，item的left
const columnWidth = ref(0) // 列宽 = (容器的宽度 - 所有的列间距宽度) / 列数
let itemHeights = [] // 图片高度的集合

/**
 * @description 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0 // 初始化每列的高度为0px
  }
}

// useColumnHeightObj()

/**
 * @description 计算容器的宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器的宽度
  containerWidth.value =
    containerRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)

  console.log(containerWidth.value)
}

/**
 * @description 列间距的合计
 */
const columnsPacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})

/**
 * @description 计算列宽
 */
const useColumnWidth = () => {
  // 计算容器的宽度
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnsPacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
})

/**
 * @description 返回下一个item的 left
 */
const getImgLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

/**
 * @description 计算下一个的top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

/**
 * @description 计算图片的位置
 */
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }

    item._style = {}
    item._style.left = getImgLeft()
    item._style.top = getItemTop()
    // 指定的列进行高度的自增
    increasingHeight(index)
  })

  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * @description 监听图片的加载完成, 需要预加载
 */
const waitImageComplate = () => {
  itemHeights = []
  // 拿到所有的元素
  const itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取到image标签
  const imgElements = getImgElement(itemElements)
  // 获取所有的 img 标签
  const allImgs = getAllImg(imgElements)
  // 等待图片加载完成
  onComplateImgs(allImgs).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })

    // 开始渲染位置
    useItemLocation()
  })
}

/**
 * @description 不需要预加载的情况
 */
const useItemHeight = () => {
  itemHeights = []
  const itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  useItemLocation()
}

const increasingHeight = (index) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

/**
 * @description 重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    useColumnWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 250)
}

watch(
  () => props.data,
  (val) => {
    nextTick(() => {
      const resetColumnHeight = val.every((item) => !item._style)
      if (resetColumnHeight) {
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImageComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      columnWidth.value = 0
    }
    reset()
  }
)

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>

<style lang="scss" scoped></style>
