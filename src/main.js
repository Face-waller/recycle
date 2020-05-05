// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import config from './config'
import MyComponent from './components/MyComponent'
import './http';
import 'vuetify/dist/vuetify.min.css'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/material.css'

Vue.config.productionTip = true // 设置开发模式提醒


Vue.use(Vuetify, { theme: config.theme})
Vue.use(MyComponent)
Vue.use(ElementUI)
Vue.prototype.$qs = qs;

// 引入mock.js
if(Vue.config.productionTip){
  require('./mock/mock.js')
}

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    open(title,msg,type) {
      this.$notify({
        title: title,
        message: msg,
        type: type
      });
    },
  }
})

export default vue
