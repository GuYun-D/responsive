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
import { computed, onMounted, ref } from 'vue'

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

/**
 * @description 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0 // 初始化每列的高度为0px
  }
}

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
</script>

<style lang="scss" scoped></style>
