import Vue from 'vue'
import router from './router'
import { Message } from 'element-ui'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo')
          .then((infoRes) => {
            // 调用 vuex 的 从后端获取用户的路由菜单，动态添加可访问路由表
            store.dispatch('GenerateRoutes').then((res) => {
              // 把已获取到的路由菜单加入到路由表中
              // router.addRoutes(store.getters.addRouters)
              router.addRoutes(res)

              const redirect = decodeURIComponent(from.query.redirect || to.path)
              // if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              // } else {
                // 跳转到目的路由
                // next({ path: redirect })
              // }
            })
          })
          .catch((error) => {
            Message.error(error || '请求错误')
            store.dispatch('Logout').then(() => {
              next({ path: '/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
      NProgress.done()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
