/**
 * @description 取出dom中的所有img
 */
export const getImgElement = (itemElements) => {
  const imgRlements = []
  itemElements.forEach(el => {
    imgRlements.push(...el.getElementsByTagName('img'))
  });
  return imgRlements
}

/**
 * @description 生成所有图片链接到数组
 * @param {*} itemElements 
 */
export const getAllImg = (imgElements) => {
  return imgElements.map(imgElement => {
    return imgElement.src
  })
}

/**
 * @description 监听图片的数组的加载完成
 * @param {Array} imgs 图片链接的集合
 */
export const onComplateImgs = (imgs) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理图片的加载情况
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img, index
        })
      }
    })
  })

  return Promise.all(promiseAll)
}

/**
 * @description 返回列高对象中的最小高度所在的列
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * @description 获取容器中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  return Math.max(...Object.values(columnHeightObj))
}

/**
 * @description 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // debugger
  const currentMinHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find(key => {
    return columnHeightObj[key] === currentMinHeight
  })
}