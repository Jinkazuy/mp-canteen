// 其他文件，最终都是引入到这个文件当中，然后这个文件在main.js中引入，相当于store.js；
import Vue from 'vue'
// 载入Vuex，记得安装；
import Vuex from 'vuex'

// 这个文件的作用是，如果需要对mutations.js中进行多次、复杂等操作时，
// 就将函数封装到actions.js文件中，而不是在mutation.js封装方法；
import * as actions from './actions'

// 对外提供数据
import * as getters from './getters'

// 定义数据
import state from './state'

// 修改state中的数据，只能通过mutations中的函数修改
import mutations from './mutations'

// 修改日志，记录了每次修改state中数据的记录
// import createLogger from 'vuex/dist/logger'

// 挂载
Vue.use(Vuex)

// 用于报错的设置；会占用内容，在生产环境时候将其注释掉
// 开发模式下可以打开，用于检查bug
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // 将引入的文件都挂载
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})