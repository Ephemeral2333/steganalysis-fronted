import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'

import * as echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
