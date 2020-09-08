// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueStorage from 'vue-ls'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins/directives.js'
import '@/assets/css/index.scss'
import './permission'
import '@/plugins/index'
import '@/assets/icon/iconfont.js'
import SvgIcon from '@/components/svg_icon'

VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = false
Vue.component('svg-icon', SvgIcon)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueStorage)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
