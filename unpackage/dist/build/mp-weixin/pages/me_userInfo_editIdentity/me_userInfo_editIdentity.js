(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me_userInfo_editIdentity/me_userInfo_editIdentity"],{"050d":function(e,t,n){"use strict";n.r(t);var r=n("fe33"),u=n("b927");for(var o in u)"default"!==o&&function(e){n.d(t,e,function(){return u[e]})}(o);n("eb4a");var a,c=n("f0c5"),i=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=i.exports},"1a96":function(e,t,n){"use strict";(function(e){n("261b"),n("921b");r(n("66fd"));var t=r(n("050d"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"1b51":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("a34a")),u=n("2f62"),o=c(n("8434")),a=n("3b87");function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,u,o,a){try{var c=e[o](a),i=c.value}catch(s){return void n(s)}c.done?t(i):Promise.resolve(i).then(r,u)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(r,u){var o=e.apply(t,n);function a(e){i(o,r,u,a,c,"next",e)}function c(e){i(o,r,u,a,c,"throw",e)}a(void 0)})}}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={data:function(){return{}},methods:f({selectIn:function(){var t=s(r.default.mark(function t(){return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:console.log("内部人员"),e.navigateTo({url:"../../pages/me_userInfo_editUserIdCard/me_userInfo_editUserIdCard",complete:function(e){console.log(e)}});case 2:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),selectOutn:function(){var t=s(r.default.mark(function t(){var n;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("外部人员"),console.log(this.store_UserInfoData.userType),t.next=4,(0,a.http_setUserInfoData)({userType:1,idCard:""});case 4:n=t.sent,n?((0,o.default)("设置成功，您的身份是：访客"),setTimeout(function(){e.switchTab({url:"../../pages/me/me",complete:function(e){console.log(e)}})},1e3)):(0,o.default)("设置失败");case 6:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}()},(0,u.mapMutations)({setUserIdentity:"setUserIdentity"})),computed:f({},(0,u.mapGetters)(["store_UserInfoData"]))};t.default=d}).call(this,n("543d")["default"])},b927:function(e,t,n){"use strict";n.r(t);var r=n("1b51"),u=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t["default"]=u.a},eb4a:function(e,t,n){"use strict";var r=n("ec55"),u=n.n(r);u.a},ec55:function(e,t,n){},fe33:function(e,t,n){"use strict";var r,u=function(){var e=this,t=e.$createElement,r=(e._self._c,n("9879")),u=n("eb11");e.$mp.data=Object.assign({},{$root:{m0:r,m1:u}})},o=[];n.d(t,"b",function(){return u}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return r})}},[["1a96","common/runtime","common/vendor"]]]);