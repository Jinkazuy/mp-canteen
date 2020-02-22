import Vue from 'vue'
import App from './App'

// 载入vuex，这里会自动找到index.js文件；
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'


// 解决axios真机调试报错
// 需要安装第三方依赖
require('promise.prototype.finally').shim()

// 因为使用mpvue，子组件是拿不到this.$store的对象，所以挂载在vue的原型对象中，就能拿到了
Vue.prototype.$store = store

const app = new Vue({
    ...App
})
app.$mount()
