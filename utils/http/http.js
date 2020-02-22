// 使用第三方插件, 基于uniapp的axios, https://ext.dcloud.net.cn/plugin?id=558 
// 在网站下载使用或者在网站上点击导入HBuilder,会自动成js_sdk文件夹,否则手动创建
// 并且在项目中安装 axios  npm install --save axios
import axios from '@/js_sdk/gangdiedao-uni-axios/index.js'



// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';


import {baseUrl} from '@/utils/http/http_req_list.js'


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}


/**
 * 响应接口日志记录
 */
function _reslog(res) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${res.config.url}响应结果：`, res)
    }
}


// 创建自定义接口服务实例
const http = axios.create({
	
	  // 路由前缀,如果请求地址经常变化,可以不设置
    // baseURL: baseUrl,
		
    timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
		headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		}
})

/**
 * 请求拦截, 设置请求头 & 允许单独读设置请求头 & 带上token请求头
 */
http.interceptors.request.use(config => {

	
	// 解决使用get请求无法设置请求头为题
	// if (config.method == 'get') {
	//     config.data = 'true'
	// }
	
	// 每次请求附加token值,用于后台监测当前用户是否属于登录状态;
  config.headers['token'] = store.getters.store_token || ''
  return config
}, error => {
  return Promise.reject(error)
})

export default http


