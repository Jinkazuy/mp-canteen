import {isLogin} from '@/utils/utils.js'


export const ximin_isLogin = {
	onShow() {
		this.isLogin = isLogin()
		console.log('----------------------------')
		console.log(this.isLogin)
		console.log('----------------------------')
		// 检测登录
		// if(!isLogin()) {
		// 	// 本地拿不到用户信息，重定向到用户登录页；
		// 	uni.navigateTo({
		// 	    url: '../login/login?onLoadErrMsg="您的登录已过期，请重新登录"'
		// 	})
		// }
	}
}


