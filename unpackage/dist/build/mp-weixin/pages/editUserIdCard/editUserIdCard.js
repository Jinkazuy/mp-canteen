(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/editUserIdCard/editUserIdCard"],{"05f7":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("a34a")),a=i(n("8434")),u=n("3b87");function i(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,r,a,u,i){try{var c=t[u](i),o=c.value}catch(f){return void n(f)}c.done?e(o):Promise.resolve(o).then(r,a)}function o(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var u=t.apply(e,n);function i(t){c(u,r,a,i,o,"next",t)}function o(t){c(u,r,a,i,o,"throw",t)}i(void 0)})}}var f={data:function(){return{userIdCard:""}},methods:{editUserIdentity:function(){var e=o(r.default.mark(function e(){var n;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(0===this.userIdCard||""===this.userIdCard){e.next=6;break}return e.next=3,(0,u.http_setUserInfoData)({userType:0,idCard:this.userIdCard});case 3:n=e.sent,n?((0,a.default)("设置成功，您的身份是：内部员工"),setTimeout(function(){t.navigateBack({delta:2})},1e3)):(0,a.default)("设置失败"),console.log(n);case 6:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()}};e.default=f}).call(this,n("543d")["default"])},"2ba0":function(t,e,n){"use strict";n.r(e);var r=n("05f7"),a=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);e["default"]=a.a},"3ca5":function(t,e,n){"use strict";n.r(e);var r=n("a4b4"),a=n("2ba0");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);n("4faf");var i,c=n("f0c5"),o=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=o.exports},"3ed0":function(t,e,n){},"4faf":function(t,e,n){"use strict";var r=n("3ed0"),a=n.n(r);a.a},a1c9:function(t,e,n){"use strict";(function(t){n("261b"),n("921b");r(n("66fd"));var e=r(n("3ca5"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a4b4:function(t,e,n){"use strict";var r,a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return r})}},[["a1c9","common/runtime","common/vendor"]]]);