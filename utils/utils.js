import store from '@/store/index.js';


// 日期格式化 TODO：未封装	
export const formatDate  = function(d) {
    //如果date不是日期对象，返回
    if (!date instanceof Date) {
        return;
    }
    var year = d.getFullYear(),
        month = d.getMonth() + 1,
        date = d.getDate(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        second = d.getSeconds();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute:minute;
    second = second < 10 ? '0' + second:second;
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
}

// 是否已登录
// 检测本地store数据中,是否已有用户数据;
export const isLogin = function() {
	if (store.getters.store_token === null) {
		// 判断是否有token
		return false
	} else if (store.getters.store_tokenExpiration === null) {
		// 判断是否有token的过期时间
		return false
	} else if(new Date().getTime() >= store.getters.store_tokenExpiration){
		// 判断当前时间毫秒数 是否 大于 token过期时间
		console.log('token超时')
		return false
	} else if(store.getters.store_UserInfoData.mobile === null){
		// 判断当前时间毫秒数 是否 大于 token过期时间
		console.log('手机号为空')
		return false
	} else if(store.getters.store_UserInfoData.nickName === null){
		// 判断当前时间毫秒数 是否 大于 token过期时间
		console.log('用户名为空')
		return false
	}
	console.log('登陆成功,登录过期时间 => ' + formatDate(new Date(store.getters.store_tokenExpiration)))
	return true
}

