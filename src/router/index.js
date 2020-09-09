import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { Message } from 'element-ui'
import getPageTitle from '@/utils/get-page-title'
import { getRouterByUser } from '@/service/index'

import PageView from '@/layout'
import RouterView from '@/views/empty'
import RouterTabView from '@/layout/RouterTabView'


Vue.use(Router)

// 默认不需要权限的页面
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '',
    component: PageView,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'homepage' }
    }]
  }, 
  {
    path: '/401',
    component: () => import('@/views/error/403'),
    hidden: true
  }, {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  }
]
// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  PageView: PageView,
  RouterView: RouterView,
  RouterTabView: RouterTabView,

  // 需要动态引入的页面组件
  exampleTable: () => import('@/views/example/table/index'),
  exampleForm: () => import('@/views/example/form/index'),
  // testdemo: () => import('@/views/example/testdemo/index'),
   // account
  center: () => import('@/views/account/center'),
   // system
  roleList: () => import('@/views/system/roleList'),
  userList: () => import('@/views/system/userList'),
  permissionList: () => import('@/views/system/permissionList'),
}

export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getRouterByUser().then(res => {
      const result = buildmenu(res.data)
      const routers = generator(result)
      
      routers.push(notFoundRouter)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

export function buildmenu(rows) {
  const menus = [{
    'hidden': true,
    'title': '个人页',
    'key': 'account',
    'component': 'PageView',
    'redirect': '/account/center',
    'icon': '#',
    children: [{
      'hidden': true,
      'title': '个人中心',
      'key': 'center',
      'icon': '#'
    }]
  }]
  const arr = []
  buildtree(rows, arr, 0)
  arr.forEach(row => {
    menus.push(row)
  })
  return menus
}

export function buildtree(list, arr, parentId) {
  list.forEach(item => {
    if (item.parentId == parentId) {
      var child = {
        title: item.menuName,
        key: item.menuKey,
        icon: item.icon,
        hidden: item.visible == '1',
        component: item.menuType == 'M' ? item.menuLay : undefined,
        children: [],
        redirect: item.menuType == 'M' ? true : false
      }
      
      buildtree(list, child.children, item.menuId)
      if (child.children.length === 0) {
        delete child.children
        // delete child.component
      }
      arr.push(child)
    }
  })
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 隐藏菜单
      hidden: item.hidden || false,
      // 该路由对应页面的 组件
      component: constantRouterComponents[item.component || item.key],
      hideChildrenInMenu: item.hideChildrenInMenu || false,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: { title: item.title, icon: item.icon || undefined, hiddenHeaderContent: item.hiddenHeaderContent || false }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // if(item.key=='banner' && item.children.length){
    //   currentRouter.redirect = `${currentRouter.path}/${item.children[0].key}`
    // }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
      if(item.redirect) {
        currentRouter.redirect = `${currentRouter.path}/${item.children[0].key}`
      }
    }
    return currentRouter
  })
}




const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  mode: 'history',
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
