// 这个actions.js文件作用，是在多次操作mutation中的函数时用到；
// 涉及到复杂操作的时候，都用这个文件中写逻辑，操作mutations.js中的函数，从而修改state.js中的内容；

// 参数1对象中的 第1个变量，接收的是mutations中的函数
// 参数1对象中的 第2个变量，接收的是state中的数据，因为最终都有store/index.js引入所有文件
// 所以这个action.js中的变量也能够直接拿到state.js、mutations.js等文件中的函数、数据等；

// 参数2对象中的 第1个变量，接收的是调用这个方法时传进来的参数
// 参数2对象中的 第2个变量，接收的是嗲用这个方法时传进来的参数
// 示例↓
export const setUserInfo = function ({commit, state}, {list, index}) {
  // 因为最终都汇总到了store/index.js中，所以actions.js和mutations.js是可以相互访问的，
  // 所以这个commit就是调用mutations.js中的方法，第一个参数是方法名，
  // 就类似于在其他.vue文件中使用this.$store.commit.xxx(fnName, xx)
  // 方法名还是用mutation-types中的字符串来命名，得到统一性，
  // 第二个参数就是mutations.js中某个方法的形参，具体还得看mutations.js中该方法需要传入的是什么；

  // 调用mutations.js中的SET_SEQUENCE_LIST方法，将歌曲列表传入；
  // 第一个参数是mutations下的函数名，第二个则是传给第一个参数的一些数值；
  commit(types.SET_SEQUENCE_LIST, list)
  // 判断播放模式，如果当前播放模式等于随机播放，也就是2 的时候；
  if (state.mode === playMode.random) {
    // 那么调用洗牌函数，得到随机播放列表；
    let randomList = shuffle(list)
    // 并且将随机播放列表设置为当前播放列表
    commit(types.SET_PLAYLIST, randomList)
    // 然后调用 找到在随机播放列中，当前歌曲的索引 的函数；
    index = findIndex(randomList, list[index])
  } else {
    // 顺序播放
    commit(types.SET_PLAYLIST, list)
  }
  // 设置当前歌曲索引
  commit(types.SET_CURRENT_INDEX, index)
  // 打开播放器：打开
  commit(types.SET_FULL_SCREEN, true)
  // 播放器状态：播放
  commit(types.SET_PLAYING_STATE, true)
}
