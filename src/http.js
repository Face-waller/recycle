import Vue from 'vue'
import axios from 'axios'
import config from './config'
import context from './main'

axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间
axios.defaults.withCredentials = true //设置cookie

axios.interceptors.request.use(function (config) {
  config.headers.post['Content-Type'] = 'application/json';
  config.headers.get['Content-Type'] = 'application/json';
  return config;
})

axios.interceptors.response.use(
  response => {
      if(response.data.code !== 2000) {
        context.open("提示","code: " + response.data.code + ", " + response.data.message,"warning")
        return response;
      } else {
        return response;
      }

  },
  error => {
      if(error.request) {
        context.open("提示","请求失败，请检查网络","warning")
      }else if(error.response) {
        context.open("提示",error.response.data.message,"warning")
      }else {
        context.open("提示",error.message,"warning")
      }
      return Promise.reject(error)
}
)

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象

