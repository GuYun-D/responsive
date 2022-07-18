import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    // 获取当前路径下的所有文件夹下的 index.vue
    /**
      {
        ./svg-icon/index.vue: () => import('/src/libs/svg-icon/index.vue')
        ./popup/index.vue: () => import('/src/libs/popup/index.vue?t=1658122129557')
      }
     */
    const components = import.meta.glob('./*/index.vue')
    // console.log('所有组件', components);
    for (const [filePath, fn] of Object.entries(components)) {
      const componentName = 'm-' + filePath.replace('./', '').split('/')[0]
      // console.log(componentName);
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}