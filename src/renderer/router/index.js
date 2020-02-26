import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'index',
          components: require('@/components/Index')
      },
      {
          path: '/training-data-manage',
          components: require('@/components/Training-Data/index')
      },
      {
          path: '/test-data-manage',
          components: require('@/components/Test-Data/index')
      },
      {
          path: '/report',
          components: require('@/components/Data-Report/index')
      }
  ]
})
