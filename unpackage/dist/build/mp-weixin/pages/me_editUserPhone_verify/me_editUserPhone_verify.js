(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me_editUserPhone_verify/me_editUserPhone_verify"],{"0d0a":function(e,t,n){"use strict";n.r(t);var o=n("934b"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=r.a},"277b":function(e,t,n){},"66f7":function(e,t,n){"use strict";(function(e){n("261b"),n("921b");o(n("66fd"));var t=o(n("72f1"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"72f1":function(e,t,n){"use strict";n.r(t);var o=n("ef52"),r=n("0d0a");for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);n("b196");var i,a=n("f0c5"),c=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports},"934b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("a34a")),r=n("2f62"),u=a(n("8434")),i=n("3b87");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,r,u,i){try{var a=e[u](i),c=a.value}catch(f){return void n(f)}a.done?t(c):Promise.resolve(c).then(o,r)}function f(e){return function(){var t=this,n=arguments;return new Promise(function(o,r){var u=e.apply(t,n);function i(e){c(u,o,r,i,a,"next",e)}function a(e){c(u,o,r,i,a,"throw",e)}i(void 0)})}}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={data:function(){return{phoneNumber:"",interval:{},verifyCode:""}},onShow:function(){this.setCountDownInterval()},onLoad:function(e){this.phoneNumber=e.number},onUnload:function(){console.log("卸载定时器"),clearInterval(this.interval)},methods:s({onChange:function(){var t=f(o.default.mark(function t(n){var r,a,c;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.verUserInput(n.detail.value);case 2:if(r=t.sent,!r||6!==this.verifyCode.length){t.next=12;break}if(console.log("发请求，验证 验证码"),a=1,!a){t.next=12;break}return console.log("验证成功，设置用户手机号"),t.next=10,(0,i.http_setUserInfoData)({mobile:this.phoneNumber});case 10:c=t.sent,c?((0,u.default)("更换绑定成功！"),this.setCountTime(0),clearInterval(this.interval),setTimeout(function(){e.switchTab({url:"../../pages/me/me",complete:function(e){console.log(e)}})},1e3)):(0,u.default)("更换绑定失败！");case 12:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}(),reVerifyCode:function(){var e=f(o.default.mark(function e(){return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("重新发送HTTP请求，获取验证码"),1,u.default.success({forbidClick:!0,message:"验证码已发送"}),this.setCountTime(60),this.setCountDownInterval();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),verUserInput:function(e){var t=this;return new Promise(function(n,o){if(e.length>6){console.log("长度超过6位"),(0,u.default)("手机号长度超过6位"),r&&clearTimeout(r);var r=setTimeout(function(){t.verifyCode=""},5);return console.log(t.verifyCode),n(!1)}if(isNaN(Number(e))){console.log("不是数字"),(0,u.default)("请输入数字"),i&&clearTimeout(i);var i=setTimeout(function(){t.verifyCode=""},0);return n(!1)}if(String(e).indexOf(" ")>=0){console.log("有空格"),(0,u.default)("请输入正确验证码"),a&&clearTimeout(a);var a=setTimeout(function(){t.verifyCode=""},0);return n(!1)}if(String(e).indexOf(".")>=0){console.log("有小数点"),(0,u.default)("请输入正确验证码"),c&&clearTimeout(c);var c=setTimeout(function(){t.verifyCode=""},0);return n(!1)}n(!0)}).catch(function(e){resolve(!1)}).finally(function(){})},setCountDownInterval:function(){var e=this;this.store_getCountTime>0&&(clearInterval(this.interval),this.interval=setInterval(function(){e.store_getCountTime>0&&(e.setCountTime(e.store_getCountTime-1),console.log("当前短信倒计时=> "+e.store_getCountTime))},1e3))}},(0,r.mapMutations)({setCountTime:"setCountTime"})),computed:s({},(0,r.mapGetters)(["store_getCountTime"]))};t.default=d}).call(this,n("543d")["default"])},b196:function(e,t,n){"use strict";var o=n("277b"),r=n.n(o);r.a},ef52:function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return r}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return o})}},[["66f7","common/runtime","common/vendor"]]]);